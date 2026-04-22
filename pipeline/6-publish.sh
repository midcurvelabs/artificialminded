#!/usr/bin/env bash
# 6-publish.sh — commit the day's issue + articles and push to main.
# Vercel auto-deploys from the push.
#
# Usage:
#   pipeline/6-publish.sh [YYYY-MM-DD]
#
# Env:
#   DRY_RUN=1 — print what would happen without committing/pushing
#   GIT_AUTHOR_NAME / GIT_AUTHOR_EMAIL — override author for CI runs

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

DATE="${1:-$(TZ=Europe/Sofia date +%Y-%m-%d)}"
ISSUE_FILE="content/issues/$DATE.md"

if [ ! -f "$ISSUE_FILE" ]; then
  echo "[error] $ISSUE_FILE does not exist — nothing to publish" >&2
  echo "[hint]  run pipeline/4-build-issue.py first" >&2
  exit 1
fi

# Stage issue + all articles for this date. Articles are named <DATE>-<slug>.md.
git add "$ISSUE_FILE" "content/articles/${DATE}-"*.md 2>/dev/null || true

# Check if there's actually anything to commit.
if git diff --cached --quiet; then
  echo "[info] no staged changes — already published?"
  exit 0
fi

# Detect quiet day by reading the frontmatter.
IS_QUIET=$(python3 -c "
import json, sys
with open('$ISSUE_FILE') as f:
    raw = f.read()
fm = raw.split('---', 2)[1]
print('quiet' if json.loads(fm).get('isQuietDay') else 'full')
")

if [ "$IS_QUIET" = "quiet" ]; then
  MSG="issue $DATE — quiet day"
else
  N_ARTICLES=$(ls content/articles/${DATE}-*.md 2>/dev/null | wc -l | tr -d ' ')
  MSG="issue $DATE — $N_ARTICLES articles"
fi

if [ "${DRY_RUN:-0}" = "1" ]; then
  echo "[dry-run] would commit: $MSG"
  echo "[dry-run] staged files:"
  git diff --cached --name-only | sed 's/^/  /'
  echo "[dry-run] would push to origin main"
  exit 0
fi

git commit -m "$MSG"
echo "[info] committed: $MSG"

git push origin main
echo "[info] pushed — Vercel will deploy"

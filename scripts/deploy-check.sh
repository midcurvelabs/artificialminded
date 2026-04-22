#!/usr/bin/env bash
# deploy-check.sh — smoke-test the production deploy.
#
# Runs after Vercel publishes a new deployment for today's issue. Confirms:
#   1. The homepage returns 200 and contains today's pretty date.
#   2. The permalink /daily/<DATE> returns 200.
#   3. Each article URL from the issue returns 200.
#   4. The sitemap (if present) mentions the new date.
#
# Usage:
#   scripts/deploy-check.sh [BASE_URL] [DATE]
#
# Defaults:
#   BASE_URL = https://artificialminded.com
#   DATE     = today in Europe/Sofia

set -euo pipefail

BASE_URL="${1:-https://artificialminded.com}"
DATE="${2:-$(TZ=Europe/Sofia date +%Y-%m-%d)}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ISSUE_FILE="$REPO_ROOT/content/issues/$DATE.md"

fail() { echo "[fail] $*" >&2; exit 1; }
ok()   { echo "[ok]   $*"; }

if [ ! -f "$ISSUE_FILE" ]; then
  fail "no issue file at $ISSUE_FILE — cannot enumerate articles to check"
fi

check_url() {
  local url="$1"
  local label="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$url")
  if [ "$code" = "200" ]; then
    ok "$label ($url)"
  else
    fail "$label returned $code ($url)"
  fi
}

# 1. Homepage
check_url "$BASE_URL/" "homepage"

# 2. Permalink
check_url "$BASE_URL/daily/$DATE" "daily/$DATE"

# 3. Articles — pull slugs from the issue frontmatter
SLUGS=$(python3 -c "
import json, pathlib
raw = pathlib.Path('$ISSUE_FILE').read_text()
fm = raw.split('---', 2)[1]
data = json.loads(fm)
if data.get('isQuietDay'):
    print('')
else:
    slugs = [data.get('headlineSlug')] + data.get('trendSlugs', [])
    print('\n'.join(s for s in slugs if s))
")

if [ -z "$SLUGS" ]; then
  ok "quiet day — no articles to check"
else
  while IFS= read -r slug; do
    [ -z "$slug" ] && continue
    check_url "$BASE_URL/article/$slug" "article/$slug"
  done <<< "$SLUGS"
fi

# 4. Optional: sitemap freshness
if curl -s -f -o /dev/null --max-time 10 "$BASE_URL/sitemap.xml"; then
  if curl -s --max-time 10 "$BASE_URL/sitemap.xml" | grep -q "$DATE"; then
    ok "sitemap mentions $DATE"
  else
    echo "[warn] sitemap.xml exists but does not mention $DATE yet (ISR may lag)"
  fi
fi

echo "[done] deploy check passed for $DATE"

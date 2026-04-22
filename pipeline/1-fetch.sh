#!/usr/bin/env bash
# 1-fetch.sh — parallel-invoke the three rik-docs fetchers for today's research.
#
# Writes:
#   pipeline/research/<DATE>/reddit.md
#   pipeline/research/<DATE>/github.md
#   pipeline/research/<DATE>/x.md
#   pipeline/research/<DATE>/_errors.md   (optional — only if any fetcher logs errors)
#
# Usage:
#   pipeline/1-fetch.sh [YYYY-MM-DD]
#
# Env:
#   RIK_DOCS_ROOT  — path to rik-docs repo (default: ~/Documents/rik-docs)
#   XAI_API_KEY or OPENROUTER_API_KEY — needed for X fetcher (otherwise it skips gracefully)
#
# Exit codes:
#   0 — at least one of the three fetchers succeeded (we can proceed to synthesis)
#   1 — all three failed (block the pipeline)

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RIK_DOCS_ROOT="${RIK_DOCS_ROOT:-$HOME/Documents/rik-docs}"
FETCHERS="$RIK_DOCS_ROOT/07_system/scripts"

DATE="${1:-$(TZ=Europe/Sofia date +%Y-%m-%d)}"
OUTDIR="$REPO_ROOT/pipeline/research/$DATE"
LOGDIR="$REPO_ROOT/pipeline/logs/$DATE"

mkdir -p "$OUTDIR" "$LOGDIR"

# Public topic list — broader than rik-docs private brief, no personal/private topics.
TOPICS=(
  "Claude"
  "Claude Code"
  "Vibecoding"
  "AI agents"
  "MCP"
  "Context engineering"
  "Local models"
  "Open-source LLMs"
  "AI coding tools"
  "AI business"
  "Substack growth"
  "Creator economy"
  "Crypto AI"
  "Stablecoins"
  "Onchain agents"
  "LLM evaluation"
  "AI dev tooling"
  "Prompt engineering"
)

# Sanity check the fetchers exist.
for script in \
  "$FETCHERS/trend-brief-fetch-reddit.py" \
  "$FETCHERS/trend-brief-fetch-github.sh" \
  "$FETCHERS/trend-brief-fetch-x.sh"
do
  if [ ! -f "$script" ]; then
    echo "[fatal] missing fetcher: $script" >&2
    echo "[hint]  set RIK_DOCS_ROOT to the rik-docs repo root" >&2
    exit 1
  fi
done

echo "[info] fetching research for $DATE → $OUTDIR"

# Launch all three in parallel. Each logs to its own file.
python3 "$FETCHERS/trend-brief-fetch-reddit.py" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/reddit.log" 2>&1 &
REDDIT_PID=$!

bash "$FETCHERS/trend-brief-fetch-github.sh" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/github.log" 2>&1 &
GITHUB_PID=$!

bash "$FETCHERS/trend-brief-fetch-x.sh" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/x.log" 2>&1 &
X_PID=$!

wait $REDDIT_PID; REDDIT_RC=$?
wait $GITHUB_PID; GITHUB_RC=$?
wait $X_PID;      X_RC=$?

echo "[info] reddit rc=$REDDIT_RC  github rc=$GITHUB_RC  x rc=$X_RC"

# A fetcher "succeeded" if the output file exists and is non-trivial (> 100 bytes).
check_output() {
  local name="$1"
  local file="$OUTDIR/$name.md"
  if [ -f "$file" ] && [ "$(wc -c < "$file")" -gt 100 ]; then
    echo "ok"
  else
    echo "empty"
  fi
}

REDDIT_STATE=$(check_output reddit)
GITHUB_STATE=$(check_output github)
X_STATE=$(check_output x)

echo "[info] reddit.md=$REDDIT_STATE  github.md=$GITHUB_STATE  x.md=$X_STATE"

# Block only if ALL three failed.
if [ "$REDDIT_STATE" = "empty" ] && [ "$GITHUB_STATE" = "empty" ] && [ "$X_STATE" = "empty" ]; then
  echo "[fatal] all three fetchers returned empty — check logs in $LOGDIR" >&2
  exit 1
fi

exit 0

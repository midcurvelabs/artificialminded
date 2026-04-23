#!/usr/bin/env bash
# 1-fetch.sh — parallel-invoke the three fetchers for today's research.
#
# Writes:
#   pipeline/research/<DATE>/hn.md
#   pipeline/research/<DATE>/github.md
#   pipeline/research/<DATE>/x.md
#   pipeline/research/<DATE>/_errors.md   (optional — only if any fetcher logs errors)
#
# Reddit fetcher (fetch-reddit.py) is kept in the tree but not invoked — Reddit
# now gates all API access behind a Responsible Builder ticket (days-to-weeks
# approval) and anonymous requests 403 from datacenter IPs. Hacker News via
# Algolia replaces it with no auth and no gating.
#
# Usage:
#   pipeline/1-fetch.sh [YYYY-MM-DD]
#
# Env:
#   XAI_API_KEY or OPENROUTER_API_KEY — needed for X fetcher (otherwise it skips gracefully)
#
# Exit codes:
#   0 — at least one of the three fetchers succeeded (we can proceed to synthesis)
#   1 — all three failed (block the pipeline)

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FETCHERS="$REPO_ROOT/pipeline/fetchers"

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
  "$FETCHERS/fetch-hn.py" \
  "$FETCHERS/fetch-github.sh" \
  "$FETCHERS/fetch-x.sh"
do
  if [ ! -f "$script" ]; then
    echo "[fatal] missing fetcher: $script" >&2
    exit 1
  fi
done

echo "[info] fetching research for $DATE → $OUTDIR"

# Launch all three in parallel. Each logs to its own file.
python3 "$FETCHERS/fetch-hn.py" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/hn.log" 2>&1 &
HN_PID=$!

bash "$FETCHERS/fetch-github.sh" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/github.log" 2>&1 &
GITHUB_PID=$!

bash "$FETCHERS/fetch-x.sh" "$DATE" "$OUTDIR" "${TOPICS[@]}" \
  > "$LOGDIR/x.log" 2>&1 &
X_PID=$!

wait $HN_PID;     HN_RC=$?
wait $GITHUB_PID; GITHUB_RC=$?
wait $X_PID;      X_RC=$?

echo "[info] hn rc=$HN_RC  github rc=$GITHUB_RC  x rc=$X_RC"

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

HN_STATE=$(check_output hn)
GITHUB_STATE=$(check_output github)
X_STATE=$(check_output x)

echo "[info] hn.md=$HN_STATE  github.md=$GITHUB_STATE  x.md=$X_STATE"

# Block only if ALL three failed.
if [ "$HN_STATE" = "empty" ] && [ "$GITHUB_STATE" = "empty" ] && [ "$X_STATE" = "empty" ]; then
  echo "[fatal] all three fetchers returned empty — check logs in $LOGDIR" >&2
  exit 1
fi

exit 0

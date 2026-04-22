#!/usr/bin/env bash
# run-daily.sh — full daily orchestration for Artificially Minded.
#
# LLM steps run via Claude Code headless mode (`claude -p`) against your Max plan.
# No Anthropic API key needed.
#
# Flow:
#   1-fetch.sh             → pipeline/research/<DATE>/{reddit,github,x}.md  (bash, no LLM)
#   /synthesize-trends     → pipeline/research/<DATE>/synthesis.json         (Claude Code skill)
#   5-quality-gate.py      → may downgrade synthesis.json to quiet_day       (python, no LLM)
#   /write-articles        → content/articles/<DATE>-<slug>.md (parallel)    (Claude Code skill)
#   4-build-issue.py       → content/issues/<DATE>.md                        (python, no LLM)
#   6-publish.sh           → git commit + push (Vercel auto-deploys)         (bash)
#
# Usage:
#   pipeline/run-daily.sh [YYYY-MM-DD]
#
# Env:
#   DRY_RUN=1             — build locally, skip git commit/push
#   SKIP_FETCH=1          — reuse existing research/<DATE>/ (for reruns)
#   SKIP_PUBLISH=1        — do everything except git commit/push
#   CLAUDE_BIN=/path/to/claude — override the claude CLI binary (default: "claude" on PATH)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

DATE="${1:-$(TZ=Europe/Sofia date +%Y-%m-%d)}"
LOGDIR="$REPO_ROOT/pipeline/logs/$DATE"
mkdir -p "$LOGDIR"

CLAUDE="${CLAUDE_BIN:-claude}"

log() { printf "[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }

# Preflight: the claude CLI must exist and be authenticated.
if ! command -v "$CLAUDE" >/dev/null 2>&1; then
  echo "[fatal] '$CLAUDE' not found on PATH — install Claude Code or set CLAUDE_BIN" >&2
  exit 1
fi

log "run-daily started for $DATE"
log "logs → $LOGDIR"

# Step 1 — fetch
if [ "${SKIP_FETCH:-0}" = "1" ]; then
  log "skipping fetch (SKIP_FETCH=1)"
else
  log "[1/6] fetch"
  bash pipeline/1-fetch.sh "$DATE" 2>&1 | tee "$LOGDIR/1-fetch.log"
fi

# Step 2 — synthesize (Claude Code skill, headless)
log "[2/6] synthesize"
SYNTH_SKILL="$(cat .claude/skills/synthesize-trends.md)"
"$CLAUDE" -p "Synthesize trends for date $DATE. Follow the skill instructions exactly." \
  --append-system-prompt "$SYNTH_SKILL" \
  --permission-mode acceptEdits \
  --output-format text \
  2>&1 | tee "$LOGDIR/2-synthesize.log"

if [ ! -f "pipeline/research/$DATE/synthesis.json" ]; then
  echo "[fatal] /synthesize-trends did not produce synthesis.json" >&2
  exit 1
fi

# Step 3 — quality gate (python, no LLM)
log "[3/6] quality gate"
python3 pipeline/5-quality-gate.py --date "$DATE" 2>&1 | tee "$LOGDIR/5-quality-gate.log"

IS_QUIET=$(python3 -c "
import json, pathlib
p = pathlib.Path('pipeline/research/$DATE/synthesis.json')
print('quiet' if json.loads(p.read_text()).get('quiet_day') else 'full')
")

# Step 4 — write articles (Claude Code skill, parallel subagents)
if [ "$IS_QUIET" = "quiet" ]; then
  log "[4/6] write-articles skipped (quiet day)"
else
  log "[4/6] write-articles"
  WRITE_SKILL="$(cat .claude/skills/write-articles.md)"
  "$CLAUDE" -p "Write articles for date $DATE. Follow the skill instructions exactly." \
    --append-system-prompt "$WRITE_SKILL" \
    --permission-mode acceptEdits \
    --output-format text \
    2>&1 | tee "$LOGDIR/3-write-articles.log"
fi

# Step 5 — build issue (python, no LLM)
log "[5/6] build-issue"
python3 pipeline/4-build-issue.py --date "$DATE" 2>&1 | tee "$LOGDIR/4-build-issue.log"

# Step 6 — publish
if [ "${SKIP_PUBLISH:-0}" = "1" ] || [ "${DRY_RUN:-0}" = "1" ]; then
  log "[6/6] publish skipped"
else
  log "[6/6] publish"
  bash pipeline/6-publish.sh "$DATE" 2>&1 | tee "$LOGDIR/6-publish.log"
fi

log "run-daily complete ($IS_QUIET day)"

#!/usr/bin/env bash
# Fetch X/Grok live-search per topic, write x.md.
# Usage: trend-brief-fetch-x.sh <DATE> <OUTDIR> <topic1> [topic2] ...
#
# Provider fallback order:
#   1. xAI direct (api.x.ai) — uses search_parameters (if XAI_API_KEY set)
#   2. OpenRouter (openrouter.ai) — uses plugins + x_search_filter (if OPENROUTER_API_KEY set)
#
# If both are unavailable or fail on a topic, that topic is logged to _errors.md
# and the brief continues with the remaining topics. If neither key is set at all,
# writes a graceful-skip stub and exits 0.
set -uo pipefail

DATE="${1:?usage: $0 <DATE> <OUTDIR> <topic...>}"
OUTDIR="${2:?outdir required}"
shift 2
TOPICS=("$@")
if [ ${#TOPICS[@]} -eq 0 ]; then
  echo "at least one topic required" >&2
  exit 2
fi

mkdir -p "$OUTDIR"
OUTFILE="$OUTDIR/x.md"
ERRFILE="$OUTDIR/_errors.md"

if [ -z "${XAI_API_KEY:-}" ] && [ -z "${OPENROUTER_API_KEY:-}" ]; then
  {
    echo "# X research — $DATE"
    echo "_skipped: neither XAI_API_KEY nor OPENROUTER_API_KEY set_"
  } > "$OUTFILE"
  echo "x: skipped (no keys set)"
  exit 0
fi

FROM_DATE="$(date -j -v-1d -f '%Y-%m-%d' "$DATE" '+%Y-%m-%d' 2>/dev/null || date -d "$DATE -1 day" '+%Y-%m-%d')"

SYS_PROMPT="You surface the highest-signal posts from X about a given topic in the last 24 hours. Return JSON only."
USER_PROMPT_TEMPLATE='Topic: %s. Return 3-5 posts as a JSON array: [{"handle": "@name", "text": "one-sentence summary or quote under 25 words", "url": "https://x.com/...", "followers": <int or null>}]. Prefer builders, researchers, operators. Skip pure engagement-farm threads.'

build_xai_req() {
  local topic="$1"
  python3 -c '
import json, sys
topic, from_d, to_d, sys_p, user_tmpl = sys.argv[1:6]
payload = {
    "model": "grok-4-fast",
    "messages": [
        {"role": "system", "content": sys_p},
        {"role": "user", "content": user_tmpl % topic},
    ],
    "search_parameters": {
        "mode": "on",
        "sources": [{"type": "x"}],
        "from_date": from_d,
        "to_date": to_d,
    },
}
print(json.dumps(payload))
' "$topic" "$FROM_DATE" "$DATE" "$SYS_PROMPT" "$USER_PROMPT_TEMPLATE"
}

build_openrouter_req() {
  local topic="$1"
  python3 -c '
import json, sys
topic, from_d, to_d, sys_p, user_tmpl = sys.argv[1:6]
payload = {
    "model": "x-ai/grok-4.1-fast",
    "messages": [
        {"role": "system", "content": sys_p},
        {"role": "user", "content": user_tmpl % topic},
    ],
    "plugins": [{"id": "web"}],
    "x_search_filter": {
        "from_date": from_d,
        "to_date": to_d,
    },
}
print(json.dumps(payload))
' "$topic" "$FROM_DATE" "$DATE" "$SYS_PROMPT" "$USER_PROMPT_TEMPLATE"
}

fetch_topic() {
  local topic="$1"
  local resp=""

  if [ -n "${XAI_API_KEY:-}" ]; then
    local req
    req="$(build_xai_req "$topic")"
    resp="$(curl -s --max-time 30 https://api.x.ai/v1/chat/completions \
      -H "Authorization: Bearer $XAI_API_KEY" \
      -H "Content-Type: application/json" \
      -d "$req" 2>&1)"
    if [ -n "$resp" ] && ! echo "$resp" | grep -q '"error"'; then
      echo "$resp"
      return 0
    fi
    echo "- xAI $topic: ${resp:0:200}" >> "$ERRFILE"
  fi

  if [ -n "${OPENROUTER_API_KEY:-}" ]; then
    local req
    req="$(build_openrouter_req "$topic")"
    resp="$(curl -s --max-time 30 https://openrouter.ai/api/v1/chat/completions \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      -H "Content-Type: application/json" \
      -H "HTTP-Referer: https://github.com/rik/rik-docs" \
      -H "X-Title: rik-trend-brief" \
      -d "$req" 2>&1)"
    if [ -n "$resp" ] && ! echo "$resp" | grep -q '"error"'; then
      echo "$resp"
      return 0
    fi
    echo "- OpenRouter $topic: ${resp:0:200}" >> "$ERRFILE"
  fi

  return 1
}

{
  echo "# X research — $DATE"
  echo
  for topic in "${TOPICS[@]}"; do
    echo "## $topic"
    RESP="$(fetch_topic "$topic" || true)"
    if [ -z "$RESP" ]; then
      echo "- error fetching topic (see _errors.md)"
      echo
      continue
    fi

    POSTS="$(echo "$RESP" | python3 -c '
import json,sys,re
try:
    r = json.load(sys.stdin)
    content = r["choices"][0]["message"]["content"]
    m = re.search(r"\[.*\]", content, re.DOTALL)
    arr = json.loads(m.group(0) if m else content)
except Exception:
    sys.exit(0)
for p in arr[:5]:
    handle = p.get("handle","")
    text = (p.get("text") or "").replace("\n"," ")[:250]
    url = p.get("url","")
    followers = p.get("followers")
    fstr = ("{:,}".format(followers)) if isinstance(followers,int) else "<no count>"
    if not url: continue
    line = "- **" + handle + "** . " + fstr + ". \"" + text + "\" -> [link](" + url + ")"
    print(line)
')"
    if [ -z "$POSTS" ]; then
      echo "- no significant activity in last 24h"
    else
      echo "$POSTS"
    fi
    echo
  done
} > "$OUTFILE"

echo "x: wrote $OUTFILE"

#!/usr/bin/env bash
# Fetch GitHub trending-today + per-topic top repos, write github.md.
# Usage: trend-brief-fetch-github.sh <DATE> <OUTDIR> <topic1> [topic2] ...
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
OUTFILE="$OUTDIR/github.md"
ERRFILE="$OUTDIR/_errors.md"

log_err() { echo "- GitHub: $*" >> "$ERRFILE"; }

urlencode() { python3 -c 'import sys,urllib.parse;print(urllib.parse.quote_plus(sys.argv[1]))' "$1"; }

truncate_desc() {
  python3 -c '
import sys
s = sys.stdin.read().strip()
if not s or s == "null":
    print("<no description>")
else:
    w = s.split()
    if len(w) > 25:
        print(" ".join(w[:25]) + "...")
    else:
        print(s)
'
}

{
  echo "# GitHub research — $DATE"
  echo
  echo "## Trending today"

  TRENDING_HTML="$(curl -s --max-time 15 "https://github.com/trending?since=daily" || true)"
  if [ -n "$TRENDING_HTML" ]; then
    REPOS="$(echo "$TRENDING_HTML" \
      | grep -oE 'href="/[^"/]+/[^"/]+/stargazers"' \
      | sed -E 's|href="/([^"/]+)/([^"/]+)/stargazers"|\1/\2|' \
      | awk '!seen[$0]++' \
      | head -5)"
  else
    log_err "trending page fetch failed, trying proxy"
    PROXY_JSON="$(curl -s --max-time 10 'https://ghapi.huchen.dev/repositories?since=daily' || true)"
    REPOS="$(echo "$PROXY_JSON" | python3 -c '
import json,sys
try:
    data = json.load(sys.stdin)
    for r in data[:5]:
        print(f"{r[\"author\"]}/{r[\"name\"]}")
except Exception as e:
    sys.exit(0)
')"
  fi

  if [ -z "$REPOS" ]; then
    log_err "trending: no repos parsed from either source"
    echo "- _trending fetch failed — see _errors.md_"
  else
    while IFS= read -r repo; do
      [ -z "$repo" ] && continue
      META="$(gh api "repos/$repo" --jq '{stars: .stargazers_count, lang: .language, desc: .description, url: .html_url}' 2>/dev/null || echo '')"
      if [ -z "$META" ]; then
        log_err "trending: gh api failed for $repo"
        continue
      fi
      STARS=$(echo "$META" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("stars",0))')
      LANG=$(echo "$META" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("lang") or "Unknown")')
      DESC=$(echo "$META" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("desc") or "")' | truncate_desc)
      URL=$(echo "$META" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("url") or "")')
      printf -- '- **[%s](%s)** — %s stars, %s. "%s"\n' "$repo" "$URL" "$STARS" "$LANG" "$DESC"
    done <<< "$REPOS"
  fi

  for topic in "${TOPICS[@]}"; do
    echo
    echo "## $topic"
    Q="$(urlencode "$topic")"
    RESULT="$(gh api "search/repositories?q=${Q}&sort=stars&order=desc&per_page=5" \
      --jq '.items[] | {name: .full_name, url: .html_url, stars: .stargazers_count, lang: .language, desc: .description, pushed: .pushed_at}' 2>/dev/null || echo '')"
    if [ -z "$RESULT" ]; then
      log_err "topic '$topic': gh search failed"
      echo "- no results"
      continue
    fi
    ROWS="$(echo "$RESULT" | python3 -c '
import json,sys,datetime
cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=365)
for line in sys.stdin.read().strip().split("\n"):
    if not line: continue
    try:
        r = json.loads(line)
    except Exception: continue
    pushed = r.get("pushed") or ""
    try:
        pd = datetime.datetime.strptime(pushed[:19], "%Y-%m-%dT%H:%M:%S")
        if pd < cutoff: continue
    except Exception: pass
    desc = (r.get("desc") or "").strip()
    w = desc.split()
    if len(w) > 25: desc = " ".join(w[:25]) + "..."
    elif not desc: desc = "<no description>"
    name = r.get("name","")
    url = r.get("url","")
    stars = r.get("stars",0)
    lang = r.get("lang") or "Unknown"
    print("\t".join([name, url, str(stars), lang, desc]))
')"
    if [ -z "$ROWS" ]; then
      echo "- no active repos in last 12 months"
      continue
    fi
    while IFS=$'\t' read -r name url stars lang desc; do
      [ -z "$name" ] && continue
      printf -- '- **[%s](%s)** — %s stars, %s. "%s"\n' "$name" "$url" "$stars" "$lang" "$desc"
    done <<< "$ROWS"
  done
} > "$OUTFILE"

echo "github: wrote $OUTFILE"

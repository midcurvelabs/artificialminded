#!/usr/bin/env python3
"""Fetch Hacker News top-of-day stories for a set of topics and write hn.md.

Usage: fetch-hn.py <DATE> <OUTDIR> <topic1> [topic2] ...

Uses HN's Algolia-backed search API (https://hn.algolia.com/api). No auth,
no rate limit worth worrying about at daily cadence, works from any IP.

Pulls stories created in the last 24h, sorts by points, then filters each
story against TOPIC_KEYWORDS — same shape as the previous Reddit fetcher.
"""
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://hn.algolia.com/api/v1/search_by_date"
UA = "artificialminded-research/1.0"
WINDOW_SECONDS = 24 * 60 * 60
HITS_PER_PAGE = 200

TOPIC_KEYWORDS = {
    "Claude": ["claude"],
    "Claude Code": ["claude code", "claude-code", "claudecode"],
    "Vibecoding": ["vibecod", "vibe cod", "vibe-cod"],
    "AI agents": ["ai agent", "agents", "agentic"],
    "AI agency": ["ai agency", "ai consult"],
    "AI OS": ["ai os", "personal os", "agent os"],
    "Personal Operating System": ["personal operating system", "personal os", "second brain", "pkm", "obsidian"],
    "Context engineering": ["context engineering", "context-engineer", "prompt engineer"],
    "Content creation": ["content creat", "creator economy", "solo creator"],
    "MCP": ["mcp", "model context protocol"],
    "Self-hosting AI": ["self-host", "selfhost", "local llm", "local ai", "ollama", "on-device", "llama.cpp"],
    "Substack growth": ["substack", "newsletter", "paid subscriber"],
    "Stablecoins": ["stablecoin", "usdc", "usdt"],
    "Payments": ["payment", "stripe", "checkout"],
    "Crypto AI": ["onchain", "on-chain", "ai x crypto", "crypto ai"],
    "Builder/creator economy": ["creator economy", "solopreneur", "indiehack", "indie hack"],
    "Local models": ["local model", "local llm", "ollama", "llama.cpp", "gguf", "on-device"],
    "Open-source LLMs": ["open source llm", "open-source llm", "open weights", "open-weights"],
    "AI coding tools": ["ai coding", "cursor", "copilot", "aider", "cline"],
    "AI business": ["ai startup", "ai business", "saas", "arr "],
    "Prompt engineering": ["prompt engineer", "prompt engineering", "system prompt"],
    "LLM evaluation": ["llm eval", "evaluation", "benchmark", "mmlu", "humaneval"],
    "AI dev tooling": ["dev tool", "devtool", "ide", "sdk", "framework"],
}


def clean(s: str) -> str:
    if not s:
        return ""
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def first_sentence(s: str, max_words: int = 25) -> str:
    s = clean(s)
    for p in re.split(r"(?<=[.!?])\s+", s):
        w = p.split()
        if 4 <= len(w) <= max_words:
            return p
    words = s.split()
    if not words:
        return ""
    return " ".join(words[:max_words]) + ("..." if len(words) > max_words else "")


def _err_body(e: urllib.error.HTTPError) -> str:
    try:
        return e.read().decode("utf-8", errors="replace")[:200].replace("\n", " ")
    except Exception:
        return ""


def fetch_window(now_ts: int):
    """Fetch all HN stories created in the last WINDOW_SECONDS, sorted by date."""
    since = now_ts - WINDOW_SECONDS
    params = urllib.parse.urlencode({
        "tags": "story",
        "numericFilters": f"created_at_i>{since}",
        "hitsPerPage": HITS_PER_PAGE,
    })
    url = f"{API}?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def main():
    if len(sys.argv) < 4:
        print("usage: fetch-hn.py <DATE> <OUTDIR> <topic> [topic...]", file=sys.stderr)
        sys.exit(2)
    date = sys.argv[1]
    outdir = sys.argv[2]
    input_topics = sys.argv[3:]
    os.makedirs(outdir, exist_ok=True)
    errors_path = os.path.join(outdir, "_errors.md")

    try:
        data = fetch_window(int(time.time()))
    except urllib.error.HTTPError as e:
        with open(errors_path, "a") as f:
            f.write(f"- HN fetch: HTTP {e.code} — {_err_body(e)}\n")
        outpath = os.path.join(outdir, "hn.md")
        with open(outpath, "w") as f:
            f.write(f"# Hacker News research — {date}\n\n_fetch failed_\n")
        return
    except Exception as e:
        with open(errors_path, "a") as f:
            f.write(f"- HN fetch: {e}\n")
        outpath = os.path.join(outdir, "hn.md")
        with open(outpath, "w") as f:
            f.write(f"# Hacker News research — {date}\n\n_fetch failed_\n")
        return

    all_stories = []
    for hit in data.get("hits", []):
        all_stories.append({
            "title": clean(hit.get("title") or hit.get("story_title") or ""),
            "url": hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
            "hn_url": f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
            "points": hit.get("points") or 0,
            "num_comments": hit.get("num_comments") or 0,
            "author": hit.get("author") or "",
            "story_text": clean(hit.get("story_text") or ""),
        })

    # Sort by points desc so topic filter gets the strongest matches first.
    all_stories.sort(key=lambda s: -s["points"])

    matches = {t: [] for t in input_topics}
    for st in all_stories:
        hay = (st["title"] + " " + st["story_text"][:500]).lower()
        for topic in input_topics:
            kws = TOPIC_KEYWORDS.get(topic, [topic.lower()])
            if any(kw in hay for kw in kws):
                matches[topic].append(st)

    lines = [f"# Hacker News research — {date}", ""]
    for topic in input_topics:
        lines.append(f"## {topic}")
        seen = set()
        uniq = []
        for st in matches[topic]:
            if st["hn_url"] in seen:
                continue
            seen.add(st["hn_url"])
            uniq.append(st)
        top = uniq[:5]
        if not top:
            lines.append("- no significant activity in last 24h")
        else:
            for st in top:
                quote = first_sentence(st["story_text"]) or st["title"]
                if len(quote.split()) > 25:
                    quote = " ".join(quote.split()[:25]) + "..."
                lines.append(
                    f'- **[{st["title"]}]({st["url"]})** — '
                    f'HN [{st["points"]} pts, {st["num_comments"]} comments]({st["hn_url"]}) by {st["author"]}. "{quote}"'
                )
        lines.append("")

    outpath = os.path.join(outdir, "hn.md")
    with open(outpath, "w") as f:
        f.write("\n".join(lines))
    print(f"hn: {sum(1 for t in input_topics if matches[t])}/{len(input_topics)} topics, {len(all_stories)} stories in window, wrote {outpath}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Fetch Reddit top-of-day threads for a set of topics and write reddit.md.

Usage: trend-brief-fetch-reddit.py <DATE> <OUTDIR> <topic1> [topic2] ...
"""
import html
import json
import os
import re
import sys
import urllib.request

SUBREDDITS = [
    "ClaudeAI", "LocalLLaMA", "cryptocurrency", "ObsidianMD",
    "selfhosted", "artificial", "vibecoding", "Substack",
]

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
}


def clean(s: str) -> str:
    if not s:
        return ""
    s = html.unescape(s)
    s = re.sub(r"https?://preview\.redd\.it/\S+", "", s)
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


def fetch(sub: str):
    url = f"https://www.reddit.com/r/{sub}/top.json?t=day&limit=25"
    req = urllib.request.Request(url, headers={"User-Agent": "rik-trend-agent/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.load(r)


def main():
    if len(sys.argv) < 4:
        print("usage: trend-brief-fetch-reddit.py <DATE> <OUTDIR> <topic> [topic...]", file=sys.stderr)
        sys.exit(2)
    date = sys.argv[1]
    outdir = sys.argv[2]
    input_topics = sys.argv[3:]
    os.makedirs(outdir, exist_ok=True)
    errors_path = os.path.join(outdir, "_errors.md")
    all_threads = []
    for sub in SUBREDDITS:
        try:
            data = fetch(sub)
        except Exception as e:
            with open(errors_path, "a") as f:
                f.write(f"- Reddit r/{sub}: {e}\n")
            continue
        for c in data.get("data", {}).get("children", []):
            d = c.get("data", {})
            all_threads.append({
                "sub": d.get("subreddit", sub),
                "title": clean(d.get("title", "")),
                "permalink": d.get("permalink", ""),
                "score": d.get("score", 0),
                "num_comments": d.get("num_comments", 0),
                "selftext": d.get("selftext", ""),
            })

    matches = {t: [] for t in input_topics}
    for th in all_threads:
        hay = (th["title"] + " " + th["selftext"][:500]).lower()
        for topic in input_topics:
            kws = TOPIC_KEYWORDS.get(topic, [topic.lower()])
            if any(kw in hay for kw in kws):
                matches[topic].append(th)

    lines = [f"# Reddit research — {date}", ""]
    for topic in input_topics:
        lines.append(f"## {topic}")
        seen = set()
        uniq = []
        for h in sorted(matches[topic], key=lambda x: -x["score"]):
            if h["permalink"] in seen:
                continue
            seen.add(h["permalink"])
            uniq.append(h)
        top = uniq[:5]
        if not top:
            lines.append("- no significant activity in last 24h")
        else:
            for h in top:
                quote = first_sentence(h["selftext"]) or h["title"]
                if len(quote.split()) > 25:
                    quote = " ".join(quote.split()[:25]) + "..."
                lines.append(
                    f'- **[{h["title"]}](https://reddit.com{h["permalink"]})** — '
                    f'r/{h["sub"]}, score {h["score"]}, {h["num_comments"]} comments. "{quote}"'
                )
        lines.append("")

    outpath = os.path.join(outdir, "reddit.md")
    with open(outpath, "w") as f:
        f.write("\n".join(lines))
    print(f"reddit: {sum(1 for t in input_topics if matches[t])}/{len(input_topics)} topics, wrote {outpath}")


if __name__ == "__main__":
    main()

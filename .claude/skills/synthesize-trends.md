---
name: synthesize-trends
description: Rank the day's research (hn.md, github.md, x.md) into 5-7 trends (target) and write synthesis.json. Called by pipeline/run-daily.sh between fetch and quality-gate steps. Reads pipeline/prompts/synthesis.md for the full voice + output contract.
---

# /synthesize-trends — daily trend ranker

**Trigger:** `/synthesize-trends <YYYY-MM-DD>` (date defaults to today, Europe/Sofia)

**Input:**
- `pipeline/research/<DATE>/hn.md`
- `pipeline/research/<DATE>/github.md`
- `pipeline/research/<DATE>/x.md`
- `pipeline/prompts/synthesis.md` — full prompt spec (ranking rules, required fields, quality checklist)

**Output:** `pipeline/research/<DATE>/synthesis.json`

---

## What you do

You are the morning editor for **Artificially Minded**. You read the last 24 hours of research and pick the 5-7 stories worth running today. You decide the exact number: run every story that clears the bar, skip anything weak — do not pad.

### Step 1 — Resolve the date

The argument is `YYYY-MM-DD` or empty. If empty, use today's date in Europe/Sofia:

```bash
TZ=Europe/Sofia date +%Y-%m-%d
```

Set `DATE` accordingly. All file paths below are relative to the repo root (`~/Documents/rik-code/artificialminded/`).

### Step 2 — Load the prompt spec

Read `pipeline/prompts/synthesis.md` in full. It defines:

- Ranking criteria (cross-platform signal > concreteness > recency > relevance > non-duplication)
- Output size (1 headline + 4-6 trends target; 5-7 total; absolute floor is 3 total or quiet-day stub)
- Per-trend required fields: `slug`, `title`, `deck`, `signal`, `sources`, `one_line_thesis`, `key_facts`, `key_quotes`, `raw_research_excerpt`, `isHeadline`
- The exact JSON output shape
- The self-review quality checklist

Treat that file as your system prompt. Follow it exactly.

### Step 3 — Load the research

Read all three research files:

- `pipeline/research/<DATE>/hn.md`
- `pipeline/research/<DATE>/github.md`
- `pipeline/research/<DATE>/x.md`

If a file is missing or under ~100 bytes, treat that platform as absent for today and skip it — do not invent sources. If all three are absent, return a quiet-day stub with `editorial_note_seed` explaining the fetch failure.

### Step 4 — Synthesize

Produce the JSON object specified in `pipeline/prompts/synthesis.md` — top-level keys `quiet_day`, `headline`, `trends`, `editorial_note_seed`.

Enforce the quality checklist before emitting:

1. `signal` matches actual cross-platform presence in the research.
2. Every URL in `sources` appears verbatim in the research files.
3. Every number in `key_facts` is traceable to the research.
4. Every quote in `key_quotes` is verbatim, with attribution.
5. `raw_research_excerpt` is 500-1500 words of raw text (not summarized).
6. If `quiet_day: false`, at least 3 total (headline + 2). Target 5-7 total — include every trend that clears the bar, exclude anything weak.
7. No trend duplicates another. Merge overlap.

### Step 5 — Write the file

Write the JSON to `pipeline/research/<DATE>/synthesis.json` using the Write tool. Pretty-print with 2-space indent so it's diffable.

Do not print the JSON to the chat — just write the file and report a one-line summary: `[synthesis] <DATE>: <N> trends (headline + N-1)` or `[synthesis] <DATE>: quiet day`.

### Step 6 — Report

End your turn with a short confirmation naming the file path and the trend count. Nothing else.

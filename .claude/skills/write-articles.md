---
name: write-articles
description: Dispatch parallel subagent writers, one per trend, to turn synthesis.json into full article markdown files under content/articles/. Skips on quiet days. Called by pipeline/run-daily.sh after quality-gate passes.
---

# /write-articles — parallel per-trend article generator

**Trigger:** `/write-articles <YYYY-MM-DD>` (date defaults to today, Europe/Sofia)

**Input:**
- `pipeline/research/<DATE>/synthesis.json` (produced by `/synthesize-trends`, validated by `5-quality-gate.py`)
- `pipeline/prompts/article-writer.md` — full voice + structure contract
- `lib/mock-issue.ts` — voice reference (gold-standard examples)

**Output:** one `content/articles/<DATE>-<slug>.md` per trend (headline + trends)

---

## What you do

You orchestrate N parallel writer subagents — one per trend from today's synthesis — to produce publishable article markdown files. You do NOT write the articles yourself. You dispatch, validate, and save.

### Step 1 — Resolve the date

Argument is `YYYY-MM-DD` or empty. If empty:

```bash
TZ=Europe/Sofia date +%Y-%m-%d
```

Set `DATE`. All paths are relative to the artificialminded repo root.

### Step 2 — Load synthesis

Read `pipeline/research/<DATE>/synthesis.json`.

If `quiet_day: true`, stop immediately and report `[write-articles] <DATE>: quiet day — skipped`. No files to write.

Otherwise, build `TRENDS = [headline, ...trends]` — the list of articles to generate.

### Step 3 — Load the writer contract

Read `pipeline/prompts/article-writer.md` in full — you will pass it verbatim as the subagent's system prompt. It defines:

- Voice rules (editorial, third-person, active verbs, banned words list)
- Structure for headline mode (500-650 words, 2 subheads) and trend mode (400-550 words, 2-3 subheads)
- Council block spec (bull/bear/builder — must disagree)
- Exact JSON output shape (`{ title, deck, body, council }`)
- Self-review checklist

### Step 4 — Load the voice reference

Read `lib/mock-issue.ts`. Extract the first two ``` body: ` ... ` ``` blocks (the vibecoding and context-engineering article bodies). Concatenate into a `VOICE_REFERENCE` string, max ~3000 characters. This gives each subagent a concrete example of the house style.

### Step 5 — Dispatch subagents in parallel

For each trend in `TRENDS`, build a subagent user message — structured JSON matching the input contract in `pipeline/prompts/article-writer.md`:

```json
{
  "date": "<DATE>",
  "isHeadline": <true|false>,
  "synthesis": {
    "slug": "<trend.slug>",
    "title": "<trend.title>",
    "deck": "<trend.deck>",
    "signal": "<trend.signal>",
    "sources": <trend.sources>,
    "one_line_thesis": "<trend.one_line_thesis>",
    "key_facts": <trend.key_facts>,
    "key_quotes": <trend.key_quotes>
  },
  "raw_research_excerpt": "<trend.raw_research_excerpt>",
  "voice_reference": "<VOICE_REFERENCE>"
}
```

Dispatch all subagents in a **single message with multiple Agent tool calls** so they run concurrently. Use:

- `subagent_type: general-purpose`
- `model: sonnet`
- `description`: `"Write article: <trend.slug>"`
- `prompt`: the full content of `pipeline/prompts/article-writer.md`, followed by `\n\n---\n\nINPUT:\n\n` + the JSON message, followed by `\n\nReturn only the JSON object specified in the Output Format section. No prose before or after.`

### Step 6 — Collect and validate

Each subagent returns a JSON object. For each result:

1. Strip any leading/trailing prose or ```json fences.
2. Parse as JSON. If parse fails, log the subagent's raw output to `pipeline/logs/<DATE>/<slug>.raw.txt` and mark that trend as failed.
3. Validate the response has `title`, `deck`, `body`, `council.bull`, `council.bear`, `council.builder`.
4. Validate council stances are three distinct strings (not empty, not identical).

If any trend failed, stop and report the failures. Do not write partial output — the pipeline re-runs cleanly.

### Step 7 — Write article files

For each successful writer output, assemble the article markdown file:

```
---
{
  "slug": "<trend.slug>",
  "date": "<DATE>",
  "title": "<writer.title>",
  "deck": "<writer.deck>",
  "signal": "<trend.signal>",
  "sources": <trend.sources>,
  "council": <writer.council>,
  "isHeadline": <trend.isHeadline>
}
---

<writer.body>
```

Frontmatter is JSON (matching the format the TS loader in `lib/load-issue.ts` expects). Use the Write tool to save to `content/articles/<trend.slug>.md`.

### Step 8 — Report

End with a short summary:

```
[write-articles] <DATE>: <N> articles written
  - <slug 1> (headline)
  - <slug 2>
  - <slug 3>
  ...
```

If any failed, list them with the failure reason. The runner will see a non-zero exit if you raise an error — only do that on actual failure.

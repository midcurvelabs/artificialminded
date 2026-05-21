---
{
  "slug": "god-mode-benchmark-16-tasks",
  "title": "God Mode Benchmark \u2014 16 Builder Tasks",
  "tldr": "Academic benchmarks (SWE-Bench, GPQA, MMMU) don't map to the work builders actually do. This is Rik's canonical 16-task schema across Execution, Operator, Writing, and Creative. Use it to evaluate any new model against the jobs that matter for vibe-coding + content work.",
  "cluster": "model-wars",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "God Mode Benchmark",
    "Builder Benchmark",
    "16 Task Benchmark"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://tokenmix.ai/blog/swe-bench-2026-claude-opus-4-7-wins"
    },
    {
      "id": 2,
      "url": "https://labs.scale.com/leaderboard/swe_bench_pro_public"
    },
    {
      "id": 3,
      "url": "https://helply.com/blog/chatgpt-5-2-vs-gemini-3-pro"
    },
    {
      "id": 4,
      "url": "https://artificialanalysis.ai/leaderboards/models"
    }
  ]
}
---

**Related:** what a solo builder should actually care about · [model skills breakdown](/compare/model-skills-breakdown) · [claude vs gpt](/compare/claude-vs-gpt)

## Why a new benchmark

Existing leaderboards answer "which model is smartest." Builders need to answer "which model ships." These are different questions. The 16 tasks below are drawn from real Rik workflows and map cleanly to what ships in a week on `02_projects/`.

- **Academic saturation** — HumanEval is ~99% for all frontier models; uninformative.
- **Missing axes** — Nothing tests brief-to-concept or operator reliability well.
- **No brand-voice check** — Writing benchmarks test correctness, not voice.

## The 4 categories × 4 tasks

### Execution (build working software)

| # | Task | What "pass" looks like | Real benchmark to cross-reference |
|---|---|---|---|
| E1 | **CRUD app from spec** (React + DB, 1 entity, auth, deploy to Vercel) | Runs end-to-end, deploys, no manual fix-ups | Aider polyglot, SWE-Bench Verified [^1] |
| E2 | **Bug fix in real repo** (give it a 50k-LOC codebase, an issue, PR the fix) | PR passes CI on first push | SWE-Bench Pro [^2] |
| E3 | **Agent workflow** (multi-file MCP tool-use task, 20+ tool calls) | Completes without confabulation or loop | Internal / Agentic-eval benchmarks |
| E4 | **Live-data scrape + transform** (fetch API, clean, insert into Supabase) | Works, handles errors, retries | No public equivalent |

### Operator (complete real tasks in the world)

| # | Task | What "pass" looks like | Real benchmark |
|---|---|---|---|
| O1 | **Book a flight** via browser agent | Completes booking, captures confirmation | BrowseComp (OpenAI), Web Arena |
| O2 | **Research + shortlist 5 vendors** with pricing, docs links | All 5 verifiable, no hallucinated links | DeepResearch-eval |
| O3 | **Run a Claude Code session end-to-end** — analyze, plan, execute, verify | No halfway stops; passes /done criteria | Claude Code usage telemetry |
| O4 | **Triage a Gmail inbox** — label, draft replies, archive | >90% correct labeling + reply drafts | No public benchmark; GDPval-adjacent [^3] |

### Writing (long-form + platform-native)

| # | Task | What "pass" looks like | Real benchmark |
|---|---|---|---|
| W1 | **2000-word essay** in a specific brand voice, staying on tone | Blind reader can't tell it's AI; voice match | Brand-voice eval (internal) |
| W2 | **Tweet thread** (7 tweets, hook + reveal + CTA) | ≥1 "stopper" hook, no emojis, under 280 each | Engagement A/B (real) |
| W3 | **Cold outreach email** (personalized, 80-120 words) | Passes human "would-open?" test | Smartlead / Instantly reply rates |
| W4 | **YouTube script for 10-min video** (hook, chapters, CTAs) | Coherent arc, stays on brand | Internal pipeline |

### Creative (brief → concept)

| # | Task | What "pass" looks like | Real benchmark |
|---|---|---|---|
| C1 | **Landing page concept** (hero, 3 sections, CTA) | Converts better than current baseline | Internal A/B |
| C2 | **Product naming** — 20 options with rationale | ≥3 usable | Subjective |
| C3 | **Brief to 3 angles** (content angle generation) | Each angle has tension + distinctness | Claire skill output eval |
| C4 | **Visual prompt → Flux / Nano Banana** — describe an image that matches brand | Image usable without iteration | See flux became the builders choice midjourney stays the aesthete |

## Head-to-head — mapping to public benchmarks where possible

| Task | Closest public benchmark | Current leader |
|---|---|---|
| E1 | Aider polyglot | Claude Opus 4.7 |
| E2 | SWE-Bench Pro | Claude Opus 4.7 (64.3%) [^2] |
| E3 | TauBench / agentic evals | Claude Opus 4.7 |
| O1 | WebArena / BrowseComp | GPT-5.4 + Operator (OpenAI owns the browser surface) |
| O2 | DeepResearch evals | GPT-5.4 Deep Research mode |
| W1/W4 | Brand-voice blind test | Claude Opus 4.7 / Sonnet 4.6 (subjective consensus) |
| Coding composite | Artificial Analysis coding index | Claude Opus 4.7 (95.3%) [^4] |

## Scoring template

For each model, score each task 0-5. Total out of 80.

```
E1 E2 E3 E4 | O1 O2 O3 O4 | W1 W2 W3 W4 | C1 C2 C3 C4 | TOTAL
```

Power-user consensus (subjective, update as models ship):

| Model | Execution | Operator | Writing | Creative | Total /80 |
|---|---|---|---|---|---|
| Claude Opus 4.7 | 19 | 16 | 18 | 15 | **68** |
| GPT-5.4 Pro | 17 | **18** | 16 | 15 | 66 |
| Gemini 3.1 Pro | 15 | 14 | 14 | **16** | 59 |
| Claude Sonnet 4.6 | 17 | 14 | 17 | 14 | 62 |
| Kimi K2.6 | 16 | 11 | 12 | 11 | 50 |
| GPT-5.4 Mini | 13 | 13 | 13 | 12 | 51 |
| Haiku 4.5 | 13 | 12 | 14 | 11 | 50 |

`confidence: medium` — these are power-user estimates, not formal measurements. Re-score per quarter.

## How to use this

1. **Before picking a model** for a new project, rank the 16 tasks by relevance.
2. **Weight** by importance (vibe-coding-heavy → weight Execution 2×).
3. **Score candidate models** against the top 5 tasks for your project.
4. **Pick the winner + a cheap fallback** (Haiku 4.5 or DeepSeek V3.2 for routing).

## Editorial takeaway

Academic benchmarks measure the ceiling of capability. Rik's benchmark measures the floor of usefulness — which is what ships. Most builders are routing between 2-3 models anyway; the task here is to pick the 2-3 that cover the surface area of actual work.

## Confidence notes

- Score table is a synthesis, not a reproducible measurement. Treat as a starting anchor.
- C4 (visual prompt → image) depends on the downstream image model — score the LLM, not the image lab.
- Revisit when: new flagship ships, major agent runtime updates, or quarterly.

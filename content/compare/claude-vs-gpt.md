---
{
  "slug": "claude-vs-gpt",
  "title": "Claude vs GPT",
  "tldr": "GPT-5.5 (released Apr 23, 2026) now tops the Artificial Analysis Intelligence Index at **60**, with Claude Opus 4.7 and Gemini 3.1 Pro tied at **57**. Claude still leads coding (SWE-Bench Verified 87.6%) and agentic tasks; GPT leads generalist occupational work (GDPval) and has the consumer distribution. GPT-5.5 pricing is premium ($11.3 output / 1M, tier xhigh) \u2014 the real question remains job-fit, not \"which is smarter.\"",
  "cluster": "model-wars",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-24",
  "aliases": [
    "Claude vs GPT",
    "GPT vs Claude",
    "Opus vs GPT-5"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://artificialanalysis.ai/"
    },
    {
      "id": 2,
      "url": "https://tokenmix.ai/blog/swe-bench-2026-claude-opus-4-7-wins"
    },
    {
      "id": 3,
      "url": "https://www.nxcode.io/resources/news/gpt-5-4-complete-guide-features-pricing-models-2026"
    },
    {
      "id": 4,
      "url": "https://platform.claude.com/docs/en/about-claude/pricing"
    },
    {
      "id": 5,
      "url": "https://labs.scale.com/leaderboard/swe_bench_pro_public"
    },
    {
      "id": 6,
      "url": "https://helply.com/blog/chatgpt-5-2-vs-gemini-3-pro"
    },
    {
      "id": 7,
      "url": "https://www.getpanto.ai/blog/claude-ai-statistics"
    },
    {
      "id": 8,
      "url": "https://openrouter.ai/api/v1/models"
    }
  ]
}
---

**Related:** the claude model ladder is a cost capability dial · reasoning models changed the pricing curve · anthropic is winning enterprise by not chasing chatgpt · [openai vs anthropic](/compare/openai-vs-anthropic)

## Top-of-stack matchup

| | GPT-5.5 (xhigh) | Claude Opus 4.7 (max) | GPT-5.4 (xhigh / Pro) |
|---|---|---|---|
| **Released** | Apr 23, 2026 [^1] | Apr 16, 2026 [^2] | Mar 5, 2026 [^3] |
| **Artificial Analysis Intelligence Index** | **60** (leader) [^1] | **57** (Adaptive Reasoning, Max Effort) [^1] | **57** (xhigh) [^1] |
| **Context window** | 400K (est) confidence: medium | 1M tokens [^4] | 400K (GPT-5.4) / 200K (GPT-5) |
| **API price (per MTok)** | ~$11.3 out (xhigh tier) [^1]; input TBD | $5 in / $25 out [^4] | $2.50 in / $15 out (standard); $30 in / $180 out (Pro) [^3] |

::chart[intelligence-leaderboard]

## Benchmark grid (April 2026)

| Benchmark | GPT-5.5 | Claude Opus 4.7 | GPT-5.4 | Gemini 3.1 Pro |
|---|---|---|---|---|
| **AA Intelligence Index** | **60** [^1] | 57 [^1] | 57 [^1] | 57 [^1] |
| **SWE-Bench Verified** | TBD confidence: low | **87.6%** [^2] | 85.0% (Codex) [^2] | 80.6% [^2] |
| **SWE-Bench Pro (Scale)** | TBD confidence: low | **64.3%** [^5] | 55.6% (GPT-5.2) [^6] | 43.3% [^6] |
| **Artificial Analysis Coding Index** | TBD (new release) confidence: medium | 95.3% [^1] | ~92% (GPT-5.4) confidence: medium | 95.0% [^1] |
| **LM Arena Elo** | TBD confidence: low | **1504** [^1] | ~1490 confidence: medium | ~1488 |
| **GDPval (occupational)** | Strong, 2nd place | **Expert-level, +17.6pp over Gemini 3 Pro** [^6] | 3rd |
| **GPQA Diamond** | ~88% (Max Effort) confidence: medium | ~89% (Pro) confidence: medium | ~86% confidence: medium |
| **MMMU (multimodal)** | ~82% confidence: medium | ~84% confidence: medium | ~87% (leader) confidence: medium |
| **LiveBench (composite)** | Top 3 | Top 3 | Top 3 |
| **HumanEval** | Saturated (~99%) — no longer informative for frontier | Same | Same |

> **Note on older benchmarks:** HumanEval and even SWE-Bench Verified are closing in on saturation. 2026's informative benchmarks are SWE-Bench Pro, GDPval, Aider polyglot, and Artificial Analysis' composite. See [god mode benchmark 16 tasks](/compare/god-mode-benchmark-16-tasks) for Rik's canonical builder-task benchmark.

::chart[coding-grid]

## Coding strength — the cleanest gap

Claude has held the coding lead for 18 months running:

- **SWE-Bench Verified lead:** 87.6% vs 85% (+2.6pp) [^2]
- **SWE-Bench Pro lead:** 64.3% vs 55.6% (+8.7pp) — this is the bigger, more honest gap [^5]
- **Developer usage:** Claude Code ~$2.5B ARR by Mar 2026 [^7]; Codex has consulting-partner push but weaker grassroots
- **Agentic reliability:** Claude's longer-horizon tool use is the hidden moat — not visible in single-turn benchmarks

## Reasoning — o-series vs Claude extended thinking

| | OpenAI o-series (now GPT-5.4 reasoning modes) | Claude extended thinking |
|---|---|---|
| **Interface** | `reasoning_effort: low/medium/high` as a parameter | `thinking` as a dedicated mode, token budget controlled |
| **Price delta** | Reasoning tier ~6-10x base | Extended thinking included in price (Opus 4.7 only) |
| **Transparency** | Reasoning tokens hidden by default | Thinking tokens visible (can stream to user) |
| **Best for** | Math, logic, multi-step planning | Agentic workflows, long-context reasoning, code |

See reasoning models changed the pricing curve.

## Writing quality signals

Subjective but consistent from power users:

| | Claude | GPT |
|---|---|---|
| **Voice consistency** | Stronger default voice, more "adult" register | More fluent, but defaults to sycophantic / corporate |
| **Refusal rate** | Lower on legitimate asks; calibrated | Higher, with more hedging |
| **Long-form essay** | Wins on coherence at 5000+ words | Wins on flashy openings, loses at length |
| **Tone control** | Follows style guides precisely | Drifts back to default tone |
| **Marketing copy** | Good, slightly conservative | Good, more aggressive hooks |

This is directional, not benchmarked. `confidence: medium`.

## Multimodal

| | Claude Opus 4.7 | GPT-5.4 |
|---|---|---|
| **Image understanding** | Good, not leader | Good |
| **Image generation** | No native gen (partners: Flux, Nano Banana) | Native gen (gpt-image-1, DALL·E) |
| **Audio** | No native speech; third-party | Native voice (Realtime API), TTS |
| **Video understanding** | Limited | Limited |
| **Best multimodal model in 2026** | Neither — Gemini 3.1 Pro leads MMMU |

## Editorial takeaway — when to pick which

- **Pick Claude when:** coding, agents, long-context work, brand-voice-critical writing, tool-heavy workflows, anything where refusal-rate matters. Default choice for builders.
- **Pick GPT when:** you need native voice/image, consumer-facing product with ChatGPT brand halo, or GDPval-style occupational tasks (customer service, legal doc review, finance ops).
- **Pick neither** for cheap-token batch jobs — use Haiku 4.5, Gemini 2.5 Flash, or DeepSeek V3.2. See [price per 1m tokens](/compare/price-per-1m-tokens).

## Confidence notes

- GPT-5.5 (released Apr 23, 2026) is too new for most third-party benchmarks. Only the Artificial Analysis composite is scored; SWE-Bench / LM Arena / GDPval for 5.5 are TBD.
- GPT-5.5 input pricing is not yet on OpenRouter's public model catalog [^8]; artificialanalysis lists $11.3 output only.
- GPQA and MMMU exact numbers rotate with new evals; treat as directional.
- Writing quality comparison is qualitative consensus, not A/B tested at scale here.
- Pro-tier pricing for GPT-5.4 is high-variance depending on reasoning effort.

## Data sources

Primary leaderboards used for this comparison:
- **Artificial Analysis** — <https://artificialanalysis.ai/> (Intelligence Index, Coding Index, LM Arena, pricing)
- **OpenRouter Rankings** — <https://openrouter.ai/rankings> (actual developer usage by tokens)
- **OpenRouter Models API** — <https://openrouter.ai/api/v1/models> (authoritative input/output prices, context length)

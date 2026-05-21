---
{
  "slug": "model-ecosystem-via-openrouter",
  "title": "Model Ecosystem via OpenRouter (April 2026)",
  "tldr": "OpenRouter traffic has 4\u00d7 YoY to ~20T tokens/week. **Chinese open-weights models now eat 45%+ of that volume.** Anthropic is down to 15.4%, OpenAI to 8.1%. Usage rank is the opposite shape from revenue rank \u2014 builders route to whatever's cheap and capable, not to the leader.",
  "cluster": "model-wars",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "OpenRouter Rankings",
    "Model Usage Share",
    "Token Share 2026"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://www.digitalapplied.com/blog/openrouter-rankings-april-2026-top-ai-models-data"
    },
    {
      "id": 2,
      "url": "https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model"
    },
    {
      "id": 3,
      "url": "https://go.lightnode.com/tech/minimax-m2-vs-glm4.6-vs-kimi-k2-thinking"
    },
    {
      "id": 4,
      "url": "https://medium.com/@chewloongnian/i-tested-kimi-k2-6-2daa40001fd6"
    },
    {
      "id": 5,
      "url": "https://sacra.com/c/openai/"
    },
    {
      "id": 6,
      "url": "https://www.the-ai-corner.com/p/anthropic-30b-arr-passed-openai-revenue-2026"
    }
  ]
}
---

**Related:** deepseek broke the moat thesis · open weights in 2026 the real state · [open source vs closed models](/compare/open-source-vs-closed-models) · [price per 1m tokens](/compare/price-per-1m-tokens)

## Platform scale

| Metric | Value | Source |
|---|---|---|
| Total weekly throughput (Apr 2026) | ~20T+ tokens/week [^1] |
| YoY growth | ~4× (from ~5T/wk Apr 2025) [^1] |
| Chinese-origin model share | **>45%** [^1] |
| Anthropic share | 15.4% [^1] |
| OpenAI share | 8.1% [^1] |

## Top 10 models by weekly token share (Apr 2026)

| Rank | Model | Approx. weekly tokens | Origin | Why it's up |
|---|---|---|---|---|
| 1 | **MiMo-V2-Pro** | 4.65T (22.3% share) [^1] | Xiaomi | Free tier + good coding |
| 2 | **Qwen 3.6 Plus (free)** | 4.6T [^1] | Alibaba | Free on OpenRouter, near-frontier |
| 3 | **Qwen 3.6 Plus Preview** | 1.64T [^1] | Alibaba | Preview version also free |
| 4 | **Claude Sonnet 4.6** | ~1.3T confidence: medium | Anthropic | Default workhorse in builder apps |
| 5 | Qwen 3.6 Plus | ~1.1T [^1] | Alibaba | Paid tier |
| 6 | DeepSeek V4 / V3.2 | ~1T confidence: medium | DeepSeek | Cheapest capable |
| 7 | Kimi K2.6 | ~0.8T confidence: medium | Moonshot | New top open weights |
| 8 | GPT-5.4 / GPT-5.3-Codex | ~0.7T confidence: medium | OpenAI | Premium tier |
| 9 | GLM-5.1 | ~0.6T confidence: medium | Z.ai | Subscription-priced |
| 10 | Claude Haiku 4.5 | ~0.5T confidence: medium | Anthropic | Cheap-closed default |

> **Caveat:** OpenRouter's public rankings rotate daily. Exact ordering below #3 fluctuates. Screenshot-and-verify at [openrouter.ai/rankings](https://openrouter.ai/rankings) when citing for content.

## Weekly shifts — who surged, who dropped (last ~3 months)

### Surged

| Model | Driver |
|---|---|
| **Qwen 3.6 Plus (free)** | Alibaba pushed it free on OpenRouter — instant #1-2 spot swap |
| **Kimi K2.6** | Apr 20 release, top open weights [^2] |
| **MiniMax M2.7** | Mar 17 release, Vals AI 59.58% [^3] |
| **GLM-5.1** | $3/mo unlimited subscription model [^4] |
| **MiMo-V2-Pro** | Xiaomi's free-tier play |

### Dropped

| Model | Reason |
|---|---|
| **GPT-4.1 / older OpenAI** | Superseded by GPT-5.x; users migrate |
| **Gemini 2.5 Pro** | Held share but lost rank to free Chinese models |
| **Claude Opus 4.5/4.6** | Users migrating to 4.7 inside Anthropic; some moving to Sonnet 4.6 for cost |
| **Llama 3.x** | Largely replaced by Llama 4 + Qwen 3.5/3.6 |

## The real signal: usage ≠ revenue

| | Usage rank | Revenue rank |
|---|---|---|
| **OpenAI** | 8.1% of OpenRouter tokens | **#2 by ARR** (~$25B) [^5] |
| **Anthropic** | 15.4% | **#1 by ARR** ($30B) [^6] |
| **Alibaba (Qwen)** | ~30%+ combined | Tiny by direct-revenue |
| **DeepSeek / Moonshot / Z.ai** | Combined ~15%+ | Small direct revenue; subsidized |

**What this means:** OpenRouter shows where hobbyists, indie devs, and cost-sensitive apps route. Revenue reflects where enterprises and consumer subs lock in. The disconnect is the story — Chinese open weights are eating the **long tail of developer usage**, which historically predicts the next 2-year enterprise shift. See deepseek broke the moat thesis.

## Fastest-growing cohort shared trait

> The April 2026 rankings reveal a clear correlation between aggressive pricing and adoption velocity, with the five fastest-growing models offering either free access or pricing below $1 per million tokens. [^1]

This is the real pricing curve — the bottom of [price per 1m tokens](/compare/price-per-1m-tokens) is where volume lives.

## Editorial takeaway

- **If you run an AI app, don't trust vendor marketing — trust OpenRouter.** It's the closest thing to a real-world usage leaderboard.
- **The top of the usage chart is free Chinese models.** This is where hobbyists and indie prototypes live. Your competition is building on Qwen and Kimi.
- **The revenue chart and the usage chart are different games.** Enterprise pays for reliability + compliance (Anthropic/OpenAI); long tail uses what's cheapest.
- **Track weekly.** OpenRouter's rankings are a better AI-market real-time indicator than any stock ticker.

## Confidence notes

- Exact ranks #4-10 rotate daily — screenshot the current state when citing.
- Token-share numbers are aggregated from Digital Applied + OpenRouter public pages; we don't have API-level audit access.
- The >45% Chinese-model share is striking but verified across multiple reporting sources (Global Times, People's Daily, Digital Applied) — `confidence: high`.

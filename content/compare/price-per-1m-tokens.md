---
{
  "slug": "price-per-1m-tokens",
  "title": "Price per 1M Tokens \u2014 April 2026 Grid",
  "tldr": "Frontier closed models cluster around $3-5 in / $15-25 out per MTok. The \"cheap tier\" (DeepSeek V3.2, Haiku 4.5, Gemini Flash, Llama via Groq) is 5-30\u00d7 cheaper. Reasoning modes add another 3-10\u00d7 multiplier on top. Cache + batch can cut effective cost another 50-90%.",
  "cluster": "model-wars",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Pricing Grid",
    "Price Per Million Tokens",
    "LLM API Cost Grid"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://platform.claude.com/docs/en/about-claude/pricing"
    },
    {
      "id": 2,
      "url": "https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag"
    },
    {
      "id": 3,
      "url": "https://www.nxcode.io/resources/news/gpt-5-4-complete-guide-features-pricing-models-2026"
    },
    {
      "id": 4,
      "url": "https://pricepertoken.com/pricing-page/model/openai-gpt-5"
    },
    {
      "id": 5,
      "url": "https://gptbreeze.io/blog/gpt-5-nano-pricing-guide/"
    },
    {
      "id": 6,
      "url": "https://pricepertoken.com/pricing-page/model/google-gemini-2.5-pro"
    },
    {
      "id": 7,
      "url": "https://mem0.ai/blog/xai-grok-api-pricing"
    },
    {
      "id": 8,
      "url": "https://www.nxcode.io/resources/news/deepseek-api-pricing-complete-guide-2026"
    },
    {
      "id": 9,
      "url": "https://www.tldl.io/resources/deepseek-api-pricing"
    },
    {
      "id": 10,
      "url": "https://pricepertoken.com/pricing-page/provider/deepseek"
    },
    {
      "id": 11,
      "url": "https://medium.com/@chewloongnian/i-tested-kimi-k2-6-2daa40001fd6"
    },
    {
      "id": 12,
      "url": "https://www.atlascloud.ai/blog/guides/kimi-k2-6-vs-glm-5-1-vs-qwen-3-6-plus-vs-minimax-m2-7-coding-2026"
    },
    {
      "id": 13,
      "url": "https://apxml.com/posts/llama-4-system-requirements"
    },
    {
      "id": 14,
      "url": "https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits"
    }
  ]
}
---

**Related:** pricing and token economics of ai coding 2026 · reasoning models changed the pricing curve · [open source vs closed models](/compare/open-source-vs-closed-models)

## Full grid (USD per 1M tokens)

| Model | Input $ | Output $ | Context | Notes |
|---|---|---|---|---|
| **FRONTIER — CLOSED** | | | | |
| Claude Opus 4.7 | 5.00 | 25.00 [^1] | 1M | New tokenizer ~35% more tokens vs 4.6 [^2] |
| Claude Sonnet 4.6 | 3.00 | 15.00 [^1] | 1M | Default workhorse for most shops |
| Claude Haiku 4.5 | 1.00 | 5.00 [^1] | 200K | Best quality/$ in cheap-closed tier |
| GPT-5.4 (standard) | 2.50 | 15.00 [^3] | 400K | |
| GPT-5.4 Pro | 30.00 | 180.00 [^3] | 400K | Reasoning-heavy tier |
| GPT-5.4 Mini | ~0.40 | ~1.60 [^3] | 400K | |
| GPT-5 (original) | 0.63 | 5.00 [^4] | 200K | Cheaper, slightly older |
| GPT-4.1 | ~2.00 | ~8.00 confidence: medium | 1M | Legacy, being phased down |
| o4-mini | ~1.10 | ~4.40 confidence: medium | 200K | Reasoning, small |
| GPT-5 Nano | 0.05 | 0.40 [^5] | 128K | Dirt-cheap tier |
| Gemini 2.5 Pro | 1.00 | 10.00 [^6] | 1M | 2× input >200K tokens [^6] |
| Gemini 2.5 Pro (>200K ctx) | 2.50 | 15.00 [^6] | Long-context uplift | |
| Gemini 2.5 Flash | ~0.15 | ~0.60 confidence: medium | 1M | Cheap multimodal |
| Gemini 3.1 Pro Preview | Similar to 2.5 Pro confidence: medium | | 2M | |
| Grok 4 | 3.00 | 15.00 [^7] | 256K | |
| Grok 4.1 Fast | 0.20 | 0.50 [^7] | 256K | |
| **OPEN WEIGHTS (via API)** | | | | |
| DeepSeek V4 | 0.30 | 0.50 [^8] | 128K | Flagship, Mar 2026 |
| DeepSeek V3.2 | 0.14 | 0.28 [^9] | 128K | Cheapest frontier-adjacent |
| DeepSeek R1 (reasoning) | 0.55 | 2.19 [^10] | 128K | Reasoning tier |
| Qwen 3.5-397B (Alibaba) | ~0.50 | ~1.50 confidence: medium | 1M+ | |
| Qwen 3.5-35B-A3B | ~0.10 | ~0.30 confidence: medium | 800K | |
| Llama 4 Maverick (Groq) | ~0.19 | ~0.60 confidence: medium | 1M | Fastest inference |
| Llama 4 Scout (Groq) | ~0.10 | ~0.30 confidence: medium | 10M | Huge context, cheap |
| Llama 4 Maverick (Together) | ~0.30 | ~0.90 confidence: medium | 1M | |
| Kimi K2.6 | ~0.50 | ~2.50 confidence: medium | 256K | Top open-weights |
| GLM-5.1 | $3/mo subscription model [^11] | | 256K | Unusual pricing |
| MiniMax M2.7 | 0.30 | ~1.20 [^12] | 256K | |
| gpt-oss 120B (Together) | ~0.15 | ~0.60 confidence: medium | 128K | |

## Context window matters

Pricing is only half the story — context changes effective cost:

| Feature | Impact |
|---|---|
| **1M+ context at flat price** | Claude Opus 4.7, Sonnet 4.6 [^1]; Gemini 2.5 Pro **doubles** above 200K |
| **10M context** | Llama 4 Scout (unique; useful for full-repo work) [^13] |
| **Reasoning tokens billed** | Both OpenAI and Anthropic charge for hidden thinking tokens — factor 3-10× for reasoning modes |

## Cache & batch pricing (effective cost reducers)

| Provider | Cache discount | Batch discount |
|---|---|---|
| **Anthropic** | Up to **90%** on prompt cache reads [^1] | 50% batch |
| **OpenAI** | ~90% on cached input (e.g. GPT-5.2 $1.75→$0.175) [^14] | 50% batch |
| **Google** | Context caching available; similar discount | Batch via Vertex |
| **DeepSeek** | Cache hit ~75% discount | — |

**Practical rule of thumb:** if your workload has a stable system prompt and repeated tool definitions (i.e., most agent work), assume cache brings effective input cost down to ~10% of sticker. This is the single biggest unlock for Claude Code-style workflows. See pricing and token economics of ai coding 2026.

## Visual: cost ladders

```
$0.05 in     GPT-5 Nano
$0.10 in     Llama 4 Scout / Qwen 3.5-35B
$0.14 in     DeepSeek V3.2
$0.30 in     DeepSeek V4 / MiniMax M2.7
$0.63 in     GPT-5 original
$1.00 in     Haiku 4.5 / Gemini 2.5 Pro
$2.50 in     GPT-5.4 / Gemini long-ctx
$3.00 in     Sonnet 4.6 / Grok 4
$5.00 in     Opus 4.7
$30.00 in    GPT-5.4 Pro
```

## Editorial takeaway — pricing strategy for builders

- **Start on Sonnet 4.6 or GPT-5.4.** Don't optimize pricing before you have product.
- **Batch & cache before you switch models.** 90% cache discount is a bigger lever than a model swap.
- **Use Haiku 4.5 or DeepSeek V3.2 for background tasks.** Summarization, classification, routing — no reason to pay frontier prices.
- **Reserve Opus 4.7 / GPT-5.4 Pro for the 5% of calls that need it.** See the claude model ladder is a cost capability dial.
- **Watch context uplift.** Gemini's 2× above 200K can silently 3× your bill if you're shoving a whole repo in.

## Confidence notes

- All `confidence: medium` rows are cross-vendor aggregator listings, not direct vendor pricing pages.
- Batch discounts can change tier-by-tier; verify on vendor page before committing.
- Cache pricing is the single most under-measured line item in most AI budgets — audit it.

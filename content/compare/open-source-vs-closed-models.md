---
{
  "slug": "open-source-vs-closed-models",
  "title": "Open-Source vs Closed Models",
  "tldr": "Kimi K2.6 and GLM-5.1 are within ~3 points of frontier closed models on coding benchmarks \u2014 the capability moat is essentially gone. What's left is UX, agent runtimes, and enterprise trust. Self-hosting a frontier-class MoE still takes 4-8\u00d7 H100s for the big ones; Qwen 3.5 Medium runs on a single H100.",
  "cluster": "model-wars",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Open vs Closed",
    "Open Weights 2026",
    "OSS vs Frontier"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://tokenmix.ai/blog/swe-bench-2026-claude-opus-4-7-wins"
    },
    {
      "id": 2,
      "url": "https://medium.com/byte-sized-ai/metas-llama-4-scout-maverick-and-behemoth-a-new-era-in-scalable-multimodal-ai-1a2c8c6f2cd8"
    },
    {
      "id": 3,
      "url": "https://serenitiesai.com/articles/llama-4-behemoth-maverick-scout-review-2026"
    },
    {
      "id": 4,
      "url": "https://apxml.com/posts/llama-4-system-requirements"
    },
    {
      "id": 5,
      "url": "https://venturebeat.com/technology/alibabas-new-open-source-qwen3-5-medium-models-offer-sonnet-4-5-performance"
    },
    {
      "id": 6,
      "url": "https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model"
    },
    {
      "id": 7,
      "url": "https://llm-stats.com/models/kimi-k2.6"
    },
    {
      "id": 8,
      "url": "https://www.latent.space/p/ainews-moonshot-kimi-k26-the-worlds"
    },
    {
      "id": 9,
      "url": "https://www.nxcode.io/resources/news/deepseek-api-pricing-complete-guide-2026"
    },
    {
      "id": 10,
      "url": "https://www.atlascloud.ai/blog/guides/kimi-k2-6-vs-glm-5-1-vs-qwen-3-6-plus-vs-minimax-m2-7-coding-2026"
    },
    {
      "id": 11,
      "url": "https://www.tldl.io/resources/deepseek-api-pricing"
    },
    {
      "id": 12,
      "url": "https://pricepertoken.com/pricing-page/provider/deepseek"
    },
    {
      "id": 13,
      "url": "https://medium.com/@chewloongnian/i-tested-kimi-k2-6-2daa40001fd6"
    },
    {
      "id": 14,
      "url": "https://platform.claude.com/docs/en/about-claude/pricing"
    },
    {
      "id": 15,
      "url": "https://www.nxcode.io/resources/news/gpt-5-4-complete-guide-features-pricing-models-2026"
    },
    {
      "id": 16,
      "url": "https://pricepertoken.com/pricing-page/model/google-gemini-2.5-pro"
    }
  ]
}
---

**Related:** open weights in 2026 the real state · deepseek broke the moat thesis · [claude vs gpt](/compare/claude-vs-gpt) · the frontier is a three horse race

## Capability tier grid

| Model | License | Params (total / active) | Capability tier | Context |
|---|---|---|---|---|
| **Claude Opus 4.7** | Closed | Undisclosed | Frontier (SWE 87.6%) [^1] | 1M |
| **GPT-5.4** | Closed | Undisclosed | Frontier | 400K |
| **Gemini 2.5 / 3.1 Pro** | Closed | Undisclosed | Frontier | 1M–2M |
| **Llama 4 Behemoth** | Open (Llama license) | 2T / ~288B active [^2] | Not yet released as of Apr 2026 [^3] | — |
| **Llama 4 Maverick** | Open (Llama license) | 400B / 17B active, 128 experts [^4] | Near-frontier | 1M |
| **Llama 4 Scout** | Open (Llama license) | 109B / 17B active, 16 experts [^4] | Strong mid-tier | **10M** (record) |
| **Qwen 3.5-397B-A17B (flagship)** | Apache 2.0 [^5] | 397B / 17B active | Near-frontier (Sonnet 4.5-class per VB) [^5] | 1M+ |
| **Qwen 3.5-35B-A3B** | Apache 2.0 | 35B / 3B active | Mid-tier, laptop-runnable | 800K+ |
| **Kimi K2.6** | Modified MIT [^6] | 1T / 32B active [^7] | **Leading open weights** — AA Index 54 [^6] | 256K |
| **GLM-5.1** | MIT [^8] | 754B total (trained on Ascend) | Top open on SWE-Bench Verified 77.8% [^8] | 256K |
| **DeepSeek V4** | Open (DeepSeek license) | MoE, undisclosed params | Frontier-class [^9] | 128K |
| **DeepSeek R1 (reasoning)** | Open | MoE | Top reasoning OSS | 128K |
| **MiniMax M2.7** | Open weights | ~230B / 10B active [^10] | SWE-Pro 56.2% [^10] | 256K |
| **gpt-oss (OpenAI)** | Apache 2.0 | 120B / 20B active (variants) | Mid-tier open | 128K |

> **Note:** "DeepSeek V3/R2" as originally scoped — R2 is rumored (~1.2T MoE) but not publicly released as of Apr 2026. DeepSeek V4 is the current flagship. `confidence: medium` on V4 capability claim.

## Cost per 1M tokens (API providers for open models)

| Model | Input | Output | Provider |
|---|---|---|---|
| **DeepSeek V4** | $0.30 | $0.50 [^9] | DeepSeek direct |
| **DeepSeek V3.2** | $0.14 | $0.28 [^11] | DeepSeek direct |
| **DeepSeek R1** | $0.55 | $2.19 [^12] | DeepSeek direct |
| **Kimi K2.6** | ~$0.50 | ~$2.50 confidence: medium | Moonshot, via OpenRouter |
| **GLM-5.1** | Low (subscription $3/mo via Z.ai) [^13] | — | Z.ai |
| **MiniMax M2.7** | $0.30 | ~$1.20 [^10] | Atlas Cloud, MiniMax |
| **Qwen 3.5-397B** | Free on Qwen API (rate-limited) / low on Alibaba Cloud | — | Alibaba, OpenRouter |
| **Llama 4 Maverick** | ~$0.19 / $0.60 | | Groq, Together, Fireworks |
| **Llama 4 Scout** | ~$0.10 / $0.30 | | Groq, Together |
| **Closed frontier (for comparison)** | | | |
| Claude Opus 4.7 | $5.00 | $25.00 [^14] | Anthropic |
| Claude Sonnet 4.6 | $3.00 | $15.00 [^14] | Anthropic |
| GPT-5.4 | $2.50 | $15.00 [^15] | OpenAI |
| Gemini 2.5 Pro | $1.00 | $10.00 [^16] | Google |

## Self-hosting feasibility

| Model | Minimum VRAM | Realistic hardware | Vibe |
|---|---|---|---|
| **Qwen 3.5-35B-A3B** | ~24GB @ Q4 | 1× RTX 4090 / 5090 | Laptop-hackable |
| **Llama 4 Scout** | **55GB @ INT4** (1× H100) [^4] | 1× H100 | Prosumer |
| **Llama 4 Scout FP8** | 110GB (2× H100) [^4] | 2× H100 | Small server |
| **Llama 4 Maverick** | 8× H100 minimum [^4] | Server rack | Enterprise only |
| **Llama 4 Behemoth** | Not public; est. 16× H100 confidence: low | Hyperscaler | Not yet released |
| **Kimi K2.6 (1T MoE)** | 8× H100 @ FP8 est. | Server cluster | Lab-only |
| **GLM-5.1 (754B)** | 8-16× accelerators | Lab/hyperscaler | Lab-only |
| **DeepSeek V4** | 8× H100 est. | Server cluster | Lab-only |
| **gpt-oss 120B** | ~80GB (1× H200) | Single big card | Prosumer |

## Commercial license terms

| Model | License | Commercial use | Notes |
|---|---|---|---|
| **Llama 4 (all)** | Llama License | Yes, <700M MAU cap | Same cap as Llama 3 |
| **Qwen 3.5 Medium series** | Apache 2.0 [^5] | Unrestricted | Cleanest open license at the frontier |
| **Qwen 3.5 flagship (397B)** | Permissive (check per-release) | Likely Apache or Qwen license | Confirm per release |
| **Kimi K2.6** | Modified MIT [^6] | Yes, with attribution/use-case carveouts | Near-MIT |
| **GLM-5.1** | MIT [^8] | Unrestricted | Cleanest among Chinese labs |
| **DeepSeek V4 / R1** | DeepSeek License | Yes, with restrictions | Similar to Llama license |
| **gpt-oss** | Apache 2.0 | Unrestricted | OpenAI's first true open release |
| **MiniMax M2.7** | Open weights, MiniMax license | Yes with carveouts | Check per-model |

## Editorial takeaway — when open wins

- **Use open when:** you need weights for fine-tuning, air-gapped deploy, sovereign-compute, or unit-economics at scale (10M+ tokens/day workloads). Pick **Qwen 3.5 Medium** for prosumer, **Llama 4 Maverick** for enterprise, **DeepSeek V4** for reasoning.
- **Use closed when:** you want the last 3 points of capability, tool-use reliability, built-in agent runtime (Claude Code), or regulated-industry compliance.
- **The moat in 2026 is not weights.** See deepseek broke the moat thesis. It's UX, agent runtimes, distribution, and trust — which all four frontier labs (plus Claude Code, Gemini Workspace, GPT Apps) now compete on.

## Confidence notes

- Llama 4 Behemoth capability tier is vendor-claimed pre-release; `confidence: low`.
- Qwen 3.5 flagship license status per-SKU varies — verify at HuggingFace page.
- DeepSeek V4 positioned as flagship in Mar 2026; full benchmark suite still being independently verified.

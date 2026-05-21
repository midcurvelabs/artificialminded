---
{
  "slug": "model-skills-breakdown",
  "title": "Model Skills Breakdown \u2014 18 Models \u00d7 6 Dimensions",
  "tldr": "No model wins all six dimensions. Opus 4.7 wins coding + writing. GPT-5.4 wins generalist + multimodal. Gemini 3.1 Pro wins vision + context. Groq-hosted Llama wins speed. Pick the job, then the model.",
  "cluster": "model-wars",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Model Skills Matrix",
    "LLM Capability Grid",
    "Pick-a-Model Matrix"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://tokenmix.ai/blog/swe-bench-2026-claude-opus-4-7-wins"
    },
    {
      "id": 2,
      "url": "https://apxml.com/posts/llama-4-system-requirements"
    },
    {
      "id": 3,
      "url": "https://www.latent.space/p/ainews-moonshot-kimi-k26-the-worlds"
    },
    {
      "id": 4,
      "url": "https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model"
    },
    {
      "id": 5,
      "url": "https://www.atlascloud.ai/blog/guides/kimi-k2-6-vs-glm-5-1-vs-qwen-3-6-plus-vs-minimax-m2-7-coding-2026"
    },
    {
      "id": 6,
      "url": "https://artificialanalysis.ai/leaderboards/models"
    }
  ]
}
---

**Related:** [claude vs gpt](/compare/claude-vs-gpt) · [open source vs closed models](/compare/open-source-vs-closed-models) · [price per 1m tokens](/compare/price-per-1m-tokens)

## Scoring rubric (A–F)

| Grade | Meaning |
|---|---|
| **A** | Top-2 in public leaderboards in this dimension |
| **B** | Top-5, strong daily driver |
| **C** | Competent, not the pick |
| **D** | Weak, use only for specific reasons |
| **F** | Avoid for this dimension |

Dimensions: **Coding** (SWE-Bench Pro + Aider) · **Reasoning** (GPQA, MATH, AA Reasoning Index) · **Vision** (MMMU, Vibe-Eval) · **Writing** (long-form coherence + tone control) · **Context** (usable context window) · **Speed** (tokens/sec at default provider)

## The matrix

| Model | Coding | Reasoning | Vision | Writing | Context | Speed |
|---|---|---|---|---|---|---|
| **Claude Opus 4.7** | **A** (SWE 87.6%) [^1] | A | B | **A** | A (1M) | C |
| **Claude Sonnet 4.6** | A (~83% SWE) | A | B | A | A (1M) | B |
| **Claude Haiku 4.5** | B | B | C | B | B (200K) | A |
| **GPT-5.4 (Pro/xhigh)** | A (85%) [^1] | **A** (AA 57) | A | A | B (400K) | C |
| **GPT-5.4 Mini** | B | B | B | B | B | B |
| **GPT-5 Nano** | D | D | C | C | C | A |
| **Gemini 3.1 Pro** | B (80.6%) [^1] | A | **A** (MMMU leader) | B | **A** (2M) | B |
| **Gemini 2.5 Pro** | B | A | A | B | A (1M) | B |
| **Gemini 2.5 Flash** | C | B | B | C | A (1M) | A |
| **Grok 4** | B | B | C | C | A (256K) | B |
| **Grok 4.1 Fast** | C | C | D | C | A (256K) | A |
| **Llama 4 Maverick** | B | B | B | C | A (1M) | A (on Groq) |
| **Llama 4 Scout** | C | C | C | D | **A** (10M) [^2] | A (on Groq) |
| **DeepSeek V4** | B | B | D (text-heavy) | C | B (128K) | B |
| **DeepSeek R1** | B | **A** (reasoning) | D | C | B (128K) | C |
| **Qwen 3.5-397B-A17B** | B | B | C | C | A (1M+) | B |
| **GLM-5.1** | A (77.8% open lead) [^3] | B | C | C | B (256K) | B |
| **Kimi K2.6** | **A** (80.2% SWE, 58.6% SWE-Pro) [^4] | B | C | C | B (256K) | B |
| **MiniMax M2.7** | B (SWE-Pro 56.2%) [^5] | B | C | C | B (256K) | B |

## Top-pick per dimension

| Dimension | Winner | Runner-up | Cheap pick |
|---|---|---|---|
| **Coding** | Claude Opus 4.7 | GPT-5.3-Codex | Kimi K2.6 / GLM-5.1 |
| **Reasoning** | GPT-5.4 xhigh / Opus 4.7 (tied, AA 57) [^6] | Gemini 3.1 Pro | DeepSeek R1 |
| **Vision** | Gemini 3.1 Pro (MMMU lead) | GPT-5.4 | Gemini 2.5 Flash |
| **Writing** | Claude Opus 4.7 / Sonnet 4.6 | GPT-5.4 | Haiku 4.5 |
| **Context window** | Llama 4 Scout (10M) | Gemini 3.1 Pro (2M) / Claude 1M | Qwen 3.5 (1M+) |
| **Speed** | Mercury 2 (716 t/s) [^6] / Llama 4 on Groq | Haiku 4.5 / Gemini Flash | Grok 4.1 Fast |

## Notes on scoring

- **Speed grades assume default hosted endpoint.** Llama 4 on Groq is A-tier; same model on Azure ML is B-tier. Provider matters as much as model.
- **Writing is qualitative.** Anchored to blind A/B feedback from power users — not a formal benchmark.
- **Vision grades** weight MMMU and Vibe-Eval equally. Text-heavy OCR is a separate axis (Gemini also leads).
- **"Context" grade rewards usable context**, not just stated max. Lost-in-the-middle failures downgrade.

## Editorial takeaway — pick-by-job cheatsheet

| Job | Pick |
|---|---|
| Full-stack coding agent | Claude Opus 4.7 (Claude Code) |
| Code review at scale | Sonnet 4.6 + Haiku 4.5 routing |
| Full-repo refactor (10M+ lines of ctx) | Llama 4 Scout on Groq |
| Multimodal analysis / video | Gemini 3.1 Pro |
| Voice-first consumer app | GPT-5.4 Realtime |
| Long-form essay / newsletter | Opus 4.7 or Sonnet 4.6 |
| Customer-support bot (cheap + good) | Haiku 4.5 or DeepSeek V3.2 |
| Research-agent with reasoning | GPT-5.4 xhigh or DeepSeek R1 |
| Self-hosted / sovereign | Qwen 3.5-397B or GLM-5.1 |
| Fastest inference | Llama 4 on Groq or Mercury 2 |

## Confidence notes

- A–F grades are the author's synthesis of multiple benchmark sources + power-user consensus. Directional, not exact.
- Vision grades for models without recent MMMU runs (DeepSeek V4, Kimi K2.6) are provisional.
- Matrix will rotate; revisit monthly.

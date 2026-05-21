---
{
  "slug": "tesla-dojo-vs-nvidia",
  "title": "Tesla Dojo vs Nvidia \u2014 Has Dojo actually made Nvidia obsolete at Tesla?",
  "tldr": "",
  "cluster": "elon-stack",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Dojo vs Nvidia",
    "Tesla AI chip"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://www.nextbigfuture.com/2025/03/nvidia-chip-roadmap-b200-rubin-and-beyond-versus-tesla-dojo-2-3-and-4.html"
    },
    {
      "id": 2,
      "url": "https://en.wikipedia.org/wiki/Tesla_Dojo"
    },
    {
      "id": 3,
      "url": "https://modal.com/blog/h100-and-h200-vs-b100-and-b200"
    },
    {
      "id": 4,
      "url": "https://www.yeslak.com/blogs/tesla-news-insights/tesla-to-mass-produce-ai5-in-2026-rivaling-nvidia-s-30k-chip"
    },
    {
      "id": 5,
      "url": "https://semianalysis.com/2023/06/27/tesla-ai-capacity-expansion-h100/"
    },
    {
      "id": 6,
      "url": "https://www.nextbigfuture.com/2024/08/tesla-has-4-exaflops-of-dojo-or-at-least-10-dojo-versus-nvidia-ai-chips.html"
    }
  ]
}
---

> **TL;DR.** No. Dojo 2 is in early volume production in 2026 and is roughly 10× Dojo 1 (~3–4 PFLOPS FP8). But **the majority of Tesla's training compute is still Nvidia H100/H200/B200**. Estimates put Dojo at **~3–10% of Tesla's total AI flops** in 2026. Dojo is a vertical-integration hedge, not a replacement.

## Chip-level specs

| Chip | Vendor | Peak FLOPS | Memory | Status (Apr 2026) | Workload |
|---|---|---|---|---|---|
| Dojo D1 | Tesla | ~362 TFLOPS BF16, ~22 TFLOPS FP32 | 440 MB SRAM/tile | Shipped 2022–2024, limited | FSD training |
| **Dojo 2 (D2)** | Tesla | ~3.6 PFLOPS FP8 (est.) | ~HBM3-class | **Early volume 2026** | FSD + Optimus training |
| Dojo 3 | Tesla | 10× D2 (target) | TBD | Late 2026 / 2027 | Future |
| H100 | Nvidia | 2 PFLOPS FP16 / 4 PFLOPS FP8 | 80GB HBM3 | Mass deployed | General AI training |
| H200 | Nvidia | ~4 PFLOPS FP8 | 141GB HBM3e | Mass deployed | General AI training |
| **B200** | Nvidia | 9 PFLOPS FP4 / ~4.5 PFLOPS FP8 | 192GB HBM3e | **Shipping 2025–2026** | Frontier training |
| AI5 | Tesla (in-car) | TBD | TBD | Mass production 2026 | Inference in vehicle |

[^1]
[^2]
[^3]
[^4]

## Tesla's actual compute mix (Apr 2026)

| Bucket | Approx share | Notes |
|---|---|---|
| Nvidia H100 | ~50% | ~40–50k units in Tesla DCs |
| Nvidia H200 / GB200 | ~30% | New builds in Texas + Austin |
| Dojo D1/D2 | ~3–10% | Semianalysis + NextBigFuture estimates |
| Other (AMD, Google TPU) | small | Mostly experimental |

[^5]
[^6]

The math: Tesla has >4 exaflops of Dojo compute at peak claim, but has >40 exaflops of Nvidia-sourced compute. Even the optimistic Dojo share is under 10%.

## The vertical-integration argument

**Bullish case for Dojo:**
- Custom silicon for Tesla's specific video-transformer workload; higher perf/watt on FSD training than general-purpose Nvidia.
- Removes Tesla's single-vendor dependency on Nvidia (strategic, not just cost).
- AI5 chip for inference-in-vehicle moves car-side compute in-house.

**Bearish case:**
- Every other Nvidia competitor (Google TPU, AWS Trainium, Meta MTIA) has the same pitch; nobody except maybe TPU has closed the software-ecosystem gap.
- Nvidia's B200 jumped the performance bar *after* Dojo 2 taped out. Dojo 3 target (2026–2027) is chasing Rubin.
- CUDA moat is real. Tesla ships Dojo only for its own workloads — it's not a product, and that limits dev-ecosystem pull.

## Where Dojo is actually used

1. **FSD video pre-training** — its native workload, where sparse video-transformer throughput matters most.
2. **Optimus policy training** — shared backbone with FSD.
3. **NOT used for** general LLM pre-training at xAI (Colossus is all-Nvidia), multi-modal foundation models, or inference at scale.

## Editorial take (Rik)

Dojo is a **hedge and a narrative**, not a Nvidia-killer. The honest read: Tesla bought in-house silicon as insurance against Nvidia pricing and allocation — reasonable at fleet scale, but it hasn't changed the dependency picture. Musk's "Dojo replaces Nvidia" claims have been walked back several times. For anyone forecasting Nvidia demand: Tesla is not the cautionary tale; Google TPU is. Watch **AI5 in-car volume** as the real tell — that's where Tesla can actually ship its own silicon at scale without Nvidia ecosystem drag.

## Confidence

Medium. Chip specs are well-sourced. Share-of-compute is estimated (Tesla doesn't publish), but multiple independent analysts converge on "Dojo is a minority share." Dojo 3 timing is speculative.

## See also

- elon ai empire data flywheels
- xai vs openai
- the ai capex bubble debate honest read
- _MOC

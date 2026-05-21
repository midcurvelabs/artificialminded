---
{
  "slug": "nvidia-vs-custom-silicon",
  "title": "Nvidia vs. Custom Silicon",
  "tldr": "",
  "cluster": "compute-race",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "nvidia vs custom silicon",
    "tpu vs gpu",
    "trainium vs h100"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://intuitionlabs.ai/articles/nvidia-data-center-gpu-specs"
    },
    {
      "id": 2,
      "url": "https://www.spheron.network/blog/nvidia-b200-complete-guide/"
    },
    {
      "id": 3,
      "url": "https://www.thundercompute.com/blog/nvidia-b200-pricing"
    },
    {
      "id": 4,
      "url": "https://jax-ml.github.io/scaling-book/tpus/"
    },
    {
      "id": 5,
      "url": "https://cloud.google.com/blog/products/compute/trillium-sixth-generation-tpu-is-in-preview"
    },
    {
      "id": 6,
      "url": "https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the"
    },
    {
      "id": 7,
      "url": "https://aws.amazon.com/ec2/instance-types/trn2/"
    },
    {
      "id": 8,
      "url": "https://www.anthropic.com/news/anthropic-amazon-compute"
    },
    {
      "id": 9,
      "url": "https://ai.meta.com/blog/next-generation-meta-training-inference-accelerator-AI-MTIA/"
    },
    {
      "id": 10,
      "url": "https://about.fb.com/news/2026/03/expanding-metas-custom-silicon-to-power-our-ai-workloads/"
    },
    {
      "id": 11,
      "url": "https://techcrunch.com/2025/09/02/tesla-dojo-the-rise-and-fall-of-elon-musks-ai-supercomputer/"
    },
    {
      "id": 12,
      "url": "https://dolphinstudios.co/comparing-the-ai-chips-nvidia-h100-amd-mi300/"
    },
    {
      "id": 13,
      "url": "https://newsletter.semianalysis.com/p/amd-advancing-ai-mi350x-and-mi400-ualoe72-mi500-ual256"
    }
  ]
}
---

**TL;DR.** The CUDA moat is cracking, but only for hyperscalers running their own workloads on their own chips — Google on TPU v6/v7, AWS on Trainium 2/3, Meta on MTIA. For everyone else (labs, startups, anyone renting compute), Nvidia still owns the stack; AMD finally has a real answer with MI355X/MI400. Tesla folded Dojo in 2025. The real question in 2026 isn't "is CUDA dead?" — it's "how many workloads can you fit inside a walled garden before portability costs more than lock-in?"

## Chip-by-chip comparison (April 2026)

| Chip | Vendor | Memory | Bandwidth | Peak perf | Workloads | Notes |
|---|---|---|---|---|---|---|
| **H100 SXM** | Nvidia | 80GB HBM3 | 3.35 TB/s | ~2 PFLOPS FP8 | Training + inference, universal | Still the workhorse; $25-30k [^1] |
| **H200** | Nvidia | 141GB HBM3e | 4.8 TB/s | ~4 PFLOPS FP8 | Training + inference | H100 successor; same CUDA path [^2] |
| **B200** | Nvidia | 192GB HBM3e | 8 TB/s | 9 PFLOPS FP4, 20 PF FP8 | Training + inference | 1000W; $30-50k; sold out through mid-2026 [^3] |
| **GB200 NVL72** | Nvidia | 13.4TB per rack | 8 TB/s per GPU | 1.4 ExaFLOPS FP4 per rack | Training frontier models | Grace CPU + 2x B200; rack-scale unit |
| **TPU v5p** | Google | 95GB HBM | 2.76 TB/s | 459 TFLOPS bf16 | Gemini training | 8,960-chip pod = 460 PFLOPS [^4] |
| **TPU v6 Trillium** | Google | 32GB HBM | 1.6 TB/s | ~918 TFLOPS bf16 | Gemini 2/3 training + inference | 4.7x compute vs v5e; 2x FLOPs vs v5p at lower power [^5] |
| **TPU v7 (Ironwood)** | Google | — | — | — | Gemini 3-class | Announced, Semianalysis calls it "900lb gorilla" [^6] |
| **Trainium 2** | AWS | 96GB HBM3 | — | 20.8 PF FP8 (16-chip node); UltraServer 83.2 PF FP8 (64 chips) [^7] | Claude training (Anthropic); Project Rainier 500k chips | Custom NeuronLink fabric |
| **Trainium 3** | AWS | — | — | 362 PF MXFP8 per server; ~2x Trainium 2 | Next-gen Claude workloads | Announced Dec 2025 [^8] |
| **MTIA 2i** | Meta | 256MB SRAM + LPDDR | 2.7 TB/s SRAM | 708 TOPS INT8 w/ sparsity | Ranking + recs inference (not training) | 5nm, 90W, $-efficient for inference [^9] |
| **MTIA 300/400/450/500** | Meta | — | — | — | Training (MTIA 300) + GenAI inference (400-500) | Broadcom partnership, 1 GW deployment targeted [^10] |
| **Dojo D1/D2** | Tesla | — | — | — | FSD training | **Killed Aug 2025** — Musk called D2 "evolutionary dead end"; pivoting to Samsung AI5/AI6 [^11] |
| **MI300X** | AMD | 192GB HBM3 | 5.3 TB/s | 1.3 PF FP16 dense, 2.6 PF w/ sparsity | Inference (strong), training (CUDA moat hurts) | 30% more FP8 than H100 [^12] |
| **MI325X** | AMD | 256GB HBM3e | 6 TB/s | — | H200 competitor | 40% higher throughput vs H200 in AMD bench |
| **MI355X** (CDNA 4) | AMD | 288GB HBM3e | 8 TB/s | ~4.6 PF FP8, 20 PF FP4/FP6 (~2x B200 at FP4/FP6) | Blackwell competitor | Shipping 2025 [^13] |
| **MI400** (CDNA Next) | AMD | — | — | — | 2026 Helios rack-scale (72 GPU scale-up) | Direct GB200 NVL72 competitor |

## Is the CUDA moat cracking? Honest read.

**Yes — for hyperscalers.** Google runs Gemini entirely on TPUs. AWS runs Claude on Trainium. Meta does ranking/recs on MTIA. These three have the software-engineering depth to maintain their own compiler stacks (XLA, Neuron SDK, PyTorch/MTIA) and the workload volume to amortize it.

**No — for everyone else.** CUDA is still default for: independent labs (Anthropic still uses Nvidia for some workloads, xAI is all-in on Nvidia), every serious AI startup, every university, every enterprise who doesn't want to rewrite their training loop. AMD MI355X matches Blackwell on paper but ROCm still trails CUDA in real training benchmarks (see [Semianalysis MI300X vs H100/H200 training bench](https://newsletter.semianalysis.com/p/mi300x-vs-h100-vs-h200-benchmark-part-1-training) — "CUDA moat still alive" was the title).

**The Tesla signal.** Dojo being killed is the most under-discussed story. If *Tesla* — with more AI talent per engineer than almost anyone — couldn't justify staying on custom silicon against Nvidia's roadmap, it's a preview of what happens to any second-tier custom-chip effort.

## Editorial takeaway

The moat isn't cracking uniformly — it's *fracturing along workload lines*. Inference on fixed architectures (ranking, recs, frontier-model serving where you own the model) is migrating off Nvidia fast. Training *frontier* models is still ~90% CUDA because the compiler / kernel / networking stack is a decade ahead. The MI355X vs B200 benchmark race in 2026 is the one to watch — if AMD's FP4/FP6 throughput claim holds in real workloads, that's when the moat cracks for renters, not just owners.

## Low-confidence flags

- Exact per-chip prices on custom silicon (Trainium, TPU, MTIA) are not publicly disclosed — hyperscalers don't sell them.
- TPU v7 (Ironwood) specs not fully public as of April 2026.
- MI400 specs still preliminary; shipping late 2026.

## Related

- reasoning models changed the pricing curve
- deepseek broke the moat thesis
- [who owns the gpus](/compare/who-owns-the-gpus)
- _MOC

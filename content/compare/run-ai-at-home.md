---
{
  "slug": "run-ai-at-home",
  "title": "Run AI At Home \u2014 The 2026 Local LLM Hardware Grid",
  "tldr": "Two serious paths in April 2026. **Speed-per-dollar on \u226432GB models**: RTX 5090 wins by 2\u20133\u00d7. <!-- src: https://strategyarena.io/en/blog/rtx-5090-vs-strix-halo-ia-locale-2026 --> **Running 70B+ without quantization**: Mac Studio M3 Ultra is the only sub-$5K desktop that does it. <!-- src: https://www.compute-market.com/blog/rtx-5090-vs-mac-studio-m4-max-local-ai-2026 --> Everything else (Pi, Jetson, Mac Mini, Strix Halo) fits between, each with a niche. Ollama (CLI) and LM Studio (GUI) both use llama.cpp under the hood \u2014 performance difference is ~20-30% in Ollama's favor on raw llama.cpp, but LM Studio's MLX backend flips it by 26-60% on Apple Silicon. <!-- src: https://tech-insider.org/lm-studio-vs-ollama-2026/ -->",
  "cluster": "compute-race",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Local LLM Hardware",
    "Run AI At Home",
    "Self-Hosted LLMs"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://www.compute-market.com/blog/mac-mini-m4-for-ai-apple-silicon-2026"
    },
    {
      "id": 2,
      "url": "https://strategyarena.io/en/blog/rtx-5090-vs-strix-halo-ia-locale-2026"
    },
    {
      "id": 3,
      "url": "https://julsimon.medium.com/what-to-buy-for-local-llms-april-2026-a4946a381a6a"
    },
    {
      "id": 4,
      "url": "https://aimultiple.com/dgx-spark-alternatives"
    },
    {
      "id": 5,
      "url": "https://quickfixsurrey.ca/lm-studio-vs-ollama-2026/"
    },
    {
      "id": 6,
      "url": "https://tech-insider.org/lm-studio-vs-ollama-2026/"
    }
  ]
}
---

**Related:** [mac mini price history](/compare/mac-mini-price-history) · [nvidia vs custom silicon](/compare/nvidia-vs-custom-silicon) · memory is the real agent moat · open weights in 2026 the real state · _MOC

## The hardware grid

| Hardware | Max model (quantized) | Tokens/sec (reference) | Price (USD) | Power (W) | Best for |
|---|---|---|---|---|---|
| **Raspberry Pi 5 (8GB)** | 3-8B Q4 | 2-5 | ~$80 | 10 | Hobbyist, edge, learning |
| **Nvidia Jetson Orin Nano 8GB** | 7-8B Q4/Q5 | 15-30 | $249 | 15 | Edge / robotics / low-power |
| **Nvidia Jetson AGX Orin 64GB** | 30-70B Q4 | 30-60 (7B) | ~$2,000 | 60 | Edge inference, production |
| **Mac Mini M4 (16GB base)** | 7-8B unquantized | 20-40 (7B via MLX) | **$599** | 25 | Best daily-driver baseline [^1] |
| **Mac Mini M4 Pro (64GB max)** | 30B unquantized, 70B Q4 | 15-25 (30B) | $1,399–$2,499 | 40 | Mid-tier workhorse |
| **AMD Strix Halo (Ryzen AI Max+ 395, 128GB)** | 70B Q4, MoE up to 100B | 8-18 | ~$2,000-3,500 (framework desktop config) | 120 | Big unified memory on a budget, Linux-first |
| **RTX 4090 workstation (24GB)** | 30B Q4 | 50-100 (7B) | $2,000 GPU + box | 450 | Pre-5090 best buy; used market |
| **RTX 5090 workstation (32GB)** | 32B Q4 dense, 30B MoE | **145–234 (7-30B via Qwen3)** [^2] | ~$2,000 GPU + $1,500 box | 575 | Speed king under 32GB |
| **Mac Studio M3 Ultra (256GB)** | Llama 405B Q4 unquantized (~235GB), 120B unquantized | 20-40 (70B) | $5,599–$9,499 | 480 | **Only sub-$5K way to run 70B+ unquantized** [^3] |
| **Nvidia DGX Spark** | 70B unquantized | ~60 (70B) | ~$3,000 | 170 | Purpose-built local LLM box [^4] |
| **2× RTX 5090 custom** | 70B Q4 | 80-120 (70B) | $6,000–$8,000 | 1,200 | Power users, noisy, hot |

## Software layer — Ollama vs LM Studio vs MLX

| Tool | Type | Backend | Apple Silicon boost | Strength |
|---|---|---|---|---|
| **Ollama** | CLI + REST | llama.cpp (MLX preview Mar 2026 [^5]) | ~1.6× prefill with MLX | Dev-ergonomic, 100K+ GH stars |
| **LM Studio** | GUI + server | llama.cpp + **MLX (default)** | 26-60% faster on MX on Apple [^6] | Best Mac perf, easy quant switching |
| **llama.cpp (direct)** | CLI | Native | MLX via flag | Max control |
| **MLX-LM** | Python | Apple MLX | Native Apple | Research, custom loops |
| **vLLM** | Server | CUDA | N/A | Production throughput on Nvidia |

**Apple-Silicon nuance:** if you're on a Mac, LM Studio is ~1.5× faster than Ollama today because MLX is a first-class backend. Ollama's preview MLX path (Mar 2026) is closing the gap but not there yet.

## Memory math (what fits where)

| Model | VRAM/URAM at Q4 | Fits on |
|---|---|---|
| Llama 3.1 8B | ~5 GB | Anything incl. Pi 5 with patience |
| Mistral 7B | ~5 GB | Everything |
| Qwen 3 32B dense | ~20 GB | RTX 5090, Mac Mini M4 Pro 64GB |
| Llama 3.3 70B | ~40 GB | Strix Halo 128GB, M3 Ultra, 2×5090 |
| Qwen 3 MoE-A3B | ~18-22 GB active | RTX 5090, Mac Mini M4 Pro |
| DeepSeek V3 (671B MoE) | **~380 GB** | Mac Studio M3 Ultra 512GB only feasible desktop |
| Llama 4 Scout 109B | ~60 GB | Strix Halo 128GB, M3 Ultra |
| Llama 4 Maverick 400B MoE | ~230 GB | M3 Ultra 256GB+ |

## Editorial takeaway — what to actually buy

- **Just starting, already have a Mac:** install LM Studio. Run Llama 3.1 8B on whatever you have. Zero spend.
- **Best "buy once" local setup:** Mac Studio M3 Ultra 256GB (~$5,599). Only desktop that runs 70B unquantized + DeepSeek-class MoE with room. [^3]
- **Speed freak, under $4K:** RTX 5090 box. 2-3× faster on models that fit. Expect fan noise.
- **Homelab / edge:** Jetson AGX Orin 64GB. Low power, 24/7-friendly.
- **Travel / always-on companion:** Mac Mini M4 ($599). Best-in-class performance for the price; 7-8B models natively. Pairs with an M4 Pro upgrade later.
- **Do NOT buy:** Raspberry Pi for serious LLM work. It runs, but at single-digit tokens/sec — it's a learning toy, not a workhorse.

The broader trend mirrors memory is the real agent moat: memory (unified or VRAM) is the hardware equivalent of context. Speed you can optimize; memory you can't synthesize.

## Confidence notes

- RTX 5090 / Strix Halo tok/s are llama-bench numbers; real-world 10-20% lower.
- M3 Ultra is current top Apple chip — **Apple skipped M4 Ultra** (no M4 Ultra available as of April 2026), so claims about "M4 Ultra" in some 2025 posts are incorrect.
- DGX Spark pricing and availability are early-launch estimates.

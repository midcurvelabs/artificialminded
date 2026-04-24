---
{
  "slug": "decentralised-ai-compute-and-weights",
  "title": "Decentralised AI compute & open weights \u2014 signal vs noise",
  "tldr": "",
  "cluster": "signal-vs-noise",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Decentralized AI Compute",
    "DePIN AI"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://blog.herond.org/top-10-decentralized-ai-projects-in-2026/"
    },
    {
      "id": 2,
      "url": "https://www.kucoin.com/blog/deep-dive-to-AI-crypto-future"
    },
    {
      "id": 3,
      "url": "https://www.cryptotimes.io/learn/bittensor-tao-guide/"
    },
    {
      "id": 4,
      "url": "https://www.coingecko.com/en/coins/bittensor"
    }
  ]
}
---

> **TL;DR.** Decentralized compute networks finally produced *one* real result in 2026 (Bittensor Subnet 3 trained Covenant-72B across 70+ nodes). Akash and io.net are the only DePIN compute markets with real paying users beyond token-incentive farming. Most other claims are subsidy-driven throughput, not real demand. Open weights (Llama, DeepSeek, Qwen) are the actual decentralization — not the tokens. See decentralised ai faces a verification problem.

## The landscape

### Compute DePIN

| Project | Token | Claim | Real usage (Apr 2026) | Verdict |
|---|---|---|---|---|
| **Bittensor** | TAO | Subnet-based AI marketplace, token rewards best outputs | Subnet 3 (Templar) trained 72B model across 70 nodes; $43M Q1 2026 AI-services revenue (reported) | Most interesting. Still heavy token-subsidy economics. |
| **Akash** | AKT | Open-source GPU cloud marketplace | Real paying workloads for Llama + SD inference; modest | Real, small. |
| **io.net** | IO | Aggregate idle GPUs into virtual clusters | Pitched 1,000-H100 virtual VMs; actual utilization hard to verify | Mixed signal. |
| **Render** | RNDR | GPU rendering → AI inference pivot | Real in 3D rendering; AI layer still early | Niche but real. |
| **Hyperbolic** | — (non-token) | Open-access inference marketplace + rentable H100s | Growing; not token-incentivized (rare in this category) | Cleanest signal. |
| **Together.ai** | — (non-token) | Hosted open-weight inference + fine-tuning | Big commercial traction ($B+ ARR trajectory) | Real enterprise. Not decentralized in any meaningful sense. |

[^1]
[^2]
[^3]
[^4]

### Open-weight providers (the real decentralization)

| Family | Maintainer | Top model (Apr 2026) | Usage |
|---|---|---|---|
| Llama | Meta | Llama 4 family | Dominant open-weight default; huge HF downloads |
| DeepSeek | DeepSeek (China) | DeepSeek V3 / R2 | Frontier-adjacent reasoning; changed the cost curve |
| Qwen | Alibaba | Qwen 3 / Qwen3-VL | Best open multilingual + vision |
| Mistral | Mistral AI | Mixtral, Codestral | European darling, slower to ship in 2026 |
| Gemma | Google | Gemma 3 | Decent, not category-defining |

## The verification problem

Core issue: in a decentralized compute network, you can't cheaply prove that a worker node actually ran the model you paid for (versus returning a cached or weaker response). This is **the** unsolved problem of DePIN AI. See decentralised ai faces a verification problem — most networks handle it via redundancy + token slashing, which works for inference but breaks down for training.

Bittensor's "validators reward best output" design is an economic workaround, not a cryptographic proof. It ships, but the incentive game is gameable, and the "best output" metric is opinionated per subnet.

## Token incentives vs real demand — the honest read

Follow the revenue, not the market cap.

- **Bittensor Q1 2026 revenue ~$43M** (disclosed): real, but includes subnet-internal economic activity that blurs the line between "product revenue" and "subsidy loop."
- **Akash GPU utilization**: real workloads, but order of magnitude below AWS GPU rental in raw $ terms.
- **io.net cluster utilization**: unverifiable externally. Their own dashboards are the only source.
- **Hyperbolic**: no token, no subsidy — if they have paying customers, it's real demand. Early signs: yes.
- **Together.ai**: clearly real, clearly not decentralized (it's a centralized company hosting open weights).

## Hype vs real (2026 scorecard)

| Claim | Reality |
|---|---|
| "Decentralized training at scale" | One 72B run in Q1 2026. Centralized labs train 500B+ monthly. |
| "Decentralized inference cheaper than AWS" | Sometimes true on token-subsidized networks, rarely net of token price drops. |
| "TAO = AWS of AI" | Hyperbolic and premature. TAO is a market-making layer for model comparison. |
| "Open weights close the moat" | **True.** This is the real decentralization story. Llama/DeepSeek/Qwen removed the frontier premium for 80% of use cases. |

## Editorial take (Rik)

The DePIN AI narrative conflates two very different things: (1) decentralized compute networks with token incentives (mostly noise, one or two real signals) and (2) open-weight models (mostly signal — the actual power transfer happened here). If you're building: use Hyperbolic or Together for open-weight inference; use Akash if you have a specific cost + sovereignty need. Ignore the rest until **verified training at frontier scale** ships without subsidy. DeepSeek broke the moat — that's where the decentralization actually happened, and it didn't need a token.

## Confidence

Medium. Open-weight traction is high-confidence. DePIN revenue figures are low-confidence; projects self-report and the market-cap vs usage ratio remains absurd.

## See also

- decentralised ai faces a verification problem
- open weights in 2026 the real state
- deepseek broke the moat thesis
- the frontier is a three horse race
- _MOC
- _MOC

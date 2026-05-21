---
{
  "slug": "cloud-vs-owned-infrastructure",
  "title": "Cloud vs. Owned Infrastructure",
  "tldr": "",
  "cluster": "compute-race",
  "confidence": "medium",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "cloud vs on-prem",
    "self-hosting break-even",
    "buy vs rent gpus"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison"
    },
    {
      "id": 2,
      "url": "https://www.cloudzero.com/blog/cloud-gpu-pricing-comparison/"
    },
    {
      "id": 3,
      "url": "https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026/"
    }
  ]
}
---

**TL;DR.** For inference-dominated workloads under ~$15-20k/month in API spend, API is still cheaper. Between $20k/month and $200k/month, self-hosting (colo'd H100/B200 box) wins on pure $/token but loses on latency, scaling, and model freshness. Above $200k/month — or under strict compliance — you're past break-even on dedicated hardware regardless.

## The three real options (April 2026)

| Option | Fixed cost | Variable cost | Latency | Model freshness | Compliance |
|---|---|---|---|---|---|
| **Frontier API** (Anthropic, OpenAI, Google) | $0 | $3-15 per M output tokens | 200-800ms TTFT | Auto-updated | Shared infra; HIPAA/SOC2 available on top tiers |
| **Cloud GPU rental** (AWS P5, GCP A3, Azure NC H100, CoreWeave) | $0 | $1.90-$6.98/GPU-hr (H100); $2.65-$14.24/GPU-hr (B200) [^1] | <10ms to your VPC | Bring your own | Full control |
| **Self-hosted colo** (8xH100 box, Mac Studio cluster, Framework Desktop) | $50k-$300k capex + $2-8k/mo colo | Power ~$0.10-0.15/kWh | <1ms on LAN | You maintain | Full control, air-gap option |

## H100-hour pricing, real numbers (April 2026)

| Provider | On-demand | 1yr reserved | Spot | Notes |
|---|---|---|---|---|
| AWS P5 | $3.90 | ~$2.00 (~48% off) | $1.95-2.50 | Cut 44% in June 2025 [^1] |
| GCP A3-high | $3.00 | ~$2.00 | $1.80-2.30 | Cheapest hyperscaler on-demand |
| Azure NC H100 v5 | $6.98 | ~$3.50 | n/a | Most expensive by far [^2] |
| CoreWeave | $2.39-$3.00 | $1.49-$2.00 | — | Neocloud leader [^3] |
| Lambda Labs | $1.99-$2.49 | — | — | Cheapest tier |

## Break-even math

**Scenario: 8xH100 node.**
- Buy: ~$250k (street, 2026) for an 8x H100 SXM server.
- 3yr amortize = $6.9k/month capex; add $2.5k colo + $1.5k power = ~$11k/month fully loaded.
- Cloud equivalent (AWS reserved @ $2.00/hr * 8 * 730hr): **$11,680/month**.
- **Break-even: roughly month-one if you run 100% utilized**. Under 50% util, cloud wins.

**Scenario: Anthropic API spend.**
- At $15 / M output tokens (Sonnet 4.6), $20k/month = ~1.3B output tokens = ~15-20B input tokens at typical ratios.
- To match that on self-hosted open-weights (Qwen 3 32B or Llama 4 70B) you'd need 1-2 H100s running 24/7 at ~100 tok/s.
- Self-host cost ~$3-5k/month fully loaded.
- **Break-even is around $8-10k/month of frontier API spend** — *if* you accept the capability gap (no Sonnet-level reasoning on open weights yet).

**Scenario: Mac Studio cluster for inference.**
- 4x Mac Studio M4 Ultra 512GB = ~$40k one-time; run DeepSeek V3 / Llama 4 at 15-20 tok/s.
- Power: ~$80/month total.
- vs cloud: month 5-6 break-even; but hard capacity ceiling (can't burst).

## Latency

| Setup | TTFT | Tokens/sec | Network hop |
|---|---|---|---|
| Frontier API (us-east) | 200-800ms | 30-150 | Internet |
| Cloud GPU (same VPC) | 20-80ms | 30-300 | VPC peer |
| Self-hosted colo | 1-10ms | 30-300 | LAN |
| Local dev box | <1ms | 20-100 | Loopback |

Local wins for **real-time agents, voice, RAG with sub-200ms budget**. Cloud API wins for **batch, async, anything over 1s budget**.

## Model freshness

API is the only option if you need Claude 4.7 / GPT-5 / Gemini 3 **today**. Open weights run 3-6 months behind closed on reasoning benchmarks. See open weights in 2026 the real state.

## Compliance / sovereignty

Self-host is the only answer for: HIPAA PHI at scale (API BAAs exist but audit burden), EU AI Act high-risk, defense, anything GDPR-strict on EU soil without enterprise API region locks. Every serious healthcare / finance / government buy in 2026 starts with "we need on-prem".

## Editorial takeaway

The dirty secret: **most people asking "should I self-host?" are solving a $3k/month API bill and should just stay on API.** Self-hosting only starts to make sense when one of three things is true: (1) you've passed ~$20k/month in inference costs on open-weight-replaceable workloads, (2) you have compliance that forbids API, or (3) latency under 50ms is load-bearing for your product. Everything else is hobbyist LARPing or premature optimization.

## Low-confidence flags

- Colo power costs vary wildly ($0.06/kWh in Virginia vs $0.20+ in California) — all numbers assume mid-tier.
- Break-even math assumes Nvidia GPU street prices, which can swing ±30% on allocation.
- Open-weights capability gap closes fast; re-check quarterly.

## Related

- reasoning models changed the pricing curve
- open weights in 2026 the real state
- [run ai at home](/compare/run-ai-at-home)
- _MOC

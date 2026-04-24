---
{
  "slug": "who-owns-the-gpus",
  "title": "Who Owns the GPUs",
  "tldr": "",
  "cluster": "compute-race",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "who owns the gpus",
    "gpu owners",
    "hyperscaler compute"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://introl.com/blog/xai-colossus-2-gigawatt-expansion-555k-gpus-january-2026"
    },
    {
      "id": 2,
      "url": "https://www.datacenterdynamics.com/en/news/xai-elon-musk-memphis-colossus-gpu/"
    },
    {
      "id": 3,
      "url": "https://www.datacenterfrontier.com/hyperscale/article/55310441/ownership-and-power-challenges-in-metas-hyperion-and-prometheus-data-centers"
    },
    {
      "id": 4,
      "url": "https://spectrum.ieee.org/5gw-data-center"
    },
    {
      "id": 5,
      "url": "https://www.datacenterdynamics.com/en/news/openai-and-oracle-to-deploy-64000-gb200-gpus-at-stargate-abilene-data-center-by-2026-report/"
    },
    {
      "id": 6,
      "url": "https://www.datacenterdynamics.com/en/news/aws-activates-project-rainier-cluster-of-nearly-500000-trainium2-chips/"
    },
    {
      "id": 7,
      "url": "https://www.nextplatform.com/2025/03/05/coreweaves-250000-strong-gpu-fleet-undercuts-the-big-clouds/"
    },
    {
      "id": 8,
      "url": "https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html"
    },
    {
      "id": 9,
      "url": "https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/"
    },
    {
      "id": 10,
      "url": "https://finance.yahoo.com/news/big-tech-set-to-spend-650-billion-in-2026-as-ai-investments-soar-163907630.html"
    },
    {
      "id": 11,
      "url": "https://www.crvscience.com/post/the-memphis-cluster-the-socio-technical-cost-of-the-xai-colossus"
    }
  ]
}
---

**TL;DR.** The 2026 compute race is no longer about who can buy the most H100s — it's about who can power 1-2GW+ data centres fast enough to absorb Blackwell. xAI's Colossus (555k GPUs, 2GW) is online *now*; Meta's Hyperion (2GW Louisiana) and Prometheus (1GW Ohio) are the announced giants; Amazon quietly became the biggest spender at $200B capex for 2026.

## Announced clusters vs. what's actually online (April 2026)

| Owner | Cluster / Campus | Status | GPU mix | Power |
|---|---|---|---|---|
| **xAI** | Colossus 1+2 (Memphis, TN) | Online — expanding to 1M GPUs | ~555,000 total: 150k H100, 50k H200, 30k+ GB200, rest Blackwell [^1] | 2 GW Jan 2026 [^2] |
| **Meta** | Hyperion (Richland Parish, LA) | Phase 1 under construction, full site live end of 2027 | 750k+ GPUs planned Phase 1 [^3] | 1.5→5 GW |
| **Meta** | Prometheus (New Albany, OH) | Coming online end of 2026 | ~500,000 GPUs planned [^4] | 1.02 GW |
| **OpenAI/Oracle** | Stargate Abilene (TX) | 2 of 8 buildings live; rest mid-2026 | 64,000 GB200s by end 2026 [^5] | 1.2 GW |
| **Amazon/Anthropic** | Project Rainier (New Carlisle, IN) | Online | ~500,000 Trainium2 (custom silicon, not Nvidia) [^6] | hundreds of MW, scaling to 1 GW by end 2026 |
| **CoreWeave** | 32 DCs (multi-region) | Online | ~250,000 GPUs; first to ship GB200 NVL72 (Feb 2025) and GB300 NVL72 (Jul 2025) commercially [^7] | distributed |
| **Google** | Multi-region hyperscale | Online | Primarily TPU v5p / Trillium (v6) — custom, not Nvidia; Gemini 3 trained on TPUs | Global |
| **Microsoft** | Fairwater + Goodyear AZ + Mt. Pleasant WI | Phased through 2026 | Mix H100 / H200 / GB200 — disclosed less publicly | Multi-GW |

## FY26 capex (billions USD, announced)

| Company | FY25 capex | FY26 guidance | Notes |
|---|---|---|---|
| **Amazon** | ~$100B | **$200B** | Biggest spender; FCF goes negative 2026 [^8] |
| **Alphabet** | $91B | **$175-185B** | ~2x jump [^9] |
| **Meta** | ~$72B | **$115-135B** | Biggest buildout in company history [^10] |
| **Microsoft** | ~$88B | ~$120-140B (slower growth) | FCF -28% this year [^8] |
| **Oracle** | — | Flagship on Stargate ($500B multi-year, shared w/ OpenAI, SoftBank, MGX) | [^5] |
| **Hyperscaler total** | — | **~$650-700B** | [^9] |

## Renewable-energy angle

- **Google**: long-standing 24/7 carbon-free matching; signed nuclear SMR deal (Kairos) to feed TPU fleets.
- **Meta**: signed 1.5 GW nuclear PPA (Constellation) for Hyperion; flagged gas turbines for interim.
- **Microsoft**: Three Mile Island restart PPA (835 MW) for AI.
- **Amazon**: bought Talen Energy's Cumulus nuclear campus next to Susquehanna.
- **xAI**: powering Colossus with portable gas turbines — drew air-permit lawsuits in Memphis [^11].
- **Oracle (Stargate)**: natural gas + grid + some solar; least green of the bunch.

## Editorial takeaway

The winners of 2026 are the ones with **power, not chips**. Nvidia can ship; grid interconnects can't. That's why Meta signed an $27B JV with Blue Owl to get Hyperion financed off-balance-sheet, and why Musk bought a *third* Memphis building in January — power substations were already permitted. Amazon quietly overtook Microsoft as the #1 AI spender and is running its own silicon (Trainium) at Rainier, decoupling from Nvidia at scale. The read: **Anthropic on AWS, OpenAI on Oracle+Microsoft, Gemini on Google TPUs, Grok on xAI Colossus, Llama on Meta silicon** — each frontier lab is now a vertical compute stack, not a cloud tenant.

## Low-confidence flags

- Microsoft's exact GPU inventory — never disclosed publicly; numbers above are estimated from capex and known partners.
- Meta Hyperion Phase 1 GPU count (750k) is a projection from power/GPU ratios, not a disclosed figure.
- xAI GPU mix is semi-official — most up-to-date breakdown comes from Introl and DataCenterDynamics reporting, not xAI filings.

## Related

- the ai capex bubble debate honest read — the spend/ROI question
- [nvidia vs custom silicon](/compare/nvidia-vs-custom-silicon)
- [cloud vs owned infrastructure](/compare/cloud-vs-owned-infrastructure)
- _MOC

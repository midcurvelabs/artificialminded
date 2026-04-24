---
{
  "slug": "xai-vs-openai",
  "title": "xAI vs OpenAI \u2014 Grok 4 vs GPT-5",
  "tldr": "",
  "cluster": "elon-stack",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "Grok 4 vs GPT-5",
    "xAI vs OpenAI"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://artificialanalysis.ai/models/comparisons/gpt-5-vs-grok-4"
    },
    {
      "id": 2,
      "url": "https://lmcouncil.ai/benchmarks"
    },
    {
      "id": 3,
      "url": "https://mem0.ai/blog/xai-grok-api-pricing"
    },
    {
      "id": 4,
      "url": "https://x.ai/colossus"
    },
    {
      "id": 5,
      "url": "https://www.cnbc.com/2026/04/07/elon-musk-seeks-ouster-of-openai-ceo-sam-altman-as-part-of-lawsuit.html"
    },
    {
      "id": 6,
      "url": "https://www.bloomberg.com/news/articles/2026-04-07/musk-wants-openai-nonprofit-to-get-any-trial-winnings-from-suit"
    },
    {
      "id": 7,
      "url": "https://www.theringer.com/2026/04/20/tech/sam-altman-elon-musk-trial-openai-primer"
    }
  ]
}
---

> **TL;DR.** OpenAI still leads on coding, general reasoning, and enterprise footprint. xAI leads on hardest-reasoning benchmarks (HLE), LMArena blind-preference, raw compute scale, and real-time X-data grounding — but trails badly on enterprise traction. The Musk v. Altman trial (jury phase opened 2026-04 in Oakland) is the subtext under every comparison.

## Headline table

| Dimension | xAI (Grok 4 / Grok 4.1) | OpenAI (GPT-5 family) |
|---|---|---|
| Philosophy | "Maximally truth-seeking," anti-woke framing, less aligned-by-default | Safety-tier framing, RLHF-heavy, usage-policy gates |
| Flagship model (Apr 2026) | Grok 4, Grok 4.1, Grok 4.20 | GPT-5, GPT-5.1, GPT-5.2, GPT-5.4 |
| LMArena | Grok 4.1 ranked #1 in blind preference at launch | GPT-5.x family top-3, style-controlled leader on coding |
| HLE (hardest reasoning) | Grok 4 ~50.7% (leads) | GPT-5.x ~44–48% |
| GPQA Diamond | Grok 4 ~87.7% | GPT-5.2 ~90.3% |
| AIME 2025 | Grok 4 ~92.7% | GPT-5.1 ~95.7% |
| SWE-bench Verified | mid-60s% | ~74.9% (leads) |
| API input / output $/M | Grok 4: $3 / $15. Grok 4.1 Fast: $0.20 / $0.50 | GPT-5: ~$1.25 / $10 (varies by tier) |
| Compute | Colossus, Memphis, ~230k GPUs live (H100 + H200 + GB200), 1M GPU / ~2GW target 2026 | Stargate + Azure, multi-site; scale similar order, different topology |
| Data moat | Real-time X firehose, Telegram partnership (1B+ users) | ChatGPT usage data, Microsoft ecosystem, enterprise RAG |
| Enterprise traction | Thin — handful of logos, big-dollar but narrow partnerships | Dominant — embedded in Microsoft 365, majority of F500 pilots |
| Legal overhang | Plaintiff in Musk v. Altman ($134B, trial 2026-04-27) | Defendant; nonprofit-conversion on trial |

[^1]
[^2]
[^3]
[^4]
[^5]

## Where Grok actually wins

1. **HLE and "frontier-hard" questions.** Grok 4 is the first model to break 50% on Humanity's Last Exam. Real edge, not a cherry-pick.
2. **Real-time grounding.** The X firehose is a genuine asset for news/reaction/meme queries. No other lab has a live social graph of this size plugged directly into inference.
3. **Compute headroom.** Colossus is the single largest physical AI cluster on earth — ~230k GPUs live, 1M target. Training budget is no longer the constraint for xAI.
4. **Price at the low end.** Grok 4.1 Fast at $0.20/$0.50 is aggressively subsidized — borderline loss-leader. Cheapest frontier-ish model on the market.

## Where OpenAI still wins

1. **Coding.** GPT-5.x is comfortably ahead on SWE-bench Verified and on agentic long-horizon code tasks. This is where enterprise dollars actually land.
2. **Enterprise.** Microsoft 365 Copilot is the fastest-ever enterprise SaaS rollout. xAI has nothing comparable.
3. **Product surface.** ChatGPT has ~700M weekly users; Grok's app is fine but it's a Musk-tier audience, not a mass consumer one.
4. **Safety / compliance story.** F500 buyers, hospitals, law firms cannot put Grok past procurement. xAI's "anti-woke" branding is a procurement liability.

## The legal drama (Apr 2026)

Musk v. Altman entered the trial phase 2026-04-27 in Oakland. Musk is seeking up to $134B and the ouster of Altman and Brockman, arguing the for-profit conversion defrauded the founding nonprofit mission. This is not a sideshow — it directly affects OpenAI's cap structure and ability to IPO. xAI's narrative *is* partly this lawsuit. Flag as **live / developing**.

[^6]
[^7]

## Editorial take (Rik)

Grok has moved from meme to contender. HLE #1 and LMArena #1 are real. But the frontier is a three-horse race and xAI is really the fourth horse: compute-rich, enterprise-poor, and structurally dependent on Musk's platforms for distribution. If you're a builder: GPT-5 or Claude for coding, Grok for real-time X queries and anything where the Musk-adjacent audience is the target. For serious agent work, Claude Code still sets the bar. The legal drama is the real wildcard — a Musk win reshapes the whole industry cap table.

## Confidence

High on benchmarks, pricing, compute numbers. Medium on enterprise traction (xAI doesn't disclose). Flag benchmark table for re-check monthly — the model-version churn is fast.

## See also

- the frontier is a three horse race
- elon ai empire data flywheels
- tesla dojo vs nvidia
- anthropic is winning enterprise by not chasing chatgpt
- deepseek broke the moat thesis
- _MOC

---
{
  "slug": "openai-vs-anthropic",
  "title": "OpenAI vs Anthropic",
  "tldr": "Anthropic flipped OpenAI on annualized revenue in April 2026 ($30B vs ~$25B) despite 18x fewer weekly users. OpenAI owns the consumer layer and the media narrative; Anthropic owns enterprise coding, API revenue, and the developer mindshare that actually ships product.",
  "cluster": "model-wars",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-24",
  "aliases": [
    "OpenAI vs Anthropic",
    "Anthropic vs OpenAI"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://sacra.com/c/openai/"
    },
    {
      "id": 2,
      "url": "https://www.the-ai-corner.com/p/anthropic-30b-arr-passed-openai-revenue-2026"
    },
    {
      "id": 3,
      "url": "https://openai.com/index/accelerating-the-next-phase-ai/"
    },
    {
      "id": 4,
      "url": "https://www.demandsage.com/chatgpt-statistics/"
    },
    {
      "id": 5,
      "url": "https://www.getpanto.ai/blog/anthropic-ai-statistics"
    },
    {
      "id": 6,
      "url": "https://sacra.com/c/anthropic/"
    },
    {
      "id": 7,
      "url": "https://www.saastr.com/anthropic-just-passed-openai-in-revenue-while-spending-4x-less-to-train-their-models/"
    },
    {
      "id": 8,
      "url": "https://tokenmix.ai/blog/swe-bench-2026-claude-opus-4-7-wins"
    },
    {
      "id": 9,
      "url": "https://explore.n1n.ai/blog/openai-updates-codex-desktop-control-claude-code-2026-04-18"
    },
    {
      "id": 10,
      "url": "https://www.prismnews.com/news/openai-expands-codex-push-with-consulting-firms-to-win"
    },
    {
      "id": 11,
      "url": "https://theagenttimes.com/articles/uber-blows-through-ai-budget-as-claude-code-adoption-surges--77f3928d"
    },
    {
      "id": 12,
      "url": "https://www.getpanto.ai/blog/claude-ai-statistics"
    }
  ]
}
---

**Related:** anthropic is winning enterprise by not chasing chatgpt · the claude model ladder is a cost capability dial · [claude vs gpt](/compare/claude-vs-gpt) · the frontier is a three horse race

::chart[arr-trajectory]

## Snapshot table

| Dimension | OpenAI | Anthropic |
|---|---|---|
| **Annualized revenue (Apr 2026)** | ~$25B [^1] | **$30B** [^2] |
| **Revenue mix** | Consumer-heavy (subs + ads pilot >$100M ARR) [^3] | API/enterprise-heavy (~80%+) |
| **Consumer weekly active (ChatGPT / Claude app)** | **900M WAU** [^4] | ~50M est. WAU (12.48M MAU Feb 2026, +49%/mo) [^5] confidence: medium |
| **Consumer subscribers** | 50M+ paying [^3] | Smaller, undisclosed |
| **Valuation** | $852B (Mar 2026 round) [^3] | $380B post-money Feb 2026; unsolicited offers at ~$800B+ [^6] |
| **Fortune 500 penetration** | 92% run on ChatGPT (vendor claim) [^3] | $1M+ contracts: 500 → 1,000 in <2mo post-Series G [^2] |
| **Training cost efficiency** | High spend; ~$7-10B/yr on training (est.) confidence: low | Reportedly ~4x less to train for comparable models [^7] |
| **Flagship coding model** | GPT-5.4 / GPT-5.3-Codex | Claude Opus 4.7 (released Apr 16, 2026) |
| **Flagship coding score (SWE-Bench Verified)** | 85.0% (GPT-5.3-Codex) [^8] | **87.6% Opus 4.7 / 93.9% Mythos Preview** [^8] |

## Coding tool positioning: Codex vs Claude Code

| | OpenAI Codex | Anthropic Claude Code |
|---|---|---|
| **Posture** | Cloud-first, agent orchestration, desktop control update Apr 2026 [^9] | CLI-first, local agent pairing, skills + MCP native |
| **Enterprise push** | Partnered with Accenture, Capgemini; Barret Zoph leading enterprise sales [^10] | Bottom-up adoption (Uber: 95% engineers on Claude Code, blew AI budget 8mo early) [^11] |
| **Est. ARR from coding tool** | Undisclosed, likely $500M-1B confidence: low | **~$2.5B ARR by Mar 2026** [^12] |
| **Daily installs trajectory** | Slower | 17.7M → 29M in Q1 2026 [^12] confidence: medium |
| **Enterprise AI assistant market share** | Declining from lead | 18% (2024) → 29% (2025), +61% YoY [^12] |

See claude code is the reference agent runtime and why cli coding agents beat ide embedded ones.

::chart[coding-tool-arr]

::chart[enterprise-share]

## The founder split story (2020-2021)

- **Dario + Daniela Amodei** left OpenAI late 2020 over safety + commercial-pressure disagreements. Brought ~8 senior researchers (GPT-3 team core).
- Founded Anthropic Feb 2021. Thesis: **interpretability + safety as first-class research targets, constitutional AI as the behavior lever.**
- Five years later: the "safety lab" is the one with higher ARR. The split looks like it validated Dario's read — that alignment work produces commercial differentiation (enterprise trust, low refusal + low harm profile) rather than competing with it.

## Cultural differences (operator's take)

| | OpenAI | Anthropic |
|---|---|---|
| **Vibe** | Launch-driven, media-forward, Altman-as-central-character | Research-driven, quieter, policy-adjacent |
| **Dev DX** | Broader surface (Whisper, DALL-E, Realtime, Assistants, Codex), messier | Narrower (Claude + Code + MCP + Skills), more coherent |
| **Safety posture** | Increasingly enterprise-compliant, framed as product feature | Core identity, drives product design (Constitutional AI, Responsible Scaling Policy) |
| **Token economics** | Ad-supported consumer play emerging | Pure API + seats model, no ad ambitions announced |

## Editorial takeaway — when to pick which

- **Use OpenAI when:** you need consumer distribution (GPT Store), voice/realtime, image gen inside one API, or your customer already has ChatGPT Enterprise seats.
- **Use Anthropic when:** you're building an agent, coding workflow, or enterprise tool where refusal rate, tool-use reliability, and long-context reasoning are load-bearing. Or when you want a single vendor where model + agent runtime + protocol (MCP) come from the same lab. See anthropic is winning enterprise by not chasing chatgpt.
- **Signal to watch:** if OpenAI's ads revenue compounds faster than Anthropic's enterprise contracts, the valuation gap widens again. If not, expect an Anthropic up-round at $800B+ in 2026.

## Confidence notes

- WAU for Claude is extrapolated from MAU growth — `confidence: medium` on that single cell.
- Training cost ratio is from SaaStr reporting; not independently audited.
- OpenAI "92% of Fortune 500" is a vendor claim, not a third-party audit.

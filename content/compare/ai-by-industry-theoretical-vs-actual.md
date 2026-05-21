---
{
  "slug": "ai-by-industry-theoretical-vs-actual",
  "title": "AI by industry \u2014 theoretical capability vs actual deployment",
  "tldr": "",
  "cluster": "signal-vs-noise",
  "confidence": "high",
  "created": "2026-04-23",
  "updated": "2026-04-23",
  "aliases": [
    "AI Industry Adoption Gap",
    "AI by Industry 2026"
  ],
  "sources": [
    {
      "id": 1,
      "url": "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era"
    },
    {
      "id": 2,
      "url": "https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai"
    },
    {
      "id": 3,
      "url": "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025"
    },
    {
      "id": 4,
      "url": "https://www.gartner.com/en/newsroom/press-releases/2024-04-11-gartner-says-75-percent-of-enterprise-software-engineers-will-use-ai-code-assistants-by-2028"
    }
  ]
}
---

> **TL;DR.** 88% of organizations use AI somewhere; only ~17% have deployed AI *agents*. Every industry has a huge gap between "what the models can do on benchmark" and "what's actually in production." The gap is the story — that's where the builder opportunity lives.

## The headline gap

- **McKinsey State of AI 2026**: 88% orgs use AI in at least one function; 79% use GenAI. Only **1% of healthcare orgs** describe adoption as "fully mature."
- **Gartner 2026**: Only 17% have deployed AI agents. 40% of enterprise apps expected to integrate task-specific agents by end of 2026 (up from <5% today).
- **Financial services**: AI adoption at 72%; top performers attribute >10% of EBIT to AI.

[^1]
[^2]
[^3]

## Industry-by-industry

### Legal

| Dimension | Can do | Actually deployed |
|---|---|---|
| Doc review | 90%+ accuracy on contract extraction; used in M&A | Widespread at AmLaw 100; 50–80% time reduction reported |
| Legal research | Outperforms junior associates on bounded queries | Harvey, CoCounsel, Lexis+ AI — mid-market traction |
| Drafting memos/briefs | Competent first-draft; hallucinations on citations remain | Human-in-loop only. No firm trusts autonomous drafts. |
| Autonomous litigation | N/A | N/A |

**Gap:** Citation hallucination + ethics rules block full autonomy. Lawyers won't sign off without review.

### Healthcare

| Dimension | Can do | Actually deployed |
|---|---|---|
| Radiology / imaging | Superhuman on specific tasks | Embedded in PACS; read-assist only, not diagnostic autonomy |
| Clinical scribing | Ambient AI capturing visit notes | Fastest-growing category — Abridge, Nuance DAX, Suki everywhere |
| Revenue cycle | Coding, billing, denials | Next-gen RCM is the #1 hospital AI line-item |
| Drug discovery | Model-suggested candidates | Works — Isomorphic, Recursion real pipelines |
| Diagnosis | Competitive with specialists on exams | **Zero** autonomous diagnosis deployed. Liability blocker. |

**Gap:** Only 1% "fully mature." Clinical scribing is the only mass-deployed category. Liability + FDA clearance gate everything else.

### Finance

| Dimension | Can do | Actually deployed |
|---|---|---|
| Research summarization | GPT-5 + Claude outperform junior analysts on bounded tasks | Widespread at buy-side |
| Fraud / AML | Classic ML still beats LLMs; LLMs add narrative | In production but not new |
| Trading | Narrow ML wins; LLMs for alt-data extraction only | No frontier-LLM trades firm capital (yet) |
| Customer service (retail banking) | Chatbots handle tier-1 | Deployed, but NPS still low |
| Compliance / audit | Big unlock — Gartner flags as top 2026 agent use case | Early pilots |

**Gap:** 72% adoption is misleading — most is narrow ML. Frontier-LLM deployment is mostly in research/writing, not in P&L-impacting decisions.

### Education

| Dimension | Can do | Actually deployed |
|---|---|---|
| Tutoring | 1:1 tutoring at human-tutor quality (Khanmigo, Duolingo Max) | Real, growing — K12 + ESL biggest |
| Grading | Reliable on rubric-driven | Slowly entering higher ed |
| Curriculum generation | Yes | Teacher-side tool; not student-autonomous |
| Cheating detection | **Weak** — detection is unreliable (see ai vs real content by platform) | Deployed but policy-level crisis |

**Gap:** The student side has adopted faster than the institution side. Policy is the bottleneck.

### Marketing

| Dimension | Can do | Actually deployed |
|---|---|---|
| Copy generation | Commodity | Everywhere — integrated in every SaaS |
| Image / video gen | Midjourney, Flux, Veo 3, Sora 2 | Widespread in brand + perf |
| Personalization at scale | 1:1 email personalization | Early, messy |
| Measurement / MMM | LLMs for analysis, not new | Supporting role |

**Gap:** Smallest gap. Marketing is the most-AI-adopted function in most orgs (McKinsey).

### Customer support

| Dimension | Can do | Actually deployed |
|---|---|---|
| Tier-1 resolution | ~40–60% of common tickets | Intercom Fin, Zendesk AI, Ada in prod |
| Autonomous resolution | Gartner predicts 80% by 2029 | ~17% today |
| Agent-assist | Summarization, next-best-action | Table stakes |
| Voice | Real-time LLM voice agents | Deployed at scale in 2026 (ElevenLabs + Retell + Vapi) |

**Gap:** Closing fast. This is where agents are shipping first. Only 20% of orgs report headcount reduction yet, though.

### Software engineering

| Dimension | Can do | Actually deployed |
|---|---|---|
| Code completion (Copilot-style) | Universal | ~75%+ of enterprise devs use AI assistants (Gartner 2028 target hit early) |
| Agentic coding | Claude Code, Cursor Agent, Devin | Real at solo + small team; uneven at enterprise |
| Autonomous PR-to-prod | Devin ships some PRs | Narrow. Still human-reviewed. |
| Full app building | Yes, for simple apps (v0, Bolt, Lovable) | Mass-adopted for prototypes |

**Gap:** Smallest in the 1-person-shop segment, largest in regulated enterprise. The productivity gain is real but unevenly distributed.

[^4]

## Editorial take (Rik)

The "industry AI adoption" stat everyone quotes is noise. The real question is: **what % of production workflows have a model in the decision loop without a human signing off?** That number is tiny almost everywhere. The builder opportunity is not the top-of-funnel "can AI do X?" — it's the last-mile integration: liability, audit, procurement, compliance. That's where Anthropic is winning enterprise — they solved the procurement story. For a solo builder, stay on the demand side: tools for lawyers, doctors, compliance officers that sit *next to* their workflow, not replacing it.

## Confidence

High on direction. Adoption % figures are survey-based and bias upward (self-reporting). Treat specific percentages as ±5 pts.

## See also

- ai vs real content by platform
- anthropic is winning enterprise by not chasing chatgpt
- devin one year in the agent autonomy reality check
- multi agent is hype subagent delegation is not
- _MOC

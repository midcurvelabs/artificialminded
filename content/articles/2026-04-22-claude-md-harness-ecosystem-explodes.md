---
{
  "slug": "2026-04-22-claude-md-harness-ecosystem-explodes",
  "date": "2026-04-22",
  "title": "CLAUDE.md Is the Product Now",
  "deck": "Four community repos teaching Claude Code configuration have accumulated 453,000 GitHub stars — built entirely outside Anthropic.",
  "signal": "reddit+github+x",
  "sources": [
    { "label": "affaan-m/everything-claude-code (163,619 stars)", "url": "https://github.com/affaan-m/everything-claude-code" },
    { "label": "garrytan/gstack (79,949 stars)", "url": "https://github.com/garrytan/gstack" },
    { "label": "forrestchang/andrej-karpathy-skills (74,091 stars)", "url": "https://github.com/forrestchang/andrej-karpathy-skills" },
    { "label": "@BrettStark 40-day Claude Code report", "url": "https://x.com/BrettStark/status/2046572304432247116" }
  ],
  "council": {
    "bull": "The harness layer is where durable value accumulates in any platform — the community is building the equivalent of Homebrew for Claude Code, and that kind of documentation-plus-tooling moat is extraordinarily hard to dislodge once it reaches critical mass.",
    "bear": "453,000 stars on configuration repos means 453,000 people betting on CLAUDE.md stability — one Anthropic API change or pricing shift can invalidate every harness overnight, and the community has no leverage to stop it.",
    "builder": "Fork gstack or karpathy-skills today, strip it to the 5-10 rules that match your actual workflow, and commit it as your own CLAUDE.md — a tuned file that reflects how you build will outperform any generic 23-tool setup within a week."
  },
  "isHeadline": false
}
---

The real Claude Code product isn't the CLI. It's the configuration layer wrapped around it — and the open-source community has built and documented that layer faster than Anthropic's own team. Four repos, none of them official, have together pulled in 453,406 GitHub stars in the span of months.

The headline number belongs to [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) at 163,619 stars. It bills itself as "the agent harness performance optimization system: Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond." Not a fork. Not a wrapper. A meta-layer.

## The harness layer is the moat

The pattern across all four repos is the same: engineers aren't customizing Claude's weights — they're customizing its context. [garrytan/gstack](https://github.com/garrytan/gstack) packages 23 opinionated tools that "serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA" and carries 79,949 stars. [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills), at 74,091 stars, distills Andrej Karpathy's observations on LLM coding pitfalls into a single CLAUDE.md file. The fourth, [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools), holds 135,747 stars by publishing the leaked full system prompts for Claude Code, Cursor, Devin AI, and fifteen other tools.

The star counts aren't vanity metrics — they're a proxy for how many builders treat CLAUDE.md tuning as load-bearing infrastructure. @BrettStark put a number on the payoff: "40 days of Claude Code: 784 commits, 189k lines, 78% satisfaction with real metrics."

## The GUI wrapper backlash

As the harness repos explode, the opposite end of the market is losing credibility. A r/LocalLLaMA post framing GUI wrappers as redundant — "OpenClaw and all its clones are almost useless tools for those who know what they're doing" — hit 578 upvotes and 231 comments. The community is bifurcating: builders who understand context management are going deeper into raw CLAUDE.md configuration, while casual users reach for point-and-click tools that add latency without adding leverage.

That split matters for anyone building on top of Claude Code's ecosystem. The high-signal users — the ones who generate the star counts, the posts, the next wave of repos — are moving toward raw configuration and away from abstraction.

## What to watch

Watch whether Anthropic ships any official CLAUDE.md tooling or documentation that competes with the community repos — any acknowledgment in release notes or the changelog would signal they're treating the harness layer as a first-class product surface. Watch the combined star velocity on these four repos over the next two weeks: if the rate holds above 5,000 stars per day, the configuration layer has become a genuine distribution channel in its own right. And watch whether gstack or everything-claude-code spawns paid forks — the moment someone charges for a curated CLAUDE.md bundle and it sells, the meta-layer becomes a market.

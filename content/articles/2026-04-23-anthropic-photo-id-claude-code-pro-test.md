---
{
  "slug": "2026-04-23-anthropic-photo-id-claude-code-pro-test",
  "date": "2026-04-23",
  "title": "Anthropic Tightens the Funnel From Both Ends",
  "deck": "On the same day, Anthropic began requiring photo ID for new users and A/B testing Claude Code's removal from Pro plans.",
  "signal": "hn",
  "sources": [
    { "label": "HN (5 pts, 2 comments) — Pirat_Nation: Anthropic now requires photo ID for new users", "url": "https://twitter.com/Pirat_Nation/status/2044960285510053929" },
    { "label": "HN (2 pts) — Anthropic A/B testing removing Claude Code from Pro plans", "url": "https://twitter.com/TheAmolAvasare/status/2046724659039932830" },
    { "label": "HN thread — photo ID story", "url": "https://news.ycombinator.com/item?id=47872608" },
    { "label": "HN thread — Claude Code Pro removal test", "url": "https://news.ycombinator.com/item?id=47872964" }
  ],
  "council": {
    "bull": "Friction at the door and tiered pricing are what a maturing platform looks like — Anthropic is building a sustainable business, not a hobby project, and both moves push the product toward the enterprise contracts that actually compound.",
    "bear": "The builders who evangelized Claude to their audiences, their clients, and their Discord servers were on the Pro tier. Squeezing them on the same week you add ID verification is how you teach your most influential users to recommend something else.",
    "builder": "Export your Claude Code usage logs this week and benchmark two alternatives — Cursor and one open-weight coding agent — so you have a tested fallback ready before Anthropic's A/B test reaches your account."
  },
  "isHeadline": false
}
---

On April 23, two Anthropic policy moves landed simultaneously. [New Claude users must now verify identity with a photo ID](https://twitter.com/Pirat_Nation/status/2044960285510053929), per a widely-circulated post that reached 5 points on Hacker News within hours. On the same day, a separate report confirmed [Anthropic is A/B testing the removal of Claude Code from Pro-tier plans](https://twitter.com/TheAmolAvasare/status/2046724659039932830) — the $20/month subscription that most indie builders call home.

The timing is not coincidence. Both moves tighten the same funnel: harder to get in, less included once you're there.

## The squeeze is structural, not cosmetic

Photo ID verification at onboarding is a meaningful friction point. For a product competing on frictionless access, it signals a deliberate shift — toward accountability, toward abuse prevention, or toward meeting regulatory pressure before regulators demand it. The direction is clear regardless of the stated rationale.

The Claude Code test is the sharper move. Pro was the pricing tier that turned Anthropic from a research lab into a tool builders actually depend on. Removing Claude Code from it — even in a limited A/B test — tells you where Anthropic thinks its margin lives: not in the $20 subscriber, but in the teams and enterprises above them. That's a rational business decision. It is also the decision that alienates the early adopters who made the reputation.

One signal that builders are already reading the room: a [Desktop OSD that reads Claude Code's rate limit headers](https://github.com/bozdemir/claude-usage-widget) appeared on HN the same day, posted by bozdemir. Nobody builds rate-limit instrumentation unless they expect to hit rate limits regularly — and resent it.

## What to watch

Three tells in the next two weeks. First, whether the Claude Code A/B test expands or rolls back — Anthropic's next move will confirm whether this is genuine pricing recalibration or a quiet retreat after community blowback. Second, watch GitHub stars on competing coding agents; any spike from alternatives is a direct readout of Pro-tier churn. Third, track whether photo ID verification becomes standard across other AI products — if it does, Anthropic was early on a regulatory inevitability; if it doesn't, they took on friction their competitors avoided.

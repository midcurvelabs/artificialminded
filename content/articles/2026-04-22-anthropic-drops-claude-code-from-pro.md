---
{
  "slug": "2026-04-22-anthropic-drops-claude-code-from-pro",
  "date": "2026-04-22",
  "title": "Anthropic Quietly Pulls Claude Code From Pro Tier",
  "deck": "Five Reddit threads and 5,881 combined upvotes erupted after Anthropic silently removed Claude Code from its $20 plan, with a single staffer calling it a '~2% test.'",
  "signal": "reddit",
  "sources": [
    { "label": "PSA thread (r/ClaudeAI, 2,315 pts)", "url": "https://reddit.com/r/ClaudeAI/comments/1srzhd7/psa_claude_pro_no_longer_lists_claude_code_as_an/" },
    { "label": "Anthropic response thread (r/ClaudeAI, 831 pts)", "url": "https://reddit.com/r/ClaudeAI/comments/1ss5fi4/anthropic_response_to_claude_code_change/" },
    { "label": "Migration thread (r/LocalLLaMA, 984 pts)", "url": "https://reddit.com/r/LocalLLaMA/comments/1ss23b8/claude_code_removed_from_claude_pro_plan_better/" },
    { "label": "Open letter (r/ClaudeAI, 1,042 pts)", "url": "https://reddit.com/r/ClaudeAI/comments/1ss8h1x/an_open_letter_to_anthropic/" }
  ],
  "council": {
    "bull": "Anthropic is stress-testing tier boundaries before a pricing restructure that makes Claude Code a genuine upsell, not an afterthought — the backlash proves the feature has real perceived value, which is exactly the data you want before repricing it.",
    "bear": "Calling a silent feature removal a '~2% test' is the kind of corporate framing that turns a recoverable PR problem into a durable trust deficit — the users who churned this week are the exact power users whose word-of-mouth drove Pro adoption in the first place.",
    "builder": "Pull up the Kimi k2.6 docs today and run your current Claude Code workflow against it on one real task — not to switch permanently, but to know your fallback before Anthropic makes the decision for you at renewal time."
  },
  "isHeadline": true
}
---

Claude Pro users woke up Tuesday to find Claude Code missing from the plan's feature list. Within twelve hours, [the original PSA on r/ClaudeAI](https://reddit.com/r/ClaudeAI/comments/1srzhd7/psa_claude_pro_no_longer_lists_claude_code_as_an/) had crossed 2,315 upvotes and 669 comments — no announcement, no email, no changelog.

Anthropic's only public response came from a single staffer on a [follow-up thread](https://reddit.com/r/ClaudeAI/comments/1ss5fi4/anthropic_response_to_claude_code_change/) that itself drew 831 upvotes and 300 comments. "For clarity, we're running a small test on ~2% of new prosumer signups," the comment read. The crowd was not satisfied. An [open letter to Anthropic](https://reddit.com/r/ClaudeAI/comments/1ss8h1x/an_open_letter_to_anthropic/) from a Max-level user at the 20x tier hit 1,042 upvotes and 140 comments within hours. The letter's opener — "April 21, 2026. Dear Anthropic" — landed like a resignation notice.

The five threads combined for 5,881 upvotes by end of day. That number is the stakes: this is not a bug report, it is a trust audit.

## What's actually happening

Anthropic's framing — a 2% A/B test on new prosumer signups — is technically true and politically tone-deaf. The $20 Pro tier was the pricing sweet spot for indie builders, solo developers, and small agencies who treated Claude Code as the core reason to subscribe. Removing it quietly, without a blog post or in-app notice, signals where the company thinks the durable value sits: in the higher tiers, with higher-margin customers.

The [anthropics/claude-code](https://github.com/anthropics/claude-code) repository has 116,779 stars on GitHub. That is not a niche tool. It is the product that pulled a specific, high-intent user cohort into the Pro tier in the first place. Testing its removal on that cohort — even 2% of it — without a heads-up is the kind of move that converts casual critics into active churners.

The migration energy on r/LocalLLaMA confirms the dynamic. The [thread titled *Claude Code removed from Claude Pro plan — better time than ever to switch to Local Models*](https://reddit.com/r/LocalLLaMA/comments/1ss23b8/claude_code_removed_from_claude_pro_plan_better/) climbed to 984 upvotes and 290 comments. The top comment: "Time to switch to Kimi k2.6 guys if you haven't already." Local-model momentum has been building for weeks. This is the event that turns latent frustration into an actual coordination point.

The [question thread asking whether the $20 plan ever truly included Claude Code](https://reddit.com/r/ClaudeAI/comments/1ss3asp/does_claudes_20_plan_no_longer_include_claude_code/) — 709 upvotes, 210 comments — is the most revealing thread of the five. Users are not just angry. They are questioning whether they understood the product at all. That is a different problem than a pricing change.

## What to watch

Watch the [anthropics/claude-code](https://github.com/anthropics/claude-code) star trajectory this week. A stall or dip in daily stars would signal the community is voting with its attention, not just its upvotes.

Watch Anthropic's pricing page directly. If Claude Code reappears on the Pro tier within 72 hours, the A/B test framing was accurate and the rollback is the story. If it does not, the test is a repositioning dressed as an experiment.

Watch Kimi k2.6's Reddit and GitHub presence over the next seven days. The r/LocalLLaMA thread named it explicitly as the migration target. If its star count or mention volume spikes in proportion to this week's churn energy, the substitution is real — not just venting.

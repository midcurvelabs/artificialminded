import type { Issue } from "./types";

export const mockIssue: Issue = {
  date: "2026-04-22",
  volume: 1,
  issueNumber: 1,
  weekday: "Wednesday",
  prettyDate: "April 22, 2026",
  headline: {
    slug: "2026-04-22-anthropic-pulls-claude-code-from-pro",
    date: "2026-04-22",
    title: "Anthropic Pulls Claude Code From Pro Tier; Builders Revolt",
    deck: "A quiet pricing change ignites 5,800 upvotes overnight. Anthropic calls it a 2% test. The community is not buying.",
    signal: "reddit+github+x",
    isHeadline: true,
    sources: [
      {
        label: "PSA thread (r/ClaudeAI, 2,315 pts)",
        url: "https://reddit.com/r/ClaudeAI/comments/1srzhd7/psa_claude_pro_no_longer_lists_claude_code_as_an/",
      },
      {
        label: "Anthropic response (831 pts)",
        url: "https://reddit.com/r/ClaudeAI/comments/1ss5fi4/anthropic_response_to_claude_code_change/",
      },
      {
        label: "LocalLLaMA migration thread (984 pts)",
        url: "https://reddit.com/r/LocalLLaMA/comments/1ss23b8/claude_code_removed_from_claude_pro_plan_better/",
      },
    ],
    body: `Claude Pro users woke up Tuesday to find Claude Code missing from the plan's feature list. Within twelve hours, [the original PSA](https://reddit.com/r/ClaudeAI/comments/1srzhd7/psa_claude_pro_no_longer_lists_claude_code_as_an/) had crossed 2,300 upvotes and 669 comments.

Anthropic's response, posted by a staffer, framed the move as a test. "For clarity, we're running a small test on ~2% of new prosumer signups," the comment read. The crowd was not satisfied. A second thread titled *An open letter to Anthropic* hit 1,042 upvotes from a Max-tier user laying out the trust problem.

The bigger story is the migration energy. r/LocalLLaMA's response thread, *Claude Code removed from Claude Pro plan — better time than ever to switch to Local Models*, climbed past 980 upvotes. Top comment: "Time to switch to Kimi k2.6 guys if you haven't already." Local-model momentum has been building for weeks. This is the moment that turns it into a stampede.

## What's actually happening

Anthropic's framing — a 2% A/B test — is technically true and politically tone-deaf. The Pro tier was the pricing sweet spot for indie builders and small agencies. Pulling Claude Code from it, even partially, signals where the company thinks the value is: in the higher tiers, with the higher-margin customers. That's a defensible business move. It is also the move that costs you the early adopters who built your reputation.

The competitive landscape makes it worse. Cursor still ships. OpenCode is gaining stars. Local Qwen3.6 setups now run useful coding agents on 8GB VRAM, and the Reddit threads documenting them are getting hundreds of upvotes. The substitutes are real.

## What to watch

Three signals worth tracking this week. First, whether Anthropic rolls back the test or expands it — either move tells you everything. Second, GitHub stars on alternative coding agents. A spike on OpenCode or Aider this week is migration in action. Third, prosumer churn data, which Anthropic won't share but creators will leak through their own subscriber notes.

The trust hit is real. The product is still excellent. Whether those two facts can coexist for another quarter is the open question.`,
    council: {
      bull: "Anthropic is segmenting customers correctly. Pro was always too cheap for what Claude Code costs to run. This pushes serious users to pay for serious tools.",
      bear: "You don't run a 2% test on a flagship feature without a comms plan. The execution screams revenue panic. Trust compounds slowly and breaks fast.",
      builder: "If you depend on Claude Code in production, get a backup running this week. Cursor, Aider, or local Qwen3.6. Test parity. Don't get caught flat.",
    },
  },
  trends: [
    {
      slug: "2026-04-22-vibecoding-is-shipping",
      date: "2026-04-22",
      title: "Vibecoding Stops Talking, Starts Shipping",
      deck: "Interns vibe-coding for two months under rules. Onlook crosses 25k stars. The framing wars are over.",
      signal: "reddit+github+x",
      sources: [
        {
          label: "Interns post (r/vibecoding, 591 pts)",
          url: "https://reddit.com/r/vibecoding/comments/1srljsv/i_let_my_interns_vibe_code_from_day_one_but_with/",
        },
        {
          label: "onlook repo",
          url: "https://github.com/onlook-dev/onlook",
        },
      ],
      body: `A 14-year software dev posted Tuesday that he let four interns vibe-code from day one with rules. Two months in, the post hit 591 upvotes and 75 comments. The thread reads as a workshop manual, not a victory lap.

On GitHub, [Onlook](https://github.com/onlook-dev/onlook) — the Cursor-for-designers project — crossed 25,000 stars. Easy-vibe sits at 6k. Both are tools for shipping, not arguing. On X, builders posted onchain tip jars deployed in fifteen minutes and multiplayer games shipped from a single prompt.

The shift is from "is vibecoding real" to "what did you ship this week." The discourse moved on. The tools followed.`,
    },
    {
      slug: "2026-04-22-context-engineering-eats-prompts",
      date: "2026-04-22",
      title: "Context Engineering Quietly Replaces Prompt Engineering",
      deck: "Five GitHub repos. 170,000 combined stars. One framing.",
      signal: "github+x",
      sources: [
        {
          label: "context-engineering-intro",
          url: "https://github.com/coleam00/context-engineering-intro",
        },
        {
          label: "Context-Engineering",
          url: "https://github.com/davidkimai/Context-Engineering",
        },
      ],
      body: `Karpathy's line — "filling the context window with just the right information" — is now everywhere. Five GitHub repos with 170k combined stars are using the context-engineering framing. Prompt engineering, as a phrase, is fading.

Claude Code with CLAUDE.md is the de facto implementation. The same idea, applied to vault structure, is what makes Obsidian + Claude work. Anyone who's been organizing their workspace for retrieval has been doing this for a year. The vocabulary just caught up.`,
    },
    {
      slug: "2026-04-22-local-models-cross-the-threshold",
      date: "2026-04-22",
      title: "Local Models Cross the Practicality Threshold",
      deck: "Qwen3.6-35B running real coding work on 8GB VRAM. The Mac-Studio-or-bust era ends.",
      signal: "reddit+github",
      sources: [
        {
          label: "Qwen3.6 on 8GB VRAM (r/LocalLLaMA, 64 pts)",
          url: "https://reddit.com/r/LocalLLaMA/comments/1ss9pku/running_qwen3635ba3b_locally_for_coding_agent_my/",
        },
        {
          label: "khoj",
          url: "https://github.com/khoj-ai/khoj",
        },
      ],
      body: `A working llama.cpp config for Qwen3.6-35B-A3B on an RTX 4060 with 8GB VRAM hit r/LocalLLaMA Tuesday. Sixty-four upvotes, thirty real comments, working setup. A second thread from a developer doing actual local coding work for the first time crossed 28 upvotes with the headline "I thought it would take way longer."

The "you need a five-thousand-euro Mac" story is breaking down. The hardware bar fell. The model bar rose. The intersection is here.`,
    },
  ],
  editorialNote: `Three of today's stories rhyme. Anthropic taking Claude Code off Pro. Local models actually shipping useful coding work on consumer hardware. Vibecoders moving from posts to products. The throughline: the cost of *not* owning your stack is rising. The cost of running it locally is falling. We are not at the crossover yet. We are close enough that prudent builders will stop pretending we won't get there.

— Rik`,
};

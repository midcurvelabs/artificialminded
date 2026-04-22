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
      body: `A 14-year software dev posted Tuesday that he let four interns vibe-code from day one — with rules. Two months in, [the post](https://reddit.com/r/vibecoding/comments/1srljsv/i_let_my_interns_vibe_code_from_day_one_but_with/) hit 591 upvotes and 75 comments on r/vibecoding. The thread reads as a workshop manual, not a victory lap. Interns pair-program with the LLM; senior eyes review every PR; a written rulebook bounds what vibe-coding is allowed to touch and what it isn't. The comments are practical — tool choices, pitfalls, onboarding time. Nobody is arguing about whether vibecoding counts.

## The tools stopped asking for permission

On GitHub, [Onlook](https://github.com/onlook-dev/onlook) — the "Cursor for designers" project — crossed 25,000 stars this week. Easy-vibe sits at 6k. Neither repo is pitching a manifesto. Both ship a product: a canvas where a non-coder can build a real app by describing changes in natural language, with the code materializing underneath. The README reads like a product page, not a research claim.

On X, the genre has calcified. Builders post onchain tip jars deployed in fifteen minutes. Multiplayer browser games shipped from a single prompt. Internal tools written during a long flight. The posts don't argue that vibecoding works. They assume it and measure the output.

## What changed

The 2025 discourse was about legitimacy. "Is this real engineering?" "Will the code hold?" "What happens when it breaks?" Those questions are still valid, but they've been answered in the only way that matters in this industry: somebody shipped it, somebody else copied the pattern, the pattern worked, and now it's a market. The interns post is evidence that the debate moved from the editorial pages to the training docs.

The rules part matters more than the vibe part. Every durable workflow in the threads has the same shape: scoped problem, explicit constraints, human review, shipped output. Vibecoding without rules is a demo. Vibecoding with rules is a junior engineer's onboarding path.

## What to watch

Two signals for the next thirty days. First, hiring posts — when "vibecoding literacy" shows up in a job description from a company that isn't an AI lab, the framing has won. Second, the tool consolidation. Onlook, easy-vibe, Cursor, v0 and their imitators are all converging on the same product shape. Whoever owns the "builder who can't code" wedge in six months will own the next wave of indie launches.`,
      council: {
        bull: "The discourse shift is the win. Once the question becomes 'what did you ship', the builder economy expands by an order of magnitude. Every designer and PM is now latent engineering supply.",
        bear: "Two months of intern output is not a track record. The pattern collapses the first time a vibe-coded system touches money, auth, or a regulated dataset without senior review.",
        builder: "Write the rules before you let anyone vibe on your codebase — yours or your intern's. The interns post is a template. Fork it. Your playbook should fit on one page.",
      },
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
      body: `Karpathy's line — "filling the context window with just the right information, at just the right time" — has quietly become the organizing principle of the field. Five GitHub repos with roughly 170,000 combined stars are now using the context-engineering framing in their READMEs, including [context-engineering-intro](https://github.com/coleam00/context-engineering-intro) and [Context-Engineering](https://github.com/davidkimai/Context-Engineering). Two years ago the same folder structure would have been called "prompt engineering." Today the phrase sounds dated.

## The shift is methodological, not semantic

Prompt engineering was a craft: you wrote a clever instruction, tuned it, and hoped the model did the thing. Context engineering is a system: you decide what goes into the window, in what order, with what citations, with what constraints, and you treat the whole bundle as the unit of work. The prompt is a small part of that bundle. The big parts are the files, the retrieved snippets, the tool results, the memory, the constraints.

This matters because the failure modes are different. A bad prompt produces a bad answer. A bad context produces a confidently wrong answer that looks right, which is far more expensive. The discipline of context engineering is the discipline of not letting that happen.

## CLAUDE.md is the canonical implementation

The pattern that won is file-system-native. Claude Code reads a CLAUDE.md from your repo, loads it into every session, and now your "prompt" is a version-controlled document that lives with the code. Cursor Rules, Windsurf memories, and Aider conventions are the same idea in different dialects. Obsidian vaults with an LLM on top use the same shape applied to knowledge instead of code. The convergence is hard to miss.

The implication for builders: stop iterating on prompts in a chat window. Move them into files. Treat the context bundle as the product. Version it, review it, test it.

## What to watch

Two tells. First, whether the framing gets absorbed into training and evaluation — benchmarks like "long-context faithfulness" and "context packing" are already drifting this way. Second, tooling. A standard format for context bundles (something between Dockerfiles and prompt files) is the obvious next step. The repo that nails it will be next year's 50k-star project.`,
      council: {
        bull: "Context engineering is the missing layer that turns LLMs from impressive toys into reliable tools. The teams that internalize it now will compound for years.",
        bear: "It's rebranded prompt engineering with more ceremony. Calling a folder of markdown 'engineering' doesn't make it rigorous — show me the tests, the metrics, the SLAs.",
        builder: "If your agent has no CLAUDE.md, Cursor Rules, or equivalent, start there this week. The 80% win is getting your constraints out of your head and into a file the model actually reads.",
      },
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
      body: `A working llama.cpp config for Qwen3.6-35B-A3B on an [RTX 4060 with 8GB VRAM](https://reddit.com/r/LocalLLaMA/comments/1ss9pku/running_qwen3635ba3b_locally_for_coding_agent_my/) hit r/LocalLLaMA Tuesday. Sixty-four upvotes, thirty real comments from people who actually ran it, quantization settings in the replies. A second thread from a developer doing local coding work for the first time crossed 28 upvotes with the title *I thought it would take way longer*. Neither post is a benchmark war. Both are "here's the command that worked on a consumer GPU I already own."

## The hardware story collapsed

For most of the last two years, "local models" meant "you need a Mac Studio." The useful models didn't fit, the useful quantizations degraded them too hard, and the toolchain was a part-time job. Every month a new thread promised the breakthrough. Every month the comments said "try again next quarter."

Qwen3.6 is the quarter it stops being next quarter. A 35B MoE model with 3B active parameters at the right quantization fits comfortably in 8GB VRAM, runs fast enough for agentic loops, and produces code that a working developer chose to commit. That's the threshold. Not "matches Claude." Not "beats GPT-4o." *Useful, on hardware you already own.* The distance between that threshold and general adoption is measured in weeks, not years.

## The ecosystem caught up

Tooling closed the gap at the same time. [khoj](https://github.com/khoj-ai/khoj) ships a local-first knowledge agent that runs against Ollama or llama.cpp with one config change. Ollama's library now carries the Qwen family as first-class citizens. VS Code extensions, Zed integrations, and Aider all accept local model endpoints without the "experimental" flag. The friction that used to kill adoption — installing four things to get one loop working — is gone.

The Anthropic Claude Code story (see today's headline) is the demand side of the same curve. When the cloud provider you trust changes the deal, the substitute you built in advance becomes the substitute you use tomorrow. A non-trivial number of the prosumer Pro subscribers who spent Tuesday complaining on Reddit will spend this weekend getting a local stack running. Some of them will stay.

## What to watch

Three things. First, the Ollama download graph for Qwen3.6 — a step change in the next two weeks means the migration thesis is real. Second, whether Apple ships a Metal-native MoE runtime that makes the 32GB M-series machines the obvious second home for these models. Third, the IDE companies. If Cursor, Zed, or JetBrains starts shipping a "local-first" tier with first-class local model support, the cloud-only assumption dies that month.`,
      council: {
        bull: "This is the inflection. Once local coding agents run on the GPU in your gaming PC, the default assumption flips from cloud-first to local-first for anyone who cares about cost, privacy, or reliability.",
        bear: "One config on one GPU is not a market. Frontier model quality is still years ahead for anything non-trivial, and the median developer doesn't want to maintain a local inference stack.",
        builder: "Install Ollama this weekend. Pull Qwen3.6. Point your existing Aider or Cursor setup at it. Even if you go back to cloud, knowing your fallback works is worth the Sunday afternoon.",
      },
    },
  ],
  editorialNote: `Three of today's stories rhyme. Anthropic taking Claude Code off Pro. Local models actually shipping useful coding work on consumer hardware. Vibecoders moving from posts to products. The throughline: the cost of *not* owning your stack is rising. The cost of running it locally is falling. We are not at the crossover yet. We are close enough that prudent builders will stop pretending we won't get there.

— Rik`,
};

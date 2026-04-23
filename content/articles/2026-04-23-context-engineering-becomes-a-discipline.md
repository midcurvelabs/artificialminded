---
{
  "slug": "2026-04-23-context-engineering-becomes-a-discipline",
  "date": "2026-04-23",
  "title": "Context Engineering Graduates From Tweet to Teachable Discipline",
  "deck": "Five GitHub repos totaling 167,000 stars show context engineering solidifying into a named practice with its own tooling and curriculum.",
  "signal": "github",
  "sources": [
    { "label": "GitHub — dair-ai/Prompt-Engineering-Guide (73k stars)", "url": "https://github.com/dair-ai/Prompt-Engineering-Guide" },
    { "label": "GitHub — gsd-build/get-shit-done (56k stars)", "url": "https://github.com/gsd-build/get-shit-done" },
    { "label": "GitHub — muratcankoylan/Agent-Skills-for-Context-Engineering (15k stars)", "url": "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering" },
    { "label": "GitHub — coleam00/context-engineering-intro (13k stars)", "url": "https://github.com/coleam00/context-engineering-intro" }
  ],
  "council": {
    "bull": "Context engineering is the durable abstraction layer that survives model upgrades — the team that owns context architecture owns the compounding advantage, because better-structured information scales with every new model release.",
    "bear": "Star counts on GitHub measure interest, not adoption; if context engineering stays a community framing without landing in IDE defaults or model provider tooling, it risks becoming the next 'prompt engineering' — a phrase everyone uses and nobody operationalizes consistently.",
    "builder": "Audit your current CLAUDE.md or Cursor Rules file this week: strip everything vague, add one concrete output format spec and one real example of a task done right, then measure whether first-pass outputs need fewer correction rounds."
  },
  "isHeadline": false
}
---

Andrej Karpathy coined the phrase. GitHub built the curriculum. Five repositories — spanning 167,000 combined stars — now treat context engineering as a distinct discipline, not a footnote to prompt engineering. The pivot happened fast enough that [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide), the field's longest-running reference with 73,708 stars, rewrote its tagline to explicitly cover context engineering alongside RAG and AI agents.

The second-largest signal is [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done), a 56,416-star system built specifically for Claude Code that describes itself as a "light-weight and powerful meta-prompting, context engineering and spec-driven development system." That repo is not a guide. It is a runtime — opinionated tooling for structuring what goes into the context window before the model ever sees a prompt.

## The shift is methodological, not semantic

Prompt engineering was about instruction quality. Context engineering is about information architecture. What goes into the window, in what order, with what constraints — the whole bundle becomes the unit of work rather than the individual instruction.

The failure modes diverge accordingly. A bad prompt produces a bad answer. A bad context produces a confidently wrong answer that looks correct, which costs more to catch and more to fix. [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro) — 13,204 stars — makes this explicit in its opening line: "Context engineering is the new vibe coding — it's the way to actually make AI coding assistants work."

[muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) at 15,247 stars extends the frame further into multi-agent architectures, where context management becomes a coordination problem: which agent sees what, when, and with what authority.

## The Karpathy definition is now canonical

[davidkimai/Context-Engineering](https://github.com/davidkimai/Context-Engineering) — 8,766 stars — reproduces Karpathy's definition verbatim in its repo description: "the delicate art and science of filling the context window with just the right information for the next step." That a repo builds its entire identity around a single quote signals the phrase has crossed from observation into doctrine.

Anthropic's own [prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) sits at 34,922 stars in an adjacent category — evidence that the platform vendors are building curriculum infrastructure at the same time the community is building tooling.

## What to watch

First: whether context engineering gets absorbed into model evaluation benchmarks. If evals start measuring context quality rather than prompt quality, the discipline becomes impossible to ignore professionally. Second: a standard interchange format for context bundles. Right now CLAUDE.md, Cursor Rules, and Windsurf memories are the same idea in incompatible dialects — the repo that standardizes the format will be next year's 50k-star project. Third: whether enterprise tooling vendors start shipping context auditing — the ability to inspect and version the exact window that produced a given output — as a compliance feature.

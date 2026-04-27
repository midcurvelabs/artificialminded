---
{
  "slug": "2026-04-27-personal-os-race-goes-public",
  "date": "2026-04-27",
  "title": "Four Personal OS Launches, Four Different Things",
  "deck": "At least four agent-as-OS projects got named in 24 hours, from AetherOS to colaos.ai to Claude Chief of Staff.",
  "signal": "GitHub+X",
  "sources": [
    {
      "label": "source 1",
      "url": "https://github.com/mimurchison/claude-chief-of-staff"
    },
    {
      "label": "source 2",
      "url": "https://github.com/MemTensor/MemOS"
    },
    {
      "label": "source 3",
      "url": "https://x.com/oran_ge/status/2048515816338100403"
    },
    {
      "label": "source 4",
      "url": "https://x.com/SpikeRiser/status/2048451617821798444"
    },
    {
      "label": "source 5",
      "url": "https://x.com/SilenceCaPrompt/status/2048196494113886298"
    }
  ],
  "council": {
    "bull": "Persistent agent stacks compound — every memory entry, every skill, every tool wired in raises switching cost. Whichever of these four hits product-market fit first owns the substrate the rest get measured against.",
    "bear": "Four people using *OS* for four different things isn't a race, it's vocabulary collapse. When the label means kernel, memory layer, hosted service, and Obsidian config simultaneously, the category dies before any of them ship a real product.",
    "builder": "Stop trying to build an OS. Copy @SilenceCaPrompt — wire Obsidian to Claude Code with a CLAUDE.md, add MemOS for persistence, ship it Monday. The platform crown goes to whoever uses theirs daily, not whoever names theirs grandest."
  },
  "isHeadline": false
}
---

Four builders shipped or named a *personal operating system* in the last 24 hours. None of them mean the same thing by it. mimurchison's [claude-chief-of-staff](https://github.com/mimurchison/claude-chief-of-staff) — 384 stars — is a Claude Code config that bills itself as "Your personal AI operating system built on Claude Code." [MemTensor's MemOS](https://github.com/MemTensor/MemOS), at 8,697 stars, is a memory layer for LLM and agent systems. @oran_ge announced [colaos.ai](https://x.com/oran_ge/status/2048515816338100403), a service where "agent has memory, awareness, and persists across conversations." @SpikeRiser is [building AetherOS](https://x.com/SpikeRiser/status/2048451617821798444) — an AI-native OS optimized per-machine with a custom kernel.

The convergence is on the word. Not the thing.

## The 'OS' label is doing too much work

Look at what's stacked under the same noun. AetherOS is a real OS — custom kernel, hardware-level. claude-chief-of-staff is a markdown directory and a CLAUDE.md. MemOS is a memory primitive. colaos.ai is a hosted service. @SilenceCaPrompt's [public build](https://x.com/SilenceCaPrompt/status/2048196494113886298) is just Obsidian wired to Claude Code by hand. These don't compete. They don't even share a category.

What's actually happening: builders are calling whatever persistent agent stack they ship an *OS* because the word implies platform, lock-in, defensibility. The demand is real — solopreneurs want an agent-native layer that holds memory, identity, and tools across sessions. But the architectural choices hide behind one label, so a buyer can't tell whether they're picking up a kernel project or a 200-line config repo.

The cheap version is winning the leaderboard. The 8,697-star MemOS is a Python library. The 384-star claude-chief-of-staff is a glorified prompt setup. The actual kernel — AetherOS — has no public artifact yet, just a tweet. The race exists; the category doesn't.

## What to watch

Track which definition consolidates. If MemOS keeps compounding past 10k stars while AetherOS stays in tweet form, *OS as memory layer* wins by default and the kernel framing dies on the vine. If colaos.ai launches a public product with pricing, the hosted-service definition gets a beachhead and the self-hosted crowd has to react. Watch claude-chief-of-staff's star velocity — at 384, it's small enough to either die this week or get forked ten times.

Watch the next solo builder who ships a "personal OS." Check what's underneath. If it's another Claude Code skin with a CLAUDE.md and some skills, the term has stopped meaning anything and the real platform layer is still upstream — at Anthropic, at the agent runtime, at whatever Claude Code is becoming. If it's a genuinely new substrate, the race has a frontrunner.

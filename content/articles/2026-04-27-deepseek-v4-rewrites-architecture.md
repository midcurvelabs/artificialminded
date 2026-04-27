---
{
  "slug": "2026-04-27-deepseek-v4-rewrites-architecture",
  "date": "2026-04-27",
  "title": "DeepSeek V4 Reads Like A One-Person Business",
  "deck": "V4 was distilled from 10+ specialists into one model that activates only the parts it needs per task.",
  "signal": "X",
  "sources": [
    {
      "label": "source 1",
      "url": "https://x.com/gordic_aleksa/status/2048455129779908952"
    },
    {
      "label": "source 2",
      "url": "https://x.com/i_amanchadha/status/2048259229493150000"
    },
    {
      "label": "source 3",
      "url": "https://x.com/Gauri_the_great/status/2048369505781641480"
    },
    {
      "label": "source 4",
      "url": "https://x.com/moulougueta/status/2048382001590186200"
    }
  ],
  "council": {
    "bull": "Architecture is finally the headline instead of parameter count, and V4's recipe — distill specialists, activate only what's needed — is portable to every layer of the stack from agents to teams. The next open model release gets judged on routing efficiency, not size.",
    "bear": "V4 isn't on GitHub's trending board, V3 and R1 are still where the activity sits, and a 1M-context sparse MoE is unrunnable on hardware any solo builder owns. The architecture is a poster, not a tool a reader can ship with.",
    "builder": "List the 10+ specialists in your week — writer, researcher, designer, closer, bookkeeper — and automate one of the switches between them by Monday, the way V4 routes experts. Steal the routing pattern, not the model."
  },
  "isHeadline": false
}
---

DeepSeek V4 dropped this week. Nobody's talking about how big it is. They're talking about how it was distilled from 10+ specialists, and how it only activates the parts it needs for the job. That's not an AI architecture. That's a one-person business.

The threads doing the work this week aren't benchmarks. [@Gauri_the_great](https://x.com/Gauri_the_great/status/2048369505781641480) describes V4 as distilled from "10+ domain specialists using full vocabulary KL divergence." [@gordic_aleksa](https://x.com/gordic_aleksa/status/2048455129779908952) lists the architecture choices — sparse MoE, hybrid attention for a 1M-token context window, and the Muon optimizer. [@i_amanchadha](https://x.com/i_amanchadha/status/2048259229493150000) frames it as a "rethink" tuned for agentic performance. The model itself isn't trending — DeepSeek-V3 still sits at 102,921 stars and DeepSeek-R1 at 91,982, with no V4 repo on the trending board yet. The story this week isn't the leaderboard. It's the recipe.

## The recipe is the lesson, not the model

Read what V4 actually does. Ten domain specialists, each trained for a narrow job, get compressed into one model. At inference, only the experts relevant to the current task fire. That's the exact shape of a solopreneur's stack — a writer, a researcher, a designer, a closer, a bookkeeper — collapsed into one operator who picks the role for the task at hand and ignores the rest.

Architecture beats scale here for the same reason a one-person business beats a ten-person agency at certain jobs. Specialization without overhead. Context routed to the part that handles it. No always-on cost for capability you only need on Tuesday.

This is why the news matters even though almost no reader will ever run V4. SGLang already [shipped day-zero support](https://x.com/moulougueta/status/2048382001590186200) for V4's hybrid sparse attention via a new ShadowRadix coordinate system — the inference layer is adapting before the model is even popular. By the time the trending charts catch up, the builders who internalized the *shape* will already be working like it.

## What to watch

Track the [DeepSeek-V3 repo](https://github.com/deepseek-ai/DeepSeek-V3) at 102,921 stars for when a V4 repo lands and how fast it closes that gap. That's the lag indicator on whether the architecture story converts into adoption — or stays a thread-thread.

Watch SGLang's ShadowRadix work after the day-zero post. Day-zero support is a flex; sustained commits are the signal that hybrid sparse attention becomes a default, not a one-off.

And watch your own stack. If your week looks like ten specialists you switch between by hand — writer, researcher, designer, closer — that's the V4 shape, and the job is to make the routing automatic before the next launch teaches everyone the same lesson.

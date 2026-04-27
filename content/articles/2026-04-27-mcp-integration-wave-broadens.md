---
{
  "slug": "2026-04-27-mcp-integration-wave-broadens",
  "date": "2026-04-27",
  "title": "Your AI Just Got Hands",
  "deck": "Five MCPs landed in 24 hours — Blender, Neon, Resend, Chrome DevTools, Framelink Figma — pushing agents past the terminal.",
  "signal": "GitHub+X",
  "sources": [
    {
      "label": "source 1",
      "url": "https://github.com/n8n-io/n8n"
    },
    {
      "label": "source 2",
      "url": "https://github.com/anthropics/claude-code"
    },
    {
      "label": "source 3",
      "url": "https://x.com/assafbar/status/2048480480765636702"
    },
    {
      "label": "source 4",
      "url": "https://x.com/seelffff/status/2048534671168823762"
    },
    {
      "label": "source 5",
      "url": "https://x.com/KirkDerpca/status/2048392302666674253"
    }
  ],
  "council": {
    "bull": "Within six months, a curated MCP stack is the new dotfiles. The operator who installs Blender, Neon, Resend, Chrome DevTools, and Framelink this week is the one shipping client work in October while everyone else is still configuring.",
    "bear": "Most of these get installed once and never invoked again. 95% of solopreneurs won't recoup the configuration tax, and the parade of new MCPs hides a quiet uninstall rate that makes the whole wave look denser than it actually is.",
    "builder": "Pick the one MCP that replaces a recurring bill — Resend if you pay for transactional email, Framelink if you pay a designer hourly. Install only that one this week. Skip the other four until the first one earns its keep."
  },
  "isHeadline": false
}
---

Five new things plugged into Claude this week. A designer. An email tool. A database. A browser. A 3D modeler. That's not a developer story — that's the integration consultant becoming optional.

[@assafbar's list](https://x.com/assafbar/status/2048480480765636702) of MCPs added in a single 24-hour window reads like a solopreneur's stack, not a tooling roadmap: Blender for 3D scenes, Neon Postgres for the database, Resend for transactional email, Chrome DevTools for the browser, and Framelink Figma to turn designs straight into code. A day later, [@seelffff demoed playwright-mcp](https://x.com/seelffff/status/2048534671168823762) letting Claude analyze a full website — dynamic content included — in 30 seconds. The same week, [@KirkDerpca shipped Rogue Binary MCP](https://x.com/KirkDerpca/status/2048392302666674253), a binary-analysis lab wired into R2, Ghidra, and ILSpy.

## The 'wire AI into your workflow' service just got eaten

The pattern is the giveaway. None of these are agent frameworks or coding tools — they're the apps a non-technical operator already pays for every month. When Figma, Postgres, Chrome, Resend, and Blender all speak the same protocol natively, the bridge job collapses. The pitch of *I'll wire AI into your business* assumed there was a wire to write. With native MCPs, the wire ships with the product.

That's why it matters that [anthropics/claude-code](https://github.com/anthropics/claude-code) sits at 118,164 stars as the reference host, and that [n8n](https://github.com/n8n-io/n8n) — at 185,696 stars — keeps adding native AI primitives. The host is commoditized. The protocol is commoditized. The middleware consultant who charged to glue them together is the soft layer in the middle, and the soft layer is the one that gets compressed first.

## What to watch

Track Framelink Figma's repo activity and pricing page over the next two weeks — if Figma-to-code stops being a separate purchase and becomes a default MCP install, that's a design freelancer's billable hour evaporating in public. Watch n8n's star delta against the 185,696 baseline; the gap between visual workflow tools and pure-MCP setups closes the moment n8n's MCP support matches its 400+ native integrations. And track how many of @assafbar's five MCPs he's still actively using in 30 days. The contrarian case is that most are theater — installed once, demoed on X, then quietly abandoned — and the volume hides a silent uninstall rate that makes the whole wave look bigger than it is.

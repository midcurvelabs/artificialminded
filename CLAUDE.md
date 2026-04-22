# Artificially Minded — Operating Manual

Public daily AI news publication at artificialminded.com. Forked from the private trend-brief pipeline in `~/Documents/rik-docs/`.

## What this repo is

- **Next.js 15 App Router** site, deployed to Vercel.
- **Daily issue** published at 7 AM Europe/Sofia by GitHub Actions.
- **Content** lives as MDX in `content/issues/` and `content/articles/`, committed to `main` by the pipeline.
- **Pipeline** in `pipeline/` invokes the rik-docs fetch scripts, synthesizes trends with Claude Sonnet, writes articles, commits + pushes.

## Voice

Hybrid:
- Article headlines + bodies = editorial. Third person. Active verbs. Short sentences.
- Editorial note at bottom of each issue = first person, signed `— Rik`.
- Banned: em-dashes, "delve", "moreover", "in conclusion", "it's worth noting", AI-slop hedging.

## Design

Newspaper layout. Color tokens in `app/globals.css`:
- Background `#f5f0e8`, page `#faf8f2`, ink `#1a1a1a`.
- Yellow accent `#f5c400` (masthead title span, signal badges).
- Serif body (Georgia / Times New Roman). Mono (Courier New) for badges.

The reference HTML this is ported from: `~/Documents/rik-docs/00_inbox/_operational/morning-briefs/2026-04-22.html`.

## Routes

| URL | Purpose |
|---|---|
| `/` | Today's front page |
| `/article/[slug]` | Single article |
| `/daily/[date]` | Past front page permalink |
| `/archive` | All editions, reverse chrono |
| `/about` | Brand/about |

## Pipeline contract

Fetchers (run in `~/Documents/rik-docs/07_system/scripts/`) write to `pipeline/research/YYYY-MM-DD/{reddit,github,x}.md`. Synthesis reads those, ranks by cross-platform signal, returns top 3-5 trends. Article writer writes one markdown body per trend. Build step writes MDX to `content/`. Publish step commits + pushes.

Quality gate: if < 3 cross-platform trends, write a "quiet day" issue with no articles. Site never has an empty day.

## Phase status

- [x] Phase 1: repo + design system + mock homepage (you are here)
- [ ] Phase 2: MDX content schema + rendering
- [ ] Phase 3: pipeline scripts (no LLM)
- [ ] Phase 4: LLM passes + quality gate
- [ ] Phase 5: GitHub Actions cron + Vercel deploy
- [ ] Phase 6: domain + go-live

Plan: `~/.claude/plans/context-you-need-to-twinkling-sparrow.md`.

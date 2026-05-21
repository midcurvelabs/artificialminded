# Compare Hub — Phase 2-5 TODO

Phase 1 (hub + pages + SEO + OG) shipped on `feat/compare-hub`. This file captures
everything deliberately deferred, so the next thread can pick up cleanly.

## Phase 2 — Article ↔ Compare cross-linking

Goal: articles in `content/articles/*.md` should be able to reference a compare
page by slug without hand-writing the path.

**Token syntax proposal:** `{{compare:claude-vs-gpt}}` in article bodies.

Tasks:
- Extend the article renderer at [app/article/[slug]/page.tsx:20](app/article/[slug]/page.tsx) to
  recognise the token and expand it to `[Claude vs GPT](/compare/claude-vs-gpt)`.
- Update the article-writer prompt (`pipeline/prompts/article-writer.md`) with
  the list of valid compare slugs and instructions to use the token when
  referencing a benchmarked fact.
- Validate at build time: any `{{compare:X}}` where `X` is not in
  `content/compare/` should fail the build, not silently render as text.

## Phase 3 — Reverse lookup ("Recent coverage")

Goal: each compare page shows a "Recent articles mentioning this comparison"
list, built from the article corpus.

Tasks:
- Index step: walk `content/articles/*.md`, extract `{{compare:slug}}` tokens,
  build `{slug: [{articleSlug, date, title}]}` map.
- Expose via `lib/load-compare.ts`: `getArticlesMentioning(slug)`.
- Render as a sidebar module on [app/compare/[slug]/page.tsx](app/compare/[slug]/page.tsx),
  above "More in {cluster}".
- Decide sort: reverse-chronological, cap at 5.

## Phase 4 — Daily rebuild automation

Today sync runs manually via `python pipeline/sync-compare.py`. It should run
as part of the daily pipeline.

Tasks:
- Add sync step to [pipeline/run-daily.sh](pipeline/run-daily.sh) (before
  commit + publish).
- Decide: sync every day, or only when vault notes change? `git diff --quiet`
  on `content/compare/` after sync is a cheap gate.
- Add webhook or scheduled trigger from rik-docs if vault edits happen outside
  the daily window and the site should refresh same-day.
- Commit message convention: `compare: sync N notes (YYYY-MM-DD)`.

## Phase 5 — Monthly data-refresh loop

The comparison data is time-sensitive. An April 2026 benchmark is stale by June.

Tasks:
- Add `lastVerified` date field to frontmatter (distinct from `updated`).
- Monthly cron that flags any compare with `lastVerified > 60 days ago` as
  needing refresh, ping via Slack / issue / whatever.
- Optional: render "Last verified {date}" on the compare page when > 30 days
  stale.

## Phase 6 — Programmatic SEO expansion

Goal: capture long-tail "X vs Y" queries the hub doesn't cover.

Tasks:
- Generate a `[model-a]-vs-[model-b]` grid page programmatically from the
  pricing and benchmarks data already in `price-per-1m-tokens.md` and
  `model-skills-breakdown.md`.
- Likely lives at `/compare/models/[a]-vs-[b]` or similar.
- Non-trivial — needs a structured data layer, not just prose. Probably a
  Phase 2.x project in its own right.

## Ergonomic polish (nice-to-have)

- [ ] Filter UI on the hub (cluster chips that filter the list client-side).
- [ ] Search box on the hub (slug + title + aliases substring match).
- [ ] Confidence filter on the hub ("only high-confidence").
- [ ] "Jump to cluster" sticky nav on the hub for long scroll.
- [ ] Dark-mode variant (would pair with MIDDLE mode if we ever adopt it).
- [ ] Sparkline or mini-chart inside comparison tables for numeric deltas.

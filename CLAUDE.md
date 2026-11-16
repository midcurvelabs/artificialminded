# ArtificialMinded: operating manual

Agency site at artificialminded.com: AI implementation for agencies and SMBs (AI agents and workflows built into a team's existing tools, a person approves before anything goes out, EU hosted, GDPR). Sold by Rik under the ArtificialMinded brand, invoiced by Midcurve Labs EOOD. Positioning changed on 15 Nov 2026; the 29 Oct "content systems for founders" homepage is in git history (commit a616e64). The daily-news publication was removed on 29 Oct 2026.

Deploy: Vercel project `artificialminded` (team midcurvelabs), git-connected. A push to `main` deploys production. Never push without Rik's yes.

Older offer material (Owner Test, price card): rik-docs `02_projects/RikGPT/consulting/rikgpt-offer-headline-diagnostic-price-card.md`. Launch decisions: `02_projects/RikGPT/consulting/site-v1-review.md`.

## Stack

Next.js 15 App Router, React 19, TypeScript, plain CSS. Local dev: `npx next dev -p 3041` (rik-docs launch config `artificialminded`).

## Routes

| URL | What |
|---|---|
| `/` | Agency homepage, dark. Copy in `lib/home.ts`, layout in `app/(home)/`. Hero, three cards, one closing line |
| `/test` | Unlinked since 15 Nov. The Owner Test (`lib/owner-test.ts`, `components/site/OwnerTest.tsx`) |
| `/result/<slug>` | Result pages, noindex |
| `/rikgpt` | Unlinked since 15 Nov. Case study; every number lives in `lib/proof.ts` with its vault file |
| `/privacy`, `/terms`, `/delete-my-data` | GDPR baseline pages |
| `/<keyword>` | Lead-magnet guides (`lib/magnets.ts`), noindex |
| `/synapse` | Old 3D brain homepage, kept for later |
| `/api/lead`, `/api/delete-my-data[/confirm]`, `/api/t` | Lead capture with consent log, Art. 17 erasure, cookieless event relay to PostHog |

## Rules

- Never invent a number. Add it to `lib/proof.ts` with its file and date first.
- No em dashes. No "viral", no "grow your account".
- Homepage stays minimal: one hero, exactly three cards (a typed tuple in `lib/home.ts`), one closing line. No prices, no client numbers, no news framing. New content means swapping a line, not adding a block.
- Single CTA: "Book a 45-minute call", a Cal.com link in `BOOKING_URL` (`lib/site.ts`). While it is null the button shows a visible placeholder.
- Consent box never pre-ticked; a wording change gets a new `CONSENT_VERSION` in `lib/consent.ts`.
- Secrets (Supabase, Resend, PostHog) go in Vercel env; Rik adds them. Without them, leads go to `.data/` and mail prints to the console.
- Any LLM call goes through OpenRouter, never a direct Anthropic key.

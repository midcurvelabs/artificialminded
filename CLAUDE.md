# ArtificialMinded: operating manual

Consultancy site at artificialminded.com: AI-run content systems for founders, sold by Rik under the ArtificialMinded brand (Midcurve Labs EOOD). RikGPT is the lead engine and the proof. The daily-news publication that used to live here was removed on 29 Oct 2026 (git history keeps it).

Source of truth for the offer, the Owner Test and the price card: rik-docs `02_projects/RikGPT/consulting/rikgpt-offer-headline-diagnostic-price-card.md`. Launch decisions: `02_projects/RikGPT/consulting/site-v1-review.md`.

## Stack

Next.js 15 App Router, React 19, TypeScript, plain CSS. Local dev: `npx next dev -p 3041` (rik-docs launch config `artificialminded`).

## Routes

| URL | What |
|---|---|
| `/` | Headline, price card, proof strip, one CTA (the test) |
| `/test` | The Owner Test (`lib/owner-test.ts`, `components/site/OwnerTest.tsx`) |
| `/result/<slug>` | Result pages, noindex |
| `/rikgpt` | Case study; every number lives in `lib/proof.ts` with its vault file |
| `/privacy`, `/terms`, `/delete-my-data` | GDPR baseline pages |
| `/<keyword>` | Lead-magnet guides (`lib/magnets.ts`), noindex |
| `/synapse` | Old 3D brain homepage, kept for later |
| `/api/lead`, `/api/delete-my-data[/confirm]`, `/api/t` | Lead capture with consent log, Art. 17 erasure, cookieless event relay to PostHog |

## Rules

- Never invent a number. Add it to `lib/proof.ts` with its file and date first.
- No em dashes. No "viral", no "grow your account".
- Single CTA: "Take the 2-minute test". The booking button appears on result pages only.
- Consent box never pre-ticked; a wording change gets a new `CONSENT_VERSION` in `lib/consent.ts`.
- Secrets (Supabase, Resend, PostHog) go in Vercel env; Rik adds them. Without them, leads go to `.data/` and mail prints to the console.
- Any LLM call goes through OpenRouter, never a direct Anthropic key.

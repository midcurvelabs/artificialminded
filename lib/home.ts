// Every word on the homepage lives here. Keep it minimal:
// one hero, exactly three "how it runs" cards, one closing line. No prices, no numbers
// (a number needs a source in lib/proof.ts first). No em dashes.

type Card = { kicker: string; title: string; body: string };

export const HOME = {
  eyebrow: "AI implementation for agencies and SMBs",
  struck: "Another AI tool.",
  headline: "AI inside the tools you already use.",
  sub: "We build AI agents and workflows into your Slack, CRM and docs. A person on your team approves before anything goes out.",
  facts: ["Process first", "Human approval", "EU hosted, GDPR"] as const,
  howLabel: "How it runs",
  // A tuple, so a fourth card is a type error. Swap one out instead.
  how: [
    {
      kicker: "Process first",
      title: "We map the work before we build.",
      body: "Where the hours go, who touches what, which step AI should take. Then we pick the tools.",
    },
    {
      kicker: "Human approval",
      title: "Nothing goes out unapproved.",
      body: "The AI drafts. Someone on your team approves it in Slack, or wherever you already work.",
    },
    {
      kicker: "EU hosted",
      title: "Your data stays in the EU.",
      body: "EU hosting and GDPR terms you can sign, before any client data touches the system.",
    },
  ] satisfies [Card, Card, Card],
  closing: "Start with one workflow.",
} as const;

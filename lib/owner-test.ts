// The Owner Test: 10 questions, scoring and result routing.
// Source of truth: rik-docs 02_projects/RikGPT/consulting/rikgpt-offer-headline-diagnostic-price-card.md, Part 2.
// Copy and scores are verbatim from that doc. Change them there first, then here.

export type Track = "ai" | "content";
export type GapId =
  | "no-target" | "no-wiring" | "no-check" | "no-owner"
  | "no-promise" | "no-frame-1" | "no-front-door" | "no-scoreboard";

export type Option = { label: string; score?: number };
export type Question = { id: string; text: string; options: Option[]; track?: Track; gap?: GapId };

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What best describes you?",
    options: [
      { label: "I run a business with a team" },
      { label: "I run an agency or consultancy" },
      { label: "I am a creator or host of a show or podcast" },
      { label: "I work alone, building something of my own" },
      { label: "Other" },
    ],
  },
  {
    id: "q2",
    text: "How many people work with you?",
    options: [{ label: "Just me" }, { label: "2 to 4" }, { label: "5 to 50" }, { label: "More than 50" }],
  },
  {
    id: "q3", track: "ai", gap: "no-target",
    text: "Is there one task someone repeats every week for three hours or more?",
    options: [
      { label: "Yes, I can name it in one sentence", score: 0 },
      { label: "A few things, none of them clear", score: 2 },
      { label: "I cannot name one", score: 3 },
      { label: "No, nothing like that", score: 0 },
    ],
  },
  {
    id: "q4", track: "ai", gap: "no-wiring",
    text: "When your team uses AI today, how does it learn about your business?",
    options: [
      { label: "It is connected to our tools and documents", score: 0 },
      { label: "Connected to one or two tools", score: 1 },
      { label: "People copy and paste into a chat window", score: 3 },
      { label: "Nobody uses AI yet", score: 2 },
    ],
  },
  {
    id: "q5", track: "ai", gap: "no-check",
    text: "Who checks what the AI produced before a customer or a decision sees it?",
    options: [
      { label: "A named person, with a checklist", score: 0 },
      { label: "Whoever happens to notice", score: 2 },
      { label: "Nobody", score: 3 },
      { label: "We do not use AI output that way", score: 0 },
    ],
  },
  {
    id: "q6", track: "ai", gap: "no-owner",
    text: "If an AI workflow broke tomorrow, who would fix it?",
    options: [
      { label: "A named person or vendor on retainer", score: 0 },
      { label: "The one technical person, on the side", score: 2 },
      { label: "Nobody knows", score: 3 },
      { label: "We have no AI workflows", score: 1 },
    ],
  },
  {
    id: "q7", track: "content", gap: "no-promise",
    text: "Could a stranger tell in five seconds what they get from following you?",
    options: [
      { label: "Yes, one clear promise", score: 0 },
      { label: "Partly, we cover a few topics", score: 2 },
      { label: "No, it is a mix", score: 3 },
      { label: "I do not post yet", score: 2 },
    ],
  },
  {
    id: "q8", track: "content", gap: "no-frame-1",
    text: "Of your last ten posts, how many open on the thing itself (the result, the number, the name) in the first second?",
    options: [
      { label: "Six or more", score: 0 },
      { label: "Three to five", score: 1 },
      { label: "Two or fewer", score: 3 },
      { label: "I do not post yet", score: 2 },
    ],
  },
  {
    id: "q9", track: "content", gap: "no-front-door",
    text: "When someone likes a post, what is their next step?",
    options: [
      { label: "A free thing they get by commenting or messaging", score: 0 },
      { label: "An email list or a booking link they can reach in one tap", score: 1 },
      { label: "A link in my bio to a general homepage", score: 2 },
      { label: "Nothing", score: 3 },
    ],
  },
  {
    id: "q10", track: "content", gap: "no-scoreboard",
    text: "How do you know which post produced a lead?",
    options: [
      { label: "Leads or emails per post", score: 0 },
      { label: "Follows per post", score: 1 },
      { label: "Views and likes", score: 3 },
      { label: "I do not", score: 3 },
    ],
  },
];

// Tie-break order inside each track, from the doc.
const ORDER: Record<Track, GapId[]> = {
  ai: ["no-target", "no-wiring", "no-check", "no-owner"],
  content: ["no-promise", "no-frame-1", "no-front-door", "no-scoreboard"],
};

export type Gap = { id: GapId; track: Track; name: string; line: string; fix: string };

export const GAPS: Record<GapId, Gap> = {
  "no-target": {
    id: "no-target", track: "ai", name: "No Target",
    line: "You are shopping for AI before choosing a task.",
    fix: "Write down the one task, who does it, how long it takes, what comes in and what a good output looks like. If you cannot, that is the first job.",
  },
  "no-wiring": {
    id: "no-wiring", track: "ai", name: "No Wiring",
    line: "AI does not know your business, so people paste and hope.",
    fix: "Pick the one tool the task lives in and connect only that one.",
  },
  "no-check": {
    id: "no-check", track: "ai", name: "No Check",
    line: "Output reaches people unreviewed, so errors surface late.",
    fix: "Name one reviewer and write a five-line checklist for that one task.",
  },
  "no-owner": {
    id: "no-owner", track: "ai", name: "No Owner",
    line: "It works until it breaks, then nobody is responsible.",
    fix: "Give each AI workflow one named owner and a place where failures land.",
  },
  "no-promise": {
    id: "no-promise", track: "content", name: "No Promise",
    line: "A stranger cannot tell why to follow you.",
    fix: "Pick one sentence that finishes \"Follow me if you want ___ every week\" and drop topics that do not fit it.",
  },
  "no-frame-1": {
    id: "no-frame-1", track: "content", name: "No Frame 1",
    line: "The first second shows setup, not the thing.",
    fix: "Re-cut your next three posts so frame 1 shows the result, number or name.",
  },
  "no-front-door": {
    id: "no-front-door", track: "content", name: "No Front Door",
    line: "Views are not turning into contacts. RikGPT's own data shows the shape: 121K views brought 102 follows (0.08%, week of 16 to 22 Oct 2026).",
    fix: "Add one free thing tied to one post and ask for a comment keyword. Deliver it by DM.",
  },
  "no-scoreboard": {
    id: "no-scoreboard", track: "content", name: "No Scoreboard",
    line: "You are judging posts by views, which rarely pay.",
    fix: "Track follows and leads per post for 7 days after posting, and do not change your format before 100 posts.",
  },
};

export type Answers = Record<string, number>; // question id -> option index

export type Outcome =
  | { kind: "track"; track: Track; gap: GapId; ai: number; content: number; solo: boolean }
  | { kind: "both"; ai: GapId; content: GapId; aiSum: number; contentSum: number; solo: boolean }
  | { kind: "fine"; ai: number; content: number; solo: boolean };

function topGap(track: Track, answers: Answers): GapId {
  let best = ORDER[track][0];
  let bestScore = -1;
  for (const id of ORDER[track]) {
    const q = QUESTIONS.find((x) => x.gap === id)!;
    const s = q.options[answers[q.id]]?.score ?? 0;
    if (s > bestScore) { best = id; bestScore = s; } // strict ">" keeps the tie-break order
  }
  return best;
}

function sum(track: Track, answers: Answers): number {
  return QUESTIONS.filter((q) => q.track === track)
    .reduce((n, q) => n + (q.options[answers[q.id]]?.score ?? 0), 0);
}

export function score(answers: Answers): Outcome {
  const ai = sum("ai", answers);
  const content = sum("content", answers);
  const solo = answers.q2 === 0; // "Just me": side door note on the result page
  if (ai < 4 && content < 4) return { kind: "fine", ai, content, solo };
  if (ai > content) return { kind: "track", track: "ai", gap: topGap("ai", answers), ai, content, solo };
  if (content > ai) return { kind: "track", track: "content", gap: topGap("content", answers), ai, content, solo };
  return { kind: "both", ai: topGap("ai", answers), content: topGap("content", answers), aiSum: ai, contentSum: content, solo };
}

// Result pages live at /result/<slug>. "both" carries its two gaps in the query string.
export function resultHref(o: Outcome): string {
  const q = new URLSearchParams();
  if (o.solo) q.set("solo", "1");
  let slug: string;
  if (o.kind === "track") slug = `${o.track}-${o.gap}`;
  else if (o.kind === "both") { slug = "both"; q.set("ai", o.ai); q.set("content", o.content); }
  else slug = "fine";
  const qs = q.toString();
  return `/result/${slug}${qs ? `?${qs}` : ""}`;
}

export const RESULT_SLUGS = [
  ...ORDER.ai.map((g) => `ai-${g}`),
  ...ORDER.content.map((g) => `content-${g}`),
  "both",
  "fine",
];

export function q1Tag(answers: Answers): string {
  return QUESTIONS[0].options[answers.q1]?.label ?? "unknown";
}

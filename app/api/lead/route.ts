import { NextResponse } from "next/server";
import { GAPS, QUESTIONS, RESULT_SLUGS, type GapId } from "@/lib/owner-test";
import { sendMail } from "@/lib/mail";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/consent";
import { saveLead } from "@/lib/store";

// POST /api/lead  body: { email, consent: true, result, answers, sourceUrl }
// Stores the email with its consent record. Refuses without the ticked consent box.

const EMAIL = /^[^\s@<>"'&]+@[^\s@<>"'&]+\.[^\s@<>"'&]+$/;

export async function POST(req: Request) {
  let body: any;
  try {
    const text = await req.text();
    if (text.length > 4000) return NextResponse.json({ error: "Too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const email = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (body?.consent !== true) return NextResponse.json({ error: "Please tick the consent box." }, { status: 400 });

  const result = String(body?.result ?? "");
  if (!RESULT_SLUGS.includes(result)) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  // Keep only valid answer indexes for known questions.
  const answers: Record<string, number> = {};
  for (const q of QUESTIONS) {
    const v = body?.answers?.[q.id];
    if (Number.isInteger(v) && v >= 0 && v < q.options.length) answers[q.id] = v;
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;
  try {
    await saveLead({
      email,
      consent_text: CONSENT_TEXT,
      consent_version: CONSENT_VERSION,
      consent_ip: ip,
      consent_user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      consent_source_url: typeof body?.sourceUrl === "string" ? body.sourceUrl.slice(0, 300) : null,
      consented_at: new Date().toISOString(),
      marketing_consent: true,
      source: "owner-test",
      role_tag: answers.q1 !== undefined ? QUESTIONS[0].options[answers.q1].label : null,
      team_size: answers.q2 !== undefined ? QUESTIONS[1].options[answers.q2].label : null,
      result,
      answers,
    });
  } catch (e) {
    console.error("[lead]", e);
    return NextResponse.json({ error: "Could not save. You can still see your result." }, { status: 500 });
  }

  // Send the result. A mail failure never blocks the result page.
  const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  const href = typeof body?.href === "string" ? body.href : "";
  const resultPath = /^\/result\/[a-z0-9-]+(\?[a-z0-9=&-]*)?$/.test(href) ? href : `/result/${result}`;
  const gap = GAPS[result.replace(/^(ai|content)-/, "") as GapId];
  const lines = gap
    ? `<p><strong>${gap.name}.</strong> ${gap.line}</p><p>First fix: ${gap.fix}</p>`
    : result === "fine"
      ? "<p>Your setup is mostly sound. Keep a scoreboard of follows and leads per post, 7 days after posting.</p>"
      : "<p>Both of your tracks tied. Your full result is on the page below.</p>";
  try {
    await sendMail(
      email,
      "Your Owner Test result",
      `${lines}<p><a href="${base}${resultPath}">See your result page</a></p>
       <p>ArtificialMinded · <a href="${base}/delete-my-data">Delete my data</a></p>`,
    );
  } catch (e) {
    console.error("[lead:mail]", e);
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { getMagnet } from "@/lib/magnets";

// First-party relay for magnet-page and Owner Test events. Keeps the PostHog key server-side and
// gets past ad blockers. Without POSTHOG_KEY it just logs, so local dev needs no setup.

const EVENTS = new Set(["magnet_view", "magnet_engaged", "magnet_copy", "magnet_finish"]);
// The Owner Test sends these with keyword "owner-test" (anonymous, no answers, only the question number and result type).
const TEST_EVENTS = new Set(["test_start", "test_question", "test_complete", "test_email_saved", "test_email_skipped"]);
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const clip = (v: unknown, n = 100) => (typeof v === "string" ? v.slice(0, n) : undefined);

export async function POST(req: Request) {
  let data: any;
  try {
    const text = await req.text();
    if (text.length > 4000) return new NextResponse(null, { status: 413 });
    data = JSON.parse(text);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const isTest = data?.keyword === "owner-test" && TEST_EVENTS.has(data?.event);
  if (!isTest && (!EVENTS.has(data?.event) || !getMagnet(data?.keyword))) {
    return new NextResponse(null, { status: 400 });
  }

  const properties: Record<string, unknown> = {
    keyword: data.keyword,
    referrer: clip(data.referrer, 200),
    $process_person_profile: false, // anonymous events, no person profiles
  };
  for (const k of UTM_KEYS) {
    const v = clip(data?.utm?.[k]);
    if (v) properties[k] = v;
  }
  if (data.props && typeof data.props === "object") {
    for (const [k, v] of Object.entries(data.props).slice(0, 8)) {
      if (typeof v === "number") properties[k] = v;
      else if (typeof v === "string") properties[k] = v.slice(0, 100);
    }
  }

  const key = process.env.POSTHOG_KEY;
  if (!key) {
    console.log("[magnet-track]", data.event, properties);
    return new NextResponse(null, { status: 204 });
  }

  const host = process.env.POSTHOG_HOST || "https://eu.i.posthog.com";
  try {
    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event: data.event,
        distinct_id: clip(data.sid, 64) || "anon",
        properties,
      }),
    });
  } catch {
    // tracking must never break the page
  }
  return new NextResponse(null, { status: 204 });
}

import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { saveDeletionRequest } from "@/lib/store";
import { sendMail } from "@/lib/mail";
import { CONTACT_EMAIL, ENTITY } from "@/lib/site";

// GDPR Art. 17. Step 1 of 2: record the request and email a confirmation link (24 h).
// Step 2 is /api/delete-my-data/confirm. Same answer whether or not the email is on file.

const EMAIL = /^[^\s@<>"'&]+@[^\s@<>"'&]+\.[^\s@<>"'&]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  const confirmUrl = `${base}/api/delete-my-data/confirm?token=${token}`;

  try {
    await saveDeletionRequest({ token, email, expires_at: expires });
    await sendMail(
      email,
      "Confirm deletion of your data",
      `<p>You asked us to delete all data linked to <strong>${email}</strong>.</p>
       <p><a href="${confirmUrl}">Confirm the deletion</a>. The link works for 24 hours.</p>
       <p>If you did not ask for this, ignore this email and nothing is deleted.</p>
       <p>ArtificialMinded, ${ENTITY.name} · ${CONTACT_EMAIL}</p>`,
    );
  } catch (e) {
    console.error("[delete-my-data]", e);
    return NextResponse.json({ error: `Something went wrong. Email ${CONTACT_EMAIL} and we will do it by hand.` }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

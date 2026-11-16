import { NextResponse } from "next/server";
import { confirmDeletion } from "@/lib/store";

// GDPR Art. 17, step 2 of 2: the link from the confirmation email. Erases, then shows the outcome page.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  let status = "invalid";
  if (/^[a-f0-9]{64}$/.test(token)) {
    try {
      status = (await confirmDeletion(token)) ? "done" : "invalid";
    } catch (e) {
      console.error("[delete-my-data/confirm]", e);
      status = "error";
    }
  }
  return NextResponse.redirect(new URL(`/delete-my-data?status=${status}`, url.origin), 303);
}

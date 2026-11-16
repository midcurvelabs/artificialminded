import type { Metadata } from "next";
import Link from "next/link";
import DeleteForm from "@/components/site/DeleteForm";
import { CONTACT_EMAIL } from "@/lib/site";

// GDPR Art. 17. Two steps: request here, confirm from the email (api/delete-my-data/confirm). 30-day SLA.

export const metadata: Metadata = { title: "Delete my data", robots: { index: false, follow: true } };

const STATUS: Record<string, { ok: boolean; text: string }> = {
  done: { ok: true, text: "Done. Your email, test answers and consent record have been deleted." },
  invalid: { ok: false, text: "That link has expired or was already used. Ask for a new one below." },
  error: { ok: false, text: `Something went wrong on our side. Email ${CONTACT_EMAIL} and we will delete it by hand.` },
};

export default async function DeletePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const s = STATUS[(await searchParams).status ?? ""];
  return (
    <div className="am-shell">
      <article className="am-legal">
        <h1>Delete my data</h1>
        <p>Enter the email address you used. We send a confirmation link to that address, so nobody can delete someone else&apos;s data. When you click it, we delete your email, test answers and consent record. It happens at once; the legal limit is 30 days.</p>
        {s && <div className={s.ok ? "am-ok" : "am-err"} role="status">{s.text}</div>}
        <DeleteForm />
        <p>No access to that inbox? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. More in <Link href="/privacy">Privacy</Link>.</p>
      </article>
    </div>
  );
}

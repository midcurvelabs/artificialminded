import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, ENTITY } from "@/lib/site";

// From the vault template 02_projects/_audits/2026-05-27-email-gdpr-compliance/templates/terms-of-service.template.md.
// This site has no accounts and no checkout; paid work runs on a separate written agreement.

export const metadata: Metadata = { title: "Terms" };
const UPDATED = "29 October 2026";

export default function TermsPage() {
  return (
    <div className="am-shell">
      <article className="am-legal">
        <div className="am-label">Last updated {UPDATED}</div>
        <h1>Terms</h1>

        <h2>1. Who we are</h2>
        <p>artificialminded.com (the &quot;site&quot;) is run by {ENTITY.name}, trading as ArtificialMinded, VAT {ENTITY.vat}. By using the site you agree to these terms.</p>

        <h2>2. The free test and guides</h2>
        <p>The Owner Test and the guides are general information, not professional advice for your situation. Use them at your own judgment.</p>

        <h2>3. Paid work</h2>
        <p>Prices on the site are in euro, excluding VAT, and are an invitation to talk, not a binding offer. Paid work starts only with a separate written agreement that sets the scope, price, payment terms and any warranty. If that agreement differs from the site, the agreement wins.</p>

        <h2>4. Acceptable use</h2>
        <ul>
          <li>Do not break the law through the site, including data protection, intellectual property and spam laws.</li>
          <li>Do not scrape, overload or try to disrupt the site.</li>
          <li>Do not submit someone else&apos;s email address.</li>
        </ul>

        <h2>5. Content</h2>
        <p>The site&apos;s text, prompts and designs belong to {ENTITY.name}. Guides marked as copyable may be used in your own work. Third-party names and trademarks belong to their owners.</p>

        <h2>6. Your data</h2>
        <p>See <Link href="/privacy">Privacy</Link>. You can delete your data at any time at <Link href="/delete-my-data">/delete-my-data</Link>.</p>

        <h2>7. Liability</h2>
        <p>The site is provided as is. To the extent the law allows, our total liability for any claim about the site is limited to €100. Nothing limits liability that the law does not allow to be limited, such as for gross negligence, fraud or your rights as an EU consumer.</p>

        <h2>8. Governing law</h2>
        <p>These terms are governed by Bulgarian law, and disputes go to the competent courts in Sofia, Bulgaria, except where consumer law lets you bring a claim in your own country.</p>

        <h2>9. Changes</h2>
        <p>We may update these terms. Material changes are announced at least 30 days before they apply.</p>

        <h2>10. Contact</h2>
        <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </article>
    </div>
  );
}

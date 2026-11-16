import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, ENTITY } from "@/lib/site";
import { PlaceholderInline } from "@/components/site/Placeholder";

// From the vault template 02_projects/_audits/2026-05-27-email-gdpr-compliance/templates/privacy-policy.template.md,
// cut down to what this site actually does: the Owner Test, its email capture, and anonymous page events.

export const metadata: Metadata = { title: "Privacy" };
const UPDATED = "29 October 2026";

export default function PrivacyPage() {
  return (
    <div className="am-shell">
      <article className="am-legal">
        <div className="am-label">Last updated {UPDATED}</div>
        <h1>Privacy</h1>
        <p>This policy explains how ArtificialMinded collects, uses and protects your personal data when you use artificialminded.com. We process data under the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive.</p>

        <h2>1. Who we are</h2>
        <ul>
          <li><b>Controller:</b> {ENTITY.name}, trading as ArtificialMinded. VAT {ENTITY.vat}.</li>
          <li><b>Postal address:</b> {ENTITY.address ?? <PlaceholderInline>registered address</PlaceholderInline>}</li>
          <li><b>Privacy contact:</b> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We have no formal DPO; we are below the Art. 37 threshold.</li>
        </ul>

        <h2>2. What we collect</h2>
        <div className="am-table-scroll">
          <table>
            <thead><tr><th>Data</th><th>When</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td>Your Owner Test answers</td><td>Only if you send them with your email</td><td>To send your result and prepare a call</td></tr>
              <tr><td>Email address</td><td>When you ask for your result by email</td><td>To send the result and, with your consent, occasional notes</td></tr>
              <tr><td>Consent record: the exact text you agreed to, its version, time, page, IP address and browser string</td><td>With your email</td><td>To prove consent (GDPR Art. 7(1))</td></tr>
              <tr><td>Anonymous page events (page viewed, test started, question reached, result type, campaign tags)</td><td>On guide pages and the test</td><td>To see which guides and questions help. No cookies, no profiles</td></tr>
            </tbody>
          </table>
        </div>
        <p>You can take the test without giving an email. Answers you do not send stay in your browser.</p>

        <h2>3. Lawful bases (GDPR Art. 6)</h2>
        <ul>
          <li><b>Sending your result and occasional notes:</b> your consent, Art. 6(1)(a). You can withdraw it at any time.</li>
          <li><b>Anonymous page events, security and abuse prevention:</b> legitimate interest, Art. 6(1)(f). Low risk, no tracking across sites.</li>
          <li><b>Invoices and accounting if you become a client:</b> legal obligation, Art. 6(1)(c).</li>
        </ul>

        <h2>4. Who processes data for us</h2>
        <div className="am-table-scroll">
          <table>
            <thead><tr><th>Processor</th><th>Purpose</th><th>Location and transfer basis</th></tr></thead>
            <tbody>
              <tr><td>Vercel</td><td>Hosting</td><td>US, EU-US Data Privacy Framework and SCCs</td></tr>
              <tr><td>Supabase</td><td>Database for emails and consent records</td><td>Region <PlaceholderInline>EU region to confirm</PlaceholderInline>, DPF and SCCs</td></tr>
              <tr><td>Resend</td><td>Sending your result and confirmation emails</td><td>US, DPF and SCCs</td></tr>
              <tr><td>PostHog</td><td>Anonymous page events</td><td>EU (Frankfurt)</td></tr>
              <tr><td>Cal.com</td><td>Booking a call</td><td>EU or US, DPF and SCCs</td></tr>
            </tbody>
          </table>
        </div>

        <h2>5. How long we keep it</h2>
        <ul>
          <li>Email, answers and consent record: until you unsubscribe or ask for deletion. After an unsubscribe, the entry is deleted within 30 days, except a hashed suppression entry so we never email you again.</li>
          <li>Server logs: up to 90 days.</li>
          <li>Invoices: as long as accounting law requires.</li>
        </ul>

        <h2>6. Your rights (GDPR Art. 15 to 22)</h2>
        <p>You can ask to see, correct, delete, restrict or port your data, object to processing, and withdraw consent at any time without affecting earlier processing. Delete everything yourself at <Link href="/delete-my-data">/delete-my-data</Link>, or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We answer within 30 days (Art. 12(3)). You can also complain to your national data protection authority; in Bulgaria that is the Commission for Personal Data Protection.</p>

        <h2>7. Cookies</h2>
        <p>This site sets no cookies. Guide pages and the test keep a random visit id in your browser&apos;s session storage, which is cleared when you close the tab.</p>

        <h2>8. Children</h2>
        <p>This site is not meant for anyone under 16. If a child has sent us data, contact us and we will delete it.</p>

        <h2>9. Changes</h2>
        <p>We will email people on our list about material changes at least 30 days before they apply. The date at the top shows the latest change.</p>
      </article>
    </div>
  );
}

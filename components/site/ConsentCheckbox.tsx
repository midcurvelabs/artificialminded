// GDPR consent checkbox, from the vault template (02_projects/_audits/2026-05-27-email-gdpr-compliance/templates/consent-checkbox.tsx).
// Never pre-ticked (CJEU C-673/17 Planet49). The exact text shown is logged with the email, see lib/consent.ts.

import Link from "next/link";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/consent";

export function ConsentCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="am-consent">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        data-consent-version={CONSENT_VERSION}
      />
      <span>
        {CONSENT_TEXT}{" "}
        <Link href="/privacy" target="_blank" rel="noopener">Privacy</Link> ·{" "}
        <Link href="/terms" target="_blank" rel="noopener">Terms</Link>
      </span>
    </label>
  );
}

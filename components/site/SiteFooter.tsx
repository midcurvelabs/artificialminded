import Link from "next/link";
import { ENTITY, WORDMARK } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="am-foot">
      <div className="am-shell">
        <div>
          {WORDMARK} is a brand of {ENTITY.name} · VAT {ENTITY.vat}
          <br />
          Prices in euro, excluding VAT.
        </div>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/delete-my-data">Delete my data</Link>
        </nav>
      </div>
    </footer>
  );
}

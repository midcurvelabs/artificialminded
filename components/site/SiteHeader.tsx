import Link from "next/link";
import { WORDMARK } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="am-head">
      <div className="am-shell">
        <Link href="/" className="am-mark" aria-label={`${WORDMARK} home`}>
          <i aria-hidden="true" />
          {WORDMARK}
        </Link>
        <nav className="am-nav" aria-label="Main">
          <Link href="/rikgpt" className="am-hide-sm">The RikGPT build</Link>
          <Link href="/#prices" className="am-hide-sm">Prices</Link>
          <Link href="/test">Take the test</Link>
        </nav>
      </div>
    </header>
  );
}

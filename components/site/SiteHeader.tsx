import Link from "next/link";
import { BOOKING_URL, WORDMARK } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="am-head">
      <div className="am-shell">
        <Link href="/" className="am-mark" aria-label={`${WORDMARK} home`}>
          <i aria-hidden="true" />
          {WORDMARK}
        </Link>
        <nav className="am-nav" aria-label="Main">
          {BOOKING_URL ? (
            <a href={BOOKING_URL} target="_blank" rel="noopener">Book a call</a>
          ) : (
            <Link href="/">Home</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

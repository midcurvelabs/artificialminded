import Link from "next/link";

/**
 * Minimal site nav. Rendered alongside the Masthead on section landing pages.
 * Kept as a separate component so the Masthead stays untouched for parallel
 * work on the daily pipeline.
 */
export function SiteNav() {
  return (
    <nav className="site-nav">
      <Link href="/">Today</Link>
      <Link href="/archive">Archive</Link>
      <Link href="/compare">Compare</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

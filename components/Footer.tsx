import Link from "next/link";

export function Footer({ date }: { date: string }) {
  return (
    <footer className="footer">
      <span>artificialminded.com · issue {date}</span>
      <span>
        <Link href="/archive">Archive</Link> · <Link href="/about">About</Link> ·{" "}
        <a href="/feed.xml">RSS</a>
      </span>
    </footer>
  );
}

import { BOOKING_URL } from "@/lib/site";
import { PlaceholderInline } from "./Placeholder";

// The only booking entry point on the site. It appears on result pages only (single-CTA rule).
export default function BookButton({ label = "Book a free 30-minute call" }: { label?: string }) {
  if (!BOOKING_URL) {
    return (
      <span style={{ display: "inline-flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <span className="am-btn" aria-disabled="true">{label}</span>
        <PlaceholderInline>booking link not set</PlaceholderInline>
      </span>
    );
  }
  return (
    <a className="am-btn" href={BOOKING_URL} target="_blank" rel="noopener">
      {label}
    </a>
  );
}

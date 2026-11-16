import { BOOKING_URL, CALL_LABEL } from "@/lib/site";

// The one CTA on the homepage. Until BOOKING_URL is set it renders as a dead pill
// with a visible placeholder note, so nobody ships a button that goes nowhere unnoticed.
export default function CallButton({ label = CALL_LABEL, note = true }: { label?: string; note?: boolean }) {
  if (!BOOKING_URL) {
    return (
      <span className="hm-cta-wrap">
        <span className="hm-pill" aria-disabled="true">
          {label}
          <i aria-hidden="true" />
        </span>
        {note && <span className="hm-ph">PLACEHOLDER: Cal.com link not set</span>}
      </span>
    );
  }
  return (
    <a className="hm-pill" href={BOOKING_URL} target="_blank" rel="noopener">
      {label}
      <i aria-hidden="true" />
    </a>
  );
}

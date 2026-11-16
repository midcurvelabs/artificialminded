// Site-wide facts for the ArtificialMinded consultancy pages. One place to change them.
// Anything still waiting on Rik is listed in rik-docs 02_projects/RikGPT/consulting/site-v1-review.md.

export { WORDMARK } from "./magnets";

export const ENTITY = {
  name: "Midcurve Labs EOOD",
  vat: "BG208144378",
  // DECISION: registered postal address (GDPR Art. 13 needs it on /privacy).
  address: null as string | null,
};

// Rik, 29 Oct: one domain address for privacy, terms and replies. Rik sets up the mailbox or forwarding.
export const CONTACT_EMAIL = "hello@artificialminded.com";

// Rik, 15 Nov: the one CTA is a 45-minute call on Cal.com. Paste the event link here;
// until then every call button renders as a visible placeholder.
export const BOOKING_URL: string | null = null;
export const CALL_LABEL = "Book a 45-minute call";

export const CLIENT_CAP = 2;

export const RIKGPT_IG = "https://www.instagram.com/rikgpt/";

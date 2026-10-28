// Client-side tracking for magnet pages. Cookieless: the visitor id lives in sessionStorage only.
// Events go to our own /api/t route, which forwards to PostHog server-side.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const SID_KEY = "am_sid";
const UTM_KEY = "am_utm";

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

function sessionId(): string {
  return safe(() => {
    let id = sessionStorage.getItem(SID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SID_KEY, id);
    }
    return id;
  }, "anon");
}

// UTMs arrive on the first page view. Keep them for the rest of the visit.
function utm(): Utm {
  return safe(() => {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 100);
    }
    if (Object.keys(found).length) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
      return found;
    }
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}") as Utm;
  }, {});
}

export function track(event: string, keyword: string, props: Record<string, string | number> = {}) {
  const body = JSON.stringify({
    event,
    keyword,
    sid: sessionId(),
    utm: utm(),
    props,
    referrer: safe(() => document.referrer.slice(0, 200), ""),
  });
  safe(() => {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/t", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/t", { method: "POST", body, keepalive: true });
    }
  }, undefined);
}

import type { CSSProperties } from "react";
import { SynapseBrain } from "../SynapseBrain";
import { HOME } from "@/lib/home";
import { BOOKING_URL, WORDMARK } from "@/lib/site";

// The homepage: the abstract brain, full-bleed, with small mono labels in the corners.
// Copy lives in lib/home.ts. The only interactive element is the call link, top right.

const MONO = "ui-monospace, 'SF Mono', Menlo, Monaco, 'Courier New', monospace";

const corner: CSSProperties = {
  position: "absolute",
  left: "clamp(16px, 4vw, 32px)",
  right: "clamp(16px, 4vw, 32px)",
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  fontFamily: MONO,
  textTransform: "uppercase",
  color: "#fff",
  mixBlendMode: "difference",
  pointerEvents: "none",
  zIndex: 2,
};

export default function HomePage() {
  return (
    <main style={{ position: "fixed", inset: 0, background: "#ffffff", overflow: "hidden", cursor: "crosshair" }}>
      <SynapseBrain />

      <header style={{ ...corner, top: 28, alignItems: "baseline", fontSize: 11, letterSpacing: "0.18em" }}>
        <h1 style={{ font: "inherit", margin: 0 }}>{WORDMARK}</h1>
        {BOOKING_URL ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid currentColor", paddingBottom: 2, pointerEvents: "auto", cursor: "pointer" }}
          >
            {HOME.topRight} ↗
          </a>
        ) : (
          <span style={{ opacity: 0.7 }} title="BOOKING_URL in lib/site.ts">
            {HOME.topRight} [no link]
          </span>
        )}
      </header>

      <footer style={{ ...corner, bottom: 28, alignItems: "flex-end", fontSize: 10, letterSpacing: "0.16em" }}>
        <p style={{ margin: 0, maxWidth: 440, lineHeight: 1.6, opacity: 0.85 }}>
          {HOME.lines[0]}
          <br />
          {HOME.lines[1]}
        </p>
        <div style={{ textAlign: "right", opacity: 0.85, whiteSpace: "nowrap" }} className="hm-hide-sm">
          {HOME.bottomRight}
        </div>
      </footer>
    </main>
  );
}

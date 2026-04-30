import { SynapseBrain } from "./SynapseBrain";

export default function HomePage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        overflow: "hidden",
        cursor: "crosshair",
      }}
    >
      <SynapseBrain />

      <header
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          right: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily:
            "ui-monospace, 'SF Mono', Menlo, Monaco, 'Courier New', monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#0a0a0a",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#fff" }}>ARTIFICIALLY&nbsp;MINDED</span>
        <span style={{ color: "#fff", opacity: 0.7 }}>SYNAPSE / v0.1</span>
      </header>

      <footer
        style={{
          position: "absolute",
          bottom: 28,
          left: 32,
          right: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily:
            "ui-monospace, 'SF Mono', Menlo, Monaco, 'Courier New', monospace",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#fff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 320, lineHeight: 1.6, opacity: 0.85 }}>
          A daily field report from the AI frontier.
          <br />
          Move your cursor. Trace the surface.
        </div>
        <div style={{ textAlign: "right", opacity: 0.85 }}>
          NEURAL&nbsp;MESH&nbsp;//&nbsp;LIVE
        </div>
      </footer>
    </main>
  );
}

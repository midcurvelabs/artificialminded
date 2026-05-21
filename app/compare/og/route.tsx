import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#faf8f2",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#1a1a1a",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "18px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#666",
            fontFamily: "'Courier New', monospace",
          }}
        >
          <span>Artificially Minded</span>
          <span style={{ color: "#aaa" }}>·</span>
          <span>Research</span>
        </div>

        <div
          style={{
            fontSize: "110px",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginTop: "32px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span>The AI&nbsp;</span>
          <span>Compare&nbsp;</span>
          <span style={{ background: "#f5c400", padding: "0 18px" }}>Hub</span>
        </div>

        <div
          style={{
            fontSize: "30px",
            fontStyle: "italic",
            color: "#333",
            marginTop: "32px",
            maxWidth: "880px",
            lineHeight: 1.35,
            display: "flex",
          }}
        >
          23 head-to-head AI comparisons. Every number cited. Every claim dated.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "72px",
            right: "72px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "18px",
            color: "#666",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            borderTop: "2px solid #1a1a1a",
            paddingTop: "20px",
          }}
        >
          <span>artificialminded.com/compare</span>
          <span>April 2026</span>
        </div>
      </div>
    ),
    SIZE,
  );
}

import { ImageResponse } from "next/og";
import { getCompare } from "@/lib/load-compare";
import { clusterLabel } from "@/lib/compare-types";

// Runs in Node.js (not edge) so it can read the filesystem via load-compare.
export const runtime = "nodejs";

const SIZE = { width: 1200, height: 630 };

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const compare = await getCompare(slug);
  if (!compare) {
    return new Response("Not found", { status: 404 });
  }

  const title = compare.title;
  const tldr = compare.tldr.length > 240 ? `${compare.tldr.slice(0, 237)}…` : compare.tldr;
  const titleSize = title.length > 36 ? 80 : title.length > 22 ? 104 : 128;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#faf8f2",
          padding: "56px 64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#1a1a1a",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "16px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#555",
            fontFamily: "'Courier New', monospace",
          }}
        >
          <span
            style={{
              background: "#1a1a1a",
              color: "#f5c400",
              padding: "4px 10px",
              fontWeight: 900,
            }}
          >
            {clusterLabel(compare.cluster)}
          </span>
          <span>·</span>
          <span>Comparison</span>
        </div>

        <div
          style={{
            fontSize: `${titleSize}px`,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            marginTop: "28px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "26px",
            fontStyle: "italic",
            color: "#333",
            marginTop: "24px",
            maxWidth: "1000px",
            lineHeight: 1.35,
            borderLeft: "6px solid #f5c400",
            paddingLeft: "18px",
            display: "flex",
          }}
        >
          {tldr}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "64px",
            right: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            color: "#666",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            borderTop: "2px solid #1a1a1a",
            paddingTop: "16px",
          }}
        >
          <span>artificialminded.com/compare</span>
          <span>
            {compare.sources.length} sources · {compare.confidence} confidence
          </span>
        </div>
      </div>
    ),
    SIZE,
  );
}

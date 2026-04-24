import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { CompareSource } from "@/lib/compare-types";
import type { ChartSpec } from "@/lib/chart-types";
import { CompareChart } from "./CompareChart";

/**
 * Append footnote definitions derived from frontmatter.sources so remark-gfm
 * can wire up `[^N]` refs to definitions and render a proper footnotes section.
 * The section is re-labeled "Sources" via remark-rehype options.
 */
function withFootnotes(body: string, sources: CompareSource[]): string {
  if (sources.length === 0) return body;
  const defs = sources
    .map((s) => `[^${s.id}]: [${domainOf(s.url)}](${s.url})`)
    .join("\n");
  return `${body}\n\n${defs}\n`;
}

function domainOf(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const components: Components = {
  table({ children }) {
    return (
      <div className="compare-table-wrap">
        <table className="compare-table">{children}</table>
      </div>
    );
  },
  a({ href, children }) {
    if (!href) return <a>{children}</a>;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <a href={href}>{children}</a>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  code({ children, className }) {
    const inline = !className;
    if (inline) return <code className="compare-code">{children}</code>;
    return (
      <pre className="compare-pre">
        <code className={className}>{children}</code>
      </pre>
    );
  },
};

// `::chart[id]` must appear on its own line to be treated as a block marker.
const CHART_MARKER = /^::chart\[([a-z0-9-_]+)\]\s*$/i;

interface SegmentText {
  kind: "text";
  body: string;
}
interface SegmentChart {
  kind: "chart";
  id: string;
}

function splitOnChartMarkers(body: string): (SegmentText | SegmentChart)[] {
  const lines = body.split("\n");
  const segments: (SegmentText | SegmentChart)[] = [];
  let buffer: string[] = [];
  const flush = () => {
    if (buffer.length === 0) return;
    segments.push({ kind: "text", body: buffer.join("\n") });
    buffer = [];
  };
  for (const line of lines) {
    const match = line.match(CHART_MARKER);
    if (match) {
      flush();
      segments.push({ kind: "chart", id: match[1] });
    } else {
      buffer.push(line);
    }
  }
  flush();
  return segments;
}

export function CompareMarkdown({
  body,
  sources,
  charts = [],
}: {
  body: string;
  sources: CompareSource[];
  charts?: ChartSpec[];
}) {
  const chartById = new Map(charts.map((c) => [c.id, c]));
  const segments = splitOnChartMarkers(body);

  return (
    <div className="compare-body">
      {segments.map((seg, i) => {
        if (seg.kind === "chart") {
          const spec = chartById.get(seg.id);
          if (!spec) {
            return (
              <div key={i} className="compare-chart-missing">
                Chart <code>{seg.id}</code> not found.
              </div>
            );
          }
          return <CompareChart key={i} spec={spec} />;
        }
        const isLast = i === segments.length - 1;
        const content = isLast ? withFootnotes(seg.body, sources) : seg.body;
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            remarkRehypeOptions={{
              footnoteLabel: "Sources",
              footnoteBackLabel: "Back to citation",
            }}
            components={components}
          >
            {content}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}

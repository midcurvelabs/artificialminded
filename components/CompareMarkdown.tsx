import { Children, isValidElement, type ReactNode } from "react";
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

// remark-gfm doesn't wire up `[^N]` footnote refs inside GFM table cells,
// so they render as literal text. Walk text children and promote those
// patterns into proper `<sup><a href="#user-content-fn-N">N</a></sup>` links.
const FOOTNOTE_REF = /\[\^(\d+)\]/g;

function promoteFootnoteRefs(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      if (!child.includes("[^")) return child;
      const parts: ReactNode[] = [];
      let lastIndex = 0;
      for (const m of child.matchAll(FOOTNOTE_REF)) {
        const id = m[1];
        const start = m.index ?? 0;
        if (start > lastIndex) parts.push(child.slice(lastIndex, start));
        parts.push(
          <sup key={`${start}-${id}`} className="compare-footnote-ref">
            <a href={`#user-content-fn-${id}`} id={`user-content-fnref-${id}`}>
              {id}
            </a>
          </sup>,
        );
        lastIndex = start + m[0].length;
      }
      if (lastIndex < child.length) parts.push(child.slice(lastIndex));
      return parts;
    }
    if (isValidElement(child)) return child;
    return child;
  });
}

const components: Components = {
  table({ children }) {
    return (
      <div className="compare-table-wrap">
        <table className="compare-table">{children}</table>
      </div>
    );
  },
  td({ children }) {
    return <td>{promoteFootnoteRefs(children)}</td>;
  },
  th({ children }) {
    return <th>{promoteFootnoteRefs(children)}</th>;
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

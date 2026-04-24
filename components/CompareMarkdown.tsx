import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { CompareSource } from "@/lib/compare-types";

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

export function CompareMarkdown({
  body,
  sources,
}: {
  body: string;
  sources: CompareSource[];
}) {
  return (
    <div className="compare-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        remarkRehypeOptions={{
          footnoteLabel: "Sources",
          footnoteBackLabel: "Back to citation",
        }}
        components={components}
      >
        {withFootnotes(body, sources)}
      </ReactMarkdown>
    </div>
  );
}

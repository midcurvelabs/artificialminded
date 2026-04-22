import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockIssue } from "@/lib/mock-issue";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { SignalBadge } from "@/components/SignalBadge";
import { CouncilOpinion } from "@/components/CouncilOpinion";

function getArticle(slug: string) {
  // Phase 1: only mock issue. Phase 2 reads from content/articles/*.mdx.
  const all = [mockIssue.headline, ...mockIssue.trends];
  return all.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.deck,
    openGraph: { title: article.title, description: article.deck, type: "article" },
  };
}

function renderBody(markdown: string) {
  // Lightweight renderer for Phase 1. Phase 2 swaps in MDX/remark.
  // Splits on blank lines into paragraphs; recognises ## headings; resolves [text](url) inline links.
  const blocks = markdown.split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.slice(3)}</h2>;
    }
    return <p key={i}>{renderInline(block)}</p>;
  });
}

function renderInline(text: string): React.ReactNode[] {
  // Match [label](url) and *italic*. Naive but enough for Phase 1.
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      out.push(
        <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      out.push(<em key={key++}>{m[3]}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Masthead
        volume={mockIssue.volume}
        issueNumber={mockIssue.issueNumber}
        weekday={mockIssue.weekday}
        prettyDate={mockIssue.prettyDate}
      />
      <article className="article">
        <div className="article-eyebrow">
          {article.isHeadline ? "Top story" : "Today's stories"} · {mockIssue.prettyDate}
        </div>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-deck">{article.deck}</p>
        <div className="article-meta">
          <span>
            By the Editors · <SignalBadge signal={article.signal} />
          </span>
          <span>
            {article.sources.length} sources cited
          </span>
        </div>
        <div className="article-body">{renderBody(article.body)}</div>

        {article.council && (
          <>
            <h2 style={{ fontSize: "16px", fontWeight: 900, marginTop: "32px", marginBottom: "8px" }}>
              The council weighs in
            </h2>
            <CouncilOpinion council={article.council} />
          </>
        )}

        <h2 style={{ fontSize: "16px", fontWeight: 900, marginTop: "28px", marginBottom: "8px" }}>
          Sources
        </h2>
        <ul style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: 1.7 }}>
          {article.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </article>
      <Footer date={mockIssue.date} />
    </>
  );
}

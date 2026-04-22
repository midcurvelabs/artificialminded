import Link from "next/link";
import type { Article } from "@/lib/types";
import { SignalBadge } from "./SignalBadge";

export function HeadlineStory({ article }: { article: Article }) {
  return (
    <section className="headline-strip">
      <div className="headline-label">
        Top story <SignalBadge signal={article.signal} />
      </div>
      <h2 className="headline-main">
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h2>
      <p className="headline-deck">{article.deck}</p>
      <div className="headline-sources">
        Sources:{" "}
        {article.sources.map((s, i) => (
          <span key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
            {i < article.sources.length - 1 ? " · " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}

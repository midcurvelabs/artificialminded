import Link from "next/link";
import type { Article } from "@/lib/types";
import { SignalBadge } from "./SignalBadge";

export function TrendStory({ article }: { article: Article }) {
  return (
    <article className="trend-story">
      <h3 className="trend-headline">
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="trend-body">{article.deck}</p>
      <div className="trend-sources">
        <SignalBadge signal={article.signal} />
        &nbsp;&nbsp;
        {article.sources.slice(0, 3).map((s, i) => (
          <span key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
            {i < Math.min(article.sources.length, 3) - 1 ? " · " : ""}
          </span>
        ))}
      </div>
      <Link href={`/article/${article.slug}`} className="trend-read-more">
        Read full →
      </Link>
    </article>
  );
}

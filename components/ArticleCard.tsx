import Link from "next/link";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="article-card">
      <h4 className="article-card-title">
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h4>
      <p className="article-card-deck">{article.deck}</p>
    </div>
  );
}

import type { Issue } from "@/lib/types";
import { Masthead } from "./Masthead";
import { HeadlineStory } from "./HeadlineStory";
import { TrendStory } from "./TrendStory";
import { ArticleCard } from "./ArticleCard";
import { EditorialNote } from "./EditorialNote";
import { Footer } from "./Footer";

export function IssueFrontPage({ issue, isHomepage = false }: { issue: Issue; isHomepage?: boolean }) {
  if (issue.isQuietDay) {
    return (
      <>
        <Masthead {...issue} isHomepage={isHomepage} />
        <section className="headline-strip">
          <div className="headline-label">Editor's note</div>
          <h2 className="headline-main">Quiet day on the wires.</h2>
          <p className="headline-deck">
            Nothing rose above the noise floor today. The pipeline saw fewer than three trends
            with cross-platform signal. We will not manufacture stories where there are none.
            Back tomorrow.
          </p>
        </section>
        <EditorialNote note={issue.editorialNote} />
        <Footer date={issue.date} />
      </>
    );
  }

  // Split trends: first 2 fill the left column, rest become teaser cards on the right.
  const leftTrends = issue.trends.slice(0, 2);
  const rightTrends = issue.trends.slice(2);

  return (
    <>
      <Masthead {...issue} isHomepage={isHomepage} />
      <HeadlineStory article={issue.headline} />

      <div className="main-grid">
        <div className="col-left">
          <div className="section-label">Today's stories</div>
          {leftTrends.map((t) => (
            <TrendStory key={t.slug} article={t} />
          ))}
        </div>
        <div className="col-right">
          <div className="section-label">Also today</div>
          {rightTrends.length > 0
            ? rightTrends.map((t) => <ArticleCard key={t.slug} article={t} />)
            : (
              <p className="article-card-deck">
                Two stories today. The wire was thin but sharp.
              </p>
            )}
        </div>
      </div>

      <EditorialNote note={issue.editorialNote} />
      <Footer date={issue.date} />
    </>
  );
}

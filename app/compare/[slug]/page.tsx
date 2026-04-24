import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { ComparisonHero } from "@/components/ComparisonHero";
import { CompareMarkdown } from "@/components/CompareMarkdown";
import { ClusterChip } from "@/components/ClusterChip";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import {
  getCompare,
  getRelatedCompares,
  listCompareSlugs,
} from "@/lib/load-compare";
import { latestIssue } from "@/lib/load-issue";
import { clusterLabel } from "@/lib/compare-types";

export async function generateStaticParams() {
  const slugs = await listCompareSlugs();
  return slugs.map((slug) => ({ slug }));
}

const CURRENT_MONTH_LABEL = (() => {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
})();

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const compare = await getCompare(slug);
  if (!compare) return { title: "Not found" };
  const title = `${compare.title} (${CURRENT_MONTH_LABEL})`;
  const description = compare.tldr.slice(0, 200);
  const url = `/compare/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [`/compare/${slug}/og`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/compare/${slug}/og`],
    },
  };
}

export default async function ComparePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const [compare, issue, related] = await Promise.all([
    getCompare(slug),
    latestIssue(),
    getRelatedCompares(slug),
  ]);
  if (!compare) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: compare.title,
        description: compare.tldr,
        dateModified: compare.updated,
        datePublished: compare.created,
        author: { "@type": "Organization", name: "Artificially Minded" },
        publisher: {
          "@type": "Organization",
          name: "Artificially Minded",
          url: "https://artificialminded.com",
        },
        mainEntityOfPage: `https://artificialminded.com/compare/${slug}`,
        citation: compare.sources.map((s) => ({ "@type": "WebPage", url: s.url })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://artificialminded.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compare",
            item: "https://artificialminded.com/compare",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: compare.title,
            item: `https://artificialminded.com/compare/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Masthead
        volume={issue.volume}
        issueNumber={issue.issueNumber}
        weekday={issue.weekday}
        prettyDate={issue.prettyDate}
      />
      <SiteNav />

      <article className="compare-article">
        <nav className="compare-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/compare">Compare</Link>
          <span className="compare-breadcrumbs-sep">/</span>
          <ClusterChip
            cluster={compare.cluster}
            href={`/compare#${compare.cluster}`}
          />
        </nav>

        <ComparisonHero compare={compare} />

        <CompareMarkdown body={compare.body} sources={compare.sources} />

        {related.length > 0 && (
          <aside className="compare-related">
            <h2 className="compare-related-label">
              More in {clusterLabel(compare.cluster)}
            </h2>
            <ul className="compare-related-list">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/compare/${r.slug}`}>
                    <span className="compare-related-title">{r.title}</span>
                    <span className="compare-related-tldr">{r.tldr}</span>
                    <ConfidenceBadge confidence={r.confidence} />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Footer date={issue.date} />
    </>
  );
}

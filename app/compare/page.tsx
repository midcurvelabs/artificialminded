import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { getAllCompares } from "@/lib/load-compare";
import { latestIssue } from "@/lib/load-issue";
import { CLUSTERS } from "@/lib/compare-types";

export const metadata: Metadata = {
  title: "Compare — AI Research Hub",
  description:
    "23 head-to-head AI comparisons with April 2026 data. Model wars, compute race, agent payments, and the signals worth calling out.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare — AI Research Hub",
    description:
      "23 head-to-head AI comparisons with April 2026 data. Model wars, compute race, agent payments, and the signals worth calling out.",
    url: "/compare",
    type: "website",
    images: ["/compare/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare — AI Research Hub",
    description:
      "23 head-to-head AI comparisons with April 2026 data. Model wars, compute race, agent payments, and the signals worth calling out.",
    images: ["/compare/og"],
  },
};

export default async function CompareHubPage() {
  const [compares, issue] = await Promise.all([getAllCompares(), latestIssue()]);
  const byCluster = new Map(
    CLUSTERS.map((c) => [c.slug, compares.filter((x) => x.cluster === c.slug)] as const),
  );
  const total = compares.length;

  return (
    <>
      <Masthead
        volume={issue.volume}
        issueNumber={issue.issueNumber}
        weekday={issue.weekday}
        prettyDate={issue.prettyDate}
      />
      <SiteNav />

      <section className="compare-hub-hero">
        <div className="compare-hub-eyebrow">Research</div>
        <h1 className="compare-hub-title">The AI Compare Hub</h1>
        <p className="compare-hub-deck">
          {total} head-to-head comparisons across four clusters. Every number
          cited. Every claim dated. Updated continuously as the frontier moves.
        </p>
      </section>

      {CLUSTERS.map((cluster) => {
        const items = byCluster.get(cluster.slug) ?? [];
        if (items.length === 0) return null;
        return (
          <section key={cluster.slug} className="compare-cluster-section">
            <div className="compare-cluster-header">
              <div className="compare-cluster-count">{items.length}</div>
              <div>
                <h2 className="compare-cluster-label">{cluster.label}</h2>
                <p className="compare-cluster-tagline">{cluster.tagline}</p>
              </div>
            </div>
            <ul className="compare-list">
              {items.map((c) => (
                <li key={c.slug} className="compare-list-item">
                  <Link href={`/compare/${c.slug}`} className="compare-list-link">
                    <h3 className="compare-list-title">{c.title}</h3>
                    <p className="compare-list-tldr">{c.tldr}</p>
                    <div className="compare-list-meta">
                      <ConfidenceBadge confidence={c.confidence} />
                      <span>{c.sources.length} sources</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Footer date={issue.date} />
    </>
  );
}

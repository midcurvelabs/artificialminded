import type { Compare } from "@/lib/compare-types";
import { clusterLabel } from "@/lib/compare-types";
import { ConfidenceBadge } from "./ConfidenceBadge";

function prettyDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ComparisonHero({ compare }: { compare: Compare }) {
  return (
    <header className="compare-hero">
      <div className="compare-hero-eyebrow">
        <span className="compare-hero-cluster">{clusterLabel(compare.cluster)}</span>
        <span className="compare-hero-sep">·</span>
        <span>Comparison</span>
      </div>
      <h1 className="compare-hero-title">{compare.title}</h1>
      {compare.tldr && <p className="compare-hero-tldr">{compare.tldr}</p>}
      <div className="compare-hero-meta">
        <ConfidenceBadge confidence={compare.confidence} />
        <span>Updated {prettyDate(compare.updated || compare.created)}</span>
        <span>{compare.sources.length} sources</span>
      </div>
    </header>
  );
}

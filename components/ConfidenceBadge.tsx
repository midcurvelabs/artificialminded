import type { Confidence } from "@/lib/compare-types";

const LABEL: Record<Confidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span className={`confidence-badge confidence-${confidence}`}>
      {LABEL[confidence]}
    </span>
  );
}

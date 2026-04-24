// Chart spec schema for /compare pages. Charts live in sidecar files at
// `content/compare/<slug>.charts.json` and are referenced in markdown bodies
// via `::chart[id]` markers. Sidecar format keeps data decoupled from prose
// so a cron can refresh numbers without rewriting markdown.

export type ChartType =
  | "bar" // vertical bars
  | "hbar" // horizontal bars (better for ranked comparisons like price ladders)
  | "grouped-bar" // multiple series per category (e.g. input vs output price)
  | "line"
  | "scatter"
  | "radar"
  | "dot"; // minimalist single-series dot plot

export type ValueFormat = "currency" | "percent" | "number" | "raw";

export interface ChartDatum {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartSeries {
  name: string;
  color?: string;
  data: ChartDatum[];
}

export interface ChartSpec {
  id: string;
  type: ChartType;
  title: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  xFormat?: ValueFormat;
  yFormat?: ValueFormat;
  series: ChartSeries[];
  source?: string;
  sourceUrl?: string;
  lastVerified?: string;
  // Highlight a specific datum by x-value (shown with accent color).
  highlight?: string | number;
}

export interface ChartsFile {
  slug: string;
  charts: ChartSpec[];
}

// Palette matches the newspaper aesthetic in globals.css.
export const CHART_COLORS = {
  ink: "#1a1a1a",
  accent: "#f5c400",
  muted: "#666666",
  paper: "#faf8f2",
  series: ["#1a1a1a", "#f5c400", "#666666", "#8b7a1a", "#333333", "#bdb5a0"],
} as const;

export function formatValue(value: number, format?: ValueFormat): string {
  if (format === "currency") return `$${value}`;
  if (format === "percent") return `${value}%`;
  if (format === "number") return value.toLocaleString();
  return String(value);
}

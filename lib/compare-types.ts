export type Cluster = "model-wars" | "compute-race" | "elon-stack" | "signal-vs-noise";

export type Confidence = "high" | "medium" | "low";

export interface CompareSource {
  id: number;
  url: string;
}

export interface Compare {
  slug: string;
  title: string;
  tldr: string;
  cluster: Cluster;
  confidence: Confidence;
  created: string;
  updated: string;
  aliases: string[];
  sources: CompareSource[];
  body: string;
}

export interface ClusterMeta {
  slug: Cluster;
  label: string;
  tagline: string;
}

export const CLUSTERS: ClusterMeta[] = [
  {
    slug: "model-wars",
    label: "Model Wars",
    tagline: "Who's winning at the frontier — capabilities, pricing, ecosystem.",
  },
  {
    slug: "compute-race",
    label: "The Compute Race",
    tagline: "Who owns the silicon, the GPUs, the power, and the wallets.",
  },
  {
    slug: "elon-stack",
    label: "The Elon Stack",
    tagline: "Musk's AI + hardware + data flywheel — steelmanned and skeptical read.",
  },
  {
    slug: "signal-vs-noise",
    label: "Signal vs Noise",
    tagline: "The claims worth calling out and the ones worth ignoring.",
  },
];

export function clusterLabel(slug: Cluster): string {
  return CLUSTERS.find((c) => c.slug === slug)?.label ?? slug;
}

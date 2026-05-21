import Link from "next/link";
import type { Cluster } from "@/lib/compare-types";
import { clusterLabel } from "@/lib/compare-types";

interface Props {
  cluster: Cluster;
  active?: boolean;
  href?: string;
}

export function ClusterChip({ cluster, active = false, href }: Props) {
  const className = `cluster-chip cluster-${cluster}${active ? " cluster-chip--active" : ""}`;
  const label = clusterLabel(cluster);
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return <span className={className}>{label}</span>;
}

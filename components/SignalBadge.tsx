import type { Signal } from "@/lib/types";

const LABELS: Record<Signal, string> = {
  reddit: "Reddit",
  github: "GitHub",
  x: "X",
  "reddit+github": "Reddit + GitHub",
  "reddit+x": "Reddit + X",
  "github+x": "GitHub + X",
  "reddit+github+x": "Reddit + X + GitHub",
};

export function SignalBadge({ signal }: { signal: Signal }) {
  return <span className="signal-badge">{LABELS[signal]}</span>;
}

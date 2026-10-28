import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./magnet.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--am-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--am-mono" });

// Magnet pages are for people who commented, not for search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MagnetLayout({ children }: { children: React.ReactNode }) {
  return <div className={`am-magnet ${display.variable} ${mono.variable}`}>{children}</div>;
}

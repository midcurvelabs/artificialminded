import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./home.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--am-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--am-mono" });

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`hm ${display.variable} ${mono.variable}`}>{children}</div>;
}

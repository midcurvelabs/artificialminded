import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "./site.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--am-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--am-mono" });

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`am-site ${display.variable} ${mono.variable}`}>
      <SiteHeader />
      <main className="am-main">{children}</main>
      <SiteFooter />
    </div>
  );
}

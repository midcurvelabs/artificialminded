import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArtificialMinded · AI implementation for agencies and SMBs",
    template: "%s · ArtificialMinded",
  },
  description:
    "AI agents and workflows built into the tools your team already uses. A person approves before anything goes out. EU hosted, GDPR.",
  metadataBase: new URL("https://artificialminded.com"),
  openGraph: {
    title: "ArtificialMinded",
    description: "AI agents and workflows, built into the tools your team already uses.",
    url: "https://artificialminded.com",
    siteName: "ArtificialMinded",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtificialMinded",
    description: "AI agents and workflows, built into the tools your team already uses.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Artificially Minded Daily — A daily field report from the AI frontier",
    template: "%s · Artificially Minded Daily",
  },
  description:
    "A daily newspaper of what is actually happening in AI, vibecoding, agents, and the open frontier. Published every morning at 7 AM CET.",
  metadataBase: new URL("https://artificialminded.com"),
  openGraph: {
    title: "Artificially Minded Daily",
    description: "A daily field report from the AI frontier.",
    url: "https://artificialminded.com",
    siteName: "Artificially Minded Daily",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificially Minded Daily",
    description: "A daily field report from the AI frontier.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

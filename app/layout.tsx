import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArtificialMinded · AI-run content systems for founders",
    template: "%s · ArtificialMinded",
  },
  description:
    "I build the AI pipeline and run the content engine on it, in public, on @rikgpt. Take the 2-minute test to see which of the two you need first.",
  metadataBase: new URL("https://artificialminded.com"),
  openGraph: {
    title: "ArtificialMinded",
    description: "AI-run content systems for founders.",
    url: "https://artificialminded.com",
    siteName: "ArtificialMinded",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtificialMinded",
    description: "AI-run content systems for founders.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

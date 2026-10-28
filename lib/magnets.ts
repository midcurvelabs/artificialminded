// Lead-magnet registry. One entry per "comment KEYWORD" magnet.
// URL is artificialminded.com/<keyword>. To add one: a component in
// components/magnets/, a line here. Status lives in the vault registry and Notion bank.

export type MagnetMeta = {
  keyword: string; // lowercase, becomes the URL
  title: string;
  kicker: string;
  description: string;
};

// Paths the news site already owns. A magnet keyword may never use these.
export const RESERVED = ["today", "archive", "article", "daily", "about", "api"];

export const MAGNETS: MagnetMeta[] = [
  {
    keyword: "system",
    title: "The Claude Edit System",
    kicker: "RikGPT shorts pipeline",
    description:
      "Grok writes. Rik films. Claude edits. The real pipeline behind the RikGPT shorts, in eight steps you can copy.",
  },
];

for (const m of MAGNETS) {
  if (RESERVED.includes(m.keyword)) {
    throw new Error(`Magnet keyword "${m.keyword}" collides with a reserved route`);
  }
}

export function getMagnet(keyword: string): MagnetMeta | undefined {
  return MAGNETS.find((m) => m.keyword === keyword);
}

// Single place to change the wordmark (brand kit says two words, the 25 Oct lock says one).
export const WORDMARK = "ARTIFICIALMINDED";

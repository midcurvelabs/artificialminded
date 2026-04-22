export type Signal =
  | "reddit"
  | "github"
  | "x"
  | "reddit+github"
  | "reddit+x"
  | "github+x"
  | "reddit+github+x";

export interface Source {
  label: string;
  url: string;
}

export interface CouncilOpinion {
  bull: string;
  bear: string;
  builder: string;
}

export interface Article {
  slug: string;
  date: string; // YYYY-MM-DD
  title: string;
  deck: string;
  signal: Signal;
  sources: Source[];
  body: string; // markdown
  council?: CouncilOpinion;
  isHeadline?: boolean;
}

export interface Issue {
  date: string; // YYYY-MM-DD
  volume: number; // Vol I, II...
  issueNumber: number; // running issue number across all time
  weekday: string; // "Wednesday"
  prettyDate: string; // "April 22, 2026"
  headline: Article | null; // null on quiet days
  trends: Article[]; // 2-4 secondary stories
  editorialNote: string; // first-person, signed
  isQuietDay?: boolean;
}

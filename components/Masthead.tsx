import Link from "next/link";

export interface MastheadProps {
  volume: number;
  issueNumber: number;
  weekday: string;
  prettyDate: string;
  isHomepage?: boolean;
}

const ROMAN: Record<number, string> = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };

export function Masthead({ volume, issueNumber, weekday, prettyDate, isHomepage = false }: MastheadProps) {
  const roman = ROMAN[volume] ?? String(volume);
  const title = (
    <>
      Artificially <span>Minded</span> Daily
    </>
  );
  return (
    <header className="masthead">
      <div className="masthead-eyebrow">A daily field report from the AI frontier</div>
      <h1 className="masthead-title">
        {isHomepage ? title : <Link href="/today">{title}</Link>}
      </h1>
      <div className="masthead-meta">
        <span className="edition">
          Vol. {roman} — Issue {issueNumber}
        </span>
        <span>
          <strong>
            {weekday}, {prettyDate}
          </strong>
        </span>
        <span className="edition">artificialminded.com</span>
      </div>
    </header>
  );
}

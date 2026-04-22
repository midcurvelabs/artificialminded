import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { latestIssue, listIssues } from "@/lib/load-issue";
import Link from "next/link";

export const metadata = {
  title: "Archive",
};

function monthLabel(date: string): string {
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function ArchivePage() {
  const [latest, issues] = await Promise.all([latestIssue(), listIssues()]);

  const byMonth = new Map<string, typeof issues>();
  for (const issue of issues) {
    const key = monthLabel(issue.date);
    const bucket = byMonth.get(key) ?? [];
    bucket.push(issue);
    byMonth.set(key, bucket);
  }

  return (
    <>
      <Masthead
        volume={latest.volume}
        issueNumber={latest.issueNumber}
        weekday={latest.weekday}
        prettyDate={latest.prettyDate}
      />
      <div className="archive">
        <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "20px" }}>Archive</h2>
        {[...byMonth.entries()].map(([label, monthIssues]) => (
          <div key={label} className="archive-month">
            <div className="archive-month-label">{label}</div>
            {monthIssues.map((i) => (
              <div key={i.date} className="archive-day">
                <div className="archive-day-date">{i.date}</div>
                <div>
                  <Link href={`/daily/${i.date}`}>
                    {i.isQuietDay ? "Quiet day" : i.headline?.title ?? "Untitled"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer date={latest.date} />
    </>
  );
}

import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { mockIssue } from "@/lib/mock-issue";
import Link from "next/link";

export const metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  // Phase 1: only the mock issue exists. Phase 2 reads all issues from content/issues/.
  const issues = [mockIssue];

  return (
    <>
      <Masthead
        volume={mockIssue.volume}
        issueNumber={mockIssue.issueNumber}
        weekday={mockIssue.weekday}
        prettyDate={mockIssue.prettyDate}
      />
      <div className="archive">
        <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "20px" }}>Archive</h2>
        <div className="archive-month">
          <div className="archive-month-label">April 2026</div>
          {issues.map((i) => (
            <div key={i.date} className="archive-day">
              <div className="archive-day-date">{i.date}</div>
              <div>
                <Link href={`/daily/${i.date}`}>{i.headline.title}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer date={mockIssue.date} />
    </>
  );
}

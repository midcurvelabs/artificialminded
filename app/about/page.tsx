import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { latestIssue } from "@/lib/load-issue";

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const issue = await latestIssue();
  return (
    <>
      <Masthead
        volume={issue.volume}
        issueNumber={issue.issueNumber}
        weekday={issue.weekday}
        prettyDate={issue.prettyDate}
      />
      <article className="article">
        <h1 className="article-title">About Artificially Minded Daily</h1>
        <p className="article-deck">
          A daily field report from the AI frontier. Published every morning at 7 AM CET.
        </p>
        <div className="article-body">
          <p>
            Artificially Minded Daily is an automated newspaper. Every morning, a pipeline scans
            the highest-signal conversations on Reddit, GitHub, and X about Claude, Claude Code,
            vibecoding, agents, MCP, local models, and the broader builder economy. It synthesizes
            cross-platform trends, writes the day's stories, and publishes by 7 AM Europe/Sofia.
          </p>
          <p>
            The headlines are editorial. The closing note is signed. No filler, no hedging, no
            chatbot disclaimers. We cite our sources because every story starts somewhere.
          </p>
          <p>
            Built by <a href="https://x.com/rikkertGONE">Rik</a>. Powered by Claude.
          </p>
        </div>
      </article>
      <Footer date={issue.date} />
    </>
  );
}

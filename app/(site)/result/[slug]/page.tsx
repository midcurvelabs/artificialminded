import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GAPS, RESULT_SLUGS, type Gap, type GapId } from "@/lib/owner-test";
import BookButton from "@/components/site/BookButton";
import { RIKGPT_IG } from "@/lib/site";

// Result pages: gap name, what it means, the first fix, the matching price rung, one button.
// Results are personal, so they stay out of search.

export const dynamicParams = false;
export function generateStaticParams() {
  return RESULT_SLUGS.map((slug) => ({ slug }));
}
export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

const RUNG = {
  ai: { name: "AI Assessment", amt: "€2,500", desc: "A written map of what to automate first, with a roadmap. Credited in full against a build within 30 days." },
  content: { name: "Content Audit and Strategy", amt: "€2,500", desc: "Two weeks: an audit of your last 30 to 60 posts, your buckets, hook and format rules, a 30-day plan and one lead magnet. Credited in full against a build within 30 days." },
};

type SP = Promise<{ solo?: string; ai?: string; content?: string; saved?: string }>;

function GapCard({ gap }: { gap: Gap }) {
  return (
    <div className="am-result-card">
      <div className="am-label">{gap.track === "ai" ? "AI track" : "Content track"} · your biggest gap</div>
      <h1 className="am-h1">{gap.name}</h1>
      <p>{gap.line}</p>
      <div className="am-fix">
        <div className="am-label">First fix, today</div>
        <p style={{ fontSize: 18 }}>{gap.fix}</p>
      </div>
    </div>
  );
}

function Rung({ track }: { track: "ai" | "content" }) {
  const r = RUNG[track];
  return (
    <div className="am-stack" style={{ gap: 8 }}>
      <div className="am-label">If you want it done for you</div>
      <div className="am-h3">{r.name}, {r.amt}</div>
      <p className="am-body">{r.desc} <Link href="/#prices">See the full price card</Link>.</p>
    </div>
  );
}

function SoloNote() {
  return (
    <p className="am-body" style={{ borderLeft: "3px solid var(--rule)", paddingLeft: 14 }}>
      You work alone, so the free call is not the right fit: it is for teams. The first fix above is the best next step, and I share the rest of the method for free on <a href={RIKGPT_IG} target="_blank" rel="noopener">@rikgpt</a>.
    </p>
  );
}

export default async function ResultPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SP }) {
  const { slug } = await params;
  const sp = await searchParams;
  const solo = sp.solo === "1";
  const saved = sp.saved === "1";
  if (!RESULT_SLUGS.includes(slug)) notFound();

  const savedNote = saved && <div className="am-ok">Saved. Your result is on its way to your inbox.</div>;

  if (slug === "fine") {
    return (
      <div className="am-shell am-stack" style={{ gap: 32, maxWidth: 820 }}>
        {savedNote}
        <div className="am-result-card">
          <div className="am-label">Your result</div>
          <h1 className="am-h1">Your setup is mostly sound.</h1>
          <p>Neither your AI nor your content has a big ownership gap. No call needed.</p>
          <div className="am-fix">
            <div className="am-label">One tip</div>
            <p style={{ fontSize: 18 }}>Keep a scoreboard: for every post, count follows and leads 7 days after posting, and judge formats on that, not on views.</p>
          </div>
        </div>
        <p className="am-body">If you want to see how I run mine, follow <a href={RIKGPT_IG} target="_blank" rel="noopener">@rikgpt</a>.</p>
      </div>
    );
  }

  if (slug === "both") {
    const ai = GAPS[sp.ai as GapId];
    const content = GAPS[sp.content as GapId];
    if (!ai || ai.track !== "ai" || !content || content.track !== "content") notFound();
    return (
      <div className="am-shell am-stack" style={{ gap: 32 }}>
        {savedNote}
        <section className="am-stack">
          <div className="am-label">Your result · both tracks tie</div>
          <h1 className="am-h2">Two gaps, equally big.</h1>
        </section>
        <div className="am-two">
          <GapCard gap={ai} />
          <GapCard gap={content} />
        </div>
        {solo ? <SoloNote /> : (
          <section className="am-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="am-h3">Which one costs you more right now? Bring the answer to the call.</h2>
            <BookButton />
          </section>
        )}
        <div className="am-two"><Rung track="ai" /><Rung track="content" /></div>
      </div>
    );
  }

  const gapId = slug.replace(/^(ai|content)-/, "") as GapId;
  const gap = GAPS[gapId];
  return (
    <div className="am-shell am-stack" style={{ gap: 32, maxWidth: 860 }}>
      {savedNote}
      <GapCard gap={gap} />
      {solo ? <SoloNote /> : (
        <section className="am-stack" style={{ alignItems: "flex-start" }}>
          <p className="am-body">Want help closing it? We look at your result together on a free call. No pitch deck.</p>
          <BookButton />
        </section>
      )}
      <Rung track={gap.track} />
    </div>
  );
}

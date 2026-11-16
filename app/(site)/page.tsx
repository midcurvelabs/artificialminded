import type { Metadata } from "next";
import Link from "next/link";
import PriceCard from "@/components/site/PriceCard";
import ProofStrip from "@/components/site/ProofStrip";

export const metadata: Metadata = {
  title: { absolute: "ArtificialMinded · AI-run content systems for founders" },
  description:
    "I build the AI pipeline and run the content engine on it, in public, on @rikgpt. Take the 2-minute test to see which of the two you need first.",
};

export default function Home() {
  return (
    <div className="am-shell" style={{ display: "flex", flexDirection: "column", gap: 104 }}>
      <section className="am-hero">
        <div className="am-label">ArtificialMinded · by Rik, from @rikgpt</div>
        <h1 className="am-h1">AI-run content systems for founders.</h1>
        <p className="am-lede">
          I build the AI pipeline and run the content engine on it, in public, on <b>@rikgpt</b>. Take the 2-minute test to see which of the two you need first.
        </p>
        <div className="am-cta-row">
          <Link href="/test" className="am-btn">Take the 2-minute test</Link>
          <span className="am-cta-note">10 questions · a first fix at the end</span>
        </div>
      </section>

      <section aria-labelledby="two-h">
        <div className="am-section-head">
          <div className="am-label">Two skills, one system</div>
          <h2 id="two-h" className="am-h2">You do not have a content problem or an AI problem. You have no owner for either.</h2>
        </div>
        <div className="am-duo">
          <div>
            <div className="am-label">AI consultancy</div>
            <div className="am-h3">One task, automated and owned.</div>
            <p className="am-body">Pick the one task that eats hours every week, wire AI into the tool it lives in, put a check on the output and give it an owner.</p>
          </div>
          <div>
            <div className="am-label">Content strategy consultancy</div>
            <div className="am-h3">Content measured by what it converts.</div>
            <p className="am-body">One clear promise, posts that open on the thing itself, a front door for people who like you, and a scoreboard that counts leads, not views.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-h">
        <div className="am-section-head">
          <div className="am-label">How it starts</div>
          <h2 id="how-h" className="am-h2">Test, call, then a fixed price.</h2>
        </div>
        <ol className="am-steps">
          <li><span className="n">01</span><span className="am-h3">Take the test</span><span className="am-body">Ten questions name the gap that costs you most, and give you a first fix you can do today.</span></li>
          <li><span className="n">02</span><span className="am-h3">Free 30-minute call</span><span className="am-body">We look at your result together. The booking link is on your result page.</span></li>
          <li><span className="n">03</span><span className="am-h3">A price you saw first</span><span className="am-body">Every rung is priced below. No discovery-call pricing.</span></li>
        </ol>
      </section>

      <PriceCard />
      <ProofStrip />

      <section className="am-stack" style={{ alignItems: "flex-start" }}>
        <h2 className="am-h2">Start with the gap, not the tool.</h2>
        <Link href="/test" className="am-btn">Take the 2-minute test</Link>
      </section>
    </div>
  );
}

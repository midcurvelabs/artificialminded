import Link from "next/link";
import { BUCKETS, CRITIC, SPEND } from "@/lib/proof";

// Real proof only, each with its source. Gaps stay off the page until real (Rik, 29 Oct):
// first client result, named client case (client's OK first), GMP week-over-week lift, RikGPT follower milestone.
export default function ProofStrip() {
  const first = SPEND.rows[0];
  const best = SPEND.rows.find((r) => r.batch === 9)!;
  return (
    <section aria-labelledby="proof-h">
      <div className="am-section-head">
        <div className="am-label">Proof</div>
        <h2 id="proof-h" className="am-h2">What is real today.</h2>
        <p className="am-lede">
          The proof is my own channel. Client results go here when they exist, with a baseline and a date. <Link href="/rikgpt">Read the full RikGPT build</Link>.
        </p>
      </div>
      <div className="am-proof">
        <div>
          <div className="am-label">The engine</div>
          <div className="am-stat">Own build</div>
          <p className="am-body">Every short on @rikgpt is scripted, cut, checked and queued by the AI pipeline I built and run.</p>
        </div>
        <div>
          <div className="am-label">Measured, not guessed</div>
          <div className="am-stat">{BUCKETS.reviewed} shorts</div>
          <p className="am-body">Ranked by content bucket on reach, watch time, saves and shares.</p>
          <span className="am-src">{BUCKETS.source}</span>
        </div>
        <div>
          <div className="am-label">Cost per clip</div>
          <div className="am-stat">${best.loaded.toFixed(2)}</div>
          <p className="am-body">All-in AI usage per clip in batch {best.batch}, priced at API list rates, down from ${first.loaded.toFixed(2)} in batch {first.batch}.</p>
          <span className="am-src">{SPEND.source}</span>
        </div>
        <div>
          <div className="am-label">Checked before I see it</div>
          <div className="am-stat">{CRITIC.blocks}</div>
          <p className="am-body">Blocking problems a critic agent caught in {CRITIC.passes} review passes, before a cut reached me.</p>
          <span className="am-src">{CRITIC.source}</span>
        </div>
      </div>
    </section>
  );
}

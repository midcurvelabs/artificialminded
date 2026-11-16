import type { Metadata } from "next";
import Link from "next/link";
import { BATCH07_UNITS, BUCKETS, CRITIC, FUNNEL, NOTES, SPEND } from "@/lib/proof";
import { RIKGPT_IG } from "@/lib/site";

// Case study built only from numbers in the vault. Each one is in lib/proof.ts with its file and date.

export const metadata: Metadata = {
  title: "The RikGPT build",
  description: "How the AI pipeline behind @rikgpt makes a short, what it costs per clip, and where the funnel still leaks. Real numbers, with sources.",
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function RikgptCase() {
  const max = Math.max(...SPEND.rows.map((r) => r.loaded));
  const first = SPEND.rows[0];
  const b9 = SPEND.rows.find((r) => r.batch === 9)!;
  return (
    <div className="am-shell" style={{ display: "flex", flexDirection: "column", gap: 96 }}>
      <section className="am-hero">
        <div className="am-label">Case study · my own channel · October 2026</div>
        <h1 className="am-h1" style={{ maxWidth: "15ch" }}>The RikGPT build.</h1>
        <p className="am-lede">
          <a href={RIKGPT_IG} target="_blank" rel="noopener">@rikgpt</a> is where I run the content engine I sell, in public. Grok writes the script, I film one take, and Claude agents edit, check, caption and queue it. This page shows what that costs and what it gets, <b>including where it still leaks</b>. Every number has its source under it.
        </p>
      </section>

      <section aria-labelledby="pipe-h">
        <div className="am-section-head">
          <div className="am-label">The pipeline</div>
          <h2 id="pipe-h" className="am-h2">Two human touches per short.</h2>
        </div>
        <ol className="am-steps">
          <li><span className="n">01 · GROK + CLAUDE</span><span className="am-h3">Script and teleprompter</span><span className="am-body">A script with three hooks and a visuals brief per line, synced to the teleprompter by status.</span></li>
          <li><span className="n">02 · ME</span><span className="am-h3">One take</span><span className="am-body">Under 60 seconds, read off the teleprompter, dropped in the batch folder.</span></li>
          <li><span className="n">03 · CLAUDE</span><span className="am-h3">Edit as a spec</span><span className="am-body">Transcribe, cut flubs, keep ad-libs, one insert per beat. Checked on still frames before any render.</span></li>
          <li><span className="n">04 · CLAUDE</span><span className="am-h3">A critic before me</span><span className="am-body">A separate agent judges each render against a rubric and blocks what is broken.</span></li>
          <li><span className="n">05 · ME</span><span className="am-h3">One review page</span><span className="am-body">Timestamped notes on one page, sent straight back to the editor agent.</span></li>
          <li><span className="n">06 · CLAUDE</span><span className="am-h3">Captions and queue</span><span className="am-body">A publish pack per platform, checked by a script, pushed to the posting queue. Never posted blind.</span></li>
        </ol>
        <p className="am-body" style={{ marginTop: 18 }}>The full eight steps with copyable prompts: <Link href="/system">the Claude Edit System guide</Link>.</p>
      </section>

      <section aria-labelledby="cost-h">
        <div className="am-section-head">
          <div className="am-label">Cost per clip</div>
          <h2 id="cost-h" className="am-h2">From ${first.loaded.toFixed(2)} to ${b9.loaded.toFixed(2)} a clip in eight batches.</h2>
          <p className="am-lede">
            All AI usage per batch divided by its clips, orchestration and tooling included, priced at API list rates. It runs inside a Claude subscription, so this is a yardstick for usage, not an invoice.
          </p>
        </div>
        <div className="am-bars" role="img" aria-label={`Cost per clip by batch, from $${first.loaded} in batch 2 to $${b9.loaded} in batch 9`}>
          {SPEND.rows.map((r) => (
            <div key={r.batch} className={`am-bar${r.open ? " open" : ""}`} title={`Batch ${r.batch}: $${r.loaded.toFixed(2)} per clip, ${r.clips} clips${r.open ? " (still open)" : ""}`}>
              <span>Batch {String(r.batch).padStart(2, "0")}</span>
              <span className="t"><i style={{ width: `${(r.loaded / max) * 100}%` }} /></span>
              <span className="v">${r.loaded.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="am-table-wrap" style={{ marginTop: 28 }}>
          <table className="am-table">
            <thead>
              <tr><th>Batch</th><th>Clips</th><th>All-in per clip</th><th>Clip work only</th></tr>
            </thead>
            <tbody>
              {SPEND.rows.map((r) => (
                <tr key={r.batch}>
                  <td>Batch {String(r.batch).padStart(2, "0")}{r.open ? " (open, counts trial versions)" : ""}</td>
                  <td>{r.clips}</td>
                  <td>${r.loaded.toFixed(2)}</td>
                  <td>${r.direct.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="am-src" style={{ marginTop: 12 }}>{SPEND.source}</p>
        <p className="am-body" style={{ marginTop: 18 }}>
          Why it is not a straight line: batches 2, 3 and 7 each spent over $175 on the main coordinating thread, and batch 7 also carried $110 of pipeline tooling work. The all-in figure counts all of it. Batch 10 is still open and includes two trial versions of each short.
        </p>
      </section>

      <section aria-labelledby="units-h">
        <div className="am-section-head">
          <div className="am-label">Tokens</div>
          <h2 id="units-h" className="am-h2">{BATCH07_UNITS.perClipM}M price-weighted tokens per short.</h2>
          <p className="am-lede">
            Batch 07 used {BATCH07_UNITS.totalM}M for {BATCH07_UNITS.clips} shorts, about ${BATCH07_UNITS.usd} at API prices. The audit weighs tokens by what they cost: output counts 5 times, cached reads a tenth. This is the clip work only, so it is lower than the all-in figure above.
          </p>
        </div>
        <p className="am-src">{BATCH07_UNITS.source}</p>
      </section>

      <section aria-labelledby="critic-h">
        <div className="am-section-head">
          <div className="am-label">Quality control</div>
          <h2 id="critic-h" className="am-h2">The critic finds it, so I do not have to.</h2>
        </div>
        <div className="am-big">
          <div>
            <div className="am-stat">{CRITIC.blocks}</div>
            <p className="am-body">blocking problems caught in {CRITIC.passes} critic passes on {CRITIC.versions} short versions, {CRITIC.from} to {CRITIC.to}.</p>
            <span className="am-src">{CRITIC.source}</span>
          </div>
          <div>
            <div className="am-stat">v{CRITIC.rubricFrom} → v{CRITIC.rubricTo}</div>
            <p className="am-body">rubric versions. Every miss I catch by hand becomes a new rule, so the critic misses it next time.</p>
            <span className="am-src">{CRITIC.source}</span>
          </div>
          <div>
            <div className="am-stat">{NOTES.before.value} → {NOTES.after.value}</div>
            <p className="am-body">my review notes per short. {NOTES.before.label}, then {NOTES.after.label.toLowerCase()} across {NOTES.after.shorts} shorts.</p>
            <span className="am-src">{NOTES.before.source}; {NOTES.after.source}</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="bucket-h">
        <div className="am-section-head">
          <div className="am-label">What works</div>
          <h2 id="bucket-h" className="am-h2">{BUCKETS.reviewed} shorts, ranked by bucket.</h2>
          <p className="am-lede">
            The topic bucket did not decide a short. A big name plus a stake for the viewer, shown in frame 1, did. Inside each bucket, those shorts scored 4 to 10 times higher. The {BUCKETS.rows.reduce((n, r) => n + r.shorts, 0)} shorts below had Instagram data on the day of the pull.
          </p>
        </div>
        <div className="am-table-wrap">
          <table className="am-table">
            <thead>
              <tr><th>Group</th><th>Shorts</th><th>IG median views</th><th>Past 1,000 on IG</th><th>YT median views</th><th>IG saves + shares per 1,000</th><th>IG median watch</th></tr>
            </thead>
            <tbody>
              {BUCKETS.rows.map((r) => (
                <tr key={r.group} className={r.win ? "win" : ""}>
                  <td>{r.group}</td><td>{r.shorts}</td><td>{fmt(r.igMedian)}</td><td>{r.past1k}</td><td>{fmt(r.ytMedian)}</td><td>{r.savesShares.toFixed(1)}</td><td>{r.watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="am-src" style={{ marginTop: 12 }}>{BUCKETS.source}. Views at the time of the pull, so the newest posts are undercounted.</p>
      </section>

      <section aria-labelledby="leak-h">
        <div className="am-section-head">
          <div className="am-label">Where it leaks</div>
          <h2 id="leak-h" className="am-h2">Views are not followers yet.</h2>
        </div>
        <div className="am-funnel">
          <div><div className="am-label">Views, week 1, three platforms</div><div className="am-stat">{fmt(FUNNEL.views)}</div></div>
          <div className="arrow" aria-hidden="true">→</div>
          <div><div className="am-label">New followers, 16 to 22 Oct</div><div className="am-stat">{FUNNEL.follows}</div></div>
        </div>
        <p className="am-lede" style={{ marginTop: 22 }}>
          That is {FUNNEL.pct}. A news clip feels complete, so nobody needs to follow. The fix I am testing now: a follow reason per bucket and a free lead magnet per bucket, delivered by DM. Instagram went from {FUNNEL.igFrom} to {FUNNEL.igTo} followers by {FUNNEL.igToDate}.
        </p>
        <p className="am-src" style={{ marginTop: 12 }}>{FUNNEL.source}</p>
      </section>


      <section className="am-stack" style={{ alignItems: "flex-start" }}>
        <h2 className="am-h2">Want this for your business?</h2>
        <p className="am-lede">Start with the test. It tells you whether the content or the AI side needs work first.</p>
        <Link href="/test" className="am-btn">Take the 2-minute test</Link>
      </section>
    </div>
  );
}

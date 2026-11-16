import { CLIENT_CAP } from "@/lib/site";

// The public price card. Copy and numbers from the offer doc, Part 3
// (rik-docs 02_projects/RikGPT/consulting/rikgpt-offer-headline-diagnostic-price-card.md).

type Cell = { name?: string; amt?: string; desc: string };
type Row = { rung: string; ai: Cell; content: Cell };

const ROWS: Row[] = [
  {
    rung: "Start",
    ai: { name: "Free", desc: "The 2-minute test and a 30-minute call." },
    content: { name: "Free", desc: "The 2-minute test and a 30-minute call." },
  },
  {
    rung: "Find the gap",
    ai: { name: "AI Assessment", amt: "€2,500", desc: "A written map of what to automate first, with a roadmap. Credited against a build." },
    content: {
      name: "Content Audit and Strategy", amt: "€2,500",
      desc: "Two weeks. An audit of your last 30 to 60 posts, 2 to 3 content buckets, hook and format rules, a 30-day plan, one lead magnet and the funnel design.",
    },
  },
  {
    rung: "Build it",
    ai: {
      name: "Agent Sprint", amt: "from €7,500",
      desc: "One agent, one task, two weeks. Light €7,500 to €9,000, Standard €9,000 to €11,500, Heavy €11,500 to €13,500. Bigger than that is scoped as several sprints.",
    },
    content: {
      name: "Engine Install", amt: "€6,000 to €12,000",
      desc: "Four to six weeks. The RikGPT method set up for you: script format, AI drafting pipeline, edit workflow, a tracker that ranks posts by what they convert, a live lead-magnet funnel.",
    },
  },
  {
    rung: "Keep it running",
    ai: { name: "Run", amt: "€1,650 to €3,250 / month", desc: "Keeps your systems running and adds the next one." },
    content: { name: "Operator", amt: "€2,000 to €3,500 / month", desc: "A weekly data review, a script pass and a monthly strategy reset." },
  },
  {
    rung: "Guarantee",
    ai: { desc: "30-day warranty on the build." },
    content: { desc: "No guarantee yet. I will add one after the first two clients, once there is a result to stand behind." },
  },
  {
    rung: "Billing",
    ai: { desc: "50% on signing, 50% on delivery." },
    content: { desc: "50% on signing, 50% on delivery." },
  },
];

function CellView({ c, col }: { c: Cell; col: string }) {
  return (
    <div>
      <span className="cell-label">{col}</span>
      {c.name && <div className="name">{c.name}</div>}
      {c.amt && <span className="amt">{c.amt}</span>}
      <div className="desc">{c.desc}</div>
    </div>
  );
}

export default function PriceCard() {
  return (
    <section id="prices" aria-labelledby="prices-h">
      <div className="am-section-head">
        <div className="am-label">Prices</div>
        <h2 id="prices-h" className="am-h2">Pick a door. Prices are on the page.</h2>
        <p className="am-lede">
          Both start with the free test and a free 30-minute call. I take at most <b>{CLIENT_CAP} clients at a time</b>.
        </p>
      </div>
      <div className="am-price" role="table" aria-label="Price card">
        <div className="am-price-row head" role="row">
          <div role="columnheader" />
          <div role="columnheader"><div className="am-h3">AI consultancy</div></div>
          <div role="columnheader"><div className="am-h3">Content strategy consultancy</div></div>
        </div>
        {ROWS.map((r) => (
          <div className="am-price-row" role="row" key={r.rung}>
            <div className="rung" role="rowheader">{r.rung}</div>
            <CellView c={r.ai} col="AI consultancy" />
            <CellView c={r.content} col="Content strategy" />
          </div>
        ))}
      </div>
      <ol className="am-notes">
        <li>AI run costs (model usage, hosting, connectors) are passed through at cost, never hidden in the Sprint. Most setups land between €200 and €400 a month; the range is €120 to €800.</li>
        <li>Podcast shows: a Clip Audit and Strategy is €1,500 to €2,500, under the content column.</li>
        <li>The €2,500 assessment or audit is credited in full if you build within 30 days.</li>
        <li>Euro, excluding VAT. Invoiced by Midcurve Labs EOOD.</li>
      </ol>
    </section>
  );
}

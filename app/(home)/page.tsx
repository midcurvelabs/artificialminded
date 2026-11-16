import Link from "next/link";
import CallButton from "@/components/home/CallButton";
import { HOME } from "@/lib/home";
import { ENTITY, WORDMARK } from "@/lib/site";

// The homepage. All copy is in lib/home.ts; this file is layout only.
export default function Home() {
  return (
    <>
      <header className="hm-head">
        <div className="hm-shell">
          <Link href="/" className="hm-mark" aria-label={`${WORDMARK} home`}>
            <i aria-hidden="true" />
            {WORDMARK}
          </Link>
          <CallButton label="Book a call" note={false} />
        </div>
      </header>

      <main>
        <section className="hm-hero">
          <div className="hm-shell">
            <p className="hm-label">{HOME.eyebrow}</p>
            <h1 className="hm-h1">
              <s>{HOME.struck}</s>
              <span>{HOME.headline}</span>
            </h1>
            <p className="hm-sub">{HOME.sub}</p>
            <CallButton />
          </div>
          <div className="hm-shell">
            <ul className="hm-facts" aria-label="How we work">
              {HOME.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="hm-how" aria-labelledby="how-h">
          <div className="hm-shell">
            <h2 id="how-h" className="hm-label">{`// ${HOME.howLabel}`}</h2>
            <ol className="hm-cards">
              {HOME.how.map((c, i) => (
                <li key={c.kicker}>
                  <div className="hm-card-top">
                    <span className="hm-kicker">{c.kicker}</span>
                    <span className="hm-n">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="hm-h3">{c.title}</h3>
                  <p className="hm-body">{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hm-close">
          <div className="hm-shell">
            <h2 className="hm-h2">{HOME.closing}</h2>
            <CallButton note={false} />
          </div>
        </section>
      </main>

      <footer className="hm-foot">
        <div className="hm-shell">
          <span>
            {WORDMARK}, part of {ENTITY.name}
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

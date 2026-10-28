import type { MagnetMeta } from "@/lib/magnets";
import { WORDMARK } from "@/lib/magnets";
import MagnetTracker from "./MagnetTracker";

export default function MagnetShell({ magnet, children }: { magnet: MagnetMeta; children: React.ReactNode }) {
  return (
    <div className="am-wrap">
      <MagnetTracker keyword={magnet.keyword} />
      <header className="am-top">
        <span>{WORDMARK}</span>
        <span className="am-ghost">GUIDE // {magnet.keyword.toUpperCase()}</span>
      </header>
      <section className="am-hero">
        <div className="am-label">{magnet.kicker}</div>
        <h1>{magnet.title}</h1>
      </section>
      {children}
      <footer className="am-foot">
        <span>MIND THE SIGNAL.</span>
        <span className="am-ghost">Sent because you commented {magnet.keyword.toUpperCase()}</span>
      </footer>
    </div>
  );
}

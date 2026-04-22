import type { CouncilOpinion as CO } from "@/lib/types";

export function CouncilOpinion({ council }: { council: CO }) {
  return (
    <aside className="council">
      <div className="council-stanza">
        <span className="council-label">Bull</span>
        <p className="council-body">{council.bull}</p>
      </div>
      <div className="council-stanza">
        <span className="council-label">Bear</span>
        <p className="council-body">{council.bear}</p>
      </div>
      <div className="council-stanza">
        <span className="council-label">Builder</span>
        <p className="council-body">{council.builder}</p>
      </div>
    </aside>
  );
}

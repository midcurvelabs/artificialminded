// A visible gap, never a claim. Everything wrapped in this is waiting on Rik or on a real result.
export function Placeholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="am-ph" role="note">
      <b>PLACEHOLDER · {title}</b>
      {children}
    </div>
  );
}

export function PlaceholderInline({ children }: { children: React.ReactNode }) {
  return <span className="am-ph-inline">PLACEHOLDER: {children}</span>;
}

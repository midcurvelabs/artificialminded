export function EditorialNote({ note }: { note: string }) {
  // Note is plain text. The signature is on its own line, prefixed with "—".
  // Split off the signature line if present so we can style it.
  const lines = note.trim().split(/\n+/);
  const last = lines[lines.length - 1];
  const isSignature = /^[—–-]\s*\w/.test(last);
  const body = isSignature ? lines.slice(0, -1).join("\n\n") : note;
  const signature = isSignature ? last : null;

  return (
    <section className="editorial-strip">
      <div className="editorial-box">
        <span className="e-label">Editorial — from the desk of the editor</span>
        {body.split(/\n\n+/).map((para, i) => (
          <p key={i} style={{ marginBottom: "10px" }}>
            {para}
          </p>
        ))}
        {signature && <span className="e-signature">{signature}</span>}
      </div>
    </section>
  );
}

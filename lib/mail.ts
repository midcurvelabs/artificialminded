// Transactional email through Resend's HTTP API. Without RESEND_API_KEY (local dev) it logs instead.
// MAIL_FROM must be a sender on a domain verified in Resend.

export async function sendMail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[mail:dev]", { to, subject, html });
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "ArtificialMinded <hello@artificialminded.com>",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`resend failed: ${res.status}`);
}

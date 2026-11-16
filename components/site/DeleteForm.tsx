"use client";

import { useState } from "react";

export default function DeleteForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setError("");
    const res = await fetch("/api/delete-my-data", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    if (!res || !res.ok) {
      const j = res ? await res.json().catch(() => ({})) : {};
      setState("idle");
      return setError(j.error || "Something went wrong. Please try again.");
    }
    setState("sent");
  }

  if (state === "sent") {
    return <div className="am-ok" role="status">Check your inbox. If we hold data for that address, the email has a link to confirm the deletion. The link works for 24 hours.</div>;
  }
  return (
    <form className="am-form" onSubmit={submit}>
      <label className="am-label" htmlFor="del-email">Email address to delete</label>
      <input id="del-email" className="am-input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <div className="am-err" role="alert">{error}</div>}
      <div><button className="am-btn" type="submit" disabled={state === "busy" || !email}>{state === "busy" ? "Sending" : "Send the confirmation link"}</button></div>
    </form>
  );
}

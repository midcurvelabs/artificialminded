"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, score, resultHref, type Answers } from "@/lib/owner-test";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { track } from "@/lib/track";

// One question at a time, then the email step, then the result page.
// The email step can be skipped: the result is never held hostage to marketing consent (see site-v1-review.md).

const KEYS = "ABCDE";

export default function OwnerTest() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0..9 questions, 10 = email
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const outcome = done ? score(answers) : null;
  const href = outcome ? resultHref(outcome) : "";
  const slug = href.split("?")[0].replace("/result/", "");

  // Anonymous funnel events: which question people reach, and the result type. Never the answers.
  useEffect(() => {
    if (step === 0) track("test_start", "owner-test");
    else if (step < QUESTIONS.length) track("test_question", "owner-test", { q: step + 1 });
    else track("test_complete", "owner-test", { result: slug, kind: outcome!.kind });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function pick(i: number) {
    setAnswers((a) => ({ ...a, [q.id]: i }));
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return setError("Please tick the box, or skip and see your result.");
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent, result: slug, href, answers, sourceUrl: window.location.href }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setBusy(false);
        return setError(j.error || "Could not save. You can still see your result.");
      }
    } catch {
      setBusy(false);
      return setError("Could not save. You can still see your result.");
    }
    track("test_email_saved", "owner-test", { result: slug });
    router.push(href + (href.includes("?") ? "&" : "?") + "saved=1");
  }

  return (
    <div className="am-test">
      <div className="am-progress" aria-hidden="true">
        {QUESTIONS.map((x, i) => <i key={x.id} className={i < step ? "on" : ""} />)}
      </div>

      {!done ? (
        <>
          <div className="am-label">Question {step + 1} of {QUESTIONS.length}</div>
          <h2 className="am-q" id="q-text">{q.text}</h2>
          <div className="am-opts" role="group" aria-labelledby="q-text">
            {q.options.map((o, i) => (
              <button key={o.label} type="button" className="am-opt" aria-pressed={answers[q.id] === i} onClick={() => pick(i)}>
                <span className="k">{KEYS[i]}</span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>
          <div className="am-testnav">
            {step > 0 ? <button type="button" className="am-link" onClick={() => setStep(step - 1)}>Back</button> : <span />}
            <span className="am-cta-note">No account. Nothing is saved until you choose to.</span>
          </div>
        </>
      ) : (
        <>
          <div className="am-label">Done. Your result is ready.</div>
          <h2 className="am-q">Where should I send your result?</h2>
          <form className="am-form" onSubmit={submit} noValidate>
            <label className="am-label" htmlFor="email">Email</label>
            <input id="email" className="am-input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            <ConsentCheckbox checked={consent} onChange={setConsent} />
            {error && <div className="am-err" role="alert">{error}</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
              <button className="am-btn" type="submit" disabled={busy || !email || !consent}>{busy ? "Saving" : "Send it and show my result"}</button>
              <a className="am-link" href={href} onClick={() => track("test_email_skipped", "owner-test", { result: slug })}>Skip, just show my result</a>
            </div>
          </form>
          <div className="am-testnav">
            <button type="button" className="am-link" onClick={() => setStep(QUESTIONS.length - 1)}>Back</button>
            <span />
          </div>
        </>
      )}
    </div>
  );
}

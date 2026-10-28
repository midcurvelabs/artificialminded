"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

type Who = "grok" | "claude" | "rik";
type Step = { a: Who; w: string; t: string; what: string; inn: string; out: string; rule: string; prompt: string | null };

const STEPS: Step[] = [
  {
    a: "grok", w: "Grok", t: "Writes the script",
    what: 'Grok researches the topic and writes the script with three hook options and a visuals brief per line. The result lands as a page in a Notion database with the status "Hooks ready".',
    inn: "A topic idea.", out: "A script page: script, 3 hooks, visuals brief.",
    rule: "If you cannot say it out loud clearly, you cannot automate it. Get the script right before any editing starts.",
    prompt: "Research [topic]. Write a script that reads in under 55 seconds. Give me 3 hook options and a visuals brief for every line. Mark the one line worth saving.",
  },
  {
    a: "claude", w: "Claude", t: "Loads the teleprompter",
    what: 'One command copies the text of every "Hooks ready" script into a folder on Drive, one text file per clip, so the teleprompter app can read them.',
    inn: 'Pages with status "Hooks ready".', out: "One .txt per clip in the teleprompter folder.",
    rule: "A status field drives it. Nobody copies and pastes scripts by hand.",
    prompt: 'Copy the teleprompter text of every page with status "Hooks ready" into the Drive folder "Teleprompter", one .txt per clip. Skip pages already synced.',
  },
  {
    a: "rik", w: "Me", t: "Film one take",
    what: "I read the script off the teleprompter in one take and drop the file in the batch folder. That is touch one.",
    inn: "The script on the teleprompter.", out: "A raw take in the batch folder.",
    rule: "Under 60 seconds, always. YouTube Shorts will not take 61. I aim for 59.5 or less on the real cut.",
    prompt: null,
  },
  {
    a: "claude", w: "Claude", t: "Edits it",
    what: "Claude transcribes the take, cuts flubs and retakes, then writes the edit as a spec file with one insert per beat: b-roll, a proof screenshot, or a motion graphic. A fast check runs on the spec. A render comes after, in one background job.",
    inn: "The raw take and the script.", out: "An edit spec and a rendered cut.",
    rule: "Edit the spec, not a timeline. Preview on still frames before you render. Keep my ad-libs, cut only the flubs.",
    prompt: "You edit one short at a time. Read the run-state file first. Transcribe the take, cut flubs and retakes, keep my ad-libs. Write the edit spec with one insert per beat (b-roll, proof, or motion). Run the spec check and fix the spec until it passes. Do not render. Do not wait on anything. Report a one-line verdict and update the run-state file.",
  },
  {
    a: "claude", w: "Claude", t: "Checks its own work",
    what: "A separate checker session judges the render against a short rubric and returns PASS or a numbered fix list. The editor fixes and the checker looks again.",
    inn: "The rendered cut.", out: "PASS, or a numbered fix list.",
    rule: "Two passes at most before I see it. A third pass costs more than it finds.",
    prompt: "Judge this render against the rubric. Return PASS or a numbered fix list. Do not edit anything. Maximum two iterations.",
  },
  {
    a: "rik", w: "Me", t: "Review on one page",
    what: "The cut and its layout frames go on one review page. I watch, drop timestamped notes, and press Send to Claude. Layout frames are approved before any render, so a render is never wasted on a wrong layout. That is touch two.",
    inn: "The checked cut on the review page.", out: "Timestamped notes.",
    rule: "Notes live on the page, not in chat. A revision goes back through the layout check before it re-renders.",
    prompt: "Read the submitted notes. Fix each one in the spec. Tag what changed. Send the changes through the layout check before any re-render.",
  },
  {
    a: "claude", w: "Claude", t: "Writes the captions",
    what: "Claude writes the publish pack from a caption spec: the caption, the YouTube title and description, an X post, and the feed cover. A script checks the caption format and fails anything that breaks the spec.",
    inn: "The approved cut and the script.", out: "One publish pack per short.",
    rule: "One sentence per line, keyword in the hook. Instagram gets no hashtags. YouTube descriptions get no links.",
    prompt: "Write the publish pack for this short using the caption spec: caption, YouTube title and description, X post, cover text. Run the caption check and fix anything it flags.",
  },
  {
    a: "claude", w: "Claude", t: "Publishes to the queue",
    what: "Claude pushes the approved short into the posting queue for Instagram, TikTok and YouTube Shorts. It adds to the queue and never posts now. I own the queue slots.",
    inn: "The approved publish pack.", out: "Scheduled posts.",
    rule: "Queue, never post now. Anything that costs money gets a dry-run cost shown first and a yes from me.",
    prompt: "Add the approved short to the posting queue for Instagram, TikTok and YouTube Shorts using the publish pack. Never post now. Show me what goes where before you push.",
  },
];

const BUILD: [string, string][] = [
  ["Make a script template.", "One page per short with the script, three hooks and a visuals brief per line. Let your research model fill it."],
  ["Pick one folder for takes and one for renders.", "Claude reads the first and writes the second. No renders inside your code or notes folders."],
  ["Write the edit as a spec file, not a timeline.", "A JSON file listing cuts, captions and inserts per beat. Specs are cheap to change and easy to compare."],
  ["Add two checks before you see a render.", "A spec check for lengths, overlaps and safe areas, and a critic pass against a short rubric."],
  ["Build one review page.", "A video, a notes box, and a Send button that writes a file Claude can read."],
  ["Write the caption spec once.", "One sentence per line, keyword in the hook, rules per platform. Add a script that fails bad captions."],
  ["Connect your posting tool queue.", "Push to the queue, not to post now. You keep the schedule."],
];

const STORE = "am-system-build";

export default function SystemMagnet({ keyword }: { keyword: string }) {
  const [cur, setCur] = useState(3);
  const [filter, setFilter] = useState<"all" | Who>("all");
  const [copied, setCopied] = useState(false);
  const [ticks, setTicks] = useState<Record<number, boolean>>({});
  const seen = useRef(new Set<number>());
  const finished = useRef(false);

  useEffect(() => {
    try {
      setTicks(JSON.parse(localStorage.getItem(STORE) || "{}"));
    } catch {}
  }, []);

  const s = STEPS[cur];

  function open(i: number) {
    setCur(i);
    setCopied(false);
    if (!seen.current.has(i)) {
      seen.current.add(i);
      track("magnet_engaged", keyword, { step: i + 1, steps_seen: seen.current.size });
    }
  }

  async function copy() {
    if (!s.prompt) return;
    track("magnet_copy", keyword, { step: cur + 1 });
    try {
      await navigator.clipboard.writeText(s.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  function tick(i: number, on: boolean) {
    const next = { ...ticks, [i]: on };
    setTicks(next);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {}
    if (!finished.current && BUILD.every((_, j) => next[j])) {
      finished.current = true;
      track("magnet_finish", keyword);
    }
  }

  return (
    <>
      <p className="am-lede">
        Grok writes. I film. Claude edits. I review. Claude writes the captions and publishes. <b>I touch the video twice.</b>{" "}
        Tap a step to see what goes in, what comes out, and the rule that keeps it cheap.
      </p>

      <div>
        <div className="am-meter" aria-hidden="true">
          {STEPS.map((x, i) => (
            <i key={i} data-a={x.a} />
          ))}
        </div>
        <div className="am-cap">8 steps. Grok 1, Claude 5, Rik 2.</div>
      </div>

      <div className="am-filters" role="group" aria-label="Show steps by who does them">
        {([["all", "All"], ["grok", "Grok"], ["claude", "Claude"], ["rik", "Me"]] as const).map(([f, label]) => (
          <button key={f} type="button" className="am-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {label}
          </button>
        ))}
      </div>

      <ol className="am-steps">
        {STEPS.map((x, i) => (
          <li key={i}>
            <button
              type="button"
              className={`am-step${filter !== "all" && x.a !== filter ? " dim" : ""}`}
              data-a={x.a}
              aria-current={cur === i ? "true" : undefined}
              onClick={() => open(i)}
            >
              <span className="n">{i + 1} of 8</span>
              <span className="w">{x.w}</span>
              <span className="t">{x.t}</span>
            </button>
          </li>
        ))}
      </ol>

      <section className="am-panel" aria-live="polite">
        <div>
          <div className="am-label">
            Step {cur + 1} of 8 · {s.w}
          </div>
          <h2>{s.t}</h2>
        </div>
        <p>{s.what}</p>
        <div className="am-grid">
          <div>
            <div className="am-label">Goes in</div>
            <p>{s.inn}</p>
          </div>
          <div>
            <div className="am-label">Comes out</div>
            <p>{s.out}</p>
          </div>
        </div>
        <div>
          <div className="am-label">The rule</div>
          <p className="am-rule">{s.rule}</p>
        </div>
        <div>
          <div className="am-label">{s.prompt ? "Prompt to start from" : "Prompt"}</div>
          {s.prompt ? (
            <>
              <div className="am-prompt">{s.prompt}</div>
              <button type="button" className="am-copy" onClick={copy}>
                {copied ? "Copied" : "Copy prompt"}
              </button>
            </>
          ) : (
            <p className="am-none">No prompt. This one is my job. Hit record.</p>
          )}
        </div>
      </section>

      <section className="am-build">
        <div className="am-label">BUILD LOG //</div>
        <h3>Build yours in an afternoon</h3>
        <p className="am-sub">Seven moves. Your ticks stay in this browser.</p>
        <ul className="am-checks">
          {BUILD.map(([b, rest], i) => (
            <li key={i} className="am-check">
              <input type="checkbox" id={`b${i}`} checked={!!ticks[i]} onChange={(e) => tick(i, e.target.checked)} />
              <label htmlFor={`b${i}`}>
                <b>{b}</b> {rest}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <p className="am-note">Every short is reviewed by hand before it posts. Nothing here runs without me.</p>
    </>
  );
}

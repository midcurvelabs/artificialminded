// Every number on the site, with where it comes from. Nothing here is estimated or rounded up.
// `file` is the rik-docs vault path (kept here for checking, not shown on the page);
// `source` is the plain-words label the page prints under the number.
// To refresh: re-read the file, change the value and the `asOf` date together.

export type Sourced = { source: string; file: string; asOf: string };

// Cost per clip, by batch. Clip Desk spend log, priced at API list prices.
// "loaded" = everything the batch spent (orchestration, tooling, motion, critics) / clips.
// "direct" = only the work tagged to a clip / clips.
export const SPEND: Sourced & {
  rows: { batch: number; clips: number; loaded: number; direct: number; open?: boolean }[];
} = {
  source: "Clip Desk spend log, generated 28 Oct 2026, API-equivalent list prices",
  file: "02_projects/RikGPT/shorts/_system/desk/spend/spend.json",
  asOf: "2026-10-28",
  rows: [
    { batch: 2, clips: 8, loaded: 52.6, direct: 11.7 },
    { batch: 3, clips: 7, loaded: 61.4, direct: 35.7 },
    { batch: 4, clips: 8, loaded: 13.0, direct: 8.2 },
    { batch: 5, clips: 12, loaded: 16.3, direct: 9.7 },
    { batch: 6, clips: 11, loaded: 29.7, direct: 18.3 },
    { batch: 7, clips: 8, loaded: 53.3, direct: 20.0 },
    { batch: 8, clips: 12, loaded: 28.3, direct: 19.3 },
    { batch: 9, clips: 17, loaded: 7.0, direct: 4.7 },
    { batch: 10, clips: 32, loaded: 10.4, direct: 7.4, open: true },
  ],
};

// Batch 07 token audit. "Units" are token_audit.py's price-weighted tokens:
// input + 0.1 x cache read + 1.25 x cache write + 5 x output, times a model weight. Not raw tokens.
export const BATCH07_UNITS: Sourced & { perClipM: number; totalM: number; clips: number; usd: number } = {
  source: "Batch 07 auto retro (token audit), 19 to 23 Oct 2026",
  file: "02_projects/RikGPT/shorts/_system/batch-07-retro-auto.md",
  asOf: "2026-10-23",
  perClipM: 6.7,
  totalM: 53.5,
  clips: 8,
  usd: 141,
};

// The bucket analysis. 58 shorts reviewed; the 47 below had Instagram data in the 23 Oct Buffer pull.
export const BUCKETS: Sourced & {
  reviewed: number;
  rows: { group: string; shorts: number; igMedian: number; past1k: string; ytMedian: number; savesShares: number; watch: string; win?: boolean }[];
} = {
  source: "RikGPT bucket research, Buffer pull 23 Oct 2026",
  file: "02_projects/RikGPT/research/2026-10-23-buckets-virality-lead-magnets.md",
  asOf: "2026-10-23",
  reviewed: 58,
  rows: [
    { group: "Money and platform moves", shorts: 15, igMedian: 1405, past1k: "11 of 15", ytMedian: 1353, savesShares: 12.9, watch: "14.3 s", win: true },
    { group: "Single striking build in frame 1", shorts: 7, igMedian: 1423, past1k: "5 of 7", ytMedian: 1195, savesShares: 4.7, watch: "14.8 s", win: true },
    { group: "Agent how-tos, process, lists", shorts: 5, igMedian: 230, past1k: "0 of 5", ytMedian: 1387, savesShares: 10.7, watch: "n/a" },
    { group: "Reverse-engineering, big name and a twist", shorts: 5, igMedian: 1904, past1k: "5 of 5", ytMedian: 1024, savesShares: 1.9, watch: "20.4 s", win: true },
    { group: "Data digs with no stake", shorts: 4, igMedian: 275, past1k: "0 of 4", ytMedian: 372, savesShares: 4.0, watch: "8.7 s" },
    { group: "Unknown tools, abstract takes, off topic", shorts: 11, igMedian: 178, past1k: "0 of 11", ytMedian: 1075, savesShares: 1.9, watch: "7.5 s" },
  ],
};

// Critic: every review pass the critic agent logged before Rik saw a cut.
export const CRITIC: Sourced & { passes: number; versions: number; blocks: number; from: string; to: string; rubricFrom: number; rubricTo: number } = {
  source: "Critic log, 14 to 28 Oct 2026",
  file: "02_projects/RikGPT/shorts/_system/critic_log.jsonl",
  asOf: "2026-10-28",
  passes: 264,
  versions: 103,
  blocks: 283,
  from: "14 Oct",
  to: "28 Oct",
  rubricFrom: 1,
  rubricTo: 18,
};

// Rik's own review notes per short, first batch vs batch 09.
export const NOTES: { before: Sourced & { value: number; label: string }; after: Sourced & { value: number; label: string; shorts: number } } = {
  before: {
    value: 6.8,
    label: "Batch 01, first layout review, 14 Oct",
    source: "Critic calibration log",
    file: "02_projects/RikGPT/shorts/_system/critic-calibration.md",
    asOf: "2026-10-14",
  },
  after: {
    value: 0.3,
    shorts: 27,
    label: "Batch 09, 25 Oct",
    source: "Batch 09 auto retro",
    file: "02_projects/RikGPT/shorts/_system/batch-09-retro-auto.md",
    asOf: "2026-10-25",
  },
};

// Week 1 funnel: views to follows.
export const FUNNEL: Sourced & { views: number; follows: number; pct: string; igFrom: number; igTo: number; igToDate: string } = {
  source: "RikGPT week 1 stats: Buffer metrics 23 Oct, follower counts from daily Apify snapshots",
  file: "02_projects/RikGPT/shorts/_system/weekly/2026-10-21-week-01-stats.md",
  asOf: "2026-10-25",
  views: 121337,
  follows: 102,
  pct: "0.08%",
  igFrom: 154,
  igTo: 207,
  igToDate: "25 Oct",
};

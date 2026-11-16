// Lead and deletion-request storage.
// With SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set (Rik adds them), rows go to the tables in
// supabase/migrations/0001_artificialminded_leads.sql. Without them (local dev), rows go to .data/*.jsonl.

import { promises as fs } from "node:fs";
import path from "node:path";

export type LeadRow = {
  email: string;
  consent_text: string;
  consent_version: string;
  consent_ip: string | null;
  consent_user_agent: string | null;
  consent_source_url: string | null;
  consented_at: string;
  marketing_consent: boolean;
  source: string; // "owner-test"
  role_tag: string | null; // Q1 answer
  team_size: string | null; // Q2 answer
  result: string; // result slug
  answers: Record<string, number>;
};

export type DeletionRow = { token: string; email: string; expires_at: string; completed_at?: string | null };

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DATA_DIR = path.join(process.cwd(), ".data");

function sb(pathAndQuery: string, init: RequestInit = {}) {
  return fetch(`${SB_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      authorization: `Bearer ${SB_KEY}`,
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
}

async function readJsonl<T>(file: string): Promise<T[]> {
  try {
    const text = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return text.split("\n").filter(Boolean).map((l) => JSON.parse(l) as T);
  } catch {
    return [];
  }
}

async function writeJsonl<T>(file: string, rows: T[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : ""));
}

export async function saveLead(row: LeadRow) {
  if (SB_URL && SB_KEY) {
    const res = await sb("am_leads", { method: "POST", body: JSON.stringify(row), headers: { prefer: "return=minimal" } });
    if (!res.ok) throw new Error(`supabase insert failed: ${res.status}`);
    return;
  }
  const rows = await readJsonl<LeadRow>("leads.jsonl");
  rows.push(row);
  await writeJsonl("leads.jsonl", rows);
}

export async function saveDeletionRequest(row: DeletionRow) {
  if (SB_URL && SB_KEY) {
    const res = await sb("am_deletion_requests", { method: "POST", body: JSON.stringify(row), headers: { prefer: "return=minimal" } });
    if (!res.ok) throw new Error(`supabase insert failed: ${res.status}`);
    return;
  }
  const rows = await readJsonl<DeletionRow>("deletion_requests.jsonl");
  rows.push(row);
  await writeJsonl("deletion_requests.jsonl", rows);
}

// Confirms a deletion token and erases every lead row for that email. Returns the email, or null.
export async function confirmDeletion(token: string): Promise<string | null> {
  const now = new Date().toISOString();
  if (SB_URL && SB_KEY) {
    const res = await sb(`am_deletion_requests?token=eq.${encodeURIComponent(token)}&select=*`);
    const [req] = res.ok ? ((await res.json()) as DeletionRow[]) : [];
    if (!req || req.completed_at || req.expires_at < now) return null;
    const del = await sb(`am_leads?email=ilike.${encodeURIComponent(req.email)}`, { method: "DELETE" });
    if (!del.ok) throw new Error(`supabase delete failed: ${del.status}`);
    await sb(`am_deletion_requests?token=eq.${encodeURIComponent(token)}`, {
      method: "PATCH",
      body: JSON.stringify({ completed_at: now }),
    });
    return req.email;
  }
  const reqs = await readJsonl<DeletionRow>("deletion_requests.jsonl");
  const req = reqs.find((r) => r.token === token);
  if (!req || req.completed_at || req.expires_at < now) return null;
  const leads = await readJsonl<LeadRow>("leads.jsonl");
  await writeJsonl("leads.jsonl", leads.filter((l) => l.email.toLowerCase() !== req.email.toLowerCase()));
  req.completed_at = now;
  await writeJsonl("deletion_requests.jsonl", reqs);
  return req.email;
}

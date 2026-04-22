import { promises as fs } from "node:fs";
import path from "node:path";
import type { Article, Issue, CouncilOpinion, Source, Signal } from "./types";
import { mockIssue } from "./mock-issue";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const ISSUES_DIR = path.join(CONTENT_ROOT, "issues");
const ARTICLES_DIR = path.join(CONTENT_ROOT, "articles");

interface ArticleFrontmatter {
  slug: string;
  date: string;
  title: string;
  deck: string;
  signal: Signal;
  sources: Source[];
  council?: CouncilOpinion;
  isHeadline?: boolean;
}

interface IssueFrontmatter {
  date: string;
  volume: number;
  issueNumber: number;
  weekday: string;
  prettyDate: string;
  headlineSlug: string | null;
  trendSlugs: string[];
  isQuietDay: boolean;
}

/**
 * Parses a .md file with JSON frontmatter between --- fences.
 * Format:
 *   ---
 *   { "key": "value" }
 *   ---
 *
 *   body markdown here
 */
function parseFile<T>(raw: string): { frontmatter: T; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("file is missing frontmatter fence");
  }
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("file is missing closing frontmatter fence");
  }
  const fmText = raw.slice(4, end);
  const body = raw.slice(end + 5).replace(/^\s+/, "").replace(/\s+$/, "");
  const frontmatter = JSON.parse(fmText) as T;
  return { frontmatter, body };
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function hasAnyContent(): Promise<boolean> {
  if (!(await fileExists(ISSUES_DIR))) return false;
  const entries = await fs.readdir(ISSUES_DIR);
  return entries.some((e) => e.endsWith(".md"));
}

export async function loadArticle(slug: string): Promise<Article | null> {
  const p = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!(await fileExists(p))) return null;
  const raw = await fs.readFile(p, "utf-8");
  const { frontmatter, body } = parseFile<ArticleFrontmatter>(raw);
  return { ...frontmatter, body };
}

export async function loadIssue(date: string): Promise<Issue | null> {
  const p = path.join(ISSUES_DIR, `${date}.md`);
  if (!(await fileExists(p))) return null;
  const raw = await fs.readFile(p, "utf-8");
  const { frontmatter, body: editorialNote } = parseFile<IssueFrontmatter>(raw);

  if (frontmatter.isQuietDay) {
    return {
      date: frontmatter.date,
      volume: frontmatter.volume,
      issueNumber: frontmatter.issueNumber,
      weekday: frontmatter.weekday,
      prettyDate: frontmatter.prettyDate,
      headline: null,
      trends: [],
      editorialNote,
      isQuietDay: true,
    };
  }

  if (!frontmatter.headlineSlug) {
    throw new Error(`issue ${date} is not a quiet day but has no headlineSlug`);
  }

  const [headline, ...trends] = await Promise.all([
    loadArticle(frontmatter.headlineSlug),
    ...frontmatter.trendSlugs.map((s) => loadArticle(s)),
  ]);

  if (!headline) {
    throw new Error(`issue ${date} references missing headline ${frontmatter.headlineSlug}`);
  }
  if (trends.some((t) => t === null)) {
    const missing = frontmatter.trendSlugs.filter((s, i) => trends[i] === null);
    throw new Error(`issue ${date} references missing trends: ${missing.join(", ")}`);
  }

  return {
    date: frontmatter.date,
    volume: frontmatter.volume,
    issueNumber: frontmatter.issueNumber,
    weekday: frontmatter.weekday,
    prettyDate: frontmatter.prettyDate,
    headline,
    trends: trends as Article[],
    editorialNote,
  };
}

export async function listIssueDates(): Promise<string[]> {
  if (!(await fileExists(ISSUES_DIR))) return [];
  const entries = await fs.readdir(ISSUES_DIR);
  return entries
    .filter((e) => e.endsWith(".md"))
    .map((e) => e.replace(/\.md$/, ""))
    .sort()
    .reverse();
}

/**
 * Resolves to the latest published issue, or falls back to the mock during Phase 1.
 * All page-level loaders go through this so the site never 500s on an empty repo.
 */
export async function latestIssue(): Promise<Issue> {
  if (await hasAnyContent()) {
    const dates = await listIssueDates();
    for (const date of dates) {
      const issue = await loadIssue(date);
      if (issue) return issue;
    }
  }
  return mockIssue;
}

/**
 * Loads one article by slug. Falls back to the mock during Phase 1.
 */
export async function findArticle(slug: string): Promise<Article | null> {
  if (await hasAnyContent()) {
    const article = await loadArticle(slug);
    if (article) return article;
  }
  const all = [mockIssue.headline, ...mockIssue.trends].filter(
    (a): a is Article => a !== null,
  );
  return all.find((a) => a.slug === slug) ?? null;
}

/**
 * All issues, newest first. Falls back to [mockIssue] during Phase 1.
 */
export async function listIssues(): Promise<Issue[]> {
  if (await hasAnyContent()) {
    const dates = await listIssueDates();
    const issues = await Promise.all(dates.map((d) => loadIssue(d)));
    return issues.filter((i): i is Issue => i !== null);
  }
  return [mockIssue];
}

/**
 * One issue by date. Falls back to the mock if it matches the mock's date.
 */
export async function findIssue(date: string): Promise<Issue | null> {
  if (await hasAnyContent()) {
    return loadIssue(date);
  }
  return date === mockIssue.date ? mockIssue : null;
}

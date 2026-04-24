import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Cluster, Compare } from "./compare-types";

const COMPARE_DIR = path.join(process.cwd(), "content", "compare");

type CompareFrontmatter = Omit<Compare, "body">;

function parseFile(raw: string): { frontmatter: CompareFrontmatter; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("compare file is missing frontmatter fence");
  }
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("compare file is missing closing frontmatter fence");
  }
  const fmText = raw.slice(4, end);
  const body = raw.slice(end + 5).replace(/^\s+/, "").replace(/\s+$/, "");
  const frontmatter = JSON.parse(fmText) as CompareFrontmatter;
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

export const getAllCompares = cache(async (): Promise<Compare[]> => {
  if (!(await fileExists(COMPARE_DIR))) return [];
  const entries = await fs.readdir(COMPARE_DIR);
  const files = entries.filter((e) => e.endsWith(".md"));
  const loaded = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(COMPARE_DIR, file), "utf-8");
      const { frontmatter, body } = parseFile(raw);
      return { ...frontmatter, body };
    }),
  );
  return loaded.sort((a, b) => a.title.localeCompare(b.title));
});

export const getCompare = cache(async (slug: string): Promise<Compare | null> => {
  const p = path.join(COMPARE_DIR, `${slug}.md`);
  if (!(await fileExists(p))) return null;
  const raw = await fs.readFile(p, "utf-8");
  const { frontmatter, body } = parseFile(raw);
  return { ...frontmatter, body };
});

export async function getComparesByCluster(cluster: Cluster): Promise<Compare[]> {
  const all = await getAllCompares();
  return all.filter((c) => c.cluster === cluster);
}

export async function getRelatedCompares(slug: string, limit = 6): Promise<Compare[]> {
  const current = await getCompare(slug);
  if (!current) return [];
  const siblings = await getComparesByCluster(current.cluster);
  return siblings.filter((c) => c.slug !== slug).slice(0, limit);
}

export async function listCompareSlugs(): Promise<string[]> {
  const all = await getAllCompares();
  return all.map((c) => c.slug);
}

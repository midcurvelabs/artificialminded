import type { MetadataRoute } from "next";
import { getAllCompares } from "@/lib/load-compare";
import { listIssues } from "@/lib/load-issue";

const BASE = "https://artificialminded.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [compares, issues] = await Promise.all([getAllCompares(), listIssues()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/archive`, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/compare`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const compareRoutes: MetadataRoute.Sitemap = compares.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    lastModified: c.updated || c.created || undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const issueRoutes: MetadataRoute.Sitemap = issues.map((i) => ({
    url: `${BASE}/daily/${i.date}`,
    lastModified: i.date,
    changeFrequency: "never",
    priority: 0.5,
  }));

  const articleRoutes: MetadataRoute.Sitemap = issues.flatMap((i) => {
    const slugs = [i.headline?.slug, ...i.trends.map((t) => t.slug)].filter(
      (s): s is string => Boolean(s),
    );
    return slugs.map((slug) => ({
      url: `${BASE}/article/${slug}`,
      lastModified: i.date,
      changeFrequency: "never" as const,
      priority: 0.5,
    }));
  });

  return [...staticRoutes, ...compareRoutes, ...issueRoutes, ...articleRoutes];
}

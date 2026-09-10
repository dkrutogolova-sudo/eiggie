import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
  const work = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
  }));
  return [...routes, ...work];
}

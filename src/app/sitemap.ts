import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { venues } from "@/content/weddings";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/weddings", "/venues", "/packages", "/planning", "/gallery", "/stay", "/dining", "/celebrations", "/about", "/contact", "/privacy", "/terms", ...venues.map((v) => `/venues/${v.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/contact" || p === "/weddings" ? 0.9 : 0.6 }));
}

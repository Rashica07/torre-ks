import { BRANDS } from "@/lib/brands";
import type { MetadataRoute } from "next";

/**
 * One sitemap for the whole deployment. Every brand subdomain resolves to
 * this same file (middleware.ts only rewrites the exact "/" path per
 * subdomain; a distinct path like /sitemap.xml passes through untouched and
 * is served by whichever route the app directory defines — there's only one),
 * so it lists absolute URLs across all subdomains rather than assuming a
 * single origin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const brandEntries: MetadataRoute.Sitemap = BRANDS.map((brand) => ({
    url: brand.externalUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://torre-ks.com",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...brandEntries,
    {
      url: "https://torre-ks.com/politika-e-privatesise",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://torre-ks.com/kushtet-e-sherbimit",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

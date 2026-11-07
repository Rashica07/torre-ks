import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/i18n";
import { ROUTES, absoluteUrl, alternatesFor, hasLang, liveLangs, pathFor } from "@/lib/i18n/routes";

/**
 * Generated from the same route registry as the navigation (docs/seo.md §7): canonical, indexable, absolute
 * URLs on one host; no priority/changefreq (Google ignores them) and no fabricated lastmod.
 * English entries (with hreflang) appear only after the English text is approved (D-020).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const live = liveLangs();
  return ROUTES.filter((r) => r.indexable).flatMap((r) =>
    LANGS.filter((l) => live.includes(l) && hasLang(r.id, l)).map((l) => {
      const alternates = alternatesFor(r.id);
      return {
        url: absoluteUrl(pathFor(r.id, l)),
        ...(Object.keys(alternates).length ? { alternates: { languages: alternates as Record<string, string> } } : {}),
      };
    })
  );
}

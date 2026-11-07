import type { Metadata } from "next";
import { ENGLISH_APPROVED, OG_LOCALE, SITE_URL, type Lang } from "@/lib/i18n";
import { absoluteUrl, alternatesFor, getRoute, pathFor, type RouteId } from "@/lib/i18n/routes";
import { routeMeta } from "./meta";

/** Whether a page may be indexed right now (English is gated until approved, D-020). */
export function isIndexable(id: RouteId, lang: Lang): boolean {
  if (!getRoute(id).indexable) return false;
  if (lang === "en" && !ENGLISH_APPROVED) return false;
  return true;
}

export function buildMetadata(id: RouteId, lang: Lang): Metadata {
  const m = routeMeta[id];
  if (!m) throw new Error(`No metadata defined for route ${id}`);
  const title = m.title[lang];
  const description = m.description[lang];
  const url = absoluteUrl(pathFor(id, lang));
  const languages = alternatesFor(id);

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(Object.keys(languages).length ? { languages } : {}) },
    robots: isIndexable(id, lang) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "TORRE Group",
      title,
      description,
      url,
      locale: OG_LOCALE[lang],
      images: [{ url: ogImagePath(id), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImagePath(id)] },
  };
}

function ogImagePath(id: RouteId): string {
  return ["magfa", "swisstech", "torre-umbria", "torrehome"].includes(id) ? `/api/og/${id}` : "/api/og";
}

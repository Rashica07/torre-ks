import { DEFAULT_LANG, ENGLISH_APPROVED, LANGS, SITE_URL, type L, type Lang } from "./index";

/**
 * Route registry — the single source for navigation, the proxy's rewrites, canonical URLs,
 * hreflang and the sitemap (docs/architecture.md §6). Internal folders under src/app/[lang]
 * use the Albanian slug; English public URLs are rewritten to them by src/proxy.ts.
 */
export type RouteId =
  | "home"
  | "companies"
  | "about"
  | "magfa"
  | "swisstech"
  | "torre-umbria"
  | "torrehome"
  | "contact"
  | "privacy"
  | "terms"
  | "accessibility";

export interface RouteDef {
  id: RouteId;
  /** Folder under src/app/[lang] ("" for the home page). */
  folder: string;
  /** Public path per language. A missing language means the page does not exist in it. */
  paths: Partial<Record<Lang, string>>;
  label: L;
  /** Eligible for the sitemap (when its language is live). Legal pages stay out until counsel approves the text. */
  indexable: boolean;
}

export const ROUTES: RouteDef[] = [
  { id: "home", folder: "", paths: { sq: "/", en: "/en" }, label: { sq: "Kryefaqja", en: "Home" }, indexable: true },
  { id: "about", folder: "kompania", paths: { sq: "/kompania", en: "/en/about" }, label: { sq: "Kompania", en: "About" }, indexable: true },
  { id: "companies", folder: "kompanite", paths: { sq: "/kompanite", en: "/en/companies" }, label: { sq: "Kompanitë", en: "Companies" }, indexable: true },
  { id: "magfa", folder: "magfa", paths: { sq: "/magfa", en: "/en/magfa" }, label: { sq: "MAGFA GROUP", en: "MAGFA GROUP" }, indexable: true },
  { id: "swisstech", folder: "swisstech", paths: { sq: "/swisstech", en: "/en/swisstech" }, label: { sq: "SWISSTECH", en: "SWISSTECH" }, indexable: true },
  { id: "torre-umbria", folder: "torre-umbria", paths: { sq: "/torre-umbria", en: "/en/torre-umbria" }, label: { sq: "TORRE DI UMBRIA", en: "TORRE DI UMBRIA" }, indexable: true },
  { id: "torrehome", folder: "torrehome", paths: { sq: "/torrehome", en: "/en/torrehome" }, label: { sq: "TORRE HOME", en: "TORRE HOME" }, indexable: true },
  { id: "contact", folder: "kontakti", paths: { sq: "/kontakti", en: "/en/contact" }, label: { sq: "Kontakti", en: "Contact" }, indexable: true },
  // Legal text exists in Albanian only and is a placeholder pending counsel review (docs/content.md §3).
  { id: "privacy", folder: "politika-e-privatesise", paths: { sq: "/politika-e-privatesise" }, label: { sq: "Politika e Privatësisë", en: "Privacy policy" }, indexable: false },
  { id: "terms", folder: "kushtet-e-sherbimit", paths: { sq: "/kushtet-e-sherbimit" }, label: { sq: "Kushtet e Shërbimit", en: "Terms of service" }, indexable: false },
  { id: "accessibility", folder: "deklarata-e-qasshmerise", paths: { sq: "/deklarata-e-qasshmerise" }, label: { sq: "Qasshmëria", en: "Accessibility" }, indexable: false },
];

export const DIVISION_IDS = ["magfa", "swisstech", "torre-umbria", "torrehome"] as const;
export type DivisionId = (typeof DIVISION_IDS)[number];

export function getRoute(id: RouteId): RouteDef {
  const r = ROUTES.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown route: ${id}`);
  return r;
}

/** Public path for a route. Falls back to the Albanian page when the route has no page in `lang`. */
export function pathFor(id: RouteId, lang: Lang): string {
  const r = getRoute(id);
  return r.paths[lang] ?? r.paths[DEFAULT_LANG]!;
}

export function hasLang(id: RouteId, lang: Lang): boolean {
  return Boolean(getRoute(id).paths[lang]);
}

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Internal App Router path (what the proxy rewrites to). */
export function internalPath(id: RouteId, lang: Lang): string {
  const r = getRoute(id);
  return r.folder ? `/${lang}/${r.folder}` : `/${lang}`;
}

/** Languages that are publicly live (English only after approval). */
export function liveLangs(): Lang[] {
  return LANGS.filter((l) => l === DEFAULT_LANG || ENGLISH_APPROVED);
}

/** hreflang alternates for a route — only live languages that actually have the page. */
export function alternatesFor(id: RouteId): Partial<Record<Lang | "x-default", string>> {
  const live = liveLangs().filter((l) => hasLang(id, l));
  if (live.length < 2) return {};
  const out: Partial<Record<Lang | "x-default", string>> = {};
  for (const l of live) out[l] = absoluteUrl(pathFor(id, l));
  out["x-default"] = absoluteUrl(pathFor(id, DEFAULT_LANG));
  return out;
}

export interface Resolved {
  id: RouteId;
  lang: Lang;
}

/** Resolve a PUBLIC pathname to a route + language (used by the proxy). */
export function resolvePublicPath(pathname: string): Resolved | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const r of ROUTES) {
    for (const lang of LANGS) {
      if (r.paths[lang] === clean) return { id: r.id, lang };
    }
  }
  return null;
}

/** Resolve an INTERNAL App Router pathname (`/en/kompanite`) to a route + language. */
export function resolveInternalPath(pathname: string): Resolved | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const r of ROUTES) {
    for (const lang of LANGS) {
      if (internalPath(r.id, lang) === clean) return { id: r.id, lang };
    }
  }
  return null;
}

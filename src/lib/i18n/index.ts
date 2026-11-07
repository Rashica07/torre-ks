/**
 * Languages (D-002: Albanian + English). Albanian is the default and is served un-prefixed;
 * English lives under /en. English is built but GATED until the owner approves a human-reviewed
 * translation (D-020): while ENGLISH_APPROVED is false, /en/** is noindex and absent from the
 * sitemap, hreflang and the language switcher.
 */
export const LANGS = ["sq", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "sq";

/** Flip to true ONLY after the owner has approved the English text (docs/decisions.md D-020). */
export const ENGLISH_APPROVED = false;

/** A string available in every language. */
export type L<T = string> = Record<Lang, T>;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://torre-ks.com").replace(/\/$/, "");

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function t<T>(value: L<T>, lang: Lang): T {
  return value[lang];
}

export const OG_LOCALE: L = { sq: "sq_AL", en: "en_US" };

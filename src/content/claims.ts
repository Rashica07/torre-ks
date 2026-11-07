import { fact } from "./types";

/**
 * Claims that exist on the old site or in the old data but have NO provenance.
 * They are kept here, typed `unverified`, only so they stay documented — nothing imports this file
 * into a page, and tests/unit/content.test.ts proves that publishing any of them throws.
 * Register with handling: docs/content.md §2.
 */
export const withheldClaims = [
  fact("SWISSTECH PVC windows from €85/m²", "unverified", "Old brands.ts; only the €85/m² figure is marked real in commit f0e42a3, no price list on file"),
  fact("TORRE HOME apartments from €55,000", "unverified", "Old brands.ts"),
  fact("0 % down payment with partner banks", "unverified", "Old brands.ts; no bank named"),
  fact("0 % VAT first home / 8 % second purchase", "unverified", "Old TORRE HOME FAQ; ATK material lists 8 %/18 % categories, claim not confirmed"),
  fact("MAGFA warranty 5 years structure / 2 years interior", "unverified", "Old MAGFA FAQ"),
  fact("MAGFA payment schedule 20/30/30/20 %", "unverified", "Old MAGFA FAQ"),
  fact("SWISSTECH CE-certified German profile", "unverified", "Old SWISSTECH proof fact; supplier unknown (Facebook lead mentions Alumil, a Greek manufacturer)"),
  fact("TORRE DI UMBRIA 100 % projects legalised", "unverified", "Old stat"),
  fact("TORRE HOME A+ energy class", "unverified", "Old stat"),
  fact("24 named client testimonials", "unverified", "Old brands.ts testimonials; appear fabricated"),
];

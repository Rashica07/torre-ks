import type { L } from "@/lib/i18n";

/**
 * Evidence tiers (docs/content.md):
 *  - verified      checked against a primary document
 *  - corroborated  client-supplied AND matched by an independent public source (D-007)
 *  - client        supplied/confirmed by the client (repo history); not independently checked
 *  - unverified    no provenance — NEVER published
 */
export type Tier = "verified" | "corroborated" | "client" | "unverified";

export interface Fact<T = string> {
  value: T;
  tier: Tier;
  /** Where this came from (commit, document, URL, date). */
  source: string;
  /** ISO date of last confirmation; drives sitemap lastmod and llms-full.txt later. */
  updated: string;
}

export function fact<T>(value: T, tier: Tier, source: string, updated = "2026-11-07"): Fact<T> {
  return { value, tier, source, updated };
}

export class UnverifiedClaimError extends Error {
  constructor(source: string) {
    super(`Refusing to publish an unverified claim (source: ${source}). See docs/content.md.`);
    this.name = "UnverifiedClaimError";
  }
}

/**
 * The only way content reaches a page, JSON-LD block, OG image or llms file.
 * Throws at build time when a claim is unverified, so one cannot ship by accident.
 */
export function publish<T>(f: Fact<T>): T {
  if (f.tier === "unverified") throw new UnverifiedClaimError(f.source);
  return f.value;
}

export type LFact = Fact<L>;

export interface Division {
  id: "magfa" | "swisstech" | "torre-umbria" | "torrehome";
  name: string;
  /** Base surface of the company's own design (D-019). */
  surface: "light" | "dark";
  category: L;
  /** One-sentence plain definition (AEO/GEO): what it is and where. */
  summary: LFact;
  /** Service names only; descriptions stay out until verified. */
  services: LFact[];
  areas?: Fact<string[]>;
  address?: Fact<string>;
}

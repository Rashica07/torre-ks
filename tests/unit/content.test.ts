import { describe, expect, it } from "vitest";
import { company } from "@/content/company";
import { divisions } from "@/content/divisions";
import { withheldClaims } from "@/content/claims";
import { UnverifiedClaimError, fact, publish, type Fact } from "@/content/types";

function collectFacts(value: unknown, out: Fact<unknown>[] = []): Fact<unknown>[] {
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    if ("tier" in v && "source" in v && "value" in v) out.push(v as unknown as Fact<unknown>);
    else for (const x of Object.values(v)) collectFacts(x, out);
  }
  return out;
}

describe("provenance guard (docs/architecture.md §5)", () => {
  it("publish() throws for an unverified claim", () => {
    expect(() => publish(fact("x", "unverified", "test"))).toThrow(UnverifiedClaimError);
  });

  it("publish() returns the value for every other tier", () => {
    for (const tier of ["verified", "corroborated", "client"] as const) expect(publish(fact("ok", tier, "test"))).toBe("ok");
  });

  it("every withheld claim refuses to publish", () => {
    expect(withheldClaims.length).toBeGreaterThan(0);
    for (const c of withheldClaims) expect(() => publish(c)).toThrow(UnverifiedClaimError);
  });

  it("no fact reachable from the published content is unverified", () => {
    const facts = [...collectFacts(company), ...collectFacts(divisions)];
    expect(facts.length).toBeGreaterThan(10);
    expect(facts.filter((f) => f.tier === "unverified")).toEqual([]);
  });

  it("every fact names its source", () => {
    for (const f of [...collectFacts(company), ...collectFacts(divisions)]) expect(f.source.length).toBeGreaterThan(5);
  });

  it("contains none of the withheld claim types in published text", () => {
    const text = JSON.stringify([company, divisions]).toLowerCase();
    // Word-aware patterns (a bare "vat" would match "private").
    const banned: [string, RegExp][] = [
      ["a price (€)", /€/],
      ["a warranty claim", /garanci|warranty|guarantee/],
      ["a testimonial", /testimonial|dëshmi/],
      ["a down-payment promise", /paradhënie|down payment/],
      ["an energy class", /\ba\+/],
      ["a percentage claim", /\d\s?%/],
      ["tax advice", /\btvsh\b|\bvat\b/],
    ];
    for (const [label, re] of banned) expect(re.test(text), `published content must not contain ${label}`).toBe(false);
  });

  it("both languages exist for every localized fact", () => {
    for (const f of collectFacts(divisions)) {
      const v = f.value as Record<string, unknown>;
      if (v && typeof v === "object" && !Array.isArray(v) && ("sq" in v || "en" in v)) {
        expect(typeof v.sq).toBe("string");
        expect(typeof v.en).toBe("string");
      }
    }
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { runChecks } from "../../scripts/check-contrast.mjs";

describe("design tokens meet WCAG contrast (docs/design.md §2)", () => {
  const results = runChecks(readFileSync("src/styles/tokens.css", "utf8")) as { scope: string; label: string; ratio: number; min: number; ok: boolean }[];

  it("checks every surface bare and under each company", () => {
    const scopes = new Set(results.map((r) => r.scope));
    for (const s of ["paper", "concrete", "ink", "bronze", "ink · swisstech", "paper · magfa", "plane · torre-umbria", "plane · torrehome", "fixed"]) {
      expect(scopes.has(s), s).toBe(true);
    }
  });

  it("has no failing pair", () => {
    const failing = results.filter((r) => !r.ok).map((r) => `${r.scope}: ${r.label} = ${r.ratio.toFixed(2)} (< ${r.min})`);
    expect(failing).toEqual([]);
  });
});

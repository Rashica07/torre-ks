import { existsSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ENGLISH_APPROVED, LANGS } from "@/lib/i18n";
import { ROUTES, alternatesFor, internalPath, pathFor, resolveInternalPath, resolvePublicPath } from "@/lib/i18n/routes";

const APP = "src/app/[lang]";

describe("route registry ↔ app directory parity", () => {
  it("every registered route has a page file", () => {
    for (const r of ROUTES) {
      const file = r.folder ? `${APP}/${r.folder}/page.tsx` : `${APP}/page.tsx`;
      expect(existsSync(file), file).toBe(true);
    }
  });

  it("every page file is registered (except the catch-all 404)", () => {
    const folders = readdirSync(APP, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== "[...rest]").map((d) => d.name);
    const registered = new Set(ROUTES.map((r) => r.folder).filter(Boolean));
    for (const f of folders) expect(registered.has(f), `${f} is not in ROUTES`).toBe(true);
  });

  it("public paths are unique and round-trip", () => {
    const seen = new Set<string>();
    for (const r of ROUTES) {
      for (const lang of LANGS) {
        const p = r.paths[lang];
        if (!p) continue;
        expect(seen.has(p), `duplicate public path ${p}`).toBe(false);
        seen.add(p);
        expect(resolvePublicPath(p)).toEqual({ id: r.id, lang });
        expect(resolveInternalPath(internalPath(r.id, lang))).toEqual({ id: r.id, lang });
      }
    }
  });

  it("English exists for every route except the Albanian-only legal pages", () => {
    for (const r of ROUTES) {
      const legal = ["privacy", "terms", "accessibility"].includes(r.id);
      expect(Boolean(r.paths.en), r.id).toBe(!legal);
    }
  });

  it("Albanian public paths stay un-prefixed, English under /en", () => {
    for (const r of ROUTES) {
      expect(r.paths.sq!.startsWith("/en")).toBe(false);
      if (r.paths.en) expect(r.paths.en === "/en" || r.paths.en.startsWith("/en/")).toBe(true);
    }
  });

  it("falls back to Albanian when a page has no English version", () => {
    expect(pathFor("privacy", "en")).toBe("/politika-e-privatesise");
  });

  it("hreflang alternates are empty until English is approved (D-020)", () => {
    expect(ENGLISH_APPROVED).toBe(false);
    expect(alternatesFor("home")).toEqual({});
  });
});

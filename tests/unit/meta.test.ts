import { describe, expect, it } from "vitest";
import { LANGS } from "@/lib/i18n";
import { ROUTES } from "@/lib/i18n/routes";
import { routeMeta } from "@/lib/seo/meta";
import { buildMetadata, isIndexable } from "@/lib/seo/metadata";

const indexableRoutes = ROUTES.filter((r) => r.indexable);

describe("SEO metadata (docs/seo.md §3)", () => {
  it("every indexable route has metadata in both languages", () => {
    for (const r of indexableRoutes) {
      expect(routeMeta[r.id], r.id).toBeDefined();
      for (const l of LANGS) {
        expect(routeMeta[r.id]!.title[l].length).toBeGreaterThan(10);
        expect(routeMeta[r.id]!.description[l].length).toBeGreaterThan(40);
      }
    }
  });

  it("titles and descriptions are unique within each language", () => {
    for (const l of LANGS) {
      const titles = indexableRoutes.map((r) => routeMeta[r.id]!.title[l]);
      const descs = indexableRoutes.map((r) => routeMeta[r.id]!.description[l]);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descs).size).toBe(descs.length);
    }
  });

  it("titles ≤ 65 characters, descriptions ≤ 165 (guidelines; Google truncates by pixel width)", () => {
    for (const r of indexableRoutes) for (const l of LANGS) {
      expect(routeMeta[r.id]!.title[l].length, `${r.id}/${l} title`).toBeLessThanOrEqual(65);
      expect(routeMeta[r.id]!.description[l].length, `${r.id}/${l} description`).toBeLessThanOrEqual(165);
    }
  });

  it("canonical is absolute and self-referencing; English is noindex while unapproved", () => {
    const sq = buildMetadata("magfa", "sq");
    expect(sq.alternates?.canonical).toBe("https://torre-ks.com/magfa");
    expect(isIndexable("magfa", "sq")).toBe(true);
    const en = buildMetadata("magfa", "en");
    expect(en.alternates?.canonical).toBe("https://torre-ks.com/en/magfa");
    expect(isIndexable("magfa", "en")).toBe(false);
    expect(en.robots).toEqual({ index: false, follow: true });
  });

  it("legal pages are not indexable (placeholder text)", () => {
    for (const id of ["privacy", "terms", "accessibility"] as const) expect(isIndexable(id, "sq")).toBe(false);
  });
});

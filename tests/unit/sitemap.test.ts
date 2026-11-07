import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap (docs/seo.md §7)", () => {
  const entries = sitemap();

  it("lists absolute, unique, canonical URLs on one host", () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) {
      const parsed = new URL(u);
      expect(parsed.origin).toBe("https://torre-ks.com");
      expect(u.endsWith("/") && parsed.pathname !== "/").toBe(false);
    }
  });

  it("includes the home page, four companies and contact", () => {
    const paths = entries.map((e) => new URL(e.url).pathname);
    for (const p of ["/", "/kompanite", "/magfa", "/swisstech", "/torre-umbria", "/torrehome", "/kontakti"]) expect(paths).toContain(p);
  });

  it("excludes legal pages (noindex) and every English URL until approved", () => {
    const paths = entries.map((e) => new URL(e.url).pathname);
    expect(paths.some((p) => p.startsWith("/en"))).toBe(false);
    expect(paths.some((p) => /politika|kushtet|deklarata/.test(p))).toBe(false);
  });

  it("does not emit fields Google ignores or a fabricated lastmod", () => {
    for (const e of entries) {
      expect(e).not.toHaveProperty("priority");
      expect(e).not.toHaveProperty("changeFrequency");
      expect(e).not.toHaveProperty("lastModified");
    }
  });
});

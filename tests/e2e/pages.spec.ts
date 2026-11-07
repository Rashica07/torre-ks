import { expect, test } from "@playwright/test";
import { ALL_PAGES, EN_ROUTES, SQ_LEGAL, SQ_ROUTES } from "./routes";

test.describe("every page", () => {
  for (const path of ALL_PAGES) {
    test(`${path}: 200, one h1, landmarks, language, unique title`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
      expect(await page.locator("html").getAttribute("lang")).toBe(path.startsWith("/en") ? "en" : "sq");
      expect((await page.title()).length).toBeGreaterThan(10);
    });
  }

  test("titles are unique across indexable Albanian pages", async ({ page }) => {
    const titles: string[] = [];
    for (const p of SQ_ROUTES) {
      await page.goto(p);
      titles.push(await page.title());
    }
    expect(new Set(titles).size).toBe(titles.length);
  });

  test("canonical URLs are absolute and self-referencing", async ({ page }) => {
    const expected: Record<string, string> = {
      "/": "https://torre-ks.com",
      "/magfa": "https://torre-ks.com/magfa",
      "/kontakti": "https://torre-ks.com/kontakti",
      "/en/contact": "https://torre-ks.com/en/contact",
    };
    for (const [p, canonical] of Object.entries(expected)) {
      await page.goto(p);
      expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(canonical);
    }
  });

  test("English pages are noindex while unapproved; Albanian pages are indexable", async ({ page }) => {
    for (const p of EN_ROUTES) {
      await page.goto(p);
      expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).toContain("noindex");
    }
    for (const p of SQ_ROUTES) {
      await page.goto(p);
      expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).toContain("index");
      expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).not.toContain("noindex");
    }
    for (const p of SQ_LEGAL) {
      await page.goto(p);
      expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).toContain("noindex");
    }
  });

  test("no page exposes hreflang alternates or a language switcher until English is approved", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    await expect(page.getByRole("list", { name: "Gjuha" })).toHaveCount(0);
  });
});

test.describe("status codes and routing", () => {
  test("unknown URLs return a real 404 that renders the site shell", async ({ page }) => {
    for (const p of ["/nuk-ekziston", "/en/nope", "/magfa/x"]) {
      const res = await page.goto(p);
      expect(res?.status(), p).toBe(404);
      await expect(page.locator("h1")).toHaveText("Faqja nuk u gjet");
      await expect(page.locator("header")).toHaveCount(1);
      expect(await page.locator('meta[name="robots"]').first().getAttribute("content")).toContain("noindex");
    }
  });

  test("internal paths redirect permanently to the public URL", async ({ request }) => {
    for (const [from, to] of [
      ["/sq/magfa", "/magfa"],
      ["/en/kompanite", "/en/companies"],
      ["/en/politika-e-privatesise", "/politika-e-privatesise"],
    ]) {
      const r = await request.get(from, { maxRedirects: 0 });
      expect(r.status(), from).toBe(308);
      expect(new URL(r.headers()["location"], "http://localhost").pathname).toBe(to);
    }
  });

  test("old brand subdomains redirect permanently to their section on the main domain", async ({ request }) => {
    const cases: [string, string][] = [
      ["magfa.torre-ks.com", "https://torre-ks.com/magfa"],
      ["swisstech.torre-ks.com", "https://torre-ks.com/swisstech"],
      ["torre-umbria.torre-ks.com", "https://torre-ks.com/torre-umbria"],
      ["torrehome.torre-ks.com", "https://torre-ks.com/torrehome"],
      ["llms.torre-ks.com", "https://torre-ks.com/llms.txt"],
    ];
    for (const [host, target] of cases) {
      const r = await request.get("/", { headers: { host }, maxRedirects: 0 });
      expect(r.status(), host).toBe(308);
      expect(r.headers()["location"]).toBe(target);
    }
    const deep = await request.get("/kontakti", { headers: { host: "magfa.torre-ks.com" }, maxRedirects: 0 });
    expect(deep.headers()["location"]).toBe("https://torre-ks.com/kontakti");
  });
});

test.describe("no placeholder content or dead ends", () => {
  test("no page contains lorem ipsum, TODO or unverified claim markers", async ({ page }) => {
    for (const p of [...SQ_ROUTES, ...EN_ROUTES]) {
      await page.goto(p);
      const text = (await page.locator("body").innerText()).toLowerCase();
      for (const bad of ["lorem", "todo", "€", "garanci", "testimonial", "coming soon", "së shpejti"]) expect(text.includes(bad), `${p} contains "${bad}"`).toBe(false);
    }
  });

  test("every internal link on every page resolves (no 404, no redirect loop)", async ({ page, request }) => {
    const seen = new Set<string>();
    for (const p of [...SQ_ROUTES, ...SQ_LEGAL, ...EN_ROUTES]) {
      await page.goto(p);
      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") || ""));
      for (const href of hrefs) {
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        seen.add(href.split("#")[0] || "/");
      }
    }
    expect(seen.size).toBeGreaterThan(8);
    for (const href of seen) {
      const r = await request.get(href);
      expect(r.status(), `link ${href}`).toBe(200);
    }
  });

  test("tel and WhatsApp links use the corroborated number", async ({ page }) => {
    await page.goto("/kontakti");
    const hrefs = await page.locator("a[href^='tel:'], a[href*='wa.me']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs).toContain("tel:+38349599405");
    expect(hrefs).toContain("https://wa.me/38349599405");
  });
});

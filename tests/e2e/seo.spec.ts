import { expect, test } from "@playwright/test";

test("sitemap.xml is valid, absolute, canonical and excludes gated pages", async ({ request }) => {
  const r = await request.get("/sitemap.xml");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("xml");
  const xml = await r.text();
  expect(xml).toContain("<urlset");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBe(8);
  for (const l of locs) expect(l.startsWith("https://torre-ks.com")).toBe(true);
  expect(locs).toContain("https://torre-ks.com/magfa");
  expect(xml).not.toMatch(/<priority>|<changefreq>|<lastmod>/);
  expect(locs.some((l) => l.includes("/en") || /politika|kushtet|deklarata/.test(l))).toBe(false);
});

test("home JSON-LD parses and contains only verified fields", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((s) => s.map((x) => x.textContent || ""));
  expect(blocks.length).toBe(2);
  const parsed = blocks.map((b) => JSON.parse(b));
  const org = parsed.find((p) => p["@type"] === "Organization");
  expect(org.telephone).toBe("+383 49 599 405");
  expect(org.foundingDate).toBe("1999");
  expect(org.subOrganization).toHaveLength(4);
  const raw = blocks.join(" ").toLowerCase();
  for (const forbidden of ["aggregaterating", "review", "offers", "openinghours", "price", "hascredential"]) expect(raw).not.toContain(forbidden);
});

test("Open Graph and Twitter tags are present with absolute image URLs", async ({ page }) => {
  await page.goto("/swisstech");
  for (const prop of ["og:title", "og:description", "og:url", "og:image", "og:locale"]) {
    expect(await page.locator(`meta[property="${prop}"]`).count(), prop).toBeGreaterThan(0);
  }
  expect(await page.locator('meta[property="og:image"]').first().getAttribute("content")).toBe("https://torre-ks.com/api/og/swisstech");
  expect(await page.locator('meta[property="og:locale"]').first().getAttribute("content")).toBe("sq_AL");
  expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image");
});

test("OG images render", async ({ request }) => {
  for (const p of ["/api/og", "/api/og/magfa", "/api/og/swisstech", "/api/og/torre-umbria", "/api/og/torrehome"]) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/png");
  }
  expect((await request.get("/api/og/nonexistent")).status()).toBe(404);
});

test("security headers are present", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["referrer-policy"]).toBeTruthy();
});

test("robots.txt, llms.txt and manifest are served", async ({ request }) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  const llmsText = await llms.text();
  expect(llmsText).toContain("# TORRE Group");
  // no removed hosts, unverified mailboxes, prices or warranty claims
  for (const bad of ["info@", "llms.torre-ks.com", "magfa.torre-ks.com", "€", "garanci", "warranty:"]) expect(llmsText.toLowerCase()).not.toContain(bad);
  const m = await request.get("/manifest.webmanifest");
  expect(m.status()).toBe(200);
  expect((await m.json()).name).toBeTruthy();
});

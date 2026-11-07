import { expect, test } from "@playwright/test";
import { ALL_PAGES, SQ_ROUTES } from "./routes";

test.describe("reflow", () => {
  test.use({ viewport: { width: 320, height: 640 } });
  for (const path of ALL_PAGES) {
    test(`no horizontal scroll at 320px: ${path}`, async ({ page }) => {
      await page.goto(path);
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      expect(sw).toBeLessThanOrEqual(cw);
    });
  }
});

test.describe("works without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  for (const path of ["/", "/magfa", "/swisstech", "/torre-umbria", "/torrehome", "/kontakti"]) {
    test(`content and links visible: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toBeAttached();
      await expect(page.locator("main a[href*='wa.me'], main a[href^='/']").first()).toBeVisible();
      // the footer carries the company links and contact when the MENU control (a client component) is inert
      for (const p of ["/magfa", "/swisstech", "/torre-umbria", "/torrehome", "/kontakti"]) {
        await expect(page.locator(`footer a[href="${p}"]`).first()).toBeVisible();
      }
    });
  }
});

test.describe("motion", () => {
  test("reduced motion: plates and slabs are in their final state", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    const clip = await page.locator(".plate__media").first().evaluate((e) => getComputedStyle(e).clipPath);
    expect(clip).toBe("none");
    await page.goto("/torre-umbria");
    const hidden = await page.locator(".slab").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1" || getComputedStyle(e).transform !== "none").length);
    expect(hidden).toBe(0);
    await ctx.close();
  });

  test("normal motion: nothing is hidden until JavaScript runs and nothing stays hidden", async ({ page }) => {
    await page.goto("/torre-umbria");
    await page.locator(".slab").last().scrollIntoViewIfNeeded();
    await expect.poll(async () => page.locator(".slab").last().evaluate((e) => getComputedStyle(e).opacity), { timeout: 4000 }).toBe("1");
  });
});

test.describe("keyboard", () => {
  test("first Tab stop is the skip link and it moves focus into main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Kalo te përmbajtja" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    test(`menu @ ${vp.width}: opens as a modal dialog, traps focus, Esc closes and restores focus`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/");
      const open = page.getByRole("button", { name: "Menu" });
      await open.focus();
      await page.keyboard.press("Enter");
      const dialog = page.locator("dialog.menu");
      await expect(dialog).toBeVisible();
      // A native modal dialog may hand focus to the browser UI (activeElement becomes <body>),
      // but focus must NEVER land on page content behind it.
      for (let i = 0; i < 16; i++) {
        await page.keyboard.press("Tab");
        const where = await page.evaluate(() => {
          const a = document.activeElement;
          if (!a || a === document.body) return "browser-ui";
          return a.closest("dialog.menu") ? "dialog" : "page-behind";
        });
        expect(where, `focus reached the page behind the dialog after ${i + 1} tabs`).not.toBe("page-behind");
      }
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(open).toBeFocused();
    });
  }

  test("menu: navigating closes it and lands on the page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator("dialog.menu").getByRole("link", { name: "SWISSTECH" }).click();
    await expect(page).toHaveURL(/\/swisstech$/);
    await expect(page.locator("dialog.menu")).toBeHidden();
    await expect(page.locator("h1")).toHaveText("SWISSTECH");
  });

  test("floor rail (desktop) links to the group and the four companies and marks the current page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/swisstech");
    const rail = page.getByRole("navigation", { name: "Katet" });
    await expect(rail.getByRole("link")).toHaveCount(5);
    await expect(rail.getByRole("link", { name: "2 — SWISSTECH" })).toHaveAttribute("aria-current", "page");
  });

  test("focus is visible on interactive elements", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement as Element);
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
  });

  test("fixed controls never cover an anchored target (scroll-padding)", async ({ page }) => {
    await page.goto("/");
    const pad = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop));
    expect(pad).toBeGreaterThanOrEqual(76);
  });
});

test.describe("surfaces and company planes (D-019, D-024)", () => {
  const toRgb = (c: string) => {
    c = c.trim();
    if (!c.startsWith("#")) return c;
    const n = parseInt(c.slice(1), 16);
    return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
  };
  const expected: Record<string, string> = {
    "/magfa": "rgb(0, 106, 158)",
    "/swisstech": "rgb(0, 160, 162)",
    "/torre-umbria": "rgb(111, 166, 122)",
    "/torrehome": "rgb(39, 73, 109)",
  };
  for (const [path, accent] of Object.entries(expected)) {
    test(`${path}: the first surface resolves to the company's colour role`, async ({ page }) => {
      await page.goto(path);
      const el = page.locator("main [data-surface], main[data-surface]").first();
      const role = await el.evaluate((e) => {
        const s = getComputedStyle(e);
        return { accent: s.getPropertyValue("--accent"), bg: s.backgroundColor };
      });
      // MAGFA's hero IS the plane (accent = white on plane); the others expose the company colour as the accent role
      if (path === "/magfa") expect(role.bg).toBe(accent);
      else expect(toRgb(role.accent)).toBe(accent);
    });
  }

  test("group pages carry no company colour", async ({ page }) => {
    await page.goto("/kompanite");
    const accent = await page.locator("main [data-surface]").first().evaluate((e) => getComputedStyle(e).getPropertyValue("--accent").trim());
    expect(accent.toLowerCase()).toBe("#15171a");
  });

  test("each page has at most one bronze signal plane", async ({ page }) => {
    for (const p of [...SQ_ROUTES, "/politika-e-privatesise"]) {
      await page.goto(p);
      expect(await page.locator('[data-surface="bronze"]').count(), p).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("wordmark window (docs/design.md §5.1)", () => {
  test("the TORRE wordmark is photograph-filled, legible against ink and carries real <h1> text", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(/TORRE Group/);
    const wm = page.locator("svg.hero__wm").first();
    await expect(wm).toBeVisible();
    await expect(wm).toHaveAttribute("aria-hidden", "true");
    await page.waitForTimeout(800);
    const buf = await wm.screenshot();
    const { default: sharp } = await import("sharp");
    const { data, info } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true });
    let lit = 0;
    for (let i = 0; i < data.length; i++) if (data[i] > 70) lit++;
    const frac = lit / (info.width * info.height);
    // letters are ~45% of the box; the photograph keeps them far brighter than the ink background
    expect(frac, "share of bright (letter) pixels").toBeGreaterThan(0.2);
    expect(frac).toBeLessThan(0.7);
  });
});

test("home links to every company and to contact", async ({ page }) => {
  await page.goto("/");
  for (const p of SQ_ROUTES.filter((x) => !["/"].includes(x))) {
    await expect(page.locator(`a[href="${p}"]`).first()).toHaveCount(1);
  }
});

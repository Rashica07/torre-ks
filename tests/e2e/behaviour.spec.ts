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
  for (const path of ["/", "/magfa", "/swisstech", "/kontakti"]) {
    test(`content and links visible: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      const hidden = await page.locator(".reveal").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden, "reveal elements hidden without JS").toBe(0);
      await expect(page.locator("main a[href^='tel:'], main a[href^='/']").first()).toBeVisible();
    });
  }
});

test.describe("motion", () => {
  test("reduced motion: nothing is hidden or transformed", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    const bad = await page.locator(".reveal").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1" || getComputedStyle(e).transform !== "none").length);
    expect(bad).toBe(0);
    await ctx.close();
  });

  test("normal motion: below-fold content reveals when scrolled into view and never stays hidden", async ({ page }) => {
    await page.goto("/");
    const target = page.locator("#companies-title");
    await target.scrollIntoViewIfNeeded();
    await expect.poll(async () => page.locator(".reveal").first().evaluate((e) => getComputedStyle(e).opacity), { timeout: 4000 }).toBe("1");
    // safety: even content that is never scrolled to becomes visible
    await page.waitForTimeout(3000);
    const hidden = await page.locator(".reveal").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
    expect(hidden).toBe(0);
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

  test("desktop: companies disclosure opens, Esc closes and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Shfaq kompanitë" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#companies-panel").getByRole("link", { name: "MAGFA GROUP" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("mobile: menu opens as a modal dialog, traps focus, Esc closes and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const open = page.getByRole("button", { name: "Hap menunë" });
    await open.focus();
    await page.keyboard.press("Enter");
    const dialog = page.locator("dialog.nav-sheet");
    await expect(dialog).toBeVisible();
    // Tab many times. A native modal dialog may hand focus to the browser UI (activeElement becomes <body>),
    // but focus must NEVER land on page content behind it (header, main, footer).
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      const where = await page.evaluate(() => {
        const a = document.activeElement;
        if (!a || a === document.body) return "browser-ui";
        return a.closest("dialog.nav-sheet") ? "dialog" : "page-behind";
      });
      expect(where, `focus reached the page behind the dialog after ${i + 1} tabs`).not.toBe("page-behind");
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("mobile: navigating from the menu closes it and lands on the page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Hap menunë" }).click();
    await page.locator("dialog.nav-sheet").getByRole("link", { name: "SWISSTECH" }).click();
    await expect(page).toHaveURL(/\/swisstech$/);
    await expect(page.locator("dialog.nav-sheet")).toBeHidden();
    await expect(page.locator("h1")).toHaveText("SWISSTECH");
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

  test("sticky header never covers a focused/anchored target (scroll-padding)", async ({ page }) => {
    await page.goto("/");
    const pad = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop));
    const header = await page.evaluate(() => (document.getElementById("site-header") as HTMLElement).getBoundingClientRect().height);
    expect(pad).toBeGreaterThanOrEqual(header);
  });
});

test.describe("division theming (D-019)", () => {
  const expected: Record<string, { accent: string; dark: boolean }> = {
    "/magfa": { accent: "rgb(0, 106, 158)", dark: false },
    "/swisstech": { accent: "rgb(0, 160, 162)", dark: true },
    "/torre-umbria": { accent: "rgb(111, 166, 122)", dark: true },
    "/torrehome": { accent: "rgb(39, 73, 109)", dark: false },
  };
  for (const [path, e] of Object.entries(expected)) {
    test(`${path} uses its own accent and base surface`, async ({ page }) => {
      await page.goto(path);
      const main = page.locator("main#main");
      const accent = await main.evaluate((el) => getComputedStyle(el).getPropertyValue("--color-accent").trim());
      const bg = await main.evaluate((el) => getComputedStyle(el).backgroundColor);
      const toRgb = (hex: string) => { const n = parseInt(hex.slice(1), 16); return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`; };
      expect(accent.startsWith("#") ? toRgb(accent) : accent).toBe(e.accent);
      expect(bg).toBe(e.dark ? "rgb(32, 35, 38)" : "rgb(244, 243, 239)");
    });
  }

  test("group pages carry no company accent", async ({ page }) => {
    await page.goto("/kompanite");
    const accent = await page.locator("main").evaluate((el) => getComputedStyle(el).getPropertyValue("--color-accent").trim());
    expect(accent.toLowerCase()).toBe("#202326");
  });
});

test("home links to every company and to contact", async ({ page }) => {
  await page.goto("/");
  for (const p of SQ_ROUTES.filter((x) => !["/"].includes(x))) {
    await expect(page.locator(`a[href="${p}"]`).first()).toHaveCount(1);
  }
});

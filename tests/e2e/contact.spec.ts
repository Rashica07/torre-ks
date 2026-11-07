import { expect, test } from "@playwright/test";

test.describe("request sheet (WhatsApp-composed, no backend)", () => {
  test("empty submit shows announced errors and moves focus to the summary", async ({ page }) => {
    await page.goto("/kontakti");
    await page.getByRole("button", { name: /Hap në WhatsApp/ }).click();
    const alert = page.locator(".rform__summary");
    await expect(alert).toContainText("Ka fusha të pa plotësuara");
    await expect(alert).toBeFocused();
    await expect(page.getByLabel("Emri juaj")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Çfarë keni në mendje?")).toHaveAttribute("aria-invalid", "true");
    // the error link jumps to its field
    await alert.getByRole("link", { name: "Shkruani emrin tuaj." }).click();
    await expect(page.getByLabel("Emri juaj")).toBeFocused();
  });

  test("valid submit opens WhatsApp with the verified number and the composed message", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = ((u: string) => { (window as unknown as { __opened: string[] }).__opened.push(String(u)); return null; }) as typeof window.open;
    });
    await page.goto("/kontakti");
    await page.getByLabel("Për cilën kompani?").selectOption("SWISSTECH");
    await page.getByLabel("Emri juaj").fill("Arben");
    await page.getByLabel("Qyteti (opsionale)").fill("Ferizaj");
    await page.getByLabel("Çfarë keni në mendje?").fill("Dritare PVC për një shtëpi.");
    await page.getByRole("button", { name: /Hap në WhatsApp/ }).click();
    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened[0]);
    const url = new URL(opened);
    expect(url.origin + url.pathname).toBe("https://wa.me/38349599405");
    const text = url.searchParams.get("text") || "";
    expect(text).toContain("Arben");
    expect(text).toContain("SWISSTECH");
    expect(text).toContain("Ferizaj");
    expect(text).toContain("Dritare PVC");
  });

  test("WhatsApp is the only contact channel: no tel: or mailto: links anywhere", async ({ page }) => {
    for (const p of ["/", "/kontakti", "/magfa", "/swisstech", "/politika-e-privatesise"]) {
      await page.goto(p);
      await expect(page.locator("a[href^='tel:'], a[href^='mailto:']"), p).toHaveCount(0);
      await expect(page.locator("a[href*='wa.me/38349599405']").first(), p).toBeAttached();
    }
  });
});

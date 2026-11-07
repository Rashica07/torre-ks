import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ALL_PAGES } from "./routes";

const VIEWPORTS = [
  { name: "mobile 390", width: 390, height: 844 },
  { name: "desktop 1440", width: 1440, height: 900 },
];

// WCAG 2.0/2.1/2.2 A+AA rules axe can check automatically. Automated checks catch only a minority of
// issues (docs/accessibility.md §4) — keyboard and screen-reader passes are manual.
for (const vp of VIEWPORTS) {
  test.describe(`axe @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    for (const path of [...ALL_PAGES, "/nuk-ekziston"]) {
      test(path, async ({ page }) => {
        await page.goto(path);
        // reveal-on-scroll content must be measured in its final state
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 40));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(700);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
        expect(summary, summary.join("\n")).toEqual([]);
      });
    }
  });
}

// WCAG 2.1 relative-luminance contrast checker for the Torre brand palettes.
import { readFileSync } from "node:fs";

const srgb = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};

const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// Pull the theme blocks straight out of brands.ts so this checks the real values.
const src = readFileSync(process.argv[2], "utf8");
const ids = [...src.matchAll(/^\s{4}id: "([^"]+)"/gm)].map((m) => m[1]);
const themes = [...src.matchAll(/theme: \{([\s\S]*?)\n {4}\}/g)].map((m) => {
  const o = {};
  for (const [, k, v] of m[1].matchAll(/(\w+): "([^"]+)"/g)) o[k] = v;
  return o;
});

let failures = 0;
themes.forEach((t, i) => {
  console.log(`\n=== ${ids[i]} ===`);
  const checks = [
    ["muted on bg", t.muted, t.bg],
    ["muted on bgAlt", t.muted, t.bgAlt],
    ["muted on surface", t.muted, t.surface],
    ["accent on bg", t.accent, t.bg],
    ["accent on surface", t.accent, t.surface],
    ["fg on bg", t.fg, t.bg],
    ["accentFg on accent", t.accentFg, t.accent],
  ];
  for (const [label, fg, bg] of checks) {
    const r = ratio(fg, bg);
    // Accent is used for large text / UI chrome, so 3:1 is the applicable threshold.
    const min = label.startsWith("accent on") ? 3.0 : 4.5;
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${label.padEnd(20)} ${fg} on ${bg}  ${r.toFixed(2)}:1 (need ${min})`
    );
  }
  if (t.accent === t.muted) {
    failures++;
    console.log(`  FAIL  accent is identical to muted (${t.accent}) — no hierarchy`);
  }
});

console.log(`\n${failures === 0 ? "All checks passed." : `${failures} failing check(s).`}`);
process.exit(failures === 0 ? 0 : 1);

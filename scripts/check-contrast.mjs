// WCAG 2.x contrast checker for the design tokens in src/styles/tokens.css (docs/design.md §2).
// Resolves var() chains per scope (light, dark surface, each company, company on dark) and checks the pairs
// the components actually use. Exits 1 on any failure. Also imported by tests/unit/contrast.test.ts.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const srgb = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};
export const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** Parse `selector { --x: value; }` blocks into [{ selector, vars }] (file order). */
export function parseTokens(css) {
  const blocks = [];
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  // Flatten @media wrappers: their inner blocks are layout tokens, irrelevant to colour.
  for (const m of clean.matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim();
    const vars = {};
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim();
    if (Object.keys(vars).length) blocks.push({ selector, vars });
  }
  return blocks;
}

function resolver(blocks, selectors) {
  const merged = {};
  // Apply, in file order, every block whose selector is in the active set.
  for (const b of blocks) {
    const parts = b.selector.split(",").map((s) => s.trim());
    if (parts.some((p) => selectors.includes(p))) Object.assign(merged, b.vars);
  }
  const get = (name, depth = 0) => {
    let v = merged[name];
    if (v === undefined) throw new Error(`Token ${name} not defined in scope ${selectors.join(" + ")}`);
    const ref = v.match(/^var\((--[\w-]+)\)$/);
    if (ref && depth < 8) return get(ref[1], depth + 1);
    return v;
  };
  return get;
}

const DIVISIONS = ["magfa", "swisstech", "torre-umbria", "torrehome"];

/** [label, fg token, bg token, min ratio, enforce] */
const TEXT = (min = 4.5) => [
  ["text on bg", "--color-text", "--color-bg", min],
  ["text on surface", "--color-text", "--color-surface", min],
  ["text on raised", "--color-text", "--color-raised", min],
  ["muted on bg", "--color-text-muted", "--color-bg", min],
  ["muted on surface", "--color-text-muted", "--color-surface", min],
  ["muted on raised", "--color-text-muted", "--color-raised", min],
  ["accent on bg", "--color-accent", "--color-bg", min],
  ["accent-hover on bg", "--color-accent-hover", "--color-bg", min],
  ["on-accent on accent (buttons)", "--color-on-accent", "--color-accent", min],
  ["on-accent on accent-hover (buttons)", "--color-on-accent", "--color-accent-hover", min],
  ["border-strong on bg (controls, >=3)", "--color-border-strong", "--color-bg", 3],
  ["focus ring on bg (>=3)", "--color-focus", "--color-bg", 3],
];

export function runChecks(css) {
  const blocks = parseTokens(css);
  const results = [];
  const scopes = [
    { name: "group · light", sel: [":root"], checks: [...TEXT(), ["border-strong on surface (>=3)", "--color-border-strong", "--color-surface", 3]] },
    {
      name: "group · dark",
      sel: [":root", '[data-surface="dark"]'],
      checks: [...TEXT(), ["accent on surface", "--color-accent", "--color-surface", 4.5], ["border-strong on surface (>=3)", "--color-border-strong", "--color-surface", 3]],
    },
  ];
  for (const d of DIVISIONS) {
    scopes.push({ name: `${d} · light`, sel: [":root", `[data-division="${d}"]`], checks: [...TEXT(), ["accent on surface", "--color-accent", "--color-surface", 4.5], ["accent-hover on surface", "--color-accent-hover", "--color-surface", 4.5]] });
    scopes.push({
      name: `${d} · dark`,
      sel: [":root", `[data-division="${d}"]`, '[data-surface="dark"]', `[data-division="${d}"][data-surface="dark"]`],
      // accent on the dark SURFACE (#2a2e31) is informational: components place company accents on the dark background only.
      checks: [...TEXT(), ["accent on surface (informational)", "--color-accent", "--color-surface", 0]],
    });
  }
  for (const s of scopes) {
    const get = resolver(blocks, s.sel);
    for (const [label, fg, bg, min] of s.checks) {
      const r = ratio(get(fg), get(bg));
      results.push({ scope: s.name, label, fg: get(fg), bg: get(bg), ratio: r, min, ok: r >= min });
    }
  }
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const css = readFileSync(process.argv[2] ?? new URL("../src/styles/tokens.css", import.meta.url), "utf8");
  const results = runChecks(css);
  let fail = 0;
  for (const r of results) {
    if (!r.ok) fail++;
    const flag = r.min === 0 ? "info" : r.ok ? "ok  " : "FAIL";
    console.log(`${flag}  ${r.ratio.toFixed(2).padStart(5)}  (min ${r.min || "-"})  ${r.scope.padEnd(24)} ${r.label}  ${r.fg} on ${r.bg}`);
  }
  console.log(fail ? `\n${fail} contrast failure(s)` : `\nAll ${results.length} contrast checks passed`);
  process.exit(fail ? 1 : 0);
}

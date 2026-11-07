// WCAG 2.x contrast checker for the "Fasada" tokens in src/styles/tokens.css (docs/design.md §2).
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
    const parts = b.selector.split(",").map((x) => x.trim());
    if (parts.some((p) => selectors.includes(p))) Object.assign(merged, b.vars);
  }
  /** Resolve a value: var(--a), var(--a, fallback) (nested), or a literal. */
  const value = (v, depth = 0) => {
    v = v.trim();
    const m = v.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([\s\S]+))?\)$/);
    if (!m || depth > 10) return v;
    if (merged[m[1]] !== undefined) return value(merged[m[1]], depth + 1);
    if (m[2] !== undefined) return value(m[2], depth + 1);
    throw new Error(`Token ${m[1]} not defined in scope ${selectors.join(" + ")}`);
  };
  return (name) => {
    if (merged[name] === undefined) throw new Error(`Token ${name} not defined in scope ${selectors.join(" + ")}`);
    return value(merged[name]);
  };
}

const DIVISIONS = ["magfa", "swisstech", "torre-umbria", "torrehome"];
const SURFACES = ["paper", "concrete", "ink", "bronze", "plane"];

/** [label, fg token, bg token, min ratio] — the role pairs components use on every surface. */
const ROLE_CHECKS = [
  ["text on bg", "--fg", "--bg", 4.5],
  ["muted on bg", "--muted", "--bg", 4.5],
  ["accent on bg", "--accent", "--bg", 4.5],
  ["button label on button", "--btn-fg", "--btn-bg", 4.5],
  ["button on bg (non-text, >=3)", "--btn-bg", "--bg", 3],
  ["control border on bg (>=3)", "--ctl", "--bg", 3],
  ["focus ring on bg (>=3)", "--focus", "--bg", 3],
];

export function runChecks(css) {
  const blocks = parseTokens(css);
  const results = [];
  const run = (scope, sel, checks) => {
    const get = resolver(blocks, sel);
    for (const [label, fg, bg, min] of checks) {
      const r = ratio(get(fg), get(bg));
      results.push({ scope, label, fg: get(fg), bg: get(bg), ratio: r, min, ok: r >= min });
    }
  };
  for (const s of SURFACES) {
    // "plane" only exists inside a company; every other surface is checked bare and under each company.
    const divs = s === "plane" ? DIVISIONS : [null, ...DIVISIONS];
    for (const d of divs) {
      const sel = [":root", `[data-surface="${s}"]`, ...(d ? [`[data-division="${d}"]`] : [])];
      run(`${s}${d ? " · " + d : ""}`, sel, ROLE_CHECKS);
    }
  }
  // Fixed pairs used outside the role system
  const root = resolver(blocks, [":root"]);
  for (const [label, fg, bg, min] of [
    ["chip label: paper on ink", "--paper", "--ink", 4.5],
    ["rail numeral: ink on bronze (active)", "--ink", "--bronze", 4.5],
    ["tab caption: muted-light on paper", "--muted-light", "--paper", 4.5],
    ["muted-light on concrete", "--muted-light", "--concrete", 4.5],
    ["muted-dark on ink", "--muted-dark", "--ink", 4.5],
    ["bronze on ink", "--bronze", "--ink", 4.5],
  ]) {
    const r = ratio(root(fg), root(bg));
    results.push({ scope: "fixed", label, fg: root(fg), bg: root(bg), ratio: r, min, ok: r >= min });
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

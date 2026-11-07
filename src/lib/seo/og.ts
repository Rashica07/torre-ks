/** Anton (latin) for Open Graph images — same display face as the site (docs/design.md §3). */
export async function antonFont() {
  const data = await fetch(new URL("../../assets/fonts/anton-latin-400-normal.woff", import.meta.url)).then((r) => r.arrayBuffer());
  return [{ name: "Anton", data, style: "normal" as const, weight: 400 as const }];
}

export const OG_SIZE = { width: 1200, height: 630 };

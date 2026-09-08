import Link from "next/link";
import { BRANDS } from "@/lib/brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Index of the four pure-minimalism concept pages, one per brand. Comparison
// surface only, same spirit as /preview/[variant] — a plain list, not a
// styled gallery, since it's a tool for picking between concepts, not
// itself a concept.
export default function MinimalConceptIndex() {
  return (
    <main
      style={{
        background: "#fafafa",
        color: "#141414",
        minHeight: "100vh",
        fontFamily: "var(--font-display), sans-serif",
        padding: "10vh 6vw",
      }}
    >
      <div style={{ maxWidth: "560px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "12px" }}>
          Minimal Concepts
        </h1>
        <p style={{ color: "#666", marginBottom: "40px", lineHeight: 1.6 }}>
          One pure-minimalist, one-scroll page per brand — hero, one real
          photo, real proof points, one repeated CTA. Not wired into
          production; pick one to compare against the live site.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {BRANDS.map((brand, i) => (
            <li
              key={brand.id}
              style={{
                borderTop: i === 0 ? "1px solid #e0e0e0" : undefined,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Link
                href={`/preview/minimal/${brand.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBlock: "20px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={`/logos/${brand.id}.svg`}
                    alt=""
                    width={28}
                    height={28}
                    style={{ borderRadius: "6px" }}
                  />
                  <span style={{ fontWeight: 600 }}>{brand.name}</span>
                </span>
                <span style={{ color: "#999" }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

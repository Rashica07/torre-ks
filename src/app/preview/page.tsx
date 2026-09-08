import Link from "next/link";
import { BRANDS } from "@/lib/brands";
import { DESIGN_VARIANTS, VARIANTS } from "@/lib/design-variants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Root hub for every comparison surface under /preview — there was
// previously no way into either the 4 established design variants
// (/preview/[variant]/[brand], only reachable if you already knew the
// URL) or the pure-minimalist concept pages (/preview/minimal/[brand])
// except from each other. This links both from one place.
export default function PreviewIndex() {
  return (
    <main
      style={{
        background: "#fafafa",
        color: "#141414",
        minHeight: "100vh",
        fontFamily: "var(--font-display), sans-serif",
        padding: "8vh 6vw",
      }}
    >
      <div style={{ maxWidth: "760px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "12px" }}>
          Preview Hub
        </h1>
        <p style={{ color: "#666", marginBottom: "56px", lineHeight: 1.6 }}>
          Every comparison surface for the site family. Nothing here is
          wired into production.
        </p>

        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "6px" }}>
            Design Variants
          </h2>
          <p style={{ color: "#666", marginBottom: "24px", lineHeight: 1.6, maxWidth: "60ch" }}>
            The full section-per-topic treatment (services, process, testimonials,
            FAQ) in four structural directions. Each brand runs one of these in
            production, simplified down to its short hero → proof → gallery →
            contact skeleton — these routes show the richer full set.
          </p>
          {DESIGN_VARIANTS.map((v) => (
            <div key={v} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                {VARIANTS[v].label}
                <span style={{ color: "#999", fontWeight: 400 }}> — {VARIANTS[v].description}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {BRANDS.map((b) => (
                  <Link
                    key={b.id}
                    href={`/preview/${v}/${b.id}`}
                    style={{
                      fontSize: "0.8125rem",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      border: "1px solid #ddd",
                      color: "#333",
                      textDecoration: "none",
                    }}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "6px" }}>
            Pure Minimalist Concepts
          </h2>
          <p style={{ color: "#666", marginBottom: "24px", lineHeight: 1.6, maxWidth: "60ch" }}>
            A different brief entirely: one hero screen, one real photo, real
            proof points, one repeated CTA — not the variant system above.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {BRANDS.map((b) => (
              <Link
                key={b.id}
                href={`/preview/minimal/${b.id}`}
                style={{
                  fontSize: "0.8125rem",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  border: "1px solid #ddd",
                  color: "#333",
                  textDecoration: "none",
                }}
              >
                {b.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

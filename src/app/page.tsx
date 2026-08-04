import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";

// CSS's `transparent` keyword is rgba(0,0,0,0) — fading a colored stop toward
// it interpolates through black mid-gradient, not toward "this color at 0
// alpha". Keeping the same RGB channels and only dropping alpha avoids the
// black-wash artifact entirely.
function transparentVariant(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0)`;
}

// Company history — honest and short. Only the founding year is asserted;
// no invented sub-milestone dates, no generations, no decades.
const HISTORIKU = [
  { year: "2015", text: "Fillojmë si ndërtues shtëpish private, në Kosovë." },
  { year: "Sot", text: "Katër kompani, secila me specializimin e vet: shtëpi, dritare e fasada, zhvillim rezidencial dhe apartamente." },
];

export default function CompanySelector() {
  return (
    <main className="min-h-screen" style={{ background: "hsl(var(--bg))", color: "hsl(var(--fg))" }}>
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: "var(--max)", paddingBlock: "var(--space-9)" }}
      >
        {/* masthead — asymmetric: oversized mixed-weight headline against a
            dense timeline spine, not a centered hero */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-x-16 gap-y-10"
          style={{
            borderBottom: "1px solid hsl(var(--border))",
            paddingBottom: "var(--space-8)",
            marginBottom: "var(--space-8)",
          }}
        >
          <div style={{ animation: "fadeUp 0.5s var(--ease-out) both" }}>
            <span
              className="block font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--muted))", marginBottom: "var(--space-5)" }}
            >
              Torre Group — Ndërtim në Kosovë që nga 2015
            </span>
            <h1 className="text-step-5" style={{ lineHeight: 0.98, marginBottom: "var(--space-5)" }}>
              <span style={{ fontWeight: 700 }}>Katër kompani.</span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "hsl(var(--muted))",
                }}
              >
                Një themel.
              </span>
            </h1>
            <p
              className="text-step-0"
              style={{ color: "hsl(var(--muted))", maxWidth: "52ch", lineHeight: 1.7 }}
            >
              Nisëm në 2015 si ndërtues shtëpish private. Sot jemi katër
              kompani, secila me specializimin e vet.
            </p>
          </div>

          <ol
            className="hidden lg:block list-none m-0 p-0"
            style={{ borderLeft: "1px solid hsl(var(--border))", paddingLeft: "var(--space-6)" }}
          >
            {HISTORIKU.map((h) => (
              <li key={h.year} style={{ paddingBottom: "var(--space-4)" }}>
                <span
                  className="block font-mono text-[11px] tracking-[0.1em]"
                  style={{ color: "hsl(var(--fg))" }}
                >
                  {h.year}
                </span>
                <span className="block text-step--1" style={{ color: "hsl(var(--muted))", lineHeight: 1.6 }}>
                  {h.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* directory — full-width rows, not a symmetric card grid. Each row
            reveals its own brand's hero image and accent color on hover. */}
        <div role="list">
          {BRANDS.map((brand, i) => {
            const t = brand.theme;
            return (
              <a
                key={brand.id}
                href={brand.externalUrl}
                role="listitem"
                className="group relative flex items-center justify-between gap-6 no-underline overflow-hidden"
                style={{
                  borderTop: i === 0 ? "1px solid hsl(var(--border))" : undefined,
                  borderBottom: "1px solid hsl(var(--border))",
                  paddingBlock: "var(--space-6)",
                  paddingInline: "var(--space-2)",
                  // Exposed to children below so hover text color can swap to
                  // this brand's own fg/muted — the row's default text is the
                  // root theme's dark-on-light color, which goes invisible the
                  // moment a dark-themed brand's own dark backdrop reveals on
                  // hover (SwissTech, Torre di Umbria) unless it swaps too.
                  "--hoverFg": t.fg,
                  "--hoverMuted": t.muted,
                } as React.CSSProperties}
              >
                {brand.heroImage && (
                  <>
                    <Image
                      src={brand.heroImage}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                      style={{ zIndex: 0 }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                      style={{
                        // Solid only under the index number, then a same-hue
                        // alpha fade (not the `transparent` keyword — see
                        // transparentVariant above) reveals the photo cleanly
                        // through the text column instead of washing to black.
                        background: `linear-gradient(90deg, ${t.bg} 0%, ${t.bg} 18%, ${transparentVariant(t.bg)} 78%)`,
                        zIndex: 1,
                      }}
                    />
                  </>
                )}

                <div className="relative flex items-center gap-5" style={{ zIndex: 2 }}>
                  <span
                    className="font-mono text-[13px] tabular-nums transition-colors duration-300 text-[hsl(var(--muted))] group-hover:text-[var(--hoverMuted)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span
                      className="block text-step-3 transition-colors duration-300 text-[hsl(var(--fg))] group-hover:text-[var(--hoverFg)]"
                      style={{ fontWeight: 600 }}
                    >
                      {brand.name}
                    </span>
                    <span className="block text-step--1 transition-colors duration-300 text-[hsl(var(--muted))] group-hover:text-[var(--hoverMuted)]">
                      {brand.category} — {brand.tagline}
                    </span>
                  </div>
                </div>

                <span
                  className="relative flex items-center gap-2 text-step--1 font-medium shrink-0 transition-transform duration-base ease-out group-hover:translate-x-0.5"
                  style={{ color: t.accent, zIndex: 2 }}
                >
                  Vizito
                  <ArrowRight size={14} />
                </span>
              </a>
            );
          })}
        </div>

        {/* footer */}
        <div
          className="flex flex-wrap items-center justify-between gap-4"
          style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-5)", borderTop: "1px solid hsl(var(--border))" }}
        >
          <span className="text-[11px]" style={{ color: "hsl(var(--muted))" }}>
            &copy; {new Date().getFullYear()} Torre Group — torre-ks.com
          </span>
          <div className="flex gap-5 text-[11px]" style={{ color: "hsl(var(--muted))" }}>
            <a href="/politika-e-privatesise" style={{ color: "inherit" }}>
              Politika e Privatësisë
            </a>
            <a href="/kushtet-e-sherbimit" style={{ color: "inherit" }}>
              Kushtet e Shërbimit
            </a>
            <a href="/deklarata-e-qasshmerise" style={{ color: "inherit" }}>
              Qasshmëria
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

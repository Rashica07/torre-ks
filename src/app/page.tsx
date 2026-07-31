import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";

// Company history, condensed from the group's own record.
const HISTORIKU = [
  { year: "1950", text: "Fillimet në Stubëll të Vitisë — tri breza mjeshtërie ndërtimi." },
  { year: "Zvicër", text: "Vite pune në tregun zviceran — etika që na udhëheq edhe sot." },
  { year: "2010", text: "Themelohet kompania “Torre” në fushën e ndërtimtarisë." },
  { year: "2020", text: "Investim në ndërtim të lartë: Torre Home 1 & 2 në Ferizaj." },
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
              Torre Group — Themeluar 1950, Stubëll e Vitisë
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
              Katër breza mjeshtërie ndërtimi — nga Stubëlli i Vitisë te tregu
              zviceran — sot të organizuar në katër kompani të pavarura,
              secila me specializimin e vet.
            </p>
          </div>

          <ol
            className="list-none m-0 p-0"
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
                }}
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
                        background: `linear-gradient(90deg, ${t.bg} 0%, ${t.bg}cc 42%, transparent 100%)`,
                        zIndex: 1,
                      }}
                    />
                  </>
                )}

                <div className="relative flex items-baseline gap-6" style={{ zIndex: 2 }}>
                  <span
                    className="font-mono text-[13px] tabular-nums"
                    style={{ color: "hsl(var(--muted))" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="block text-step-3" style={{ fontWeight: 600 }}>
                      {brand.name}
                    </span>
                    <span className="block text-step--1" style={{ color: "hsl(var(--muted))" }}>
                      {brand.category} — {brand.tagline}
                    </span>
                  </div>
                </div>

                <span
                  className="relative flex items-center gap-2 text-step--1 font-medium shrink-0 transition-transform duration-base ease-out group-hover:translate-x-1"
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

import Link from "next/link";
import { headers } from "next/headers";
import { BRANDS, type SectionKey } from "@/lib/brands";
import { OdometerNumber } from "@/components/OdometerDigits";

export const metadata = {
  title: "Faqja Nuk u Gjet — 404",
  robots: { index: false, follow: false },
};

const SECTION_LABELS: Record<SectionKey, string> = {
  proof: "Pse Ne",
  services: "Shërbimet",
  pourquoi: "Pse Ne",
  process: "Procesi",
  gallery: "Galeria",
  testimonials: "Dëshmitë",
  faq: "Pyetje",
};

export default async function NotFound() {
  const headersList = await headers();
  const host = (headersList.get("host") || "").split(":")[0];
  const sub = host.split(".")[0];
  const brand = BRANDS.find((b) => b.subdomain.split(".")[0] === sub);

  const t = brand?.theme ?? {
    bg: "#fafafa",
    bgAlt: "#f0f0f0",
    fg: "#141414",
    muted: "#737373",
    border: "#e0e0e0",
    accent: "#0072a7",
    accentFg: "#ffffff",
  };

  const rows = brand
    ? brand.sectionOrder
        .filter((key) => key !== "gallery" || (brand.gallery?.length ?? 0) > 0)
        .map((key) => ({ label: SECTION_LABELS[key], href: `/#${key}` }))
        .concat([{ label: "Kontakt", href: "/#contact" }])
    : BRANDS.map((b) => ({ label: b.name, href: b.externalUrl }));

  return (
    <main className="min-h-screen" style={{ background: t.bg, color: t.fg }}>
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 px-6 md:px-10"
        style={{ maxWidth: "1080px", minHeight: "100vh", alignItems: "center", paddingBlock: "var(--space-9)" }}
      >
        {/* left: the number */}
        <div>
          <span
            className="block font-mono text-[11px] tracking-[0.2em] uppercase"
            style={{ color: t.muted, marginBottom: "var(--space-5)" }}
          >
            {brand ? brand.name : "Torre Group"} — Gabim 404
          </span>

          <div className="font-mono" style={{ color: t.fg, marginBottom: "var(--space-6)" }}>
            <OdometerNumber value="404" size="clamp(4.5rem, 13vw, 8.5rem)" color={t.fg} />
          </div>

          <p
            className="text-step-0"
            style={{ color: t.muted, maxWidth: "38ch", lineHeight: 1.7 }}
          >
            Faqja që kërkoni nuk ekziston ose është zhvendosur. Adresa e URL-së
            mund të jetë shkruar gabim, ose lidhja nga e cila keni ardhur është
            e vjetruar.
          </p>
        </div>

        {/* right: dense, real navigation — not a single lonely button */}
        <nav aria-label="Navigim">
          <span
            className="block font-mono text-[11px] tracking-[0.2em] uppercase"
            style={{ color: t.muted, marginBottom: "var(--space-3)", paddingBottom: "var(--space-3)", borderBottom: `1px solid ${t.border}` }}
          >
            {brand ? "Shko Diku Tjetër" : "Kompanitë Tona"}
          </span>

          <ul className="list-none m-0 p-0">
            {rows.map((row, i) => (
              <li key={row.href} style={{ borderBottom: `1px solid ${t.border}` }}>
                <a
                  href={row.href}
                  className="flex items-center justify-between no-underline group"
                  style={{ paddingBlock: "var(--space-4)", color: t.fg }}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tabular-nums" style={{ color: t.muted }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-step-0 font-medium">{row.label}</span>
                  </span>
                  <span
                    className="text-step-0 transition-transform duration-base ease-out group-hover:translate-x-1"
                    style={{ color: t.accent }}
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="inline-block no-underline text-step--1 font-medium"
            style={{
              marginTop: "var(--space-6)",
              background: t.accent,
              color: t.accentFg,
              padding: "var(--space-3) var(--space-5)",
              borderRadius: "var(--radius)",
            }}
          >
            {brand ? "Kthehu në Fillim" : "Të Gjitha Kompanitë"}
          </Link>
        </nav>
      </div>
    </main>
  );
}

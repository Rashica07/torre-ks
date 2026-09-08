import Image from "next/image";
import { BRANDS } from "@/lib/brands";
import type { Metadata } from "next";

// Comparison surface only — keep it out of search results, same as
// /preview/[variant]/[brand]. Not wired into DesignProvider/BrandPage at
// all: this concept is structurally different (one hero screen, no
// section-per-topic architecture), so forcing it through the variant
// system would fight the brief it's built from rather than honor it.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const brand = BRANDS.find((b) => b.id === "torrehome")!;

export default function MinimalTorreHome() {
  const t = brand.theme;
  const phoneDigits = brand.phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const telHref = `tel:${brand.phone.replace(/\s/g, "")}`;

  const facts = [
    { label: "Ndërtesa", value: "2 reale, Rr. Emin Duraku, Ferizaj" },
    { label: "Çmimi", value: "Nga €55,000" },
    { label: "Financimi", value: "0% paradhënie me kredi" },
    { label: "Grupi", value: "Pjesë e TORRE GROUP, që nga 1999" },
  ];

  const CTA = (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="mh-btn"
      style={{
        display: "inline-block",
        background: t.accent,
        color: t.accentFg,
        fontSize: "1rem",
        fontWeight: 600,
        padding: "16px 32px",
        borderRadius: "999px",
        textDecoration: "none",
      }}
    >
      Shkruani në WhatsApp
    </a>
  );

  return (
    <main
      style={{
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-display), sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes minimalFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mh-fade { animation: minimalFadeIn 0.7s ease both; }
        .mh-link { transition: opacity 0.15s ease; }
        .mh-link:hover { opacity: 0.65; }
        .mh-btn { transition: opacity 0.15s ease; }
        .mh-btn:hover { opacity: 0.85; }
        .mh-shell { max-width: 720px; margin-inline: auto; padding-inline: 6vw; }
      `}</style>

      {/* HERO — the entire first screen, text only. One headline, one
          sentence, one CTA. The one real photo the brief allows as an
          exception lives in its own section right after, so it can't push
          the hero past 100vh. */}
      <section
        className="mh-fade mh-shell"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <img
          src="/logos/torrehome.svg"
          alt=""
          width={40}
          height={40}
          style={{ borderRadius: "9px", marginBottom: "48px" }}
        />

        <h1
          style={{
            fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            maxWidth: "16ch",
          }}
        >
          Apartamente Reale në Ferizaj.
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: t.muted,
            maxWidth: "42ch",
            marginBottom: "40px",
          }}
        >
          Dy ndërtesa në Rr. Emin Duraku. Çmimet nisin nga €55,000, me 0%
          paradhënie.
        </p>

        {CTA}

        <div style={{ marginTop: "16px" }}>
          <a
            href={telHref}
            className="mh-link"
            style={{ color: t.muted, fontSize: "0.9375rem", textDecoration: "underline" }}
          >
            ose telefononi {brand.phone}
          </a>
        </div>
      </section>

      {/* The one allowed exception: a real photo, not a decorative render. */}
      <div className="mh-shell" style={{ paddingBottom: "6vh" }}>
        <Image
          src="/images/torrehome/hero-day.jpg"
          alt="Fasada e Ndërtesës TORRE HOME, pamje dite"
          width={720}
          height={480}
          style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }}
        />
      </div>

      {/* BODY — one section, real facts only, plain typographic hierarchy.
          No cards, no borders, no icons. Fixed 2-col grid (not auto-fit) so
          four items sit as a clean block instead of wrapping 3-then-1. */}
      <section className="mh-shell" style={{ padding: "8vh 0" }}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12">
          {facts.map((f) => (
            <div key={f.label}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  color: t.muted,
                  marginBottom: "6px",
                }}
              >
                {f.label}
              </span>
              <span style={{ display: "block", fontSize: "1.375rem", fontWeight: 700, lineHeight: 1.3 }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING — the same single CTA, nothing new. */}
      <section className="mh-shell" style={{ padding: "8vh 0" }}>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}
        >
          Gati të shihni apartamentin?
        </h2>
        {CTA}
      </section>

      {/* FOOTER — one line. Name, one contact method, copyright. */}
      <footer className="mh-shell" style={{ paddingBlock: "5vh", fontSize: "0.8125rem", color: t.muted }}>
        TORRE HOME — {brand.email} — &copy; {new Date().getFullYear()} Torre Group
      </footer>
    </main>
  );
}

import Image from "next/image";
import type { Brand } from "@/lib/brands";

export type MinimalConceptConfig = {
  headline: string;
  subcopy: string;
  photoSrc: string;
  photoAlt: string;
  photoWidth: number;
  photoHeight: number;
  facts: { label: string; value: string }[];
  closingHeadline: string;
};

/**
 * Shared renderer for the "pure minimalism, short-page professional" brief:
 * one hero screen, one real photo (the brief's stated exception to "no hero
 * image"), one section of real plain-text proof points, one CTA repeated
 * (never a second competing button), one typeface, a two/three-color
 * palette pulled straight from the brand's own theme. No cards, no borders,
 * no decorative icons — vertical rhythm from spacing alone.
 *
 * Content differs per brand (see the per-brand config in
 * app/preview/minimal/[brand]/page.tsx); this component only owns layout.
 */
export function MinimalConcept({ brand, config }: { brand: Brand; config: MinimalConceptConfig }) {
  const t = brand.theme;
  const phoneDigits = brand.phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const telHref = `tel:${brand.phone.replace(/\s/g, "")}`;

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
          sentence, one CTA. The one real photo lives in its own section
          right after, so it can't push the hero past 100vh. */}
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
          src={`/logos/${brand.id}.svg`}
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
            maxWidth: "18ch",
          }}
        >
          {config.headline}
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
          {config.subcopy}
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
          src={config.photoSrc}
          alt={config.photoAlt}
          width={config.photoWidth}
          height={config.photoHeight}
          style={{ maxWidth: "100%", width: "auto", height: "auto", borderRadius: "12px", display: "block" }}
        />
      </div>

      {/* BODY — one section, real facts only, plain typographic hierarchy.
          No cards, no borders, no icons. Fixed 2-col grid (not auto-fit) so
          four items sit as a clean block instead of wrapping 3-then-1. */}
      <section className="mh-shell" style={{ padding: "8vh 0" }}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12">
          {config.facts.map((f) => (
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
          {config.closingHeadline}
        </h2>
        {CTA}
      </section>

      {/* FOOTER — one line. Name, one contact method, copyright. */}
      <footer className="mh-shell" style={{ paddingBlock: "5vh", fontSize: "0.8125rem", color: t.muted }}>
        {brand.name} — {brand.email} — &copy; {new Date().getFullYear()} Torre Group
      </footer>
    </main>
  );
}

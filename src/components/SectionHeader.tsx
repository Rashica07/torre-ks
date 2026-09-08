"use client";
import type { BrandTheme } from "@/lib/brands";
import { useDesign, headingText } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";

/**
 * Single source of truth for the eyebrow + heading pattern.
 *
 * Previously every section hand-rolled this with its own clamp() value and an
 * always-uppercase accent eyebrow, which is what made six consecutive sections
 * read identically. Here the treatment varies by design variant.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  theme: t,
  index,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  theme: BrandTheme;
  /** Section ordinal, used by the architectural variant's numeral eyebrow. */
  index?: number;
  align?: "left" | "center";
}) {
  const d = useDesign();
  const ref = useReveal<HTMLDivElement>();

  const isSerif = d.displayFont === "serif";

  return (
    <div
      ref={ref}
      className={`reveal ${align === "center" ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: align === "center" ? "60ch" : undefined }}
    >
      {d.eyebrowStyle === "caps" && (
        <span
          className="block text-[11px] tracking-[0.18em] uppercase"
          style={{ color: t.accent, marginBottom: "var(--space-5)" }}
        >
          {eyebrow}
        </span>
      )}

      {d.eyebrowStyle === "numeral" && (
        <span
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: t.accent, marginBottom: "var(--space-5)" }}
        >
          <span>{String((index ?? 0) + 1).padStart(2, "0")}</span>
          <span className="h-px flex-1 max-w-16" style={{ background: t.accent, opacity: 0.4 }} />
          <span>{eyebrow}</span>
        </span>
      )}

      {/* Dossier: a section reference stamp, not a decorative label — reads like a
          clause number in a prospectus (§ 01 · PSE NE) between two hairline rules. */}
      {d.eyebrowStyle === "index" && (
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div className="h-px" style={{ background: t.border }} />
          <div
            className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: t.muted, padding: "var(--space-3) 0" }}
          >
            <span>§ {String((index ?? 0) + 1).padStart(2, "0")}</span>
            <span style={{ color: t.accent }}>{eyebrow}</span>
          </div>
          <div className="h-px" style={{ background: t.border }} />
        </div>
      )}

      <h2
        style={{
          fontSize: `var(--${d.headingSize})`,
          fontFamily: isSerif ? "var(--font-serif), Georgia, serif" : undefined,
          fontWeight: d.id === "architectural" ? 700 : d.headingCase === "upper" ? 500 : isSerif ? 400 : 600,
          letterSpacing: d.headingCase === "upper" ? "0.01em" : isSerif ? "-0.01em" : "-0.025em",
          lineHeight: isSerif ? 1.02 : 1.05,
          textTransform: d.headingCase === "upper" ? "uppercase" : undefined,
          color: t.fg,
          maxWidth: d.headingCase === "upper" ? "22ch" : "18ch",
          marginInline: align === "center" ? "auto" : undefined,
        }}
      >
        {headingText(title, d.headingPeriod)}
      </h2>

      {lead && (
        <p
          className="text-step-0"
          style={{
            color: t.muted,
            maxWidth: "46ch",
            marginTop: "var(--space-4)",
            marginInline: align === "center" ? "auto" : undefined,
            lineHeight: 1.7,
          }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Section wrapper applying the variant's vertical rhythm and background. */
export function Section({
  id,
  background,
  children,
  bleed = false,
}: {
  id: string;
  background: string;
  children: React.ReactNode;
  bleed?: boolean;
}) {
  const d = useDesign();
  return (
    <section id={id} style={{ background, padding: d.sectionPadding }}>
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: bleed ? "none" : "var(--max)",
          paddingInline: bleed ? 0 : "var(--gutter)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

import type { Brand } from "@/lib/brands";
import { Section, SectionHeader } from "./SectionHeader";

/** Three specific, brand-true facts — not a generic icon-box promise trio. */
export function Proof({ brand, index }: { brand: Brand; index: number }) {
  const t = brand.theme;

  return (
    <Section id="proof" background={t.bg}>
      <SectionHeader eyebrow={brand.proofEyebrow} title={brand.proofTitle} theme={t} index={index} />

      <ol
        className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6"
        style={{ marginTop: "var(--space-8)" }}
      >
        {brand.proofFacts.map((fact, i) => (
          <li key={i} style={{ borderTop: `1px solid ${t.border}`, paddingTop: "var(--space-4)" }}>
            <span
              className="block font-mono text-[11px] tabular-nums"
              style={{ color: t.accent, marginBottom: "var(--space-2)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-step-0" style={{ color: t.fg, lineHeight: 1.6 }}>
              {fact}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

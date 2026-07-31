"use client";
import type { Brand, BrandId, BrandTheme } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

type Step = { title: string; body: string };

const STEPS_BY_BRAND: Record<BrandId, Step[]> = {
  magfa: [
    { title: "Konsultimi", body: "Takohemi me ju për të kuptuar vizionin, buxhetin dhe afatin kohor. Konsultimi fillestar është plotësisht falas." },
    { title: "Projektimi", body: "Arkitektët tanë dizajnojnë planin e shtëpisë sipas nevojave tuaja dhe marrin lejet e nevojshme të ndërtimit." },
    { title: "Ndërtimi", body: "Ndërtojmë me ekipin tonë profesional — me raporte javore dhe transparencë totale në çdo fazë." },
    { title: "Dorëzimi", body: "Dorëzim me çelës në dorë — me dokumentacionin e plotë, certifikatën e pronësisë dhe garancitë." },
  ],
  swisstech: [
    { title: "Matja", body: "Ekipi ynë vjen falas për matje të sakta në terren. Saktësia e matjes garanton montimin perfekt." },
    { title: "Oferta", body: "Ofertë detajuare brenda 48 orësh — me specifikime teknike, materiale dhe çmim fiks final." },
    { title: "Prodhimi", body: "Prodhim në fabrikën tonë lokale me kontroll cilësie të rreptë. Profil gjerman, prodhim kosovar." },
    { title: "Montimi", body: "Montim profesional nga ekipet tona të certifikuara — brenda afatit të premtuar, pa surpriza." },
  ],
  "torre-umbria": [
    { title: "Konsultimi", body: "Diskutojmë projektin, lokacionin dhe qëllimet e zhvillimit. Analizë parafizibiliteti falas." },
    { title: "Planifikimi", body: "Hartim i planeve arkitekturore, marrje lejesh dhe miratimesh nga organet kompetente." },
    { title: "Ndërtimi", body: "Ekzekutim me standardet tona të larta — raportim periodik dhe inspektime të vazhdueshme cilësie." },
    { title: "Legalizimi", body: "Dorëzim me dokumentacion të plotë — certifikata ndërtimore, energjetike dhe çertifikata pronësie." },
  ],
  torrehome: [
    { title: "Vizita", body: "Vizitoni showroom-in tonë ose ndërtesat fizikisht. Ju tregojmë çdo apartament të disponueshëm." },
    { title: "Zgjedhja", body: "Zgjidhni apartamentin, katin dhe orientimin. Personalizoni finimet sipas preferencave tuaja." },
    { title: "Kontrata", body: "Nënshkruajmë kontratën e blerjes me çmim fiks — pa kosto të fshehura. Procesi ligjor plotësisht i mbrojtur." },
    { title: "Çelësi", body: "Merrni çelësin e shtëpisë suaj — me dokumentacionin e plotë dhe garantë zyrtare." },
  ],
};

export function Process({ brand, index }: { brand: Brand; index: number }) {
  const steps = STEPS_BY_BRAND[brand.id];
  const t = brand.theme;
  const d = useDesign();

  return (
    <Section id="process" background={d.id === "minimal" ? t.bg : t.bgAlt}>
      <SectionHeader
        eyebrow="Si Punojmë"
        title="Procesi Ynë."
        lead="Katër hapa. Qartësi totale në çdo fazë."
        theme={t}
        index={index}
      />
      <div style={{ marginTop: "var(--space-8)" }}>
        {d.sectionStyle.process === "split" && <SplitTimeline steps={steps} t={t} />}
        {d.sectionStyle.process === "dossier" && <TocList steps={steps} t={t} />}
        {(d.sectionStyle.process === "stacked" || d.sectionStyle.process === "offset" || d.sectionStyle.process === "banded") && (
          <StepColumns steps={steps} t={t} ruled={d.cardStyle === "ruled"} />
        )}
      </div>
    </Section>
  );
}

/* ── Architectural: vertical timeline with a spine, numerals in the gutter ── */
function SplitTimeline({ steps, t }: { steps: Step[]; t: BrandTheme }) {
  return (
    <div className="relative">
      <div
        className="absolute top-0 bottom-0 hidden md:block"
        style={{ left: "78px", width: "1px", background: t.border }}
      />
      {steps.map((s, i) => (
        <Item key={s.title} delay={i * 90}>
          <div
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-5 md:gap-10 items-start relative"
            style={{ paddingBlock: "var(--space-6)" }}
          >
            <div className="flex md:justify-start">
              <span
                className="font-mono tabular-nums flex items-center justify-center relative z-10"
                style={{
                  fontSize: "var(--step-1)",
                  color: t.accentFg,
                  background: t.accent,
                  width: "44px",
                  height: "44px",
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div style={{ maxWidth: "56ch" }}>
              <h3
                className="text-step-2 uppercase mb-2"
                style={{ color: t.fg, fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-step-0" style={{ color: t.muted, lineHeight: 1.7 }}>
                {s.body}
              </p>
            </div>
          </div>
        </Item>
      ))}
    </div>
  );
}

/* ── Editorial / minimal: four columns, oversized ghost numerals ── */
function StepColumns({ steps, t, ruled }: { steps: Step[]; t: BrandTheme; ruled: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
      {steps.map((s, i) => (
        <Item key={s.title} delay={i * 90}>
          <div
            className="h-full flex flex-col gap-4"
            style={
              ruled
                ? { borderTop: `1px solid ${t.border}`, paddingTop: "var(--space-5)" }
                : {
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: "var(--radius)",
                    padding: "var(--space-6)",
                  }
            }
          >
            <span
              aria-hidden
              style={{
                fontSize: "var(--step-4)",
                color: t.accent,
                opacity: ruled ? 0.28 : 0.18,
                lineHeight: 1,
                userSelect: "none",
                fontWeight: 600,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-step-1 mb-2" style={{ color: t.fg, fontWeight: 600 }}>
                {s.title}
              </h3>
              <p className="text-step--1" style={{ color: t.muted, lineHeight: 1.7 }}>
                {s.body}
              </p>
            </div>
          </div>
        </Item>
      ))}
    </div>
  );
}

/* ── Dossier: a prospectus table of contents — leader dots to a page-style index ── */
function TocList({ steps, t }: { steps: Step[]; t: BrandTheme }) {
  return (
    <div>
      {steps.map((s, i) => (
        <Item key={s.title} delay={i * 80}>
          <div style={{ paddingBlock: "var(--space-5)", borderBottom: `1px solid ${t.border}` }}>
            <div className="flex items-baseline gap-3">
              <h3 className="text-step-2 shrink-0" style={{ color: t.fg, fontWeight: 500 }}>
                {s.title}
              </h3>
              <span
                aria-hidden
                className="flex-1"
                style={{
                  borderBottom: `1px dotted ${t.border}`,
                  transform: "translateY(-4px)",
                }}
              />
              <span className="font-mono text-step--1 shrink-0" style={{ color: t.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-step--1 mt-2" style={{ color: t.muted, lineHeight: 1.7, maxWidth: "62ch" }}>
              {s.body}
            </p>
          </div>
        </Item>
      ))}
    </div>
  );
}

function Item({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

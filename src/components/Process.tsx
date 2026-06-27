"use client";
import type { Brand } from "@/lib/brands";

const STEPS_BY_BRAND: Record<string, { title: string; body: string }[]> = {
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
  "torre-home": [
    { title: "Vizita", body: "Vizitoni showroom-in tonë ose ndërtesat fizikisht. Ju tregojmë çdo apartament të disponueshëm." },
    { title: "Zgjedhja", body: "Zgjidhni apartamentin, katin dhe orientimin. Personalizoni finimet sipas preferencave tuaja." },
    { title: "Kontrata", body: "Nënshkruajmë kontratën e blerjes me çmim fiks — pa kosto të fshehura. Procesi ligjor plotësisht i mbrojtur." },
    { title: "Çelësi", body: "Merrni çelësin e shtëpisë suaj — me dokumentacionin e plotë dhe garantë zyrtare." },
  ],
};

export function Process({ brand }: { brand: Brand }) {
  const steps = STEPS_BY_BRAND[brand.id] || STEPS_BY_BRAND.magfa;
  const t = brand.theme;

  return (
    <section id="process" className="py-20 md:py-32" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <span className="block text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: t.accent }}>
          Si Punojmë
        </span>
        <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", color: t.fg }}>
            Procesi Ynë.
          </h2>
          <p className="text-sm" style={{ color: t.muted, maxWidth: "28ch", lineHeight: 1.7 }}>
            Katër hapa. Qartësi totale në çdo fazë.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ border: `1px solid ${t.border}` }}
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="p-8 flex flex-col gap-5"
              style={{ background: t.surface }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(48px, 5vw, 72px)",
                  color: t.border,
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2" style={{ fontSize: "clamp(17px, 1.4vw, 22px)", color: t.fg }}>
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: t.muted }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

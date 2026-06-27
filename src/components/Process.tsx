"use client";
import { motion } from "framer-motion";
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
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="process" className="py-24 md:py-36" style={{ background: "hsl(var(--bg))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="accent-line" style={{ background: accent }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
            Si Punojmë
          </span>
        </div>
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 76px)",
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
              color: "hsl(var(--foreground))",
            }}
          >
            Procesi Ynë.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--muted-fg))", maxWidth: "30ch", lineHeight: 1.7 }}>
            Katër hapa. Qartësi totale në çdo fazë.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "hsl(var(--border))" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="p-8 flex flex-col gap-5"
              style={{ background: "hsl(var(--bg))" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(56px, 6vw, 88px)",
                    lineHeight: 1,
                    color: `hsl(${brand.accentHsl} / 0.12)`,
                    userSelect: "none",
                    display: "block",
                    marginBottom: "-8px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 1.6vw, 24px)",
                    letterSpacing: "-0.015em",
                    color: "hsl(var(--foreground))",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--muted-fg))", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
              <div className="h-px mt-auto" style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.3), transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

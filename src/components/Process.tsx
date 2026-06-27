"use client";
import { motion } from "framer-motion";
import type { Brand } from "@/lib/brands";

const STEPS_BY_BRAND: Record<string, { title: string; body: string }[]> = {
  magfa: [
    { title: "Discovery", body: "We immerse ourselves in your brief — site, programme, budget, and ambitions. No assumptions, only listening." },
    { title: "Design", body: "Architects translate vision into drawings, specifications, and a phased delivery plan with no loose ends." },
    { title: "Build", body: "On-site with dedicated PMs, daily reporting, and zero-compromise quality inspection at every stage gate." },
    { title: "Handover", body: "White-glove delivery with full documentation. Post-occupancy follow-up at 30, 90, and 365 days." },
  ],
  swisstech: [
    { title: "Survey", body: "Precision site survey and structural assessment. Tolerances confirmed in writing before design commences." },
    { title: "Engineering", body: "Thermal, structural, and acoustic calculations completed and independently verified." },
    { title: "Manufacture", body: "Swiss factory production with staged QA inspections. Every frame logged and certified." },
    { title: "Installation", body: "SWISSTECH-certified installers, sequenced delivery, zero punchlist sign-off." },
  ],
  "torre-umbria": [
    { title: "Introduction", body: "Private briefing to understand your property goals — location, lifestyle, investment horizon, and budget." },
    { title: "Curation", body: "Off-market and on-market opportunities curated and presented. No generic portals." },
    { title: "Acquisition", body: "Legal, notarial, and financial structuring handled in-house. We close cleanly." },
    { title: "Completion", body: "Key handover with full documentation, utility connections, and property management initiated on day one." },
  ],
  "torre-home": [
    { title: "Consultation", body: "Free 90-minute home consultation to scope the project, define the brief, and align on budget." },
    { title: "Design", body: "Interior design concept, material selections, and fixed-price contract — signed before any work begins." },
    { title: "Build", body: "TORRE HOME trades on site daily. You receive photographic progress updates every 48 hours." },
    { title: "Reveal", body: "Furniture placed, art hung, consumables stocked. Your home is ready to live in, not finish." },
  ],
};

export function Process({ brand }: { brand: Brand }) {
  const steps = STEPS_BY_BRAND[brand.id] || STEPS_BY_BRAND.magfa;
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="process" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="accent-line" style={{ background: accent }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
            Our Process
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
            How We Work.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--muted-foreground))", maxWidth: "30ch", lineHeight: 1.7 }}>
            Four steps. Total clarity at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "hsl(var(--foreground) / 0.06)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="p-8 flex flex-col gap-5"
              style={{ background: "hsl(var(--background))" }}
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
                    color: `hsl(${brand.accentHsl} / 0.15)`,
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
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.52)", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
              <div className="h-px mt-auto" style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.35), transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

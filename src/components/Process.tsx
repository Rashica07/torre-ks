"use client";
import { motion } from "framer-motion";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

const STEPS_BY_BRAND: Record<string, { title: string; body: string }[]> = {
  magfa: [
    { title: "Discovery", body: "We immerse ourselves in your brief — site, programme, budget, and ambitions. No assumptions, only listening." },
    { title: "Design", body: "Architects translate vision into drawings, specifications, and a phased delivery plan with no loose ends." },
    { title: "Build", body: "On-site with dedicated PMs, daily reporting, and zero-compromise quality inspection at every stage gate." },
    { title: "Handover", body: "White-glove delivery with full documentation. Post-occupancy at 30, 90, and 365 days." },
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

  return (
    <section id="process" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="mb-16 max-w-xl">
          <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
            OUR PROCESS
          </div>
          <BlurText text="HOW WE WORK." as="h2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4.5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", marginBottom: "16px" }} />
          <p style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)", fontSize: "14px" }}>
            Four steps. Total clarity at every stage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div key={step.title} className="relative px-0 md:px-8 py-10 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 right-0 w-px"
                  style={{ height: "60%", background: "linear-gradient(to bottom, hsl(var(--border) / 0.25), transparent)" }} />
              )}
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px, 7vw, 108px)", lineHeight: 1, color: `hsl(${brand.accentHsl} / 0.18)`, marginBottom: "-16px", userSelect: "none" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px, 1.8vw, 26px)", letterSpacing: "-0.01em", color: "hsl(var(--foreground))" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.58)", lineHeight: 1.7, maxWidth: "30ch" }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

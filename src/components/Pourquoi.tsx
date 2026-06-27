"use client";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand } from "@/lib/brands";

const PILLARS_BY_BRAND: Record<string, { icon: React.ElementType; title: string; body: string }[]> = {
  magfa: [
    { icon: ShieldCheck, title: "Fully Insured", body: "Every mandate is covered from groundbreak to handover. Your investment is protected at every stage." },
    { icon: Clock, title: "On Programme", body: "We deliver on the date in the contract. Our programme is a commitment, not an estimate." },
    { icon: Leaf, title: "Sustainable by Design", body: "All MAGFA projects target a minimum 25% improvement over local energy regulations." },
    { icon: Award, title: "Internationally Certified", body: "ISO 9001, BREEAM, Passivhaus certification available. Quality management at every level." },
  ],
  swisstech: [
    { icon: ShieldCheck, title: "30-Year Warranty", body: "Our aluminium profiles carry a 30-year structural warranty. Backed by a Swiss-domiciled guarantee fund." },
    { icon: Clock, title: "Swiss Precision", body: "Tolerances measured in tenths of a millimetre. Every frame manufactured and QA'd in Switzerland." },
    { icon: Leaf, title: "Passivhaus Certified", body: "All SWISSTECH window ranges are certified to Passivhaus Institut standards. Performance guaranteed." },
    { icon: Award, title: "CE Marked", body: "Full CE marking and third-party structural engineering sign-off on every commercial system." },
  ],
  "torre-umbria": [
    { icon: ShieldCheck, title: "Freehold Title", body: "Every TORRE UMBRIA property is sold as piena proprietà — full freehold, free of encumbrances." },
    { icon: Clock, title: "97% Sold on Launch", body: "Our residences sell before or on launch day. Our waiting list currently exceeds 6 months." },
    { icon: Leaf, title: "Heritage Stewardship", body: "Our restoration team preserves provenance while delivering 21st-century living standards." },
    { icon: Award, title: "International Legal Support", body: "Dedicated advisors for non-EU buyers, including Italian flat-tax residency guidance." },
  ],
  "torre-home": [
    { icon: ShieldCheck, title: "Fixed-Price Contracts", body: "No hidden charges. Our contracts are all-inclusive. If we underestimate, we absorb the difference." },
    { icon: Clock, title: "On-Time Delivery", body: "96% of TORRE HOME projects complete within the contracted programme. We track daily." },
    { icon: Leaf, title: "Eco Materials", body: "We specify low-VOC finishes, sustainable timber, and energy-efficient systems as standard." },
    { icon: Award, title: "5-Year Workmanship Warranty", body: "All structural and finish work is warranted for 5 years. Smart home systems carry a 3-year warranty." },
  ],
};

export function Pourquoi({ brand }: { brand: Brand }) {
  const pillars = PILLARS_BY_BRAND[brand.id] || PILLARS_BY_BRAND.magfa;
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="pourquoi" className="py-24 md:py-36" style={{ background: "hsl(20 5% 6%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 mb-8">
              <span className="accent-line" style={{ background: accent }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
                Why Us
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 54px)",
                lineHeight: 0.93,
                letterSpacing: "-0.022em",
                color: "hsl(var(--foreground))",
                marginBottom: "20px",
              }}
            >
              Trust Is Built Before the First Stone.
            </h2>
            <p style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
              Four non-negotiable standards on every {brand.name} project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                className="glass-card rounded-2xl p-7 flex flex-col gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `hsl(${brand.accentHsl} / 0.1)`, border: `1px solid hsl(${brand.accentHsl} / 0.2)` }}
                >
                  <Icon style={{ width: "17px", height: "17px", color: accent }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      color: "hsl(var(--foreground))",
                      marginBottom: "8px",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.52)", lineHeight: 1.7 }}>
                    {body}
                  </p>
                </div>
                <div className="h-px mt-auto" style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.4), transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

const PILLARS_BY_BRAND: Record<string, { icon: React.ElementType; title: string; body: string }[]> = {
  magfa: [
    { icon: ShieldCheck, title: "Fully Insured", body: "Every mandate is covered from groundbreak to handover. Your investment is protected at every stage." },
    { icon: Clock, title: "On Programme", body: "We deliver on the date in the contract. Our programme is a commitment, not an estimate." },
    { icon: Leaf, title: "Sustainable by Design", body: "All MAGFA projects target a minimum 25% improvement over local energy regulations. Green is not optional." },
    { icon: Award, title: "Internationally Certified", body: "ISO 9001, BREEAM, Passivhaus certification available. Quality management embedded at every level." },
  ],
  swisstech: [
    { icon: ShieldCheck, title: "30-Year Warranty", body: "Our aluminium profiles carry a 30-year structural warranty. Backed by a Swiss-domiciled guarantee fund." },
    { icon: Clock, title: "Swiss Precision", body: "Tolerances measured in tenths of a millimetre. Every frame manufactured and QA'd in Switzerland." },
    { icon: Leaf, title: "Passivhaus Certified", body: "All SWISSTECH window ranges are certified to Passivhaus Institut standards. Performance is not a brochure claim." },
    { icon: Award, title: "CE Marked", body: "Full CE marking and third-party structural engineering sign-off on every commercial system." },
  ],
  "torre-umbria": [
    { icon: ShieldCheck, title: "Freehold Title", body: "Every TORRE UMBRIA property is sold as piena proprietà — full freehold, free of encumbrances." },
    { icon: Clock, title: "97% Sold on Launch", body: "Our residences sell before or on launch day. Our waiting list currently exceeds 6 months." },
    { icon: Leaf, title: "Heritage Stewardship", body: "Our restoration team preserves provenance while delivering 21st-century standards. Authenticity is the luxury." },
    { icon: Award, title: "International Legal Support", body: "Dedicated advisors for non-EU buyers, including guidance on Italian flat-tax residency regimes." },
  ],
  "torre-home": [
    { icon: ShieldCheck, title: "Fixed-Price Contracts", body: "No hidden charges. Our contracts are all-inclusive. If we underestimate, we absorb the difference." },
    { icon: Clock, title: "On-Time Delivery", body: "96% of TORRE HOME projects complete within the contracted programme. We track daily." },
    { icon: Leaf, title: "Eco Materials", body: "We specify low-VOC finishes, sustainable timber, and energy-efficient systems as standard on every renovation." },
    { icon: Award, title: "5-Year Workmanship Warranty", body: "All structural and finish work is warranted for 5 years. Smart home systems carry a 3-year warranty." },
  ],
};

export function Pourquoi({ brand }: { brand: Brand }) {
  const pillars = PILLARS_BY_BRAND[brand.id] || PILLARS_BY_BRAND.magfa;

  return (
    <section id="pourquoi" className="py-24 md:py-36" style={{ background: "hsl(240 8% 5%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="mb-16 max-w-xl">
          <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
            WHY US
          </div>
          <BlurText text="TRUST IS BUILT BEFORE THE FIRST STONE." as="h2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.2vw, 50px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", marginBottom: "16px" }} />
          <p style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)", fontSize: "14px" }}>
            Four non-negotiable standards on every {brand.name} project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.div key={title} className="liquid-glass rounded-2xl p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-80px" }}>
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                <Icon style={{ width: "16px", height: "16px", color: `hsl(${brand.accentHsl})` }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", lineHeight: 1.15, letterSpacing: "-0.01em", color: "hsl(var(--foreground))" }}>
                {title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.58)", lineHeight: 1.65, flex: 1 }}>
                {body}
              </p>
              <div className="h-px mt-2" style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.45), transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

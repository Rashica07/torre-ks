"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrubSequence } from "./ScrubSequence";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

type BrandHeroProps = { brand: Brand };

const PARTNERS: Record<string, string[]> = {
  magfa:         ["SWISSTECH", "TORRE UMBRIA", "TORRE HOME", "MAGFA"],
  swisstech:     ["MAGFA GROUP", "TORRE UMBRIA", "TORRE HOME", "Schüco"],
  "torre-umbria":["MAGFA GROUP", "SWISSTECH", "TORRE HOME", "Christie's RE"],
  "torre-home":  ["MAGFA GROUP", "SWISSTECH", "TORRE UMBRIA", "Bosch"],
};

const HEADLINES: Record<string, string> = {
  magfa:         "BUILT TO OUTLAST",
  swisstech:     "GLASS THAT DEFINES",
  "torre-umbria":"ITALY. ELEVATED.",
  "torre-home":  "HOME, PERFECTED.",
};

const SUBS: Record<string, string> = {
  magfa:         "Architecture and construction at the highest institutional level. From master plan to final handover — MAGFA GROUP accepts no compromise.",
  swisstech:     "Swiss-engineered window and facade systems where thermal precision meets architectural beauty. 30-year standard warranty.",
  "torre-umbria":"Landmark residences across Italy's most coveted addresses. Penthouses, villas, and palazzos designed to define taste.",
  "torre-home":  "Premium homes, renovations, and interiors for discerning buyers who know what excellence feels like.",
};

export function BrandHero({ brand }: BrandHeroProps) {
  const scrollRef = useRef<HTMLElement>(null);
  const partners = PARTNERS[brand.id] || [];

  return (
    <section ref={scrollRef} id="hero" className="relative bg-background" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrubSequence
          framesPath={`/frames/${brand.id}`}
          frameCount={120}
          ext="jpg"
          scrollTargetRef={scrollRef}
          accentHsl={brand.accentHsl}
          className="absolute inset-0 w-full h-full z-0"
        />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_50%_60%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
        <div className="absolute bottom-0 inset-x-0 h-[40vh] z-[2] gradient-fade-b" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <div className="liquid-glass rounded-full px-1 py-1 inline-flex items-center gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `hsl(${brand.accentHsl})`, color: "hsl(var(--ink))", fontFamily: "var(--font-body)" }}>
                {brand.category}
              </span>
              <span className="pr-3 text-sm" style={{ color: "hsl(var(--foreground) / 0.80)", fontFamily: "var(--font-body)" }}>
                {brand.tagline}
              </span>
            </div>
          </motion.div>

          <BlurText
            text={HEADLINES[brand.id] || brand.name}
            as="h1"
            startDelay={0.15}
            delay={0.09}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 9vw, 140px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
              marginTop: "24px",
              maxWidth: "14ch",
              textAlign: "center",
            }}
          />

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "hsl(var(--foreground) / 0.68)", fontFamily: "var(--font-body)", marginTop: "24px", maxWidth: "520px", lineHeight: 1.65, fontSize: "clamp(15px, 1.2vw, 18px)" }}
          >
            {SUBS[brand.id]}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
            style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#services" className="inline-flex items-center rounded-full transition-opacity hover:opacity-90"
              style={{ background: `hsl(${brand.accentHsl})`, color: "hsl(var(--ink))", fontFamily: "var(--font-body)", padding: "14px 28px", fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em" }}>
              View Services <ArrowUpRight style={{ marginLeft: "6px", width: "16px", height: "16px" }} />
            </a>
            <a href="#contact" className="liquid-glass-strong inline-flex items-center rounded-full transition-opacity hover:opacity-80"
              style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-body)", padding: "14px 28px", fontSize: "15px", letterSpacing: "-0.01em" }}>
              Contact Us
            </a>
          </motion.div>

          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4">
            <span className="liquid-glass rounded-full px-4 py-1.5 text-xs" style={{ color: "hsl(var(--foreground) / 0.70)", fontFamily: "var(--font-body)" }}>
              Part of the TORRE GROUP network
            </span>
            <div className="flex items-center gap-8 md:gap-14 flex-wrap justify-center px-6">
              {partners.map((p) => (
                <span key={p} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 1.8vw, 22px)", color: "hsl(var(--foreground) / 0.50)", fontStyle: "italic", letterSpacing: "-0.01em" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

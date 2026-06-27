"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf } from "lucide-react";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf,
};

const CARD_CLASSES = ["md:row-span-2", "", "", "md:col-span-2", "", "md:col-span-3"];

type Props = { brand: Brand };

export function ServicesBento({ brand }: Props) {
  return (
    <section id="services" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="mb-16 max-w-2xl">
          <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
            SERVICES
          </div>
          <BlurText text="WHAT WE BUILD. WHAT WE DELIVER." as="h2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4vw, 60px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", marginBottom: "16px" }} />
          <p style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)", fontSize: "15px" }}>
            Six disciplines. Every service delivered to institutional quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {brand.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Building2;
            return (
              <motion.div key={service.title}
                className={`liquid-glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer ${CARD_CLASSES[i]}`}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}>
                <div className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-5">
                  <Icon style={{ width: "18px", height: "18px", color: `hsl(${brand.accentHsl})` }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: i === 0 ? "clamp(24px, 2.5vw, 34px)" : "clamp(18px, 2vw, 26px)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "hsl(var(--foreground))", marginBottom: "12px", maxWidth: "18ch" }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.62)", lineHeight: 1.65, maxWidth: "38ch" }}>
                  {service.description}
                </p>
                {/* Price tag */}
                <div className="mt-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: `hsl(${brand.accentHsl} / 0.12)`, color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.02em" }}>
                  {service.price}
                </div>
                <ArrowUpRight className="absolute top-6 right-6 size-5 transition-colors" style={{ color: "hsl(var(--foreground) / 0.25)" }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

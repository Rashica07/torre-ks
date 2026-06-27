"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf } from "lucide-react";
import type { Brand } from "@/lib/brands";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf,
};

type Props = { brand: Brand };

export function ServicesBento({ brand }: Props) {
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="services" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="accent-line" style={{ background: accent }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
                Services
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.2vw, 64px)",
                lineHeight: 0.93,
                letterSpacing: "-0.022em",
                color: "hsl(var(--foreground))",
              }}
            >
              What We Build.<br />
              <span style={{ color: "hsl(var(--foreground) / 0.45)", fontStyle: "italic" }}>What We Deliver.</span>
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--muted-foreground))", maxWidth: "32ch", lineHeight: 1.7 }}>
            Six disciplines. Every service delivered to institutional quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {brand.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Building2;
            const isFeature = i === 0;
            return (
              <motion.div
                key={service.title}
                className={`glass-card rounded-2xl p-7 relative overflow-hidden group cursor-pointer ${isFeature ? "md:row-span-2" : ""}`}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                style={{
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                {/* hover accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `hsl(${brand.accentHsl} / 0.1)`, border: `1px solid hsl(${brand.accentHsl} / 0.2)` }}
                >
                  <Icon style={{ width: "17px", height: "17px", color: accent }} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isFeature ? "clamp(22px, 2.2vw, 32px)" : "clamp(17px, 1.6vw, 22px)",
                    lineHeight: 0.97,
                    letterSpacing: "-0.015em",
                    color: "hsl(var(--foreground))",
                    marginBottom: "12px",
                    maxWidth: "20ch",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "hsl(var(--foreground) / 0.55)",
                    lineHeight: 1.7,
                    maxWidth: "38ch",
                  }}
                >
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      background: `hsl(${brand.accentHsl} / 0.1)`,
                      color: accent,
                      fontFamily: "var(--font-body)",
                      border: `1px solid hsl(${brand.accentHsl} / 0.18)`,
                    }}
                  >
                    {service.price}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="opacity-25 group-hover:opacity-70 transition-opacity"
                    style={{ color: accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

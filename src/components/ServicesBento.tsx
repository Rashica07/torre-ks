import { motion } from "framer-motion";
import { Truck, Package, Warehouse, Globe, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";

const SERVICES = [
  {
    icon: Building2,
    title: "Architecture",
    body: "From concept to completion — we design landmark structures that define skylines and stand the test of time.",
  },
  {
    icon: Sparkles,
    title: "Interior Design",
    body: "Bespoke interior environments crafted with precision materials and an editorial eye.",
  },
  {
    icon: Warehouse,
    title: "Construction",
    body: "End-to-end construction management with Swiss quality standards and Italian craftsmanship.",
  },
  {
    icon: Globe,
    title: "Windows & Facades",
    body: "Engineered glazing systems and facade solutions that balance light, performance, and beauty.",
  },
  {
    icon: Truck,
    title: "Project Management",
    body: "Rigorous coordination across every stakeholder, timeline, and budget — no compromise.",
  },
  {
    icon: Package,
    title: "Bespoke Solutions",
    body: "Custom programmes designed for clients who require something beyond the catalogue.",
  },
];

const cardClasses = [
  "md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "md:col-span-3",
];

export function ServicesBento() {
  return (
    <section id="services" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
          >
            SERVICES
          </div>
          <BlurText
            text="EVERYTHING THAT MOVES. UNDER ONE ROOF."
            as="h2"
            className="font-display uppercase leading-none tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
          />
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
          >
            Six disciplines, one team, zero compromise.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className={`liquid-glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer ${cardClasses[i]}`}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <div
                  className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-5"
                >
                  <Icon className="size-5" style={{ color: "hsl(var(--foreground))" }} />
                </div>
                <h3
                  className="font-display uppercase mb-3 max-w-[18ch]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: i === 0 ? "clamp(26px, 3vw, 36px)" : "clamp(20px, 2.5vw, 28px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.01em",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed max-w-[38ch]"
                  style={{ color: "hsl(var(--foreground) / 0.65)", fontFamily: "var(--font-body)" }}
                >
                  {service.body}
                </p>
                <ArrowUpRight
                  className="absolute top-6 right-6 size-5 transition-colors"
                  style={{ color: "hsl(var(--foreground) / 0.30)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

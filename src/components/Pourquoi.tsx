import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import { BlurText } from "./BlurText";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    body: "Every project is covered end-to-end. Your investment is protected from groundbreak to final handover.",
  },
  {
    icon: Clock,
    title: "On Schedule",
    body: "We deliver on time — not approximately. Our project clock is a commitment, not a suggestion.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    body: "Sustainable materials, low-impact methods, and long-life design. Building for the next century.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    body: "MAGFA GROUP holds international certifications across construction, architecture, and quality management.",
  },
];

export function Pourquoi() {
  return (
    <section id="pourquoi" className="py-24 md:py-36" style={{ background: "hsl(240 8% 5%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
          >
            WHY US
          </div>
          <BlurText
            text="TRUST IS BUILT BEFORE THE FIRST STONE."
            as="h2"
            className="font-display uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 52px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
          >
            Four non-negotiable pillars that underpin every MAGFA project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="liquid-glass rounded-2xl p-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                  <Icon className="size-4.5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3
                  className="font-display uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "hsl(var(--foreground) / 0.60)", fontFamily: "var(--font-body)" }}
                >
                  {pillar.body}
                </p>
                {/* Bottom accent */}
                <div
                  className="h-px mt-2"
                  style={{ background: "linear-gradient(to right, hsl(var(--primary) / 0.5), transparent)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

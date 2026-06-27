import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BlurText } from "./BlurText";

const STATS = [
  { value: "2500+", label: "Projects Delivered" },
  { value: "98%",   label: "Client Satisfaction" },
  { value: "24h",   label: "Quote Turnaround" },
  { value: "15",    label: "Years of Expertise" },
];

function parseNumeric(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: val };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const { prefix, num, suffix } = parseNumeric(value);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(num);
    };
    requestAnimationFrame(tick);
  }, [inView, num]);

  const isNumeric = !isNaN(num) && num > 0;
  return (
    <span>
      {prefix}{isNumeric ? display : value}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="relative py-24 md:py-36 overflow-hidden" style={{ background: "hsl(240 8% 5%)" }}>
      {/* Cinematic background — desaturated gradient stand-in for video */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, hsl(35 30% 12%) 0%, hsl(240 10% 4%) 70%)
          `,
          filter: "saturate(0.3)",
        }}
      />
      {/* Top + bottom fades */}
      <div className="absolute top-0 inset-x-0 h-32 gradient-fade-t" style={{ zIndex: 1 }} />
      <div className="absolute bottom-0 inset-x-0 h-32 gradient-fade-b" style={{ zIndex: 1 }} />

      <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
          >
            BY THE NUMBERS
          </div>
          <BlurText
            text="NUMBERS THAT SPEAK."
            as="h2"
            className="font-display uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 60px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
          />
        </div>

        {/* Stats card */}
        <div ref={ref} className="liquid-glass-strong rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 relative">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="relative flex flex-col gap-2">
                {/* Desktop separator */}
                {i > 0 && (
                  <div
                    className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12"
                    style={{ background: "hsl(var(--border) / 0.3)" }}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:px-10"
                >
                  <div
                    className="font-display"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(40px, 5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    <CountUp value={stat.value} inView={inView} />
                  </div>
                  <div
                    className="mt-2 text-sm"
                    style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

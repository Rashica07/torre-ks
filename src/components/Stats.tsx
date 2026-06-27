"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import type { Brand } from "@/lib/brands";

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const match = value.match(/^([^0-9]*)(\d[\d,.]*)([^0-9]*)$/);
  if (!match) return <span>{value}</span>;
  const [prefix, raw, suffix] = [match[1], match[2].replace(/,/g, ""), match[3]];
  const num = parseFloat(raw);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || isNaN(num)) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * num));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(num);
    };
    requestAnimationFrame(tick);
  }, [inView, num]);

  const formatted = isNaN(num) ? raw : display.toLocaleString();
  return <span>{prefix}{formatted}{suffix}</span>;
}

export function Stats({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="stats" className="py-24 md:py-36 relative overflow-hidden" style={{ background: "hsl(var(--bg-alt))" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(${brand.accentHsl} / 0.05) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="accent-line" style={{ background: accent }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
            Në Numra
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4.5vw, 68px)",
            lineHeight: 0.93,
            letterSpacing: "-0.022em",
            color: "hsl(var(--foreground))",
            marginBottom: "60px",
          }}
        >
          Numrat Flasin Vetë.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ border: "1px solid hsl(var(--border))", borderRadius: "16px", overflow: "hidden", background: "hsl(var(--surface))" }}
        >
          {brand.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-8 md:p-10 flex flex-col gap-2 relative"
              style={{
                borderRight: i < 3 ? "1px solid hsl(var(--border))" : undefined,
                borderBottom: i < 2 ? "1px solid hsl(var(--border))" : undefined,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4vw, 60px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: "hsl(var(--foreground))",
                }}
              >
                <CountUp value={stat.value} inView={inView} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "hsl(var(--muted-fg))",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.label}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.25), transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

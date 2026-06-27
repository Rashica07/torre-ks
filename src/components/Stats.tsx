"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { BlurText } from "./BlurText";
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
      const p = Math.min(1, (now - start) / 1200);
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

  return (
    <section id="stats" className="relative py-24 md:py-36 overflow-hidden" style={{ background: "hsl(240 8% 5%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(35 25% 10%) 0%, hsl(240 10% 4%) 70%)", filter: "saturate(0.25)" }} />
      <div className="absolute top-0 inset-x-0 h-32 gradient-fade-t" style={{ zIndex: 1 }} />
      <div className="absolute bottom-0 inset-x-0 h-32 gradient-fade-b" style={{ zIndex: 1 }} />

      <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="mb-16 max-w-xl">
          <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
            BY THE NUMBERS
          </div>
          <BlurText text="NUMBERS THAT SPEAK." as="h2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4vw, 58px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))" }} />
        </div>

        <div ref={ref} className="liquid-glass-strong rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0">
            {brand.stats.map((stat, i) => (
              <div key={stat.label} className="relative lg:px-10">
                {i > 0 && <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ background: "hsl(var(--border) / 0.25)" }} />}
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "hsl(var(--foreground))" }}>
                  <CountUp value={stat.value} inView={inView} />
                </div>
                <div className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
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
  const [inView, setInView] = useState(false);
  const t = brand.theme;

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "-100px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="py-20 md:py-32" style={{ background: t.bgAlt }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <span className="block text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: t.accent }}>
          Në Numra
        </span>
        <h2 className="mb-14" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: t.fg }}>
          Numrat Flasin Vetë.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ border: `1px solid ${t.border}` }}
        >
          {brand.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 md:p-10 flex flex-col gap-2"
              style={{ background: t.surface }}
            >
              <div style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: t.fg, lineHeight: 1 }}>
                <CountUp value={stat.value} inView={inView} />
              </div>
              <div className="text-xs" style={{ color: t.muted, letterSpacing: "0.03em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

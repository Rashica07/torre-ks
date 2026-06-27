"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Brand } from "@/lib/brands";

function Item({ item, i, accent }: { item: { q: string; a: string }; i: number; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid hsl(var(--border))" }}>
      <button
        className="w-full flex items-start justify-between py-6 text-left gap-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(15px, 1.4vw, 19px)",
            letterSpacing: "-0.01em",
            color: open ? `hsl(${accent})` : "hsl(var(--foreground))",
            transition: "color 0.2s",
            lineHeight: 1.25,
          }}
        >
          {item.q}
        </span>
        <span className="shrink-0 mt-0.5">
          {open
            ? <Minus size={15} style={{ color: `hsl(${accent})` }} />
            : <Plus size={15} style={{ color: "hsl(var(--muted-fg))" }} />
          }
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-6"
              style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--muted-fg))", lineHeight: 1.75, maxWidth: "60ch" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq({ brand }: { brand: Brand }) {
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="faq" className="py-24 md:py-36" style={{ background: "hsl(var(--bg-alt))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 mb-8">
              <span className="accent-line" style={{ background: accent }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
                Pyetje të Shpeshta
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3.2vw, 50px)",
                lineHeight: 0.93,
                letterSpacing: "-0.022em",
                color: "hsl(var(--foreground))",
                marginBottom: "20px",
              }}
            >
              Pyetje me Përgjigje.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "32px" }}>
              Nuk gjeni përgjigjen? Kontaktoni ekipin tonë direkt.
            </p>
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: accent,
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: `1px solid hsl(${brand.accentHsl} / 0.35)`,
                paddingBottom: "2px",
              }}
            >
              Na kontaktoni →
            </a>
          </div>
          <div>
            {brand.faqs.map((item, i) => (
              <Item key={i} item={item} i={i} accent={brand.accentHsl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

function Item({ item, i, accent }: { item: { q: string; a: string }; i: number; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "hsl(var(--border) / 0.2)" }}>
      <button className="w-full flex items-center justify-between py-6 text-left gap-4" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 1.5vw, 20px)", letterSpacing: "-0.01em", color: open ? `hsl(${accent})` : "hsl(var(--foreground))", transition: "color 0.2s", lineHeight: 1.2 }}>
          {item.q}
        </span>
        <span className="shrink-0">
          {open ? <Minus size={16} style={{ color: `hsl(${accent})` }} /> : <Plus size={16} style={{ color: "hsl(var(--muted-foreground))" }} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <p className="pb-6" style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "hsl(var(--foreground) / 0.68)", lineHeight: 1.7, maxWidth: "62ch" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq({ brand }: { brand: Brand }) {
  return (
    <section id="faq" className="py-24 md:py-36" style={{ background: "hsl(240 8% 5%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
              style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
              FAQ
            </div>
            <BlurText text="QUESTIONS ANSWERED." as="h2"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 48px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", marginBottom: "20px" }} />
            <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}>
              Can&apos;t find what you&apos;re looking for? Reach our team directly.
            </p>
            <a href="#contact" className="inline-flex items-center text-sm font-medium border-b pb-0.5 transition-colors"
              style={{ color: `hsl(${brand.accentHsl})`, borderColor: `hsl(${brand.accentHsl} / 0.4)`, fontFamily: "var(--font-body)" }}>
              Contact us
            </a>
          </div>
          <div>{brand.faqs.map((item, i) => <Item key={i} item={item} i={i} accent={brand.accentHsl} />)}</div>
        </div>
      </div>
    </section>
  );
}

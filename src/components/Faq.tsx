"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Brand } from "@/lib/brands";
import { Section, SectionHeader } from "./SectionHeader";

function Item({ item, index, accent, fg, muted, border, bgAlt }: {
  item: { q: string; a: string }; index: number;
  accent: string; fg: string; muted: string; border: string; bgAlt: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative pl-6 transition-colors duration-200"
      style={{
        borderBottom: `1px solid ${border}`,
        borderLeft: `2px solid ${open ? accent : "transparent"}`,
        background: open ? bgAlt : "transparent",
      }}
    >
      <button
        className="w-full flex items-start justify-between py-6 text-left gap-6 pr-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span
            className="text-[11px] font-mono tabular-nums mt-1 shrink-0"
            style={{ color: open ? accent : muted, opacity: 0.7 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[15px] font-medium"
            style={{ color: open ? accent : fg, transition: "color 0.2s", lineHeight: 1.4 }}
          >
            {item.q}
          </span>
        </div>
        <span
          className="shrink-0 mt-1 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Plus size={16} style={{ color: open ? accent : muted }} />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pl-8 text-sm leading-relaxed" style={{ color: muted, maxWidth: "56ch" }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <Section id="faq" background={t.bg}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="Pyetje të Shpeshta"
              title="Pyetje me Përgjigje."
              lead="Nuk gjeni përgjigjen? Kontaktoni ekipin tonë direkt."
              theme={t}
              index={5}
            />
          <a
            href="#contact"
            className="text-[13px] font-medium no-underline"
            style={{
              color: t.accent,
              borderBottom: `1px solid ${t.accent}40`,
              paddingBottom: "2px",
              marginTop: "var(--space-6)",
              display: "inline-block",
            }}
          >
            Na kontaktoni →
          </a>
        </div>
        <div style={{ borderTop: `1px solid ${t.border}` }}>
          {brand.faqs.map((item, i) => (
            <Item
              key={i}
              item={item}
              index={i}
              accent={t.accent}
              fg={t.fg}
              muted={t.muted}
              border={t.border}
              bgAlt={t.bgAlt}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

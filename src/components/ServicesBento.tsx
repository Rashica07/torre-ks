"use client";
import { ArrowRight, Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf } from "lucide-react";
import type { Brand, Service, BrandTheme } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf,
};

type Props = { brand: Brand; index: number; simplified?: boolean };

export function ServicesBento({ brand, index, simplified }: Props) {
  const t = brand.theme;
  const d = useDesign();
  const style = d.sectionStyle.services;

  return (
    <Section id="services" background={t.bg}>
      <SectionHeader
        eyebrow="Shërbimet"
        title="Çfarë Ofrojmë."
        lead="Gjashtë shërbime. Çdo projekt i realizuar me standarde të larta."
        theme={t}
        index={index}
      />

      <div style={{ marginTop: "var(--space-8)" }}>
        {simplified ? (
          <RaisedGrid services={brand.services} t={t} />
        ) : (
          <>
            {style === "offset" && <OffsetList services={brand.services} t={t} />}
            {style === "banded" && <BandedRows services={brand.services} t={t} />}
            {style === "dossier" && <LedgerList services={brand.services} t={t} />}
            {(style === "stacked" || style === "split") && <RaisedGrid services={brand.services} t={t} />}
          </>
        )}
      </div>
    </Section>
  );
}

/* ── Editorial: alternating wide/narrow rows separated by hairlines, no boxes ── */
function OffsetList({ services, t }: { services: Service[]; t: BrandTheme }) {
  return (
    <div>
      {services.map((s, i) => {
        const Icon = ICON_MAP[s.icon] || Building2;
        return (
          <Row key={s.title} delay={i * 70}>
            <div
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
              style={{
                borderTop: `1px solid ${t.border}`,
                paddingBlock: "var(--space-6)",
                // Indent every other row so the column doesn't read as a table.
                paddingInlineStart: i % 2 === 1 ? "8%" : 0,
              }}
            >
              <span
                className="md:col-span-1 font-mono text-[11px] tabular-nums"
                style={{ color: t.muted, opacity: 0.6 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="md:col-span-4 text-step-2"
                style={{ color: t.fg, fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400 }}
              >
                {s.title}
              </h3>
              <p className="md:col-span-5 text-step-0" style={{ color: t.muted, lineHeight: 1.7 }}>
                {s.description}
              </p>
              <div className="md:col-span-2 flex items-center justify-between gap-3">
                <span className="text-step--1 font-medium" style={{ color: t.accent }}>
                  {s.price}
                </span>
                <Icon size={15} style={{ color: t.muted, opacity: 0.5 }} />
              </div>
            </div>
          </Row>
        );
      })}
      <div style={{ borderTop: `1px solid ${t.border}` }} />
    </div>
  );
}

/* ── Architectural: full-width bands, alternating surface, hard edges ── */
function BandedRows({ services, t }: { services: Service[]; t: BrandTheme }) {
  return (
    <div style={{ borderTop: `2px solid ${t.fg}` }}>
      {services.map((s, i) => {
        const Icon = ICON_MAP[s.icon] || Building2;
        return (
          <Row key={s.title} delay={i * 60}>
            <div
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto] gap-5 md:gap-8 items-center"
              style={{
                background: i % 2 === 0 ? t.surface : "transparent",
                borderBottom: `1px solid ${t.border}`,
                padding: "var(--space-5) var(--space-5)",
              }}
            >
              <span
                className="font-mono tabular-nums"
                style={{ fontSize: "var(--step-2)", color: t.accent, fontWeight: 700 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-step-1 uppercase"
                style={{ color: t.fg, fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-step--1" style={{ color: t.muted, lineHeight: 1.6 }}>
                {s.description}
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <span
                  className="font-mono text-step--1 px-3 py-1"
                  style={{ color: t.accentFg, background: t.accent }}
                >
                  {s.price}
                </span>
                <Icon size={16} style={{ color: t.fg }} />
              </div>
            </div>
          </Row>
        );
      })}
    </div>
  );
}

/* ── Minimal: the familiar grid, but with elevation on hover instead of flat borders ── */
function RaisedGrid({ services, t }: { services: Service[]; t: BrandTheme }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((s, i) => {
        const Icon = ICON_MAP[s.icon] || Building2;
        return (
          <Row key={s.title} delay={i * 60}>
            <article
              className="group h-full flex flex-col gap-5 transition-all duration-base ease-out hover:-translate-y-1"
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "var(--radius)",
                padding: "var(--space-6)",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center transition-colors duration-base"
                style={{ background: `${t.accent}14`, borderRadius: "var(--radius-sm)" }}
              >
                <Icon size={17} style={{ color: t.accent }} />
              </div>
              <div className="flex-1">
                <h3 className="text-step-1 mb-2" style={{ color: t.fg, fontWeight: 600 }}>
                  {s.title}
                </h3>
                <p className="text-step--1" style={{ color: t.muted, lineHeight: 1.7 }}>
                  {s.description}
                </p>
              </div>
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: `1px solid ${t.border}` }}
              >
                <span className="text-step--1 font-medium" style={{ color: t.accent }}>
                  {s.price}
                </span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-base ease-out group-hover:translate-x-1"
                  style={{ color: t.muted }}
                />
              </div>
            </article>
          </Row>
        );
      })}
    </div>
  );
}

/* ── Dossier: an invoice-register ledger — service, unit line, price flush right ── */
function LedgerList({ services, t }: { services: Service[]; t: BrandTheme }) {
  return (
    <div style={{ border: `1px solid ${t.border}` }}>
      <div
        className="hidden md:grid font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{
          gridTemplateColumns: "56px 1fr 240px 140px",
          color: t.muted,
          padding: "var(--space-3) var(--space-5)",
          borderBottom: `1px solid ${t.border}`,
          background: t.bgAlt,
        }}
      >
        <span>Nr.</span>
        <span>Shërbimi</span>
        <span>Përshkrimi</span>
        <span className="text-right">Çmimi</span>
      </div>
      {services.map((s, i) => (
        <Row key={s.title} delay={i * 50}>
          <div
            className="grid grid-cols-1 md:grid-cols-[56px_1fr_240px_140px] gap-2 md:gap-6 items-baseline"
            style={{
              padding: "var(--space-5)",
              borderBottom: i < services.length - 1 ? `1px solid ${t.border}` : "none",
            }}
          >
            <span className="font-mono text-step--1" style={{ color: t.muted }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-step-1" style={{ color: t.fg, fontWeight: 500 }}>
              {s.title}
            </h3>
            <p className="text-step--1" style={{ color: t.muted, lineHeight: 1.6 }}>
              {s.description}
            </p>
            <span
              className="font-mono text-step--1 md:text-right"
              style={{ color: t.accent }}
            >
              {s.price}
            </span>
          </div>
        </Row>
      ))}
    </div>
  );
}

function Row({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

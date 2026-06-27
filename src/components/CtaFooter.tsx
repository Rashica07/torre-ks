"use client";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Careers", href: "#" },
];

export function CtaFooter({ brand }: { brand: Brand }) {
  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      <div className="relative py-32 md:py-48">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 100%, hsl(${brand.accentHsl} / 0.12) 0%, transparent 70%), hsl(var(--background))` }} />
        <div className="absolute top-0 inset-x-0 h-40 gradient-fade-t" style={{ zIndex: 1 }} />
        <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
          <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-8"
            style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
            START A PROJECT
          </div>
          <BlurText text="LET'S BUILD SOMETHING EXTRAORDINARY." as="h2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5.5vw, 90px)", lineHeight: 0.92, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", maxWidth: "18ch", marginBottom: "32px" }} />
          <p className="mb-12 max-w-lg leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.2vw, 18px)", color: "hsl(var(--foreground) / 0.62)" }}>
            Every landmark begins with a conversation. We respond within 24 hours.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href={`mailto:hello@${brand.subdomain}`}
              className="inline-flex items-center rounded-full transition-opacity hover:opacity-90"
              style={{ background: `hsl(${brand.accentHsl})`, color: "hsl(var(--ink))", fontFamily: "var(--font-body)", padding: "16px 32px", fontSize: "15px", fontWeight: 500 }}>
              Start a Conversation <ArrowUpRight style={{ marginLeft: "8px", width: "16px", height: "16px" }} />
            </a>
            <a href="https://torre-ks.com" className="liquid-glass-strong inline-flex items-center rounded-full transition-opacity hover:opacity-80"
              style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-body)", padding: "16px 32px", fontSize: "15px" }}>
              Back to TORRE GROUP
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full border-t" style={{ borderColor: "hsl(var(--border) / 0.15)" }}>
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "hsl(var(--foreground) / 0.35)" }}>
            &copy; {new Date().getFullYear()} {brand.name}. Part of TORRE GROUP. All rights reserved.
          </span>
          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "hsl(var(--foreground) / 0.35)" }}>{l.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

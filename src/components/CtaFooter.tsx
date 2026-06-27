"use client";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

const FOOTER_LINKS = [
  { label: "Politika e Privatësisë", href: "#" },
  { label: "Kushtet e Shërbimit", href: "#" },
  { label: "Kontakt", href: "#" },
];

export function CtaFooter({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <footer id="contact" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)] pt-20 md:pt-32 pb-8" style={{ maxWidth: "var(--max)" }}>
        <div
          className="rounded-xl p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden"
          style={{ background: t.surface, border: `1px solid ${t.border}` }}
        >
          {/* Subtle background decoration */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-50"
            style={{ background: t.accent, transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-50"
            style={{ background: t.accent, transform: "translate(-30%, 30%)" }}
          />

          <span
            className="block text-[11px] tracking-[0.18em] uppercase mb-6 relative z-10"
            style={{ color: t.accent }}
          >
            Faza Tjetër
          </span>
          <h2
            className="mb-6 relative z-10"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", color: t.fg, maxWidth: "15ch" }}
          >
            Gati Për Të Filluar?
          </h2>
          <p
            className="text-base leading-relaxed mb-10 relative z-10"
            style={{ color: t.muted, maxWidth: "40ch" }}
          >
            Kontaktoni ekipin e {brand.name} për të diskutuar vizionin tuaj. Ne jemi këtu për t'ju ndihmuar.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-10">
            <a
              href="mailto:contact@torre-ks.com"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-full text-sm font-medium no-underline px-8 py-3 transition-opacity duration-200 hover:opacity-85"
              style={{ background: t.accent, color: t.accentFg }}
            >
              Na Shkruani <ArrowRight size={14} />
            </a>
            <a
              href="tel:+38344123456"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-full text-sm no-underline px-8 py-3 transition-opacity duration-200 hover:opacity-75"
              style={{ border: `1px solid ${t.border}`, color: t.muted }}
            >
              +383 44 123 456
            </a>
          </div>
        </div>

        <div
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: `1px solid ${t.border}` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold tracking-[0.12em] uppercase"
              style={{ color: t.accent }}
            >
              {brand.name.split(" ")[0]}
            </span>
            <span className="text-xs" style={{ color: t.muted }}>
              © {new Date().getFullYear()} TORRE GROUP. Të gjitha të drejtat e rezervuara.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs no-underline transition-opacity duration-200 hover:opacity-60"
                style={{ color: t.muted }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

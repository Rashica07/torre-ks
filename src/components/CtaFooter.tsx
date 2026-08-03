"use client";
import type { Brand } from "@/lib/brands";
import { ContactBlock } from "./ContactBlock";

const FOOTER_LINKS = [
  { label: "Politika e Privatësisë", href: "/politika-e-privatesise" },
  { label: "Kushtet e Shërbimit", href: "/kushtet-e-sherbimit" },
  { label: "Qasshmëria", href: "/deklarata-e-qasshmerise" },
];

export function CtaFooter({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <footer id="contact" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)] pt-20 md:pt-32 pb-8" style={{ maxWidth: "var(--max)" }}>
        <div
          className="rounded-xl p-10 md:p-16 flex flex-col items-center text-center"
          style={{ background: t.surface, border: `1px solid ${t.border}` }}
        >
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", color: t.fg, maxWidth: "18ch" }}
          >
            Na Kontaktoni.
          </h2>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: t.muted, maxWidth: "40ch" }}
          >
            {brand.name} — telefononi, shkruani në WhatsApp, ose lini një mesazh.
          </p>

          <ContactBlock brand={brand} />
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

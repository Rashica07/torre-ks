"use client";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

const FOOTER_LINKS = [
  { label: "Politika e Privatësisë", href: "#" },
  { label: "Kushtet e Shërbimit", href: "#" },
  { label: "Karriera", href: "#" },
];

export function CtaFooter({ brand }: { brand: Brand }) {
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="contact" className="relative" style={{ background: "hsl(var(--bg))" }}>
      <div className="relative py-24 md:py-36">
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
          <span
            className="block text-[11px] tracking-[0.18em] uppercase mb-8"
            style={{ color: accent }}
          >
            Filloni Projektin
          </span>

          <h2
            style={{
              fontSize: "clamp(32px, 5.5vw, 68px)",
              color: "hsl(var(--fg))",
              maxWidth: "18ch",
              marginBottom: "24px",
            }}
          >
            Le të Ndërtojmë Diçka të Jashtëzakonshme.
          </h2>

          <p
            className="text-sm leading-relaxed mb-10"
            style={{
              color: "hsl(var(--muted))",
              maxWidth: "44ch",
            }}
          >
            Çdo projekt fillon me një bisedë. Përgjigjemi brenda 24 orësh.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={`mailto:info@${brand.subdomain}`}
              className="inline-flex items-center gap-2 rounded-full text-sm font-medium no-underline px-7 py-3.5 transition-opacity duration-200 hover:opacity-85"
              style={{
                background: "hsl(var(--fg))",
                color: "hsl(var(--bg))",
              }}
            >
              Filloni Bisedën <ArrowRight size={14} />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full text-sm no-underline px-7 py-3.5 transition-all duration-200 hover:opacity-75"
              style={{
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--muted))",
              }}
            >
              Kthehu te TORRE GROUP
            </a>
          </div>
        </div>
      </div>

      <div
        className="w-full"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px]" style={{ color: "hsl(var(--muted))" }}>
            &copy; {new Date().getFullYear()} {brand.name}. Pjesë e TORRE GROUP. Të gjitha të drejtat e rezervuara.
          </span>
          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] no-underline hover:opacity-75"
                style={{ color: "hsl(var(--muted))" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

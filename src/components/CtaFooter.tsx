"use client";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

const FOOTER_LINKS = [
  { label: "Politika e Privatësisë", href: "#" },
  { label: "Kushtet e Shërbimit", href: "#" },
  { label: "Karriera", href: "#" },
];

export function CtaFooter({ brand }: { brand: Brand }) {
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "hsl(var(--bg))" }}>
      <div className="relative py-36 md:py-52">
        {/* ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 55% at 50% 100%, hsl(${brand.accentHsl} / 0.08) 0%, transparent 65%)`,
          }}
        />
        {/* top border */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, hsl(var(--border)), transparent)` }}
        />

        <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: accent }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
              Filloni Projektin
            </span>
            <span className="w-8 h-px" style={{ background: accent }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 96px)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "hsl(var(--foreground))",
              maxWidth: "16ch",
              marginBottom: "28px",
            }}
          >
            Le të Ndërtojmë Diçka të Jashtëzakonshme.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 17px)",
              color: "hsl(var(--muted-fg))",
              maxWidth: "44ch",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}
          >
            Çdo projekt fillon me një bisedë. Përgjigjemi brenda 24 orësh.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={`mailto:info@${brand.subdomain}`}
              className="inline-flex items-center gap-2 rounded-full font-medium transition-all hover:opacity-85"
              style={{
                background: accent,
                color: "#fff",
                fontFamily: "var(--font-body)",
                padding: "15px 32px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Filloni Bisedën <ArrowUpRight size={16} />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-80"
              style={{
                background: "hsl(var(--bg-alt))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--muted-fg))",
                fontFamily: "var(--font-body)",
                padding: "15px 32px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Kthehu te TORRE GROUP
            </a>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 w-full"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(var(--muted-fg))", letterSpacing: "0.04em" }}>
            &copy; {new Date().getFullYear()} {brand.name}. Pjesë e TORRE GROUP. Të gjitha të drejtat e rezervuara.
          </span>
          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(var(--muted-fg))", textDecoration: "none" }}
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

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";

const EASE = [0.22, 1, 0.36, 1] as const;

// Company history, condensed from the group's own record.
const HISTORIKU = [
  { year: "1950", text: "Fillimet në Stubëll të Vitisë — tri breza mjeshtërie ndërtimi." },
  { year: "Zvicër", text: "Vite pune në tregun zviceran — etika që na udhëheq edhe sot." },
  { year: "2010", text: "Themelohet kompania “Torre” në fushën e ndërtimtarisë." },
  { year: "2020", text: "Investim në ndërtim të lartë: Torre Home 1 & 2 në Ferizaj." },
];

export default function CompanySelector() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div
        className="w-full mx-auto px-[var(--gutter)] flex flex-col items-center"
        style={{ maxWidth: "var(--max)", paddingBlock: "var(--space-9)" }}
      >
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "hsl(var(--muted))", marginBottom: "var(--space-6)" }}
        >
          Torre Group
        </motion.span>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45, ease: EASE }}
          className="text-center"
          style={{ fontSize: "var(--step-5)", color: "hsl(var(--fg))", marginBottom: "var(--space-4)" }}
        >
          Një Grup.
          <br />
          <span style={{ color: "hsl(var(--muted))" }}>Katër Kompani.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center text-step-0"
          style={{
            color: "hsl(var(--muted))",
            maxWidth: "42ch",
            lineHeight: 1.7,
            marginBottom: "var(--space-8)",
          }}
        >
          Zgjidhni një kompani për të eksploruar shërbimet, portofolin dhe
          ekspertizën e tyre.
        </motion.p>

        {/* historiku strip */}
        <motion.ol
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45, ease: EASE }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 list-none"
          style={{
            borderTop: "1px solid hsl(var(--border))",
            paddingTop: "var(--space-5)",
            marginBottom: "var(--space-8)",
          }}
        >
          {HISTORIKU.map((h) => (
            <li key={h.year}>
              <span
                className="block text-[11px] tracking-[0.14em] uppercase mb-1.5"
                style={{ color: "hsl(var(--fg))" }}
              >
                {h.year}
              </span>
              <span className="block text-step--1" style={{ color: "hsl(var(--muted))", lineHeight: 1.6 }}>
                {h.text}
              </span>
            </li>
          ))}
        </motion.ol>

        {/* brand cards — each previews its own vibe: theme colours + hero backdrop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {BRANDS.map((brand, i) => {
            const t = brand.theme;
            return (
              <motion.a
                key={brand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4, ease: EASE }}
                href={brand.externalUrl}
                className="relative overflow-hidden text-left flex flex-col justify-between group no-underline transition-transform duration-base ease-out hover:-translate-y-1"
                style={{
                  padding: "var(--space-6) var(--space-5)",
                  minHeight: "300px",
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  borderRadius: "var(--radius)",
                }}
              >
                {brand.heroImage && (
                  <>
                    <Image
                      src={brand.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]"
                    />
                    {/* Theme-tinted scrim keeps each card's text legible over its image. */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, ${t.bg}e6 20%, ${t.bg}b3 60%, ${t.bg}f0 100%)`,
                      }}
                    />
                  </>
                )}

                <div className="relative">
                  <div className="w-2 h-2 rounded-full" style={{ background: t.accent, marginBottom: "var(--space-6)" }} />
                  <span
                    className="block text-[10px] tracking-[0.15em] uppercase mb-3"
                    style={{ color: t.muted }}
                  >
                    {brand.category}
                  </span>
                  <h2 className="mb-3 text-step-2" style={{ color: t.fg }}>
                    {brand.name}
                  </h2>
                  <p className="text-step--1" style={{ color: t.muted, maxWidth: "28ch", lineHeight: 1.6 }}>
                    {brand.tagline}
                  </p>
                </div>

                <div
                  className="relative flex items-center gap-2 text-step--1 mt-6 transition-all duration-base group-hover:gap-3"
                  style={{ color: t.accent }}
                >
                  Eksploro
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-base group-hover:translate-x-0.5"
                  />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center text-[11px] tracking-wide"
          style={{ color: "hsl(var(--muted))", marginTop: "var(--space-8)" }}
        >
          &copy; {new Date().getFullYear()} Torre Group — torre-ks.com
        </motion.p>
      </div>
    </main>
  );
}

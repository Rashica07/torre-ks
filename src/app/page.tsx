"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";

export default function CompanySelector() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="w-full max-w-[var(--max)] mx-auto px-[var(--gutter)] py-24 flex flex-col items-center">
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.2em] uppercase mb-10"
          style={{ color: "hsl(var(--muted))" }}
        >
          Torre Group
        </motion.span>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-5"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            color: "hsl(var(--fg))",
          }}
        >
          Një Grup.
          <br />
          <span style={{ color: "hsl(var(--muted))" }}>Katër Kompani.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-center mb-20"
          style={{
            fontSize: "clamp(14px, 1vw, 16px)",
            color: "hsl(var(--muted))",
            maxWidth: "42ch",
            lineHeight: 1.7,
          }}
        >
          Zgjidhni një kompani për të eksploruar shërbimet, portofolin dhe
          ekspertizën e tyre.
        </motion.p>

        {/* brand cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px w-full rounded-xl overflow-hidden"
          style={{ border: "1px solid hsl(var(--border))" }}
        >
          {BRANDS.map((brand, i) => (
            <motion.a
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              href={brand.externalUrl}
              className="text-left flex flex-col justify-between group no-underline"
              style={{
                padding: "32px 28px",
                minHeight: "280px",
                background: "hsl(var(--surface))",
                borderRight:
                  i < BRANDS.length - 1
                    ? "1px solid hsl(var(--border))"
                    : undefined,
                cursor: "pointer",
              }}
            >
              <div>
                {/* accent dot */}
                <div
                  className="w-2 h-2 rounded-full mb-8"
                  style={{ background: `hsl(${brand.accentHsl})` }}
                />

                {/* category */}
                <span
                  className="block text-[10px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: "hsl(var(--muted))" }}
                >
                  {brand.category}
                </span>

                {/* name */}
                <h2
                  className="mb-3"
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    color: "hsl(var(--fg))",
                  }}
                >
                  {brand.name}
                </h2>

                {/* desc */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "hsl(var(--muted))",
                    maxWidth: "28ch",
                  }}
                >
                  {brand.tagline}
                </p>
              </div>

              {/* bottom link */}
              <div
                className="flex items-center gap-2 text-sm mt-6 transition-all duration-200 group-hover:gap-3"
                style={{ color: `hsl(${brand.accentHsl})` }}
              >
                Eksploro
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-center text-[11px] tracking-wide"
          style={{ color: "hsl(var(--muted))" }}
        >
          &copy; {new Date().getFullYear()} Torre Group — torre-ks.com
        </motion.p>
      </div>
    </main>
  );
}

"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";

export default function CompanySelector() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(220 10% 86% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(220 10% 86% / 0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      {/* ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 45% at 50% 0%, hsl(200 60% 92% / 0.6) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[var(--gutter)] py-24 flex flex-col items-center">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px" style={{ background: "hsl(220 14% 60%)" }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "hsl(220 14% 50%)",
              textTransform: "uppercase",
            }}
          >
            Torre Group — torre-ks.com
          </span>
          <span className="w-8 h-px" style={{ background: "hsl(220 14% 60%)" }} />
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(42px, 7.5vw, 112px)",
            lineHeight: 0.9,
            letterSpacing: "-0.028em",
            color: "hsl(var(--foreground))",
          }}
        >
          Një Grup.{" "}
          <span style={{ color: "hsl(174 62% 38%)" }}>Katër Kompani.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-20"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.1vw, 17px)",
            color: "hsl(var(--muted-fg))",
            maxWidth: "44ch",
            lineHeight: 1.7,
          }}
        >
          Zgjidhni një kompani për të eksploruar shërbimet, portofolin dhe ekspertizën e tyre.
        </motion.p>

        {/* brand cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={brand.externalUrl}
                className="block group h-full"
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="rounded-2xl relative overflow-hidden h-full flex flex-col"
                  style={{
                    minHeight: "380px",
                    background: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                  whileHover={{ y: -5, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 80% 70% at 50% 30%, hsl(${brand.accentHsl} / 0.06) 0%, transparent 65%)`,
                    }}
                  />
                  {/* hover border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ border: `1px solid hsl(${brand.accentHsl} / 0.35)` }}
                  />

                  <div className="relative z-10 p-7 flex flex-col h-full">
                    {/* accent dot */}
                    <div
                      className="w-2.5 h-2.5 rounded-full mb-8"
                      style={{ background: `hsl(${brand.accentHsl})` }}
                    />

                    {/* category */}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        color: `hsl(${brand.accentHsl})`,
                        marginBottom: "10px",
                        display: "block",
                        textTransform: "uppercase",
                      }}
                    >
                      {brand.category}
                    </span>

                    {/* name */}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 2.2vw, 28px)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.015em",
                        color: "hsl(var(--foreground))",
                        marginBottom: "14px",
                      }}
                    >
                      {brand.name}
                    </h2>

                    {/* desc */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "hsl(var(--muted-fg))",
                        lineHeight: 1.65,
                        marginBottom: "24px",
                        flex: 1,
                      }}
                    >
                      {brand.description}
                    </p>

                    {/* subdomain */}
                    <div
                      className="text-xs mb-5"
                      style={{ color: "hsl(220 10% 60%)", fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
                    >
                      {brand.subdomain}
                    </div>

                    {/* price badge */}
                    <div
                      className="rounded-full px-3 py-1 text-xs font-medium inline-flex self-start mb-6"
                      style={{
                        background: `hsl(${brand.accentHsl} / 0.08)`,
                        color: `hsl(${brand.accentHsl})`,
                        fontFamily: "var(--font-body)",
                        border: `1px solid hsl(${brand.accentHsl} / 0.2)`,
                      }}
                    >
                      {brand.services[0].price}
                    </div>

                    {/* cta */}
                    <div
                      className="inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)" }}
                    >
                      Eksploro
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 text-center"
          style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(220 10% 55%)", letterSpacing: "0.06em" }}
        >
          &copy; {new Date().getFullYear()} TORRE GROUP — torre-ks.com &nbsp;&middot;&nbsp; MAGFA &nbsp;&middot;&nbsp; SWISSTECH &nbsp;&middot;&nbsp; TORRE DI UMBRIA &nbsp;&middot;&nbsp; TORRE HOME
        </motion.p>
      </div>
    </main>
  );
}

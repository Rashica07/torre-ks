"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import Link from "next/link";

export default function CompanySelector() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(20 6% 4%)" }}
    >
      {/* ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 50% at 50% 40%, hsl(38 30% 8%) 0%, transparent 65%)",
        }}
      />
      {/* fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(38 12% 90% / 0.025) 1px, transparent 1px), linear-gradient(90deg, hsl(38 12% 90% / 0.025) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
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
          <span className="w-8 h-px" style={{ background: "hsl(42 52% 62%)" }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "hsl(42 52% 62%)",
              textTransform: "uppercase",
            }}
          >
            Torre Group — torre-ks.com
          </span>
          <span className="w-8 h-px" style={{ background: "hsl(42 52% 62%)" }} />
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
            color: "hsl(38 18% 92%)",
          }}
        >
          One Group.<br />
          <span style={{ color: "hsl(42 52% 62%)" }}>Four Companies.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-20"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.1vw, 17px)",
            color: "hsl(38 8% 62%)",
            maxWidth: "44ch",
            lineHeight: 1.7,
          }}
        >
          Select a company to explore their services, portfolio, and expertise.
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
              <Link href={brand.path} className="block group h-full" style={{ textDecoration: "none" }}>
                <motion.div
                  className="rounded-2xl relative overflow-hidden h-full flex flex-col"
                  style={{
                    minHeight: "380px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 80% 70% at 50% 30%, hsl(${brand.accentHsl} / 0.1) 0%, transparent 65%)`,
                    }}
                  />
                  {/* hover border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ border: `1px solid hsl(${brand.accentHsl} / 0.22)` }}
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
                        color: "hsl(38 18% 92%)",
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
                        color: "hsl(38 8% 55%)",
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
                      style={{ color: "hsl(38 8% 34%)", fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
                    >
                      {brand.subdomain}
                    </div>

                    {/* price badge */}
                    <div
                      className="rounded-full px-3 py-1 text-xs font-medium inline-flex self-start mb-6"
                      style={{
                        background: `hsl(${brand.accentHsl} / 0.1)`,
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
                      Explore
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 text-center"
          style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(38 8% 30%)", letterSpacing: "0.06em" }}
        >
          &copy; {new Date().getFullYear()} TORRE GROUP — torre-ks.com &nbsp;&middot;&nbsp; MAGFA &nbsp;&middot;&nbsp; SWISSTECH &nbsp;&middot;&nbsp; TORRE UMBRIA &nbsp;&middot;&nbsp; TORRE HOME
        </motion.p>
      </div>
    </main>
  );
}

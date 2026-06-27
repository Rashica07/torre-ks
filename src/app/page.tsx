"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import Link from "next/link";

const BG_GRADIENTS: Record<string, string> = {
  magfa:         "radial-gradient(ellipse 80% 70% at 60% 40%, hsl(35 40% 12%) 0%, hsl(240 10% 3%) 65%)",
  swisstech:     "radial-gradient(ellipse 80% 70% at 40% 60%, hsl(200 30% 10%) 0%, hsl(240 10% 3%) 65%)",
  "torre-umbria":"radial-gradient(ellipse 80% 70% at 55% 35%, hsl(25 35% 10%) 0%, hsl(240 10% 3%) 65%)",
  "torre-home":  "radial-gradient(ellipse 80% 70% at 45% 65%, hsl(145 20% 8%) 0%, hsl(240 10% 3%) 65%)",
};

export default function CompanySelector() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(240 10% 3%)" }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(40 30% 90% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(40 30% 90% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(35 40% 12% / 0.5) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[var(--gutter)] py-20 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-8"
            style={{ color: "hsl(35 60% 60%)", fontFamily: "var(--font-body)", letterSpacing: "0.14em" }}
          >
            TORRE GROUP — TORRE-KS.COM
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 108px)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              color: "hsl(var(--foreground))",
              marginBottom: "20px",
            }}
          >
            ONE GROUP.<br />
            <span style={{ color: "hsl(35 60% 60%)" }}>FOUR COMPANIES.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "hsl(var(--foreground) / 0.58)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Select a company to explore their services, portfolio, and expertise.
          </p>
        </motion.div>

        {/* Company cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={brand.path} className="block group h-full">
                <motion.div
                  className="liquid-glass rounded-2xl relative overflow-hidden h-full flex flex-col"
                  style={{ minHeight: "360px" }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  {/* Background gradient per brand */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: BG_GRADIENTS[brand.id] }}
                  />

                  <div className="relative z-10 p-7 flex flex-col h-full">
                    {/* Brand accent dot */}
                    <div
                      className="w-3 h-3 rounded-full mb-8"
                      style={{ background: `hsl(${brand.accentHsl})` }}
                    />

                    {/* Category label */}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        color: `hsl(${brand.accentHsl})`,
                        marginBottom: "10px",
                        display: "block",
                      }}
                    >
                      {brand.category.toUpperCase()}
                    </span>

                    {/* Name */}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 2.2vw, 30px)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.015em",
                        color: "hsl(var(--foreground))",
                        marginBottom: "12px",
                      }}
                    >
                      {brand.name}
                    </h2>

                    {/* Tagline */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "hsl(var(--foreground) / 0.55)",
                        lineHeight: 1.6,
                        marginBottom: "24px",
                        flex: 1,
                      }}
                    >
                      {brand.description}
                    </p>

                    {/* Subdomain */}
                    <div
                      className="text-xs mb-5"
                      style={{ color: "hsl(var(--foreground) / 0.30)", fontFamily: "var(--font-body)" }}
                    >
                      {brand.subdomain}
                    </div>

                    {/* Price range — lowest service price */}
                    <div
                      className="rounded-full px-3 py-1 text-xs font-medium inline-flex self-start mb-5"
                      style={{ background: `hsl(${brand.accentHsl} / 0.12)`, color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)" }}
                    >
                      {brand.services[0].price}
                    </div>

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)" }}
                    >
                      Explore
                      <motion.span
                        className="inline-block"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        <ArrowUpRight size={15} />
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
          style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "hsl(var(--foreground) / 0.28)" }}
        >
          &copy; {new Date().getFullYear()} TORRE GROUP — torre-ks.com &nbsp;·&nbsp; MAGFA &nbsp;·&nbsp; SWISSTECH &nbsp;·&nbsp; TORRE UMBRIA &nbsp;·&nbsp; TORRE HOME
        </motion.p>
      </div>
    </main>
  );
}

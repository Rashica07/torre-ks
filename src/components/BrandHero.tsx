"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import type { Brand } from "@/lib/brands";
import Link from "next/link";

const SIBLINGS: Record<string, { name: string; path: string }[]> = {
  magfa:         [{ name: "SWISSTECH", path: "/swisstech" }, { name: "TORRE DI UMBRIA", path: "/torre-umbria" }, { name: "TORRE HOME", path: "/torre-home" }],
  swisstech:     [{ name: "MAGFA GROUP", path: "/magfa" }, { name: "TORRE DI UMBRIA", path: "/torre-umbria" }, { name: "TORRE HOME", path: "/torre-home" }],
  "torre-umbria":[{ name: "MAGFA GROUP", path: "/magfa" }, { name: "SWISSTECH", path: "/swisstech" }, { name: "TORRE HOME", path: "/torre-home" }],
  "torre-home":  [{ name: "MAGFA GROUP", path: "/magfa" }, { name: "SWISSTECH", path: "/swisstech" }, { name: "TORRE DI UMBRIA", path: "/torre-umbria" }],
};

type Props = { brand: Brand };

export function BrandHero({ brand }: Props) {
  const siblings = SIBLINGS[brand.id] || [];
  const accent = `hsl(${brand.accentHsl})`;
  const accentFaint = `hsl(${brand.accentHsl} / 0.07)`;
  const accentMid = `hsl(${brand.accentHsl} / 0.12)`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: `radial-gradient(ellipse 70% 55% at 70% 45%, ${accentFaint} 0%, transparent 65%)`,
        }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(220 10% 86% / 0.55) 1px, transparent 1px), linear-gradient(90deg, hsl(220 10% 86% / 0.55) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* top border line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(to right, transparent, hsl(var(--border)), transparent)` }} />

      {/* main hero body */}
      <div className="relative z-10 flex-1 flex items-center max-w-[var(--max)] mx-auto w-full px-[var(--gutter)]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 pt-36 pb-24">

          {/* LEFT — headline + cta */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="accent-line" style={{ background: accent }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: accent,
                  textTransform: "uppercase",
                }}
              >
                {brand.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 8.5vw, 128px)",
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
                color: "hsl(var(--foreground))",
                marginBottom: "28px",
                maxWidth: "12ch",
              }}
            >
              {brand.heroHeadline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.1vw, 17px)",
                color: "hsl(var(--muted-fg))",
                lineHeight: 1.7,
                maxWidth: "46ch",
                marginBottom: "40px",
              }}
            >
              {brand.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full font-medium transition-all hover:opacity-85"
                style={{
                  background: accent,
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  padding: "13px 26px",
                  fontSize: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                Shikoni Shërbimet <ArrowUpRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-80"
                style={{
                  background: accentMid,
                  border: `1px solid hsl(${brand.accentHsl} / 0.25)`,
                  color: accent,
                  fontFamily: "var(--font-body)",
                  padding: "13px 26px",
                  fontSize: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                Na Kontaktoni
              </a>
            </motion.div>
          </div>

          {/* RIGHT — stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col justify-center"
          >
            <div
              className="rounded-2xl p-8 flex flex-col gap-0"
              style={{
                background: "hsl(var(--surface))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
              }}
            >
              {brand.stats.map((stat, i) => (
                <div key={stat.label}>
                  {i > 0 && (
                    <div className="h-px my-6" style={{ background: "hsl(var(--border))" }} />
                  )}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px, 3vw, 42px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "hsl(var(--foreground))",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "hsl(var(--muted-fg))",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "hsl(var(--muted-fg))",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Pjesë e TORRE GROUP
                </div>
                <div className="flex flex-col gap-2">
                  {siblings.map((s) => (
                    <Link
                      key={s.path}
                      href={s.path}
                      className="flex items-center gap-2 group"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "hsl(var(--muted-fg))",
                        transition: "color 0.2s",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: `hsl(${brand.accentHsl} / 0.5)` }}
                      />
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center pb-10 gap-2"
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            color: "hsl(var(--muted-fg))",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={13} style={{ color: `hsl(${brand.accentHsl} / 0.5)` }} />
        </motion.div>
      </motion.div>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 fade-b pointer-events-none" />
    </section>
  );
}

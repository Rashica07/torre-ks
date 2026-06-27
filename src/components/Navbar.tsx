"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  brandName: string;
  accentHsl: string;
  links?: { label: string; href: string }[];
};

const DEFAULT_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#pourquoi" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ brandName, accentHsl, links = DEFAULT_LINKS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const accent = `hsl(${accentHsl})`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [links]);

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 z-50 flex justify-between items-center pointer-events-none"
        style={{ top: 0, padding: "0 clamp(20px, 4.2vw, 72px)" }}
      >
        <motion.div
          className="pointer-events-auto flex items-center justify-between w-full"
          animate={{
            paddingTop: scrolled ? "12px" : "20px",
            paddingBottom: scrolled ? "12px" : "20px",
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* brand wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              color: accent,
              letterSpacing: "0.1em",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {brandName.split(" ")[0]}
          </Link>

          {/* center nav pill */}
          <motion.div
            className="hidden md:flex items-center gap-1 rounded-full"
            animate={{
              background: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
              backdropFilter: scrolled ? "blur(40px)" : "blur(0px)",
              border: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(255,255,255,0)",
              paddingLeft: scrolled ? "10px" : "0px",
              paddingRight: scrolled ? "10px" : "0px",
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isActive ? accent : "hsl(var(--foreground) / 0.58)",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: accent }}
                    />
                  )}
                </a>
              );
            })}
          </motion.div>

          {/* right cta */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center rounded-full text-sm transition-opacity hover:opacity-85"
              style={{
                background: accent,
                color: "hsl(20 6% 4%)",
                fontFamily: "var(--font-body)",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Contact
            </a>
            <button
              className="md:hidden p-2 rounded-full"
              style={{ color: "hsl(var(--foreground) / 0.7)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(20,14,10,0.97)", backdropFilter: "blur(24px)" }}
          >
            <button
              className="absolute top-5 right-6"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} />
            </button>
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "hsl(var(--foreground))", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 }}
              className="px-8 py-3 rounded-full font-medium"
              style={{ background: accent, color: "hsl(20 6% 4%)", fontFamily: "var(--font-body)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

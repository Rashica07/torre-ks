"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
        animate={{ top: scrolled ? "12px" : "20px" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="liquid-glass-strong rounded-full flex items-center gap-5 pointer-events-auto"
          animate={{ paddingTop: scrolled ? "8px" : "12px", paddingBottom: scrolled ? "8px" : "12px", paddingLeft: "18px", paddingRight: "18px" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#" style={{ fontFamily: "var(--font-display)", color: `hsl(${accentHsl})`, letterSpacing: "0.12em", fontSize: "13px", fontWeight: 600 }}>
            {brandName.split(" ")[0]}
          </a>
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} className="relative px-3 py-1.5 text-sm transition-colors"
                  style={{ fontFamily: "var(--font-body)", color: isActive ? `hsl(${accentHsl})` : "hsl(var(--foreground) / 0.70)" }}>
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: `hsl(${accentHsl})` }} />
                  )}
                </a>
              );
            })}
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: `hsl(${accentHsl})`, color: "hsl(var(--ink))", fontFamily: "var(--font-body)" }}>
            Contact
          </a>
          <button className="md:hidden p-1.5 rounded-full" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 liquid-glass-strong flex flex-col items-center justify-center gap-8">
            {links.map((link, i) => (
              <motion.a key={link.href} href={link.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} style={{ fontFamily: "var(--font-display)", fontSize: "32px" }}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </motion.a>
            ))}
            <motion.a href="#contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 }}
              className="px-8 py-3 rounded-full font-medium"
              style={{ background: `hsl(${accentHsl})`, color: "hsl(var(--ink))", fontFamily: "var(--font-body)" }}
              onClick={() => setMenuOpen(false)}>
              Contact Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

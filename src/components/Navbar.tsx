import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us",   href: "#pourquoi" },
  { label: "Process",  href: "#process" },
  { label: "FAQ",      href: "#faq" },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        data-scrolled={scrolled}
        className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
        animate={{ top: scrolled ? "12px" : "20px" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="liquid-glass-strong rounded-full px-4 py-2 flex items-center gap-6 pointer-events-auto"
          animate={{
            paddingTop:    scrolled ? "6px"  : "10px",
            paddingBottom: scrolled ? "6px"  : "10px",
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <a href="#" className="font-display font-semibold text-sm tracking-widest text-foreground/90 shrink-0" style={{ fontFamily: "var(--font-display)" }}>
            MAGFA
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-body transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.75)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              fontFamily: "var(--font-body)",
            }}
          >
            Contact
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-full"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 liquid-glass-strong flex flex-col items-center justify-center gap-8"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-3xl tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LINKS.length * 0.07 }}
              className="px-8 py-3 rounded-full font-medium"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
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

"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { BrandTheme } from "@/lib/brands";

type NavbarProps = {
  brandName: string;
  accentHsl: string;
  theme?: BrandTheme;
  links?: { label: string; href: string }[];
};

const DEFAULT_LINKS = [
  { label: "Shërbimet", href: "#services" },
  { label: "Pse Ne", href: "#pourquoi" },
  { label: "Procesi", href: "#process" },
  { label: "Pyetje", href: "#faq" },
];

export function Navbar({
  brandName,
  accentHsl,
  theme,
  links = DEFAULT_LINKS,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = theme?.bg || "hsl(var(--bg))";
  const fg = theme?.fg || "hsl(var(--fg))";
  const muted = theme?.muted || "hsl(var(--muted))";
  const border = theme?.border || "hsl(var(--border))";
  const navBg = theme?.navBg || "hsla(0, 0%, 98%, 0.92)";
  const accent = theme?.accent || `hsl(${accentHsl})`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? navBg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
        }}
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{
            maxWidth: "var(--max)",
            padding: "0 var(--gutter)",
            height: scrolled ? "56px" : "64px",
            transition: "height 0.3s ease",
          }}
        >
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.12em] uppercase no-underline transition-colors duration-200"
            style={{ color: accent }}
          >
            {brandName.split(" ")[0]}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] no-underline transition-opacity duration-200 hover:opacity-60"
                style={{ color: muted }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex text-[13px] font-medium no-underline px-5 py-2 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: fg, color: bg }}
            >
              Kontakt
            </a>
            <button
              className="md:hidden p-2"
              style={{ color: fg }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Hap menunë"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu — pure CSS transition, no framer-motion */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300"
        style={{
          background: bg,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          className="absolute top-5 right-6"
          style={{ color: muted }}
          onClick={() => setMenuOpen(false)}
        >
          <X size={20} />
        </button>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-3xl no-underline"
            style={{ color: fg }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="px-8 py-3 rounded-full font-medium no-underline"
          style={{ background: fg, color: bg }}
          onClick={() => setMenuOpen(false)}
        >
          Na Kontaktoni
        </a>
      </div>
    </>
  );
}

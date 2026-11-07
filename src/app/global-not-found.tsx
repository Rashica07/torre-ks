import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DEFAULT_LANG } from "@/lib/i18n";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/sections/NotFoundContent";
import "@/styles/tokens.css";
import "@/styles/tailwind.css";
import "@/styles/motion.css";

/**
 * Unknown URLs. The root layout lives under [lang], so a plain not-found.tsx cannot supply <html>; Next 16's
 * global-not-found (experimental.globalNotFound) renders a complete document with a real 404 status, server-side.
 */
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = { title: { absolute: "404 — TORRE Group" }, robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  const lang = DEFAULT_LANG;
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SkipLink lang={lang} />
        <Header lang={lang} />
        <NotFoundContent />
        <Footer lang={lang} />
      </body>
    </html>
  );
}

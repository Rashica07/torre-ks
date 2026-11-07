import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LANGS, isLang } from "@/lib/i18n";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/styles/tokens.css";
import "@/styles/tailwind.css";
import "@/styles/motion.css";

// One superfamily (D-011): Geist + Geist Mono. latin + latin-ext cover Albanian (ë, ç) and English.
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f3ef" };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SkipLink lang={lang} />
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
        <SpeedInsights />
      </body>
    </html>
  );
}

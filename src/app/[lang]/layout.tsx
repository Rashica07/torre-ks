import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LANGS, isLang } from "@/lib/i18n";
import { SkipLink } from "@/components/SkipLink";
import { Rail } from "@/components/Rail";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/fasada.css";
import "@/styles/motion.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#15171a" };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang}>
      <head>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/anton-latin-400.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/instrument-sans-latin-wght.woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SkipLink lang={lang} />
        <Rail lang={lang} />
        <TopBar lang={lang} />
        <div className="page">{children}</div>
        <Footer lang={lang} />
        <SpeedInsights />
      </body>
    </html>
  );
}

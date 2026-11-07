import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_LANG } from "@/lib/i18n";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import { WHATSAPP_HREF, company } from "@/content/company";
import { pages } from "@/content/pages";
import { SkipLink } from "@/components/SkipLink";
import { Rail } from "@/components/Rail";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/fasada.css";
import "@/styles/motion.css";

/**
 * Unknown URLs. The root layout lives under [lang], so a plain not-found.tsx cannot supply <html>; Next 16's
 * global-not-found (experimental.globalNotFound) renders a complete document with a real 404 status, server-side.
 * "Ky kat nuk ekziston": the floors are the way back.
 */
export const metadata: Metadata = { title: { absolute: "404 — TORRE Group" }, robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  const lang = DEFAULT_LANG;
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/icons/torre-apple.png" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/anton-latin-400.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/instrument-sans-latin-wght.woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SkipLink lang={lang} />
        <Rail lang={lang} />
        <TopBar lang={lang} />
        <div className="page">
          <main id="main" data-surface="paper">
            <div className="wrap opener">
              <p className="cap muted">404</p>
              <h1 style={{ margin: "14px 0 24px" }}>{pages.nf.h1[lang]}</h1>
              <p className="lead">{pages.nf.body[lang]}</p>
              <ul className="menu__links" style={{ marginTop: 40, maxWidth: 720 }}>
                {DIVISION_IDS.map((id, i) => (
                  <li key={id}>
                    <Link href={pathFor(id, lang)}><span className="n">{i + 1}</span>{getRoute(id).label[lang]}</Link>
                  </li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: 40 }}>
                <Button href={pathFor("home", lang)}>{getRoute("home").label[lang]}</Button>
                <Button href={WHATSAPP_HREF} external variant="line" srExtra={pages.common.newTab[lang]}>WhatsApp {company.phone.value}</Button>
              </div>
            </div>
          </main>
        </div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}

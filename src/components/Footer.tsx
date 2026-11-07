import Link from "next/link";
import { DIVISION_IDS, getRoute, hasLang, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/i18n";
import { PHONE_HREF, WHATSAPP_HREF, company } from "@/content/company";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { Wordmark } from "./Wordmark";

const LEGAL = ["privacy", "terms", "accessibility"] as const;

/** Docs/design.md §5.8. Dark band; contact in the same place on every page (WCAG 3.2.6). */
export function Footer({ lang }: { lang: Lang }) {
  const factory = getDivision("swisstech").address;
  const year = new Date().getFullYear();
  const heading = "label mb-4 block";
  const link = "inline-flex min-h-[44px] items-center no-underline hover:underline underline-offset-4";

  return (
    <footer data-surface="dark" className="bg-bg text-text">
      <div className="container-page py-16 md:py-24">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Wordmark />
            <p className="muted small mt-6">{publish(company.description)[lang]}</p>
          </div>

          <nav aria-label={ui.footerCompanies[lang]} className="col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-6">
            <h2 className={heading} style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>{ui.footerCompanies[lang]}</h2>
            <ul>
              {DIVISION_IDS.map((id) => (
                <li key={id}>
                  <Link href={pathFor(id, lang)} className={link}>
                    {getRoute(id).label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-4 lg:col-span-4 lg:col-start-9">
            <h2 className={heading} style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>{ui.footerContact[lang]}</h2>
            <ul>
              <li>
                <a href={PHONE_HREF} className={link}>{company.phone.value}</a>
              </li>
              <li>
                <a href={WHATSAPP_HREF} className={link} target="_blank" rel="noopener noreferrer">{ui.whatsapp[lang]}</a>
              </li>
              {factory ? (
                <li className="muted small mt-3">
                  {ui.factoryHeading[lang]} SWISSTECH: {publish(factory)}
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="muted small">
            © {year} TORRE Group. {ui.rights[lang]}
          </p>
          <nav aria-label={ui.footerLegal[lang]}>
            <ul className="flex flex-wrap gap-x-6">
              {LEGAL.map((id) => (
                <li key={id}>
                  <Link href={pathFor(id, "sq")} hrefLang="sq" className={`${link} small`}>
                    {getRoute(id).label[lang]}
                    {lang === "en" && !hasLang(id, "en") ? ` ${ui.legalSqOnly.en}` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

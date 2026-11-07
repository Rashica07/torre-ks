import Link from "next/link";
import { DIVISION_IDS, getRoute, hasLang, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/i18n";
import { PHONE_HREF, WHATSAPP_HREF, company } from "@/content/company";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";

const LEGAL = ["privacy", "terms", "accessibility"] as const;

/** Drawing title block (docs/design.md §5.10). Contact sits in the same cell on every page (WCAG 3.2.6). */
export function Footer({ lang }: { lang: Lang }) {
  const factory = getDivision("swisstech").address;
  return (
    <footer className="footer" data-surface="ink">
      <dl className="footer__tb">
        <div>
          <dt className="cap">TORRE Group</dt>
          <dd>{publish(company.description)[lang]}</dd>
        </div>
        <div>
          <dt className="cap">{ui.footerCompanies[lang]}</dt>
          <dd>
            <nav aria-label={ui.footerCompanies[lang]}>
              <ul>
                {DIVISION_IDS.map((id) => (
                  <li key={id}><Link href={pathFor(id, lang)}>{getRoute(id).label[lang]}</Link></li>
                ))}
                <li><Link href={pathFor("about", lang)}>{getRoute("about").label[lang]}</Link></li>
              </ul>
            </nav>
          </dd>
        </div>
        <div>
          <dt className="cap">{ui.footerContact[lang]}</dt>
          <dd>
            <ul>
              <li><a href={PHONE_HREF}>{company.phone.value}</a></li>
              <li><a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{ui.whatsapp[lang]}<span className="sr-only"> ({lang === "sq" ? "hapet në dritare të re" : "opens in a new tab"})</span></a></li>
              <li><Link href={pathFor("contact", lang)}>{getRoute("contact").label[lang]}</Link></li>
            </ul>
          </dd>
        </div>
        <div>
          <dt className="cap">{ui.factoryHeading[lang]} SWISSTECH</dt>
          <dd>{factory ? publish(factory) : null}</dd>
        </div>
        <div>
          <dt className="cap">{ui.footerLegal[lang]}</dt>
          <dd>
            <nav aria-label={ui.footerLegal[lang]}>
              <ul>
                {LEGAL.map((id) => (
                  <li key={id}>
                    <Link href={pathFor(id, "sq")} hrefLang="sq">
                      {getRoute(id).label[lang]}
                      {lang === "en" && !hasLang(id, "en") ? ` ${ui.legalSqOnly.en}` : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </dd>
        </div>
      </dl>
      <svg className="footer__ghost" viewBox="0 0 1312 470" aria-hidden="true" focusable="false">
        <text x="0" y="462" fontFamily="Anton, Impact, sans-serif" fontSize="530" textLength="1312" lengthAdjust="spacing" fill="#23262a">TORRE</text>
      </svg>
      <p className="footer__fine">
        <span>© {new Date().getFullYear()} TORRE Group. {ui.rights[lang]}</span>
        <span>Ferizaj, Kosovë</span>
      </p>
    </footer>
  );
}

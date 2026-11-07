import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { getRoute, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { PHONE_HREF, company } from "@/content/company";
import { CompaniesMenu } from "./CompaniesMenu";
import { HeaderBorder } from "./HeaderBorder";
import { IconPhone } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/** Docs/design.md §5.1. Sticky, solid, contact always one step away (phone at every width). */
export function Header({ lang }: { lang: Lang }) {
  return (
    <header id="site-header" className="site-header sticky top-0 z-50 bg-bg" data-scrolled="false">
      <HeaderBorder headerId="site-header" />
      <div className="container-page flex items-center justify-between gap-4" style={{ height: "var(--header-h)" }}>
        <Link href={pathFor("home", lang)} className="inline-flex min-h-[44px] items-center no-underline">
          <Wordmark />
        </Link>

        <nav aria-label={ui.navPrimary[lang]} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            <CompaniesMenu lang={lang} />
            <li>
              <Link href={pathFor("contact", lang)} className="inline-flex min-h-[44px] items-center text-[0.9375rem] no-underline hover:underline underline-offset-4">
                {getRoute("contact").label[lang]}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1 lg:gap-4">
          <a href={PHONE_HREF} className="hidden min-h-[44px] items-center text-[0.9375rem] no-underline hover:underline underline-offset-4 xl:inline-flex">
            {company.phone.value}
          </a>
          <a href={PHONE_HREF} aria-label={`${ui.callUs[lang]} ${company.phone.value}`} className="inline-flex h-11 w-11 items-center justify-center xl:hidden">
            <IconPhone />
          </a>
          <div className="hidden lg:block">
            <LanguageSwitcher lang={lang} />
          </div>
          <Link href={pathFor("contact", lang)} className="btn btn-primary hidden lg:inline-flex">
            {ui.contactCta[lang]}
          </Link>
          <MobileNav lang={lang} />
        </div>
      </div>
    </header>
  );
}

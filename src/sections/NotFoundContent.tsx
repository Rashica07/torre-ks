import Link from "next/link";
import { DEFAULT_LANG } from "@/lib/i18n";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";

/** 404 body (Albanian — unknown URLs are not language-scoped; see src/app/global-not-found.tsx). */
export function NotFoundContent() {
  const lang = DEFAULT_LANG;
  return (
    <main id="main" className="container-page pt-16 md:pt-24 pb-[var(--section-space)]">
      <p className="label mb-6">404</p>
      <h1 className="max-w-[14ch]">{ui.notFoundTitle[lang]}</h1>
      <p className="lead mt-8">{ui.notFoundBody[lang]}</p>
      <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
        {DIVISION_IDS.map((id) => (
          <li key={id}>
            <Link href={pathFor(id, lang)} className="inline-flex min-h-[44px] items-center text-[1.125rem] font-medium no-underline hover:underline underline-offset-4">
              {getRoute(id).label[lang]}
            </Link>
          </li>
        ))}
        <li>
          <Link href={pathFor("contact", lang)} className="btn btn-primary">
            {ui.contactCta[lang]}
          </Link>
        </li>
      </ul>
    </main>
  );
}

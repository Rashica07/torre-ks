"use client";
import Link from "next/link";
import { DEFAULT_LANG, ENGLISH_APPROVED, LANGS, type Lang } from "@/lib/i18n";
import { hasLang, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { useCurrentRoute } from "./usePublicRoute";

/** Real links to the equivalent page. Hidden until English is approved (D-020). */
export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const current = useCurrentRoute();
  if (!ENGLISH_APPROVED) return null;
  const id = current?.id ?? "home";
  return (
    <ul className="flex items-center gap-1" aria-label={ui.language[lang]}>
      {LANGS.map((l) => {
        const available = hasLang(id, l) || l === DEFAULT_LANG;
        const href = pathFor(id, l);
        return (
          <li key={l}>
            {available ? (
              <Link
                href={href}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-[0.75rem] uppercase tracking-[0.12em] no-underline ${l === lang ? "font-semibold underline underline-offset-4" : "text-muted hover:text-text"}`}
              >
                {l}
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

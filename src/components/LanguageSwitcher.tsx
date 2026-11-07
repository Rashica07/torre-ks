"use client";
import Link from "next/link";
import { DEFAULT_LANG, ENGLISH_APPROVED, LANGS, type Lang } from "@/lib/i18n";
import { hasLang, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { useCurrentRoute } from "./usePublicRoute";

/** Real links to the equivalent page. Hidden until the English translation is approved (D-020). */
export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const current = useCurrentRoute();
  if (!ENGLISH_APPROVED) return null;
  const id = current?.id ?? "home";
  return (
    <ul aria-label={ui.language[lang]} style={{ display: "flex", gap: 16, listStyle: "none", margin: 0, padding: 0 }}>
      {LANGS.map((l) => (
        <li key={l}>
          {hasLang(id, l) || l === DEFAULT_LANG ? (
            <Link href={pathFor(id, l)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined} className="cap" style={{ display: "inline-flex", minHeight: 44, alignItems: "center", textDecoration: l === lang ? "underline" : "none", textUnderlineOffset: 6 }}>
              {l}
            </Link>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

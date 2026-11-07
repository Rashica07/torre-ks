"use client";
import Link from "next/link";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import type { Lang } from "@/lib/i18n";
import { useCurrentRoute } from "./usePublicRoute";

/** Floor rail (≥ 1280 px): G = group, 1–4 = the four companies. Real links; visible numeral ⊂ accessible name (WCAG 2.5.3). */
export function Rail({ lang }: { lang: Lang }) {
  const current = useCurrentRoute();
  return (
    <nav className="rail" aria-label={lang === "sq" ? "Katet" : "Floors"}>
      <span className="rail__vt rot" aria-hidden="true">TORRE GROUP</span>
      <ol>
        <li>
          <Link href={pathFor("home", lang)} aria-label={`G — ${getRoute("home").label[lang]}`} aria-current={current?.id === "home" ? "page" : undefined}>
            G
          </Link>
        </li>
        {DIVISION_IDS.map((id, i) => (
          <li key={id}>
            <Link href={pathFor(id, lang)} aria-label={`${i + 1} — ${getRoute(id).label[lang]}`} aria-current={current?.id === id ? "page" : undefined}>
              {i + 1}
            </Link>
          </li>
        ))}
      </ol>
      <span className="rail__vt rot" aria-hidden="true">1981</span>
    </nav>
  );
}

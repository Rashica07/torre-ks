import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { getRoute, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { divisions } from "@/content/divisions";
import { publish } from "@/content/types";
import { IconArrow } from "@/components/Icons";

/**
 * Division index (docs/design.md §5.4): four full-width ruled rows, one link per row. Each row carries its
 * company's accent as a small marker only (group pages never mix company colours otherwise).
 */
export function DivisionIndex({ lang }: { lang: Lang }) {
  return (
    <ol className="border-t border-border">
      {divisions.map((d, i) => {
        const name = getRoute(d.id).label[lang];
        const summary = publish(d.summary)[lang];
        return (
          <li key={d.id} className="border-b border-border">
            <Link
              href={pathFor(d.id, lang)}
              data-division={d.id}
              className="division-row grid-12 items-center gap-y-3 px-0 py-8 no-underline md:py-10"
            >
              <span aria-hidden="true" className="row-muted col-span-1 font-mono text-[0.75rem] tracking-[0.12em] text-muted md:pl-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-3 flex items-center gap-4 md:col-span-7 lg:col-span-4">
                <span aria-hidden="true" className="inline-block h-3 w-3 shrink-0 bg-accent" />
                <span className="text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.025em]">{name}</span>
              </span>
              <span className="row-muted col-span-4 text-muted md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-6">
                <span className="small block">{d.category[lang]}</span>
                <span className="mt-1 block max-w-[46ch]">{summary}</span>
              </span>
              <span className="col-span-4 flex items-center gap-2 text-[0.9375rem] font-medium md:col-span-2 md:col-start-7 md:justify-end lg:col-span-2 lg:col-start-11 lg:pr-2">
                {ui.seeMore[lang]} <IconArrow />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

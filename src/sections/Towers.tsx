import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { DIVISION_IDS, pathFor } from "@/lib/i18n/routes";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { IconArrowUR } from "@/components/Icons";

/** Four full-height towers, one per company, each in its own plane colour. Real links; hover/focus widens a tower. */
export function Towers({ lang, id, title, hint }: { lang: Lang; id: string; title: string; hint?: string }) {
  return (
    <section className="towers" data-surface="ink" aria-labelledby={id}>
      <div className="wrap towers__head">
        {hint ? <p className="cap muted">{hint}</p> : null}
        <h2 id={id} style={{ marginTop: 12 }}>{title}</h2>
      </div>
      <div className="towers__row">
        {DIVISION_IDS.map((did, i) => {
          const d = getDivision(did);
          return (
            <Link key={did} href={pathFor(did, lang)} className="tower" data-division={did} data-surface="plane">
              <span className="tower__num" aria-hidden="true">{i + 1}</span>
              <span className="tower__arrow" aria-hidden="true"><IconArrowUR /></span>
              <span>
                <span className="tower__name">{d.name}</span>
                <span className="tower__text">
                  <b>{d.category[lang]}</b>
                  {publish(d.summary)[lang]}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

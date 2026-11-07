import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { DIVISION_IDS, getRoute, pathFor, type DivisionId } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { ContactBand } from "./ContactBand";
import { Reveal } from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";

const MAPS = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/**
 * Milestone 1 skeleton for a company page: its own accent and base surface (D-019) around verified facts only.
 * The distinct per-company compositions (docs/design.md §7) arrive in Milestone 3.
 */
export function DivisionPage({ id, lang }: { id: DivisionId; lang: Lang }) {
  const d = getDivision(id);
  const name = getRoute(id).label[lang];
  const others = DIVISION_IDS.filter((x) => x !== id);
  const num = String(DIVISION_IDS.indexOf(id) + 1).padStart(2, "0");

  return (
    <>
      <main id="main" data-division={id} {...(d.surface === "dark" ? { "data-surface": "dark" } : {})} className="bg-bg text-text">
        <div className="container-page section-space">
          <p className="label mb-6">
            <span className="text-accent">{num}</span> — {d.category[lang]}
          </p>
          <h1 className="max-w-[16ch]">{name}</h1>
          <p className="lead mt-8 max-w-[34ch]">{publish(d.summary)[lang]}</p>
          <div className="mt-10">
            <Link href={pathFor("contact", lang)} className="btn btn-primary">
              {ui.contactCta[lang]} <IconArrow />
            </Link>
          </div>
        </div>

        <div className="container-page pb-[var(--section-space)]">
          <Reveal>
            <section aria-labelledby="services-title" className="grid-12 gap-y-6 border-t border-border pt-10">
              <h2 id="services-title" className="label col-span-4 md:col-span-8 lg:col-span-3" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>
                {ui.servicesHeading[lang]}
              </h2>
              <ul className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
                {d.services.map((s) => (
                  <li key={publish(s)[lang]} className="border-b border-border py-4 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium leading-tight tracking-[-0.01em]">
                    {publish(s)[lang]}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {d.areas ? (
            <Reveal>
              <section aria-labelledby="areas-title" className="grid-12 gap-y-6 pt-12">
                <h2 id="areas-title" className="label col-span-4 md:col-span-8 lg:col-span-3" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>
                  {ui.whereHeading[lang]}
                </h2>
                <ul className="col-span-4 flex flex-wrap gap-x-8 gap-y-2 text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] md:col-span-8 lg:col-span-8 lg:col-start-5">
                  {publish(d.areas).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {d.address ? (
            <Reveal>
              <section aria-labelledby="address-title" className="grid-12 gap-y-4 pt-12">
                <h2 id="address-title" className="label col-span-4 md:col-span-8 lg:col-span-3" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>
                  {id === "swisstech" ? ui.factoryHeading[lang] : lang === "sq" ? "Adresa" : "Address"}
                </h2>
                <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
                  <address className="text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] not-italic">{publish(d.address)}</address>
                  <a href={MAPS(publish(d.address))} className="text-link mt-3 inline-block" target="_blank" rel="noopener noreferrer">
                    {ui.openOnMap[lang]}
                    <span className="sr-only-text"> ({lang === "sq" ? "hapet në dritare të re" : "opens in a new tab"})</span>
                  </a>
                </div>
              </section>
            </Reveal>
          ) : null}
        </div>

        <ContactBand lang={lang} />

        <nav aria-label={ui.otherCompanies[lang]} className="container-page py-12">
          <h2 className="label mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>{ui.otherCompanies[lang]}</h2>
          <ul className="flex flex-wrap gap-x-8">
            {others.map((o) => (
              <li key={o}>
                <Link href={pathFor(o, lang)} className="inline-flex min-h-[44px] items-center text-[1.125rem] font-medium no-underline hover:underline underline-offset-4">
                  {getRoute(o).label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}

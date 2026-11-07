import type { Lang } from "@/lib/i18n";
import { pages } from "@/content/pages";
import { ContactPanel } from "./ContactPanel";
import { Reveal } from "@/components/Reveal";

/** Closing contact section (dark band) — docs/design.md §6 #08. */
export function ContactBand({ lang }: { lang: Lang }) {
  return (
    <section data-surface="dark" aria-labelledby="contact-band-title" className="bg-bg text-text">
      <div className="container-page section-space">
        <Reveal>
          <div className="grid-12 gap-y-8">
            <h2 id="contact-band-title" className="col-span-4 md:col-span-8 lg:col-span-7">
              {pages.home.contactHeading[lang]}
            </h2>
            <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="lead muted mb-8">{pages.home.contactBody[lang]}</p>
              <ContactPanel lang={lang} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

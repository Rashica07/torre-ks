import type { Lang } from "@/lib/i18n";
import { WHATSAPP_HREF, company } from "@/content/company";
import { pages } from "@/content/pages";
import { ui } from "@/lib/i18n/dictionary";
import { Button } from "@/components/Button";

/** The one bronze signal plane of a page: a call to act. Phone and WhatsApp are verified (corroborated) contact. */
export function ContactPlane({ lang, title, body }: { lang: Lang; title: string; body?: string }) {
  return (
    <section className="contact section" data-surface="bronze" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="cap" style={{ marginBottom: 16 }}>{ui.footerContact[lang]}</p>
        <h2 id="contact-title">{title}</h2>
        {body ? <p className="lead" style={{ marginTop: 20, maxWidth: "36ch" }}>{body}</p> : null}
        <a href={WHATSAPP_HREF} className="contact__tel" target="_blank" rel="noopener noreferrer">
          <span className="sr-only">{ui.whatsapp[lang]} </span>
          {company.phone.value}
          <span className="sr-only"> ({pages.common.newTab[lang]})</span>
        </a>
        <div className="btn-row" style={{ marginTop: 32 }}>
          <Button href={WHATSAPP_HREF} external srExtra={pages.common.newTab[lang]}>{ui.whatsapp[lang]}</Button>
        </div>
      </div>
    </section>
  );
}

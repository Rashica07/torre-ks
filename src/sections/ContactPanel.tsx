import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n/dictionary";
import { PHONE_HREF, WHATSAPP_HREF, company } from "@/content/company";
import { IconPhone } from "@/components/Icons";

/** Phone + WhatsApp: the two contact paths that work today (the enquiry form arrives in Milestone 4). */
export function ContactPanel({ lang, align = "start" }: { lang: Lang; align?: "start" | "center" }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${align === "center" ? "justify-center" : ""}`}>
      <a href={PHONE_HREF} className="btn btn-primary">
        <IconPhone />
        <span>
          <span className="sr-only-text">{ui.callUs[lang]} </span>
          {company.phone.value}
        </span>
      </a>
      <a href={WHATSAPP_HREF} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
        {ui.whatsapp[lang]}
        <span className="sr-only-text"> ({lang === "sq" ? "hapet në dritare të re" : "opens in a new tab"})</span>
      </a>
    </div>
  );
}

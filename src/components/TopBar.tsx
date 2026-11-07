import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { WHATSAPP_HREF } from "@/content/company";
import { pages } from "@/content/pages";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { IconWhatsApp } from "./Icons";
import { MenuControl } from "./MenuControl";

/** Top bar: a home chip that scrolls away, plus a fixed phone + MENU cluster so contact is always one tap away. */
export function TopBar({ lang }: { lang: Lang }) {
  const factory = getDivision("swisstech").address;
  return (
    <header className="topbar">
      <Link href={pathFor("home", lang)} className="chip topbar__home">
        TORRE Group
      </Link>
      <div className="topbar__cluster">
        <a href={WHATSAPP_HREF} className="chip chip--icon" target="_blank" rel="noopener noreferrer" aria-label={`${ui.whatsapp[lang]} (${pages.common.newTab[lang]})`}>
          <IconWhatsApp />
        </a>
        <MenuControl lang={lang} factory={factory ? publish(factory) : undefined} />
      </div>
    </header>
  );
}

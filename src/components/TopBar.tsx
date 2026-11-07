import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { PHONE_HREF, company } from "@/content/company";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { IconPhone } from "./Icons";
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
        <a href={PHONE_HREF} className="chip chip--icon" aria-label={`${ui.callUs[lang]} ${company.phone.value}`}>
          <IconPhone />
        </a>
        <MenuControl lang={lang} factory={factory ? publish(factory) : undefined} />
      </div>
    </header>
  );
}

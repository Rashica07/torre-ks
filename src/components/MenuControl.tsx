"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import type { Lang } from "@/lib/i18n";
import { WHATSAPP_HREF, company } from "@/content/company";
import { pages } from "@/content/pages";
import { ui } from "@/lib/i18n/dictionary";
import { IconClose } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCurrentRoute } from "./usePublicRoute";

/**
 * MENU pill + full-screen overlay on a native <dialog> opened with showModal(): the browser supplies the focus trap,
 * inert background, Esc to close and focus return (docs/design.md §5.3).
 */
export function MenuControl({ lang, factory }: { lang: Lang; factory?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const current = useCurrentRoute();
  const close = () => ref.current?.close();

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("click", onClick);
    return () => dlg.removeEventListener("click", onClick);
  }, []);

  const label = lang === "sq" ? "Menu" : "Menu";
  return (
    <>
      <button type="button" className="chip" aria-haspopup="dialog" onClick={() => ref.current?.showModal()}>
        {label}
      </button>
      <dialog ref={ref} className="menu" data-surface="ink" aria-label={label}>
        <div className="menu__inner">
          <div className="menu__top">
            <span className="cap muted">{pages.common.place[lang]}</span>
            <button type="button" className="chip" onClick={close}>
              <IconClose size={16} /> {ui.closeMenu[lang]}
            </button>
          </div>
          <div className="menu__grid">
            <nav aria-label={ui.navPrimary[lang]}>
              <ul className="menu__links">
                <li>
                  <Link href={pathFor("home", lang)} onClick={close} aria-current={current?.id === "home" ? "page" : undefined}>
                    <span className="n">G</span>
                    {getRoute("home").label[lang]}
                  </Link>
                </li>
                {DIVISION_IDS.map((id, i) => (
                  <li key={id}>
                    <Link href={pathFor(id, lang)} onClick={close} aria-current={current?.id === id ? "page" : undefined}>
                      <span className="n">{i + 1}</span>
                      {getRoute(id).label[lang]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={pathFor("about", lang)} onClick={close} aria-current={current?.id === "about" ? "page" : undefined}>
                    <span className="n" aria-hidden="true">→</span>
                    {getRoute("about").label[lang]}
                  </Link>
                </li>
                <li>
                  <Link href={pathFor("contact", lang)} onClick={close} aria-current={current?.id === "contact" ? "page" : undefined}>
                    <span className="n" aria-hidden="true">→</span>
                    {getRoute("contact").label[lang]}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="menu__side">
              <a href={WHATSAPP_HREF} className="menu__tel" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">{ui.whatsapp[lang]} </span>
                {company.phone.value}
                <span className="sr-only"> ({pages.common.newTab[lang]})</span>
              </a>
              <p className="cap muted" style={{ margin: 0 }}>{ui.whatsapp[lang]}</p>
              {factory ? <p className="muted small" style={{ margin: 0 }}>{ui.factoryHeading[lang]} SWISSTECH — {factory}</p> : null}
              <Link href={pathFor("companies", lang)} onClick={close} className="link">
                {getRoute("companies").label[lang]}
              </Link>
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

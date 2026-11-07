"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/i18n";
import { PHONE_HREF, WHATSAPP_HREF, company } from "@/content/company";
import { IconClose, IconMenu } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCurrentRoute } from "./usePublicRoute";

/**
 * Mobile navigation sheet on a native <dialog> opened with showModal(): the browser provides the focus trap,
 * inert background, Esc to close and focus return (docs/design.md §5.1, docs/accessibility.md §2).
 */
export function MobileNav({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDialogElement>(null);
  const current = useCurrentRoute();
  const close = () => ref.current?.close();

  // Click on the backdrop (the dialog element itself, outside the content) closes the sheet.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("click", onClick);
    return () => dlg.removeEventListener("click", onClick);
  }, []);

  const item = "flex min-h-[56px] items-center border-b border-border text-[1.25rem] font-medium no-underline";

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
        aria-label={ui.openMenu[lang]}
      >
        <IconMenu />
      </button>
      <dialog
        ref={ref}
        aria-label={ui.openMenu[lang]}
        className="nav-sheet m-0 h-[100dvh] max-h-none w-full max-w-none bg-bg p-0 text-text"
      >
        <div className="container-page flex h-full flex-col pb-8">
          <div className="flex items-center justify-between" style={{ height: "var(--header-h)" }}>
            <span className="label">TORRE Group</span>
            <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center" aria-label={ui.closeMenu[lang]}>
              <IconClose />
            </button>
          </div>
          <nav aria-label={ui.navPrimary[lang]} className="flex-1 overflow-y-auto">
            <ul>
              <li>
                <Link href={pathFor("home", lang)} onClick={close} className={item} aria-current={current?.id === "home" ? "page" : undefined}>
                  {getRoute("home").label[lang]}
                </Link>
              </li>
              <li>
                <Link href={pathFor("companies", lang)} onClick={close} className={item} aria-current={current?.id === "companies" ? "page" : undefined}>
                  {getRoute("companies").label[lang]}
                </Link>
                <ul className="pb-2 pl-5">
                  {DIVISION_IDS.map((id) => (
                    <li key={id}>
                      <Link
                        href={pathFor(id, lang)}
                        onClick={close}
                        aria-current={current?.id === id ? "page" : undefined}
                        className="flex min-h-[48px] items-center text-[1.0625rem] text-muted no-underline"
                      >
                        {getRoute(id).label[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href={pathFor("contact", lang)} onClick={close} className={item} aria-current={current?.id === "contact" ? "page" : undefined}>
                  {getRoute("contact").label[lang]}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-6 grid gap-3">
            <a href={PHONE_HREF} className="btn btn-primary w-full">
              {ui.callUs[lang]} {company.phone.value}
            </a>
            <a href={WHATSAPP_HREF} className="btn btn-secondary w-full" rel="noopener noreferrer" target="_blank">
              {ui.whatsapp[lang]}
            </a>
            <div className="flex justify-center">
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

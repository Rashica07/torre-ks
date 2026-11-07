"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/i18n";
import { IconChevron } from "./Icons";
import { useCurrentRoute } from "./usePublicRoute";

/**
 * "Kompanitë" = a real link to /kompanite plus a disclosure button for the four companies.
 * Not role="menu": it is a plain list of links in a disclosure (docs/accessibility.md §2).
 */
export function CompaniesMenu({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = useCurrentRoute();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    // Focus leaving the menu (Tab out) also closes it.
    const onFocusIn = (e: FocusEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  const isCompanyPage = current?.id === "companies" || DIVISION_IDS.includes(current?.id as never);

  return (
    <li ref={wrapRef} className="relative flex items-center">
      <Link
        href={pathFor("companies", lang)}
        aria-current={current?.id === "companies" ? "page" : undefined}
        className={`inline-flex min-h-[44px] items-center text-[0.9375rem] no-underline hover:underline underline-offset-4 ${isCompanyPage ? "font-medium" : ""}`}
      >
        {getRoute("companies").label[lang]}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="companies-panel"
        aria-label={ui.companiesMenu[lang]}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 w-9 items-center justify-center"
      >
        <IconChevron className={`transition-transform duration-fast ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        id="companies-panel"
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-1 w-72 border border-border-strong bg-raised py-2 shadow-none"
      >
        {DIVISION_IDS.map((id) => (
          <li key={id}>
            <Link
              href={pathFor(id, lang)}
              onClick={() => setOpen(false)}
              aria-current={current?.id === id ? "page" : undefined}
              className="flex min-h-[44px] items-center px-5 text-[0.9375rem] no-underline hover:bg-surface"
            >
              {getRoute(id).label[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

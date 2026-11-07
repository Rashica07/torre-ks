import Link from "next/link";
import { pathFor } from "@/lib/i18n/routes";
import { IconArrow } from "./Icons";

/** Shared chrome for the legal pages. Text is still the templated placeholder (noindex) pending counsel review. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main id="main" className="container-page pt-16 md:pt-24 pb-[var(--section-space)]">
      <div className="max-w-[72ch]">
        <Link href={pathFor("home", "sq")} className="text-link small mb-10 inline-flex min-h-[44px] items-center">
          <IconArrow className="mr-2 rotate-180" /> TORRE Group
        </Link>
        <p className="label mb-4">Përditësuar: {updated}</p>
        <h1 className="mb-12" style={{ fontSize: "var(--text-h2)" }}>{title}</h1>
        <div className="flex flex-col gap-8 leading-[1.75]">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3" style={{ fontSize: "var(--text-h4)", fontWeight: 600, letterSpacing: "-0.01em" }}>{heading}</h2>
      <div className="small muted flex flex-col gap-3 leading-[1.75]" style={{ color: "var(--color-text-muted)" }}>{children}</div>
    </section>
  );
}

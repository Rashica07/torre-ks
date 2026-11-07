import Link from "next/link";
import { pathFor } from "@/lib/i18n/routes";
import { IconArrowL } from "./Icons";

/** Legal pages ("Dokument"): quiet paper plane, narrow measure. Text is still a placeholder pending counsel review (noindex). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main id="main" data-surface="paper">
      <div className="wrap opener">
        <Link href={pathFor("home", "sq")} className="link" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44 }}>
          <IconArrowL size={18} /> TORRE Group
        </Link>
        <p className="cap muted" style={{ marginTop: 28 }}>Përditësuar: {updated}</p>
        <h1 style={{ fontSize: "clamp(2.6rem, 1.4rem + 5vw, 6rem)", margin: "10px 0 40px" }}>{title}</h1>
        <div className="prose">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Shared chrome for standalone legal pages — not tied to any one brand theme. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main style={{ background: "hsl(var(--bg))", minHeight: "100vh" }}>
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: "72ch", paddingBlock: "var(--space-9)" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-step--1 no-underline mb-10 transition-opacity hover:opacity-70"
          style={{ color: "hsl(var(--muted))" }}
        >
          <ArrowLeft size={13} /> Torre Group
        </Link>

        <span
          className="block text-[11px] tracking-[0.18em] uppercase"
          style={{ color: "hsl(var(--muted))", marginBottom: "var(--space-4)" }}
        >
          Përditësuar: {updated}
        </span>

        <h1 style={{ fontSize: "var(--step-4)", color: "hsl(var(--fg))", marginBottom: "var(--space-7)" }}>
          {title}
        </h1>

        <div
          className="flex flex-col text-step-0"
          style={{ color: "hsl(var(--fg))", lineHeight: 1.75, gap: "var(--space-6)" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{
          fontSize: "var(--step-1)",
          color: "hsl(var(--fg))",
          fontWeight: 600,
          marginBottom: "var(--space-3)",
        }}
      >
        {heading}
      </h2>
      <div className="flex flex-col text-step--1" style={{ color: "hsl(var(--muted))", lineHeight: 1.75, gap: "var(--space-3)" }}>
        {children}
      </div>
    </section>
  );
}

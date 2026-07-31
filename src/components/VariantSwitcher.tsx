"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import { VARIANTS, DESIGN_VARIANTS, type DesignVariantId } from "@/lib/design-variants";
import type { BrandId } from "@/lib/brands";

/**
 * Fixed comparison bar shown only on /preview routes — lets you flip design
 * variant and brand without editing URLs. Not rendered in production pages.
 */
export function VariantSwitcher({
  activeVariant,
  activeBrand,
}: {
  activeVariant: DesignVariantId;
  activeBrand: BrandId;
}) {
  const [open, setOpen] = useState(true);
  const active = VARIANTS[activeVariant];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] font-mono text-[11px]">
      <div className="mx-auto max-w-4xl m-3 rounded-lg overflow-hidden shadow-2xl bg-neutral-900 text-neutral-200 border border-neutral-700">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-neutral-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <strong className="text-neutral-100">{active.label}</strong>
            <span className="text-neutral-500">— {active.description}</span>
          </span>
          {open ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </button>

        {open && (
          <div className="px-4 pb-3 pt-1 flex flex-col gap-3 border-t border-neutral-800">
            <Row label="Design">
              {DESIGN_VARIANTS.map((v) => (
                <Pill
                  key={v}
                  href={`/preview/${v}/${activeBrand}`}
                  active={v === activeVariant}
                  label={VARIANTS[v].label}
                />
              ))}
            </Row>
            <Row label="Brand">
              {BRANDS.map((b) => (
                <Pill
                  key={b.id}
                  href={`/preview/${activeVariant}/${b.id}`}
                  active={b.id === activeBrand}
                  label={`${b.name} · ${b.motion}`}
                />
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-neutral-500 w-12 shrink-0">{label}</span>
      {children}
    </div>
  );
}

function Pill({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`px-2.5 py-1 rounded no-underline transition-colors ${
        active
          ? "bg-neutral-100 text-neutral-900"
          : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
      }`}
    >
      {label}
    </Link>
  );
}

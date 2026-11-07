"use client";
import { useRef } from "react";
import { IconArrowL, IconArrowR } from "./Icons";

/** Native horizontal scroll (touch, trackpad, keyboard) with prev/next buttons for non-drag operation (WCAG 2.5.7). */
export function ScrollRow({
  children,
  region,
  prev,
  next,
}: {
  children: React.ReactNode;
  region: string;
  prev: string;
  next: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: smooth ? "smooth" : "auto" });
  };
  return (
    <>
      <div className="row-ctl" style={{ padding: "0 var(--margin)" }}>
        <button type="button" className="sq" onClick={() => by(-1)} aria-label={prev}><IconArrowL /></button>
        <button type="button" className="sq" onClick={() => by(1)} aria-label={next}><IconArrowR /></button>
      </div>
      <div ref={ref} className="row" role="region" aria-label={region} tabIndex={0}>
        {children}
      </div>
    </>
  );
}

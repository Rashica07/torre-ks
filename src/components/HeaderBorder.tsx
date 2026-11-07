"use client";
import { useEffect } from "react";

/** Adds a bottom border to the sticky header after the page scrolls (IntersectionObserver sentinel; no scroll listener). */
export function HeaderBorder({ headerId }: { headerId: string }) {
  useEffect(() => {
    const header = document.getElementById(headerId);
    if (!header || typeof IntersectionObserver === "undefined") return;
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none";
    document.body.prepend(sentinel);
    const obs = new IntersectionObserver(([e]) => {
      header.dataset.scrolled = e.isIntersecting ? "false" : "true";
    });
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, [headerId]);
  return null;
}

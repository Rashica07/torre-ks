"use client";
import { useEffect, useRef } from "react";

/**
 * Reveals an element once it scrolls into view by flipping `data-visible`,
 * which the `.reveal` class in globals.css transitions against.
 *
 * Uses IntersectionObserver rather than a motion library so brand pages don't
 * pull framer-motion into their bundle. Reduced-motion is handled in CSS, so
 * the observer can run unconditionally.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -80px 0px", once = true } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser can't observe, show the content rather than hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visible = "true";
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          if (once) obs.disconnect();
        } else if (!once) {
          el.dataset.visible = "false";
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll reveal (docs/animation.md §5.1). The hidden state is applied by CSS only when scripting is
 * enabled AND motion is allowed (motion.css), so content is never invisible without JS. This component
 * flips data-visible via IntersectionObserver, with a safety timeout and a no-observer fallback.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "p";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.dataset.visible = "true";
    };
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    const safety = window.setTimeout(show, 2500);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          obs.disconnect();
          window.clearTimeout(safety);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref as any} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}

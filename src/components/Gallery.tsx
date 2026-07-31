"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

type Props = { brand: Brand };

export function Gallery({ brand }: Props) {
  const t = brand.theme;
  const images = brand.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null || !images ? i : (i + delta + images.length) % images.length)),
    [images]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  if (!images || images.length === 0) return null;
  const active = openIndex === null ? null : images[openIndex];

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: t.bgAlt }}>
      <div className="mx-auto w-full px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <span
          className="block text-[11px] tracking-[0.18em] uppercase mb-4"
          style={{ color: t.accent }}
        >
          Galeria
        </span>
        <h2 className="mb-12" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: t.fg, maxWidth: "16ch" }}>
          Projekti në Imazhe
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img, i) => (
            <figure
              key={img.src}
              className="relative rounded-xl overflow-hidden group"
              style={{ border: `1px solid ${t.border}`, background: t.surface }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full text-left cursor-zoom-in"
                aria-label={`Hap imazhin: ${img.caption}`}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </button>
              <figcaption className="px-4 py-3 text-xs tracking-wide" style={{ color: t.muted }}>
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.9)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 p-2 rounded-full transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            aria-label="Mbyll"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="absolute left-3 md:left-6 p-2.5 rounded-full transition-opacity hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                aria-label="Imazhi i mëparshëm"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="absolute right-3 md:right-6 p-2.5 rounded-full transition-opacity hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                aria-label="Imazhi tjetër"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <figure
            className="relative flex flex-col items-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ height: "min(80vh, 720px)" }}>
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-sm text-center" style={{ color: "rgba(255,255,255,0.75)" }}>
              {active.caption}
              <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                {openIndex! + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

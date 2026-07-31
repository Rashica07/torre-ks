"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Brand } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

type Props = { brand: Brand; index: number };

export function Gallery({ brand, index }: Props) {
  const t = brand.theme;
  const d = useDesign();
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
  const offset = d.sectionStyle.gallery === "offset";
  const dossier = d.sectionStyle.gallery === "dossier";

  return (
    <Section id="gallery" background={t.bgAlt}>
      <SectionHeader eyebrow="Galeria" title="Projekti në Imazhe" theme={t} index={index} />

      {dossier ? (
        <div style={{ marginTop: "var(--space-8)" }}>
          {images.map((img, i) => (
            <Tile key={img.src} delay={i * 70}>
              <figure
                className="group"
                style={{
                  borderTop: `1px solid ${t.border}`,
                  paddingTop: "var(--space-5)",
                  paddingBottom: "var(--space-8)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="block w-full text-left cursor-zoom-in relative overflow-hidden"
                  aria-label={`Hap imazhin: ${img.caption}`}
                >
                  <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </button>
                <figcaption
                  className="font-mono text-step--1 flex items-center gap-3"
                  style={{ color: t.muted, marginTop: "var(--space-3)" }}
                >
                  <span style={{ color: t.accent }}>FIG. {String(i + 1).padStart(2, "0")}</span>
                  <span>{img.caption}</span>
                </figcaption>
              </figure>
            </Tile>
          ))}
        </div>
      ) : (
        <div
          className={
            offset
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          }
          style={{ marginTop: "var(--space-8)" }}
        >
          {images.map((img, i) => (
            <Tile
              key={img.src}
              delay={i * 60}
              // Editorial: every fourth tile spans wide, breaking the uniform grid.
              className={offset ? (i % 4 === 0 ? "lg:col-span-4" : "lg:col-span-2") : ""}
            >
              <figure
                className="relative overflow-hidden group h-full"
                style={{
                  border: d.cardStyle === "ruled" ? "none" : `1px solid ${t.border}`,
                  borderRadius: d.radius,
                  background: t.surface,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="block w-full text-left cursor-zoom-in"
                  aria-label={`Hap imazhin: ${img.caption}`}
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: offset && i % 4 === 0 ? "16 / 9" : "4 / 3" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </button>
                <figcaption
                  className="absolute top-4 right-4 text-step--1 tracking-wide opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none"
                  style={{
                    color: "#fff",
                    background: "rgba(0,0,0,0.45)",
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--radius-sm)",
                    maxWidth: "70%",
                    textAlign: "right",
                  }}
                >
                  {img.caption}
                </figcaption>
              </figure>
            </Tile>
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 z-10 p-2 rounded-full transition-opacity hover:opacity-70"
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
                className="absolute left-3 md:left-6 z-10 p-2.5 rounded-full transition-opacity hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                aria-label="Imazhi i mëparshëm"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="absolute right-3 md:right-6 z-10 p-2.5 rounded-full transition-opacity hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                aria-label="Imazhi tjetër"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <figure
            className="relative z-0 flex flex-col items-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ height: "min(80vh, 720px)" }}>
              <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
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
    </Section>
  );
}

function Tile({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal h-full ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

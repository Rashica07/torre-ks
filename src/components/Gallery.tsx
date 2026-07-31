"use client";
import Image from "next/image";
import type { Brand } from "@/lib/brands";

type Props = { brand: Brand };

export function Gallery({ brand }: Props) {
  const t = brand.theme;
  if (!brand.gallery || brand.gallery.length === 0) return null;

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
          {brand.gallery.map((img) => (
            <figure
              key={img.src}
              className="relative rounded-xl overflow-hidden group"
              style={{ border: `1px solid ${t.border}`, background: t.surface }}
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
              <figcaption
                className="px-4 py-3 text-xs tracking-wide"
                style={{ color: t.muted }}
              >
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

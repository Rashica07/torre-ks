import Image from "next/image";

/** Photograph as page: full-bleed image, 36px frame and angled caption tab (docs/design.md §5.5). */
export function Plate({
  src, alt, kicker, name, note, priority = false, position,
}: {
  src: string; alt: string; kicker: string; name: string; note?: string; priority?: boolean; position?: string;
}) {
  return (
    <figure className="plate" data-surface="ink" style={{ margin: 0 }}>
      <div className="plate__media">
        <Image src={src} alt={alt} fill sizes="100vw" priority={priority} style={position ? { objectPosition: position } : undefined} />
      </div>
      <div className="plate__frame" aria-hidden="true" />
      <figcaption>
        <div className="tab" data-surface="paper">
          <span className="cap">{kicker}</span>
          <span className="tab__name">{name}</span>
        </div>
        {note ? <p className="plate__note">{note}</p> : null}
      </figcaption>
    </figure>
  );
}

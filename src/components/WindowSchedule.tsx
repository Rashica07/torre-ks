"use client";
import { useState } from "react";
import { WindowTypes } from "./Drawings";

export interface WindowRow { type: string; what: string; kind: string }

/** Window-type elevation + the schedule table. Hover or focus on a type highlights both (CSS state only). */
export function WindowSchedule({
  alt, title, th, rows, note,
}: {
  alt: string; title: string; th: { type: string; what: string; kind: string }; rows: WindowRow[]; note: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="wsched">
      <figure style={{ margin: 0 }}>
        <WindowTypes alt={alt} active={active} onPick={setActive} />
        <figcaption className="cap muted" style={{ marginTop: 10 }}>{note}</figcaption>
      </figure>
      <div className="tbl" role="region" aria-label={title} tabIndex={0}>
        <table>
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr><th scope="col">{th.type}</th><th scope="col">{th.what}</th><th scope="col">{th.kind}</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.type} className={active === i ? "is-active" : undefined}>
                <th scope="row">
                  <button type="button" className="wbtn" aria-pressed={active === i} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} onClick={() => setActive(active === i ? null : i)}>
                    {r.type}
                  </button>
                </th>
                <td>{r.what}</td>
                <td>{r.kind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

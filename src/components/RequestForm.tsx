"use client";
import { useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { WHATSAPP_HREF } from "@/content/company";
import { pages } from "@/content/pages";
import { IconArrowUR } from "./Icons";

/**
 * "Fleta e kërkesës" — no backend (D-006 stays open): the request is composed into a WhatsApp message to the
 * verified number. Validation is explicit, errors are announced, and the phone number is always the fallback.
 */
export function RequestForm({ lang, companies }: { lang: Lang; companies: { id: string; name: string }[] }) {
  const f = pages.contact.form;
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const summary = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const message = String(d.get("message") || "").trim();
    const city = String(d.get("city") || "").trim();
    const comp = String(d.get("company") || "");
    const next: typeof errors = {};
    if (!name) next.name = f.errName[lang];
    if (!message) next.message = f.errMessage[lang];
    setErrors(next);
    if (next.name || next.message) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    const lines = [`${f.greeting[lang]} ${name}.`, comp ? `${f.about[lang]}: ${comp}` : "", city ? `${f.from[lang]}: ${city}` : "", "", message].filter((l, i) => l || i === 3);
    window.open(`${WHATSAPP_HREF}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  const has = Boolean(errors.name || errors.message);
  return (
    <form className="rform" onSubmit={onSubmit} noValidate aria-labelledby="rform-title">
      <h2 id="rform-title" className="cap" style={{ fontFamily: "var(--font-text)", fontSize: "var(--text-cap)", lineHeight: 1.3, letterSpacing: "0.14em" }}>{f.title[lang]}</h2>
      <p className="lead" style={{ maxWidth: "46ch" }}>{f.intro[lang]}</p>
      <div ref={summary} tabIndex={-1} role="alert" className="rform__summary">
        {has ? (
          <>
            <strong>{f.errors[lang]}</strong>
            <ul>
              {errors.name ? <li><a href="#rf-name">{errors.name}</a></li> : null}
              {errors.message ? <li><a href="#rf-message">{errors.message}</a></li> : null}
            </ul>
          </>
        ) : null}
      </div>
      <div className="rform__grid">
        <label className="rform__field" htmlFor="rf-company">
          <span>{f.company[lang]}</span>
          <select id="rf-company" name="company" defaultValue="">
            <option value="">{f.any[lang]}</option>
            {companies.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </label>
        <label className="rform__field" htmlFor="rf-name">
          <span>{f.name[lang]}</span>
          <input id="rf-name" name="name" type="text" autoComplete="name" required aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "rf-name-err" : undefined} />
          {errors.name ? <em id="rf-name-err" className="rform__err">{errors.name}</em> : null}
        </label>
        <label className="rform__field" htmlFor="rf-city">
          <span>{f.city[lang]}</span>
          <input id="rf-city" name="city" type="text" autoComplete="address-level2" />
        </label>
        <label className="rform__field rform__field--wide" htmlFor="rf-message">
          <span>{f.message[lang]}</span>
          <textarea id="rf-message" name="message" rows={5} required aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "rf-message-err" : undefined} />
          {errors.message ? <em id="rf-message-err" className="rform__err">{errors.message}</em> : null}
        </label>
      </div>
      <div className="btn-row" style={{ marginTop: 28, alignItems: "center" }}>
        <button type="submit" className="btn">
          <span className="btn__label">{f.send[lang]}<span className="sr-only"> ({pages.common.newTab[lang]})</span></span>
          <span className="btn__arrow"><IconArrowUR /></span>
        </button>
        
      </div>
    </form>
  );
}

"use client";
import { useState } from "react";
import { Phone, MessageCircle, Send } from "lucide-react";
import type { Brand } from "@/lib/brands";

export function ContactBlock({ brand }: { brand: Brand }) {
  const t = brand.theme;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const phoneDigits = brand.phone.replace(/\D/g, "");
  const telHref = `tel:${brand.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${phoneDigits}`;

  const subject = encodeURIComponent(`Kërkesë e re nga ${brand.name}`);
  const body = encodeURIComponent(`Emri: ${name || "-"}\nKontakt: ${contact || "-"}\nMesazhi: ${message || "-"}`);
  const mailtoHref = `mailto:${brand.email}?subject=${subject}&body=${body}`;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={telHref}
          className="flex-1 inline-flex items-center justify-center gap-2 no-underline text-sm font-medium rounded-full px-6 py-3 transition-opacity hover:opacity-85"
          style={{ background: t.accent, color: t.accentFg }}
        >
          <Phone size={15} /> {brand.phone}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 no-underline text-sm font-medium rounded-full px-6 py-3 transition-opacity hover:opacity-75"
          style={{ border: `1px solid ${t.border}`, color: t.fg }}
        >
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailtoHref;
        }}
        className="flex flex-col gap-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Emri juaj"
          required
          className="text-sm rounded-lg px-4 py-3 outline-none"
          style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.fg }}
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Telefoni ose email-i juaj"
          required
          className="text-sm rounded-lg px-4 py-3 outline-none"
          style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.fg }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Si mund t'ju ndihmojmë?"
          rows={3}
          className="text-sm rounded-lg px-4 py-3 outline-none resize-none"
          style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.fg }}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium rounded-full px-6 py-3 transition-opacity hover:opacity-85"
          style={{ background: t.accent, color: t.accentFg }}
        >
          Dërgo Mesazhin <Send size={14} />
        </button>
      </form>
    </div>
  );
}

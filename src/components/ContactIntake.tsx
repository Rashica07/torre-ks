"use client";
import { useEffect, useRef, useState } from "react";
import { Send, ArrowRight, Mail, Phone } from "lucide-react";
import type { Brand } from "@/lib/brands";

type Message = { from: "bot" | "user"; text: string };
type Step = "interest" | "timeline" | "contactMethod" | "contactDetail" | "done";

const INTEREST_OPTIONS = ["Blej Apartament", "Çmimet & Oferta", "Vizitë në Ambient", "Diçka Tjetër"];
const TIMELINE_OPTIONS = ["Sa më shpejt", "Brenda një muaji", "2–3 muaj", "Vetëm duke shikuar"];
const CONTACT_OPTIONS = ["Email", "Telefon"];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Roughly how long a reply of this length would take to "type" — capped so it never drags. */
function typingDuration(text: string) {
  return Math.min(1400, 450 + text.length * 18);
}

export function ContactIntake({ brand }: { brand: Brand }) {
  const t = brand.theme;
  const [step, setStep] = useState<Step>("interest");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [answers, setAnswers] = useState<{ interest?: string; timeline?: string; method?: string; detail?: string }>({});
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Reveals bot replies one at a time behind a typing indicator, instead of
  // dumping every message in at once — reads as composed, not teleported.
  async function speakBot(texts: string[]) {
    for (const text of texts) {
      setTyping(true);
      await delay(typingDuration(text));
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
      await delay(120);
    }
  }

  useEffect(() => {
    if (mounted.current) return; // guards React StrictMode's double-invoke in dev
    mounted.current = true;
    speakBot([
      `Përshëndetje! Unë jam asistenti i ${brand.name}. Tri pyetje të shpejta dhe ekipi ynë ju kontakton.`,
      "Çfarë ju intereson?",
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(value: string) {
    setMessages((m) => [...m, { from: "user", text: value }]);

    if (step === "interest") {
      setAnswers((a) => ({ ...a, interest: value }));
      setStep("timeline");
      speakBot(["Cili është afati juaj kohor?"]);
    } else if (step === "timeline") {
      setAnswers((a) => ({ ...a, timeline: value }));
      setStep("contactMethod");
      speakBot(["Si preferoni t'ju kontaktojmë?"]);
    } else if (step === "contactMethod") {
      setAnswers((a) => ({ ...a, method: value }));
      setStep("contactDetail");
      speakBot([value === "Email" ? "Cila është adresa juaj e email-it?" : "Cili është numri juaj i telefonit?"]);
    }
  }

  function submitDetail() {
    if (!inputValue.trim()) return;
    const detail = inputValue.trim();
    setMessages((m) => [...m, { from: "user", text: detail }]);
    setAnswers((a) => ({ ...a, detail }));
    setStep("done");
    setInputValue("");
    speakBot(["Faleminderit! Klikoni më poshtë për të dërguar kërkesën."]);
  }

  const subject = encodeURIComponent(`Kërkesë e re nga ${brand.name}`);
  const body = encodeURIComponent(
    `Interes: ${answers.interest || "-"}\nAfati kohor: ${answers.timeline || "-"}\nKontakt (${answers.method || "-"}): ${answers.detail || "-"}`
  );

  const options =
    step === "interest" ? INTEREST_OPTIONS : step === "timeline" ? TIMELINE_OPTIONS : step === "contactMethod" ? CONTACT_OPTIONS : [];
  // Buttons/input for the current step only make sense once the assistant has
  // actually finished asking — otherwise you could answer a question it hasn't sent yet.
  const awaitingReply = typing;

  return (
    <div
      className="w-full max-w-md mx-auto rounded-xl overflow-hidden text-left"
      style={{ background: t.bg, border: `1px solid ${t.border}` }}
    >
      <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
          style={{ background: t.accent, color: t.accentFg }}
        >
          {brand.name.charAt(0)}
        </div>
        <span className="text-xs font-medium" style={{ color: t.fg }}>
          Asistenti i {brand.name}
        </span>
      </div>

      <div ref={scrollRef} className="flex flex-col gap-3 px-5 py-5 max-h-72 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="animate-message-in text-[13px] leading-relaxed rounded-lg px-4 py-2.5 max-w-[85%]"
              style={
                msg.from === "user"
                  ? { background: t.accent, color: t.accentFg }
                  : { background: t.surface, color: t.fg, border: `1px solid ${t.border}` }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div
              className="animate-message-in flex items-center gap-1 rounded-lg px-4 py-3"
              style={{ background: t.surface, border: `1px solid ${t.border}` }}
              aria-live="polite"
              aria-label={`${brand.name} po shkruan`}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="typing-dot w-1.5 h-1.5 rounded-full"
                  style={{ background: t.muted, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        {(step === "interest" || step === "timeline") && !awaitingReply && (
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => choose(opt)}
                className="animate-message-in text-xs rounded-full px-4 py-2 transition-opacity hover:opacity-75"
                style={{ border: `1px solid ${t.accent}`, color: t.accent }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {step === "contactMethod" && !awaitingReply && (
          <div className="flex flex-wrap gap-2">
            {CONTACT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => choose(opt)}
                className="animate-message-in inline-flex items-center gap-1.5 text-xs rounded-full px-4 py-2 transition-opacity hover:opacity-75"
                style={{ border: `1px solid ${t.accent}`, color: t.accent }}
              >
                {opt === "Email" ? <Mail size={12} /> : <Phone size={12} />} {opt}
              </button>
            ))}
          </div>
        )}
        {step === "contactDetail" && !awaitingReply && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitDetail();
            }}
            className="animate-message-in flex items-center gap-2"
          >
            <input
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={answers.method === "Email" ? "you@example.com" : "+383 4X XXX XXX"}
              className="flex-1 text-sm rounded-full px-4 py-2.5 outline-none"
              style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.fg }}
            />
            <button
              type="submit"
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: t.accent, color: t.accentFg }}
              aria-label="Dërgo"
            >
              <Send size={14} />
            </button>
          </form>
        )}
        {step === "done" && !awaitingReply && (
          <a
            href={`mailto:${brand.email}?subject=${subject}&body=${body}`}
            className="animate-message-in inline-flex items-center justify-center gap-2 w-full rounded-full text-sm font-medium no-underline px-6 py-3 transition-opacity hover:opacity-85"
            style={{ background: t.accent, color: t.accentFg }}
          >
            Dërgo Kërkesën <ArrowRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

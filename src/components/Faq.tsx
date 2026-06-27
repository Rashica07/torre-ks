import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurText } from "./BlurText";

const FAQ_ITEMS = [
  {
    q: "What types of projects does MAGFA GROUP handle?",
    a: "MAGFA GROUP manages the full spectrum — from private residential villas and luxury penthouses, to commercial headquarters, healthcare facilities, and large-scale mixed-use developments. If it requires precision, we handle it.",
  },
  {
    q: "How does your pricing structure work?",
    a: "Every project is unique. We provide a detailed quote within 24 hours of the initial consultation, covering materials, labour, timeline, and contingency. There are no hidden fees — our contracts are transparent by design.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes. MAGFA GROUP operates across Switzerland, Italy, France, and select international markets through our TORRE network. We bring the same Swiss precision and Italian craftsmanship to every geography.",
  },
  {
    q: "What is your approach to sustainability?",
    a: "Sustainability is embedded from the design phase — not retrofitted. We use certified low-carbon materials, work with energy consultants on every project, and target a minimum 20% improvement on local energy standards.",
  },
  {
    q: "How do you manage project communication?",
    a: "Every client is assigned a dedicated Project Lead and gets access to our project portal — daily photos, milestone updates, and real-time budget tracking. You are never in the dark.",
  },
  {
    q: "What warranties do you offer post-handover?",
    a: "We provide a 10-year structural warranty as standard, with 2-year coverage on MEP systems and finishes. Post-occupancy support is available at 30, 90, and 365 days as part of every contract.",
  },
  {
    q: "How far in advance should I contact you?",
    a: "For large projects, 6–12 months before your intended start date is ideal. For smaller commissions, we can typically mobilise within 6–8 weeks. Contact us early — the best slots fill quickly.",
  },
];

function AccordionItem({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: "hsl(var(--border) / 0.25)" }}
    >
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-4 focus-visible:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="font-display uppercase text-lg md:text-xl tracking-tight pr-4"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
            color: open ? "hsl(var(--primary))" : "hsl(var(--foreground))",
            transition: "color 0.2s",
          }}
        >
          {item.q}
        </span>
        <span className="shrink-0">
          {open
            ? <Minus className="size-4" style={{ color: "hsl(var(--primary))" }} />
            : <Plus className="size-4" style={{ color: "hsl(var(--muted-foreground))" }} />
          }
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-6 text-[15px] leading-relaxed"
              style={{
                color: "hsl(var(--foreground) / 0.70)",
                fontFamily: "var(--font-body)",
                maxWidth: "60ch",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-36" style={{ background: "hsl(240 8% 5%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
              style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
            >
              FAQ
            </div>
            <BlurText
              text="QUESTIONS ANSWERED."
              as="h2"
              className="font-display uppercase mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 52px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
              } as React.CSSProperties}
            />
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
            >
              Can't find what you're looking for? Reach our team directly.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center text-sm font-medium border-b pb-0.5 transition-colors"
              style={{
                color: "hsl(var(--primary))",
                borderColor: "hsl(var(--primary) / 0.4)",
                fontFamily: "var(--font-body)",
              }}
            >
              Contact us
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

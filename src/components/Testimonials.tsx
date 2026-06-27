import { Star } from "lucide-react";
import { BlurText } from "./BlurText";

const TESTIMONIALS = [
  {
    quote: "MAGFA GROUP delivered our headquarters on time and under budget. The attention to detail in the facade glazing was extraordinary — exactly what we envisioned.",
    name: "Luca Ferretti",
    role: "CEO, SWISSTECH Industries",
    rating: 5,
  },
  {
    quote: "Working with MAGFA was a revelation. They treated our villa project as if it were their own home. The craftsmanship is generational.",
    name: "Isabelle Morand",
    role: "Private Client, Geneva",
    rating: 5,
  },
  {
    quote: "The architectural direction they brought to TORRE UMBRIA redefined what we thought was possible. The project came in 3 weeks ahead of schedule.",
    name: "Marco Ricci",
    role: "Director, TORRE UMBRIA",
    rating: 5,
  },
  {
    quote: "From first consultation to handover, the professionalism was outstanding. The process felt transparent and assured throughout.",
    name: "Dr. Anna Keller",
    role: "Clinic Director, Zurich",
    rating: 5,
  },
  {
    quote: "MAGFA's window and facade division transformed our commercial space. Energy performance improved by 34% while the aesthetic became iconic.",
    name: "Stefan Baumann",
    role: "Property Developer, Basel",
    rating: 5,
  },
  {
    quote: "The bespoke interiors MAGFA delivered for our penthouse are beyond comparison. Every material was thoughtfully sourced and expertly installed.",
    name: "Charlotte Laurent",
    role: "Private Client, Lausanne",
    rating: 5,
  },
  {
    quote: "Fifteen years on our preferred contractor list. MAGFA continues to raise the bar on every project, regardless of scale.",
    name: "Paul Diener",
    role: "Head of Real Estate, TORRE HOME",
    rating: 5,
  },
];

function TestimonialCard({ quote, name, role, rating }: typeof TESTIMONIALS[0]) {
  return (
    <div
      className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 shrink-0 w-[300px] md:w-[380px]"
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-current" style={{ color: "hsl(var(--primary))" }} />
        ))}
      </div>
      {/* Quote */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "hsl(var(--foreground) / 0.80)", fontFamily: "var(--font-body)" }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
          style={{
            background: "hsl(var(--primary) / 0.2)",
            color: "hsl(var(--primary))",
            fontFamily: "var(--font-display)",
          }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-body)" }}
          >
            {name}
          </div>
          <div
            className="text-xs"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)];

  return (
    <section id="testimonials" className="py-24 md:py-36 overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-16">
        <div
          className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
          style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
        >
          TESTIMONIALS
        </div>
        <BlurText
          text="WHAT OUR CLIENTS SAY."
          as="h2"
          className="font-display uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4vw, 60px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "hsl(var(--foreground))",
          } as React.CSSProperties}
        />
      </div>

      {/* Marquee rows */}
      <div
        className="relative flex flex-col gap-5"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Row 1 — forward */}
        <div
          className="flex gap-5 w-max"
          style={{ animation: "marquee 28s linear infinite" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
        >
          {row1.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Row 2 — reverse */}
        <div
          className="flex gap-5 w-max"
          style={{ animation: "marquee-rev 32s linear infinite" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
        >
          {row2.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

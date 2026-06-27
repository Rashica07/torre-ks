import { motion } from "framer-motion";
import { BlurText } from "./BlurText";

const STEPS = [
  {
    title: "Discovery",
    body: "We immerse ourselves in your vision — site, brief, constraints, and ambitions. No assumptions, only listening.",
  },
  {
    title: "Design",
    body: "Our architects translate your vision into precise drawings, material selections, and phased delivery plans.",
  },
  {
    title: "Build",
    body: "On-site execution with dedicated project managers, daily reporting, and zero-compromise quality checks.",
  },
  {
    title: "Handover",
    body: "White-glove delivery, full documentation, and a post-occupancy follow-up programme at 30, 90, and 365 days.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-36" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
            style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
          >
            OUR PROCESS
          </div>
          <BlurText
            text="HOW WE WORK."
            as="h2"
            className="font-display uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
          >
            Four steps. Absolute clarity at every stage.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative px-0 md:px-8 py-10 md:py-14 flex flex-col gap-4 items-start"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Connector line — horizontal between steps on desktop */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-[72px] right-0 w-px md:w-full md:h-px md:top-auto"
                  style={{
                    top: "72px",
                    right: "-1px",
                    height: "100%",
                    width: "1px",
                    background: "linear-gradient(to bottom, hsl(var(--border) / 0.3), transparent)",
                  }}
                />
              )}
              {/* Vertical connector on mobile */}
              {i < STEPS.length - 1 && (
                <div
                  className="md:hidden absolute bottom-0 left-6 w-px h-10"
                  style={{ background: "hsl(var(--border) / 0.3)" }}
                />
              )}

              <span
                className="font-display select-none -mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(72px, 8vw, 120px)",
                  lineHeight: 1,
                  color: "hsl(var(--primary) / 0.20)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 2vw, 28px)",
                  letterSpacing: "-0.01em",
                  color: "hsl(var(--foreground))",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "hsl(var(--foreground) / 0.60)",
                  fontFamily: "var(--font-body)",
                  maxWidth: "30ch",
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

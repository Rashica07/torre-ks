import { RefObject, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { ScrubSequence } from "./ScrubSequence";
import { BlurText } from "./BlurText";
import { FRAME_COUNT, FRAMES_PATH, FRAME_EXT } from "@/lib/constants";

const PARTNERS = ["SWISSTECH", "TORRE UMBRIA", "TORRE HOME", "MAGFA"];

type HeroProps = {
  scrollRef: RefObject<HTMLElement>;
};

function FramesMissingBanner() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background: "hsl(240 10% 3%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center",
        gap: "24px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          border: "2px solid hsl(35 60% 60%)",
          borderRadius: "12px",
          padding: "32px 40px",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <p style={{ color: "hsl(35 60% 60%)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", marginBottom: "12px" }}>
          FRAMES NOT FOUND
        </p>
        <h2 style={{ color: "hsl(40 20% 95%)", fontSize: "22px", fontWeight: 600, marginBottom: "16px", lineHeight: 1.3 }}>
          Hero frame sequence not extracted yet
        </h2>
        <p style={{ color: "hsl(40 6% 72%)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
          The scroll-scrubbed hero requires video frames to be extracted via ffmpeg. Follow the steps below (Section 2 of the prompt):
        </p>
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: "8px",
            padding: "16px 20px",
            textAlign: "left",
            fontSize: "13px",
            color: "hsl(40 20% 85%)",
            fontFamily: "monospace",
            lineHeight: 2,
          }}
        >
          <div style={{ color: "hsl(40 6% 55%)" }}># 1. Place source video at:</div>
          <div>input/source.mp4</div>
          <div style={{ marginTop: "8px", color: "hsl(40 6% 55%)" }}># 2. Create directories:</div>
          <div>mkdir -p input public/frames</div>
          <div style={{ marginTop: "8px", color: "hsl(40 6% 55%)" }}># 3. Extract frames (ffmpeg required):</div>
          <div>ffmpeg -i input/source.mp4 \</div>
          <div style={{ paddingLeft: "16px" }}>-vf "fps=24,scale='min(1920,iw)':'-2':flags=lanczos" \</div>
          <div style={{ paddingLeft: "16px" }}>-q:v 3 public/frames/frame_%04d.jpg</div>
          <div style={{ marginTop: "8px", color: "hsl(40 6% 55%)" }}># 4. Count frames &amp; update FRAME_COUNT:</div>
          <div>ls public/frames | wc -l</div>
          <div style={{ color: "hsl(40 6% 55%)" }}># Then update src/lib/constants.ts → FRAME_COUNT</div>
        </div>
        <p style={{ color: "hsl(40 6% 55%)", fontSize: "12px", marginTop: "16px" }}>
          Once frames are in <code style={{ color: "hsl(35 60% 60%)" }}>public/frames/</code>, refresh this page. The hero canvas will automatically play.
        </p>
      </div>
    </div>
  );
}

export function Hero({ scrollRef }: HeroProps) {
  const [framesExist, setFramesExist] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload  = () => setFramesExist(true);
    img.onerror = () => setFramesExist(false);
    img.src = `${FRAMES_PATH}/frame_0001.${FRAME_EXT}?check=1`;
  }, []);

  return (
    <section
      ref={scrollRef}
      id="hero"
      className="relative bg-background"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame sequence canvas */}
        <ScrubSequence
          framesPath={FRAMES_PATH}
          frameCount={FRAME_COUNT}
          ext={FRAME_EXT}
          scrollTargetRef={scrollRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Fallback banner if frames missing */}
        {framesExist === false && <FramesMissingBanner />}

        {/* Cinematic vignette */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_50%_60%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-[40vh] z-[2] gradient-fade-b" />

        {/* Hero content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="liquid-glass rounded-full px-1 py-1 inline-flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                  fontFamily: "var(--font-body)",
                }}
              >
                New
              </span>
              <span
                className="pr-3 text-sm"
                style={{ color: "hsl(var(--foreground) / 0.85)", fontFamily: "var(--font-body)" }}
              >
                Excellence in Construction
              </span>
            </div>
          </motion.div>

          <BlurText
            text="BUILT TO LAST"
            as="h1"
            className="mt-6 font-display uppercase text-foreground max-w-[14ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 9vw, 140px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
            delay={0.09}
            startDelay={0.15}
          />

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-body text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "hsl(var(--foreground) / 0.70)", fontFamily: "var(--font-body)" }}
          >
            From architectural conception to final handover — MAGFA GROUP delivers landmark construction with Swiss precision and Italian elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex items-center gap-3 flex-wrap justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center rounded-full px-7 py-3.5 text-base font-medium transition-colors"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.01em",
              }}
            >
              Get in Touch <ArrowUpRight className="ml-1.5 size-4" />
            </a>
            <button
              className="liquid-glass-strong inline-flex items-center rounded-full px-7 py-3.5 text-base font-normal transition-colors"
              style={{
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.01em",
              }}
            >
              <Play className="mr-1.5 size-4 fill-current" /> Our Work
            </button>
          </motion.div>

          {/* Partners row */}
          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4">
            <span
              className="liquid-glass rounded-full px-4 py-1.5 text-xs"
              style={{ color: "hsl(var(--foreground) / 0.80)", fontFamily: "var(--font-body)" }}
            >
              Trusted by
            </span>
            <div className="flex items-center gap-8 md:gap-14 flex-wrap justify-center px-6">
              {PARTNERS.map((p) => (
                <span
                  key={p}
                  className="font-display italic text-xl md:text-2xl tracking-tight"
                  style={{ color: "hsl(var(--foreground) / 0.60)", fontFamily: "var(--font-display)" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

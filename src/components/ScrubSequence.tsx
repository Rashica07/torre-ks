import { useEffect, useRef, RefObject } from "react";

export type ScrubSequenceProps = {
  framesPath: string;
  frameCount: number;
  ext?: "jpg" | "webp";
  className?: string;
  scrollTargetRef: RefObject<HTMLElement>;
};

const pad4 = (n: number) => String(n).padStart(4, "0");

export function ScrubSequence({
  framesPath,
  frameCount,
  ext = "jpg",
  className = "",
  scrollTargetRef,
}: ScrubSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef    = useRef<number | null>(null);
  const visible   = useRef(true);
  const loadedRef = useRef<boolean[]>([]);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const currentIndex = () => {
    const target = scrollTargetRef.current;
    if (!target) return 0;
    const { top, height } = target.getBoundingClientRect();
    const scrollable = height - window.innerHeight;
    const scrolled   = Math.max(0, -top);
    const progress   = Math.min(1, scrolled / scrollable);
    return Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
  };

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[idx];
    if (!img || !loadedRef.current[idx]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw  = canvas.width;
    const ch  = canvas.height;
    const iw  = img.naturalWidth  || img.width;
    const ih  = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    const scale = Math.max(cw / iw, ch / ih);
    const sw    = iw * scale;
    const sh    = ih * scale;
    const ox    = (cw - sw) / 2;
    const oy    = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, sw, sh);
    void dpr;
  };

  useEffect(() => {
    const urls = Array.from(
      { length: frameCount },
      (_, i) => `${framesPath}/frame_${pad4(i + 1)}.${ext}`
    );
    loadedRef.current = new Array(frameCount).fill(false);
    const imgs: HTMLImageElement[] = new Array(frameCount);

    const first = new Image();
    first.onload = () => {
      loadedRef.current[0] = true;
      drawFrame(0);
    };
    first.src = urls[0];
    (first as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
    imgs[0] = first;

    urls.slice(1).forEach((src, i) => {
      const img = new Image();
      img.onload = () => { loadedRef.current[i + 1] = true; };
      img.src = src;
      imgs[i + 1] = img;
    });
    imagesRef.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framesPath, frameCount, ext]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = "100%";
      canvas.style.height = "100%";
      drawFrame(currentIndex());
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollTargetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scrollTargetRef]);

  useEffect(() => {
    const tick = () => {
      if (visible.current && !prefersReduced.current) {
        drawFrame(currentIndex());
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
      />
      <p className="sr-only">
        Cinematic scroll-scrubbed video showcasing MAGFA GROUP construction and architecture projects in motion.
      </p>
    </>
  );
}

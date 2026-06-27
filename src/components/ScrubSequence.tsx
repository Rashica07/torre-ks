"use client";
import { useEffect, useRef, RefObject } from "react";

export type ScrubSequenceProps = {
  framesPath?: string;
  frameCount?: number;
  ext?: "jpg" | "webp";
  className?: string;
  scrollTargetRef: RefObject<HTMLElement | null>;
  accentHsl?: string;
};

const pad4 = (n: number) => String(n).padStart(4, "0");

export function ScrubSequence({
  framesPath = "/frames",
  frameCount = 120,
  ext = "jpg",
  className = "",
  scrollTargetRef,
  accentHsl = "35 60% 60%",
}: ScrubSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);
  const visible = useRef(true);
  const noFrames = useRef(false);

  const currentIndex = () => {
    const target = scrollTargetRef.current;
    if (!target) return 0;
    const { top, height } = target.getBoundingClientRect();
    const scrollable = height - window.innerHeight;
    const scrolled = Math.max(0, -top);
    const progress = Math.min(1, scrolled / scrollable);
    return Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
  };

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[idx];
    if (!img || !loadedRef.current[idx]) {
      if (noFrames.current) drawFallback(ctx, canvas.width, canvas.height, accentHsl);
      return;
    }
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    const scale = Math.max(cw / iw, ch / ih);
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
  };

  const drawFallback = (ctx: CanvasRenderingContext2D, w: number, h: number, accent: string) => {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "hsl(240 10% 4%)");
    grad.addColorStop(1, "hsl(240 8% 7%)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // grid lines
    ctx.strokeStyle = `hsla(${accent}, 0.06)`;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  };

  useEffect(() => {
    const urls = Array.from({ length: frameCount }, (_, i) => `${framesPath}/frame_${pad4(i + 1)}.${ext}`);
    loadedRef.current = new Array(frameCount).fill(false);
    const imgs: HTMLImageElement[] = new Array(frameCount);
    const first = new Image();
    first.onerror = () => { noFrames.current = true; };
    first.onload = () => { loadedRef.current[0] = true; drawFrame(0); };
    first.src = urls[0];
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
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
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
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [scrollTargetRef]);

  useEffect(() => {
    const tick = () => {
      if (visible.current) drawFrame(currentIndex());
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      <p className="sr-only">Cinematic scroll-scrubbed hero sequence</p>
    </>
  );
}

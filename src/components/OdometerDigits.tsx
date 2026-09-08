"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useVelocity, useTransform, useMotionTemplate, animate } from "framer-motion";

// Four stacked cycles of 0–9. Landing on the fourth means every digit
// physically rolls through ~30 numbers before the spring catches it — a real
// mechanical tick, not a decorative fade.
const ROWS = [...Array(10).keys(), ...Array(10).keys(), ...Array(10).keys(), ...Array(10).keys()];

function Digit({ value, index, size, color }: { value: number; index: number; size: string; color: string }) {
  const target = 30 + value;

  // Raw motion value counts "rows travelled" — a plain number, not a CSS unit.
  // Deriving both the transform and a velocity-linked blur from it means the
  // digit visibly streaks while spinning fast and snaps into focus as the
  // spring settles, like a split-flap board rather than a bouncy toy.
  const rows = useMotionValue(0);
  const velocity = useVelocity(rows);
  const blur = useTransform(velocity, (v) => Math.min(Math.abs(v) / 10, 7));
  const filter = useMotionTemplate`blur(${blur}px)`;
  const transform = useMotionTemplate`translateY(-${rows}em)`;

  useEffect(() => {
    const controls = animate(rows, target, {
      type: "spring",
      stiffness: 50,
      damping: 10,
      mass: 1.3,
      delay: index * 0.1,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden align-top"
      style={{ height: "1em", width: "1ch", fontSize: size, lineHeight: 1 }}
    >
      <motion.span
        className="flex flex-col items-center"
        style={{ transform, filter, willChange: "transform, filter" }}
      >
        {ROWS.map((d, i) => (
          <span key={i} style={{ height: "1em", lineHeight: 1, color }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function OdometerNumber({
  value,
  size = "1em",
  color = "currentColor",
}: {
  value: string;
  size?: string;
  color?: string;
}) {
  return (
    <span className="inline-flex" style={{ fontVariantNumeric: "tabular-nums" }} aria-label={value}>
      {value.split("").map((ch, i) => (
        <Digit key={i} value={Number(ch)} index={i} size={size} color={color} />
      ))}
    </span>
  );
}

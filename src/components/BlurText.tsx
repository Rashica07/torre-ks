"use client";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

type BlurTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  startDelay?: number;
};

export function BlurText({ text, as: Tag = "h2", className = "", style, delay = 0.07, startDelay = 0 }: BlurTextProps) {
  const words = text.split(" ");
  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: startDelay + i * delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

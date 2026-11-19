"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dimmed: number;
  blur: number;
}

function WordItem({ word, index, total, progress, dimmed, blur }: WordProps) {
  const step = useTransform(progress, (v) => Math.min(1, Math.max(0, v * total - index)));
  const opacity = useTransform(step, (s) => dimmed + (1 - dimmed) * s);
  const filter = useTransform(step, (s) => `blur(${blur * (1 - s)}px)`);

  return (
    <motion.span
      className="inline-block indent-0"
      style={blur ? { opacity, filter } : { opacity }}
    >
      {word}
    </motion.span>
  );
}

interface TextColorFillOnScrollProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  dimmed?: number;
  blur?: number;
  offset?: [string, string];
  className?: string;
}

export default function TextColorFillOnScroll({
  text,
  tag: Tag = "p",
  dimmed = 0.15,
  blur = 0,
  offset = ["start 0.8", "start 0.2"],
  className = "",
}: TextColorFillOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text ? text.split(" ") : [];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  return (
    <div ref={containerRef}>
      <Tag className={`leading-[1.2] ${className}`}>
        {words.map((word, index) => (
          <span key={index}>
            {index > 0 && " "}
            <WordItem
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
              dimmed={dimmed}
              blur={blur}
            />
          </span>
        ))}
      </Tag>
    </div>
  );
}

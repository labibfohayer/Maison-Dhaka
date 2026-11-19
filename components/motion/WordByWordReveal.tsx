"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface WordByWordRevealProps {
  text: string;
  variant?: "slide-up" | "fade-blur" | "fade";
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  immediate?: boolean;
}

const variantsMap: Record<string, Variants> = {
  "slide-up": {
    hidden: { opacity: 0, y: "50%" },
    visible: { opacity: 1, y: 0 },
  },
  "fade-blur": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "none" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const easingMap: Record<string, number[]> = {
  "slide-up": [0.25, 0.46, 0.45, 0.94],
  "fade-blur": [0.45, 0, 0.55, 1],
  fade: [0.45, 0, 0.55, 1],
};

export default function WordByWordReveal({
  text,
  variant = "slide-up",
  tag: Tag = "p",
  className = "",
  immediate = false,
}: WordByWordRevealProps) {
  const words = text ? text.split(" ") : [];
  const selectedVariant = variantsMap[variant] || variantsMap["slide-up"];
  const selectedEase = easingMap[variant] || easingMap["slide-up"];

  const MotionTag = motion[Tag as keyof typeof motion] as any || motion.p;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.2 } })}
      transition={{ staggerChildren: 0.04 }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap">
          <motion.span
            className="inline-block indent-0"
            variants={selectedVariant}
            transition={{ duration: 0.6, ease: selectedEase }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}

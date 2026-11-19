"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface AppearOnScrollProps {
  children: ReactNode;
  variant?: "slide-up" | "fade-blur" | "fade" | "rotate-scale";
  delay?: number;
  className?: string;
}

const variantsMap: Record<string, Variants> = {
  "slide-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-blur": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "rotate-scale": {
    hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -6 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  },
};

export default function AppearOnScroll({
  children,
  variant = "slide-up",
  delay = 0,
  className = "",
}: AppearOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variantsMap[variant] || variantsMap["slide-up"]}
      transition={
        variant === "rotate-scale"
          ? { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.6, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

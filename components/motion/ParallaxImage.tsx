"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
  zoom?: number;
  drift?: number;
  priority?: boolean;
  poster?: string;
}

export default function ParallaxImage({
  src,
  videoSrc,
  alt = "",
  className = "",
  zoom = 11,
  drift,
  priority = false,
  poster,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleValue = useTransform(scrollYProgress, [0, 1], [1 + zoom / 100, 1]);
  const driftY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-(drift ?? 0) / 2}%`, `${(drift ?? 0) / 2}%`]
  );

  const scale = drift ? 1 + (drift ?? 0) / 100 : scaleValue;
  const y = drift ? driftY : 0;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {videoSrc ? (
        <motion.video
          src={videoSrc}
          poster={poster}
          aria-label={alt || undefined}
          style={{ scale, y }}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          preload={priority ? "metadata" : "none"}
          autoPlay={priority}
          loop
          muted
          playsInline
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          style={{ scale, y }}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  );
}

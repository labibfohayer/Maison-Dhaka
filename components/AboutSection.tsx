"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import TextColorFillOnScroll from "@/components/motion/TextColorFillOnScroll";
import ParallaxImage from "@/components/motion/ParallaxImage";

export default function AboutSection() {
  const { title, imageSrc } = siteData.about;

  return (
    <section aria-label="About section" className="py-12 md:py-20">
      <div className="flex flex-col gap-8 md:gap-10 mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center gap-2">
          <TextColorFillOnScroll
            text={title}
            tag="h2"
            className="w-full md:max-w-8/10 mx-auto text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance font-serif"
          />
        </div>

        <div className="relative overflow-hidden rounded aspect-square md:aspect-video">
          <ParallaxImage src={imageSrc} alt="Mediterranean luxury estate architecture" />
        </div>
      </div>
    </section>
  );
}

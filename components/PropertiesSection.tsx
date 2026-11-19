"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import AppearOnScroll from "@/components/motion/AppearOnScroll";
import WordByWordReveal from "@/components/motion/WordByWordReveal";
import ParallaxImage from "@/components/motion/ParallaxImage";

export default function PropertiesSection() {
  const { tag, title, description, items } = siteData.properties;

  return (
    <section aria-label="Features section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Section Header */}
        <div className="flex flex-col items-center w-full max-w-6xl px-6 mx-auto gap-2">
          {tag && (
            <AppearOnScroll variant="fade">
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p className="font-sans text-foreground">{tag}</p>
              </div>
            </AppearOnScroll>
          )}

          <WordByWordReveal
            text={title}
            variant="fade"
            tag="h2"
            className="md:max-w-8/10 text-3xl md:text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance font-serif"
          />

          {description && (
            <WordByWordReveal
              text={description}
              variant="fade"
              tag="p"
              className="md:max-w-7/10 text-base md:text-lg 2xl:text-xl leading-snug text-center text-balance font-sans text-foreground"
            />
          )}
        </div>

        {/* 2-Column Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-6xl px-6 mx-auto">
          {items.map((villa, index) => (
            <AppearOnScroll
              key={villa.id || villa.title}
              variant="slide-up"
              delay={index * 0.08}
              className="h-full"
            >
              <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 h-full">
                {/* 1:1 Aspect Ratio Photo Card */}
                <div className="relative aspect-square rounded overflow-hidden bg-secondary text-secondary-foreground">
                  <ParallaxImage src={villa.imageSrc} alt={villa.title} />
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl 2xl:text-3xl font-semibold leading-tight font-serif text-foreground">
                    {villa.title}
                  </h3>
                  <p className="text-sm md:text-base 2xl:text-lg leading-snug font-sans text-foreground">
                    {villa.description}
                  </p>
                </div>
              </div>
            </AppearOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

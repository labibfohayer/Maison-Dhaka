"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/siteData";
import WordByWordReveal from "@/components/motion/WordByWordReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const { tag, title, description, videoSrc, primaryButton, secondaryButton } =
    siteData.hero;

  // Handle video loading & preloader completion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    if (video.readyState >= 2) {
      setIsLoaded(true);
    } else {
      video.addEventListener("loadeddata", handleLoadedData, { once: true });
    }

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 8000);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // GSAP ScrollTrigger video scrub setup
  useEffect(() => {
    if (!isLoaded) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let triggerInstance: ScrollTrigger | null = null;

    const initScrollTrigger = () => {
      triggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = video.duration * self.progress;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", initScrollTrigger, { once: true });
    }

    return () => {
      if (triggerInstance) triggerInstance.kill();
    };
  }, [isLoaded]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      {/* Brand Preloader Overlay */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-1001 flex flex-col items-center justify-center bg-foreground"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              animate={isLoaded ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                if (isLoaded) setShowLoader(false);
              }}
            >
              <div className="relative">
                <span className="text-base md:text-lg 2xl:text-xl font-medium tracking-tight text-background/20 font-sans">
                  {tag}
                </span>
                <motion.span
                  className="absolute inset-0 text-base md:text-lg 2xl:text-xl font-medium tracking-tight text-background font-sans"
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
                >
                  {tag}
                </motion.span>
              </div>

              <div className="w-48 h-0.5 bg-background/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-background rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isLoaded ? 1 : 0.9 }}
                  style={{ originX: 0 }}
                  transition={{
                    duration: isLoaded ? 0.3 : 3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 300vh Scroll Container */}
      <div ref={containerRef} className="relative h-[300vh] mb-20">
        <section
          aria-label="Hero section"
          className="sticky top-0 overflow-hidden flex flex-col justify-between w-full h-svh"
        >
          {/* Background Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

          {/* Radial Gradient Backdrop Blur */}
          <div
            className="absolute z-10 left-0 top-0 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 backdrop-blur pointer-events-none"
            style={{
              WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 70%)",
              maskImage: "radial-gradient(circle, black 20%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Foreground Hero Content Card */}
          <motion.div
            className="relative z-10 w-full max-w-6xl px-6 mx-auto pt-35"
            initial={{ opacity: 0, y: 30 }}
            animate={showLoader ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-3 w-full md:w-6/10 lg:w-1/2 xl:w-45/100 2xl:w-4/10">
              {/* Tag Badge */}
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p className="font-sans text-foreground">{tag}</p>
              </div>

              {/* H1 Heading */}
              <WordByWordReveal
                text={title}
                variant="fade"
                tag="h1"
                className="text-4xl md:text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-white text-balance font-serif"
              />

              {/* Description */}
              <WordByWordReveal
                text={description}
                variant="fade"
                tag="p"
                className="text-base md:text-lg 2xl:text-xl text-white leading-snug text-balance font-sans font-normal"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-2 md:mt-3">
                <a
                  href={primaryButton.href}
                  onClick={(e) => handleSmoothScroll(e, primaryButton.href)}
                  className="flex items-center justify-center h-10 px-6 text-sm rounded-lg cursor-pointer btn-primary bg-primary text-primary-foreground font-sans font-normal"
                >
                  {primaryButton.text}
                </a>
                <a
                  href={secondaryButton.href}
                  onClick={(e) => handleSmoothScroll(e, secondaryButton.href)}
                  className="flex items-center justify-center h-10 px-6 text-sm rounded-lg cursor-pointer btn-secondary bg-secondary text-secondary-foreground font-sans font-normal"
                >
                  {secondaryButton.text}
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

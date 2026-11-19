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

  const { tag, title, description, videoSrc, localVideoSrc, primaryButton, secondaryButton } =
    siteData.hero as any;

  // Initialize and unlock video decoder for modern browsers (Safari/Chrome autoplay & seek policy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Attempt zero-volume play/pause to unlock seek decoder
    const unlockDecoder = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          video.pause();
        }).catch(() => {
          // Fallback: unlock on first interaction
          const onFirstInteraction = () => {
            video.play().then(() => video.pause()).catch(() => {});
            window.removeEventListener("scroll", onFirstInteraction);
            window.removeEventListener("touchstart", onFirstInteraction);
            window.removeEventListener("click", onFirstInteraction);
          };
          window.addEventListener("scroll", onFirstInteraction, { once: true, passive: true });
          window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
          window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
        });
      }
    };

    unlockDecoder();

    const handleReady = () => {
      setIsLoaded(true);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 2) {
      handleReady();
    } else {
      video.addEventListener("loadeddata", handleReady, { once: true });
      video.addEventListener("canplay", handleReady, { once: true });
    }

    // Safety fallback: dismiss preloader after 2.5s even if network is slow
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
      ScrollTrigger.refresh();
    }, 2500);

    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // GSAP ScrollTrigger video scrub setup (instant setup with dynamic updates)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          const targetTime = video.duration * self.progress;
          const v = video as any;
          if (typeof v.fastSeek === "function") {
            try {
              v.fastSeek(targetTime);
            } catch {
              v.currentTime = targetTime;
            }
          } else {
            v.currentTime = targetTime;
          }
        }
      },
    });

    const handleMetadata = () => {
      ScrollTrigger.refresh();
    };
    video.addEventListener("loadedmetadata", handleMetadata, { once: true });

    return () => {
      trigger.kill();
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, []);

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
                if (isLoaded) {
                  setShowLoader(false);
                  setTimeout(() => {
                    ScrollTrigger.refresh();
                  }, 150);
                }
              }}
            >
              <div className="relative text-center px-4">
                <span className="text-sm sm:text-base md:text-lg 2xl:text-xl font-medium tracking-tight text-background/20 font-sans whitespace-nowrap">
                  {tag}
                </span>
                <motion.span
                  className="absolute inset-0 text-sm sm:text-base md:text-lg 2xl:text-xl font-medium tracking-tight text-background font-sans whitespace-nowrap"
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
          {/* Background Video with global CDN Range support and local fallback */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            {localVideoSrc && <source src={localVideoSrc} type="video/mp4" />}
          </video>

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
            className="relative z-10 w-full max-w-6xl px-6 mx-auto pt-24 sm:pt-28 md:pt-35"
            initial={{ opacity: 0, y: 30 }}
            animate={showLoader ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-3 w-full md:w-6/10 lg:w-1/2 xl:w-45/100 2xl:w-4/10">
              {/* Tag Badge */}
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p className="font-sans text-foreground text-xs sm:text-sm">{tag}</p>
              </div>

              {/* H1 Heading */}
              <WordByWordReveal
                text={title}
                variant="fade"
                tag="h1"
                className="text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-white text-balance font-serif"
              />

              {/* Description */}
              <WordByWordReveal
                text={description}
                variant="fade"
                tag="p"
                className="text-sm sm:text-base md:text-lg 2xl:text-xl text-white leading-snug text-balance font-sans font-normal"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-2 md:mt-3">
                <a
                  href={primaryButton.href}
                  onClick={(e) => handleSmoothScroll(e, primaryButton.href)}
                  className="flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 text-xs sm:text-sm rounded-lg cursor-pointer btn-primary bg-primary text-primary-foreground font-sans font-normal whitespace-nowrap"
                >
                  {primaryButton.text}
                </a>
                <a
                  href={secondaryButton.href}
                  onClick={(e) => handleSmoothScroll(e, secondaryButton.href)}
                  className="flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 text-xs sm:text-sm rounded-lg cursor-pointer btn-secondary bg-secondary text-secondary-foreground font-sans font-normal whitespace-nowrap"
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

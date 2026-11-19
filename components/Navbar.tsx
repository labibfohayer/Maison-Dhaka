"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, navItems, ctaButton } = siteData.navigation;

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav data-section="navbar" className="absolute inset-0 z-1000 pointer-events-none">
      {/* Top Header Bar */}
      <div className="absolute z-10 top-5 left-1/2 -translate-x-1/2 flex items-center justify-between w-full max-w-6xl px-6 pointer-events-auto">
        <a
          href="/"
          className={clsx(
            "text-xl font-medium transition-colors duration-300",
            isOpen ? "text-background" : "text-white"
          )}
        >
          {logo}
        </a>

        <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4">
          <a
            href={ctaButton.href}
            onClick={(e) => handleLinkClick(e, ctaButton.href)}
            className="flex items-center justify-center h-10 px-6 text-sm rounded-lg cursor-pointer btn-primary bg-primary text-primary-foreground"
          >
            {ctaButton.text}
          </a>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="relative flex items-center justify-center size-10 rounded-lg cursor-pointer bg-primary text-primary-foreground focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={clsx(
                "absolute w-3 h-px bg-primary-foreground transition-all duration-300",
                isOpen ? "rotate-45" : "-translate-y-1"
              )}
            />
            <span
              className={clsx(
                "absolute w-3 h-px bg-primary-foreground transition-all duration-300",
                isOpen ? "-rotate-45" : "translate-y-1"
              )}
            />
          </button>
        </div>
      </div>

      {/* Fullscreen Curtain Menu */}
      <div
        className={clsx(
          "fixed inset-0 flex flex-col items-center justify-center bg-foreground transition-[clip-path] duration-700 ease-[cubic-bezier(0.9,0,0.1,1)]",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          clipPath: isOpen
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
      >
        <div className="flex flex-col items-center">
          {navItems.map((item, index) => (
            <div key={item.name} className="overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="group flex items-center gap-4 py-4"
                style={{
                  transform: isOpen ? "translateY(0%)" : "translateY(100%)",
                  transition: "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)",
                  transitionDelay: isOpen
                    ? `${0.3 + index * 0.05}s`
                    : `${(navItems.length - 1 - index) * 0.05}s`,
                }}
              >
                <span className="text-5xl md:text-8xl font-medium text-background group-hover:ml-4 transition-[margin] duration-300">
                  {item.name}
                </span>
                <ArrowUpRight
                  className="h-12 md:h-24 w-auto text-background group-hover:rotate-45 group-hover:mr-4 transition-all duration-300"
                  strokeWidth={1.5}
                />
              </a>
              {index < navItems.length - 1 && <div className="h-px bg-background/20" />}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

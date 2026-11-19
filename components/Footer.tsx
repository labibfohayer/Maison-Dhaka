"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import AppearOnScroll from "@/components/motion/AppearOnScroll";

export default function Footer() {
  const { columns, leftText, rightText } = siteData.footer;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer data-section="footer" aria-label="Site footer" className="w-full pt-20 pb-10">
      <div className="w-full max-w-6xl px-6 mx-auto">
        <div className="pt-10 border-t border-foreground/15">
          {/* 4 Navigation Columns */}
          <div className="w-full flex flex-wrap justify-between gap-y-10 mb-10">
            {columns.map((column, idx) => (
              <AppearOnScroll
                key={column.title}
                variant="slide-up"
                delay={idx * 0.08}
                className="w-1/2 md:w-auto"
              >
                <div className="flex flex-col items-start gap-3">
                  <h3 className="text-sm opacity-50 truncate font-serif">
                    {column.title}
                  </h3>
                  {column.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-base hover:opacity-75 transition-opacity cursor-pointer font-sans"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </AppearOnScroll>
            ))}
          </div>

          {/* Sub-divider */}
          <div className="w-full h-px bg-foreground/20" />

          {/* Bottom Copyright & Location Bar */}
          <div className="w-full flex items-center justify-between pt-5">
            <span className="text-sm opacity-50 font-sans">{leftText}</span>
            <span className="text-sm opacity-50 font-sans">{rightText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

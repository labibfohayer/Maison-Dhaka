"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { title, imageSrc, inputs, textarea, buttonText, footerText, footerLink } =
    siteData.contact;

  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // Simulate reliable inquiry submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatusMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatusMessage("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Contact section"
      className="relative overflow-hidden min-h-[90svh] h-auto md:h-[90svh] my-12 md:my-20 py-12 md:py-0"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <img
          src={imageSrc}
          alt="Costa del Sol luxury villa poolside"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-[120%] object-cover rounded-none"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Floating Glassmorphic Contact Card */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-8 md:px-12">
        <div className="mx-auto w-full max-w-6xl px-2 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 lg:w-5/12 rounded border border-white/10 bg-white/10 backdrop-blur-xl p-5 sm:p-6 md:p-10 shadow-2xl"
          >
            <h2 className="mb-6 text-2xl md:text-3xl 2xl:text-4xl font-semibold text-white font-serif">
              {title}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {inputs.map((input) => (
                  <input
                    key={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [input.name]: e.target.value })
                    }
                    required={input.required}
                    aria-label={input.placeholder}
                    className="w-full h-13 rounded border border-white/15 bg-white/10 px-5 text-base text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none font-sans"
                  />
                ))}
              </div>

              {textarea && (
                <textarea
                  placeholder={textarea.placeholder}
                  value={formData[textarea.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [textarea.name]: e.target.value })
                  }
                  required={textarea.required}
                  rows={textarea.rows || 4}
                  aria-label={textarea.placeholder}
                  className="w-full resize-none rounded border border-white/15 bg-white/10 px-5 py-3 text-base text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none font-sans"
                />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full h-13 px-6 text-base font-medium rounded bg-background text-foreground cursor-pointer transition-colors hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              >
                {isSubmitting ? "Sending..." : buttonText}
              </button>

              {statusMessage && (
                <p className="text-sm text-accent text-center font-sans">
                  {statusMessage}
                </p>
              )}
            </form>

            {/* Concierge Agent Contact Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-sm sm:text-base text-white/75 font-sans">{footerText}</p>
              <a
                href={footerLink.href}
                className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm p-1.5 pr-5 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-white/25 font-sans"
              >
                <img
                  src={footerLink.imageSrc}
                  alt="Concierge Agent"
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8 rounded-full object-cover"
                />
                {footerLink.text}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

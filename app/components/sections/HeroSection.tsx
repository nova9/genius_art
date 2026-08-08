"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  isDark: boolean;
  sharedParticleBackground?: boolean;
}

export function HeroSection({
  isDark,
  sharedParticleBackground = false,
}: HeroSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;
    const updateParallax = () => {
      const offset = Math.min(window.scrollY, window.innerHeight) * -0.12;
      content.style.transform = `translate3d(0, ${offset}px, 0)`;
      animationFrame = 0;
    };
    const requestUpdate = () => {
      if (!animationFrame && window.scrollY <= window.innerHeight * 1.25) {
        animationFrame = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  return (
    <section className={`relative min-h-[82vh] flex items-center justify-center overflow-hidden select-none ${
      sharedParticleBackground ? "bg-transparent" : "border-b border-slate-900/60 bg-slate-950"
    }`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,180,255,0.08),transparent_42%)]" />

      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center relative z-10 space-y-8 pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-5 py-1.5 font-sans font-bold text-[11px] uppercase tracking-[0.3em] bg-white/5 border border-white/10 rounded-full shadow-lg backdrop-blur-md text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-white/80 animate-pulse" />
          <span>EST. 2026 &bull; SRI LANKA</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl sm:text-7xl md:text-[5.5rem] font-display font-black tracking-tighter uppercase leading-[0.9] select-text">
            CRAFTING
            <br />
            <span className={`block md:inline ${isDark ? "chrome-text" : "chrome-text-light"}`}>
              LEGENDARY
            </span>
            <br />
            MASTERPIECES
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-mono font-semibold text-white/60 tracking-[0.26em] sm:tracking-[0.4em] uppercase">
            IT&apos;S NOTHING BUT CREATIVITY
          </p>
        </div>

        <p className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${
          isDark ? "text-slate-400" : "text-slate-600"
        } select-text`}>
          From concept to campaign, we combine strategy, creativity and cinematic AI-driven content to build compelling brand experiences across all platforms
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#alliance" className={`px-8 py-4 rounded-full font-sans text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 relative group overflow-hidden ${
            isDark
              ? "bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
              : "bg-black text-white hover:bg-black/90 hover:shadow-lg hover:shadow-black/10"
          }`}>
            Contact Us
          </a>
          <a href="#portfolio" className={`px-8 py-4 rounded-full font-sans text-xs font-bold tracking-[0.2em] uppercase border transition-all ${
            isDark
              ? "bg-white/5 border-white/20 text-white hover:bg-white hover:text-black"
              : "bg-black/5 border-black/25 text-black hover:bg-black hover:text-white"
          }`}>
            Explore Masterpieces
          </a>
        </div>
      </div>

      {!sharedParticleBackground && (
        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-slate-950 to-transparent pointer-events-none z-2" />
      )}
    </section>
  );
}

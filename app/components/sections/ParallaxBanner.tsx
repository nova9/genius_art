"use client";

import { useEffect, useRef } from "react";

interface ParallaxBannerProps {
  isDark: boolean;
}

export function ParallaxBanner({ isDark }: ParallaxBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const forwardTextRef = useRef<HTMLDivElement>(null);
  const reverseTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const forwardText = forwardTextRef.current;
    const reverseText = reverseTextRef.current;
    if (!section || !forwardText || !reverseText) return;

    let animationId = 0;

    const updateParallax = () => {
      const bounds = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = bounds.top + bounds.height / 2;
      const distanceFromCenter = viewportCenter - sectionCenter;
      const offset = Math.max(-180, Math.min(180, distanceFromCenter * 0.18));

      forwardText.style.transform = `translate3d(${offset}px, 0, 0)`;
      reverseText.style.transform = `translate3d(${-offset}px, 0, 0)`;
      animationId = 0;
    };

    const requestParallaxUpdate = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 overflow-hidden border-y pointer-events-none ${
        isDark ? "bg-white/[0.01] border-white/5" : "bg-black/[0.01] border-black/5"
      }`}
    >
      <div
        ref={forwardTextRef}
        className={`whitespace-nowrap select-none font-display font-black text-6xl sm:text-9xl tracking-[0.2em] uppercase will-change-transform ${
          isDark ? "text-white/[0.03]" : "text-black/[0.03]"
        }`}
      >
        IMAGINATION UNLEASHED &bull; METALLIC VECTORS &bull; WEBGL ACTIVE SHADERS
      </div>

      <div
        ref={reverseTextRef}
        className={`whitespace-nowrap select-none font-display font-black text-3xl sm:text-5xl tracking-[0.25em] pt-6 uppercase will-change-transform ${
          isDark ? "text-white/[0.05]" : "text-black/[0.05]"
        }`}
      >
        CHROME SHINE &bull; GENIUS COMPOSITION &bull; 0.2s LOAD TIME ACCELERATION
      </div>
    </section>
  );
}

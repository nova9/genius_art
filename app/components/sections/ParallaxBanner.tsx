"use client";

import { useEffect, useRef } from "react";

export function ParallaxBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const forwardTextRef = useRef<HTMLDivElement>(null);
  const reverseTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const forwardText = forwardTextRef.current;
    const reverseText = reverseTextRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || !forwardText || !reverseText || reduceMotion) return;

    let animationId = 0;

    const updateParallax = () => {
      const bounds = section.getBoundingClientRect();
      const distanceFromCenter = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
      const offset = Math.max(-180, Math.min(180, distanceFromCenter * 0.18));

      forwardText.style.transform = `translate3d(${offset}px, 0, 0)`;
      reverseText.style.transform = `translate3d(${-offset}px, 0, 0)`;
      animationId = 0;
    };

    const requestUpdate = () => {
      if (!animationId) animationId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Imagination Unleashed"
      className="pointer-events-none relative overflow-hidden border-y border-white/5 bg-white/1 py-20"
    >
      <div
        ref={forwardTextRef}
        className="whitespace-nowrap text-6xl font-black uppercase tracking-[0.2em] text-white/3 will-change-transform select-none sm:text-9xl"
      >
        IMAGINATION UNLEASHED &bull; IMAGINATION UNLEASHED &bull; IMAGINATION UNLEASHED
      </div>
      <div
        ref={reverseTextRef}
        className="whitespace-nowrap pt-6 text-3xl font-black uppercase tracking-[0.25em] text-white/5 will-change-transform select-none sm:text-5xl"
      >
        IMAGINATION UNLEASHED &bull; IMAGINATION UNLEASHED &bull; IMAGINATION UNLEASHED
      </div>
    </section>
  );
}

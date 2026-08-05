interface ParallaxBannerProps { isDark: boolean; scrollY: number; }
export function ParallaxBanner({ isDark, scrollY }: ParallaxBannerProps) {
  return (
    <>
      {/* ---------------- SECTION 2: IMPRESSIVE PARALLAX TEXT WATERMARK ---------------- */}
      <section className={`relative py-20 overflow-hidden border-y pointer-events-none ${
        isDark ? "bg-white/[0.01] border-white/5" : "bg-black/[0.01] border-black/5"
      }`}>
        
        <div 
          className={`whitespace-nowrap select-none font-display font-black text-6xl sm:text-9xl tracking-[0.2em] transition-all uppercase ${
            isDark ? "text-white/[0.03]" : "text-black/[0.03]"
          }`}
          style={{ transform: `translateX(${(scrollY - 900) * 0.4}px)` }} // Moves left/right as the visitor scrolls!
        >
          IMAGINATION UNLEASHED &bull; METALLIC VECTORS &bull; WEBGL ACTIVE SHADERS
        </div>

        {/* Double-crossing reverse word layer */}
        <div 
          className={`whitespace-nowrap select-none font-display font-black text-3xl sm:text-5xl tracking-[0.25em] pt-6 uppercase ${
            isDark ? "text-white/[0.05]" : "text-black/[0.05]"
          }`}
          style={{ transform: `translateX(${(scrollY - 900) * -0.55}px)` }}
        >
          CHROME SHINE &bull; GENIUS COMPOSITION &bull; 0.2s LOAD TIME ACCELERATION
        </div>

      </section>

    </>
  );
}

import { Pause, Play, Sparkles } from "lucide-react";
import type { RefObject } from "react";

interface HeroSectionProps {
  isDark: boolean;
  scrollY: number;
  videoPlayState: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onVideoToggle: () => void;
}

export function HeroSection({
  isDark,
  scrollY,
  videoPlayState,
  videoRef,
  canvasRef,
  onVideoToggle,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-slate-900/60 select-none">
      <div
        className="absolute inset-0 z-0 pointer-events-none scale-105"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.38] brightness-[0.7] contrast-[1.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950" />
      </div>

      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.22}px)` }}
      >
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center relative z-10 space-y-8 pointer-events-auto"
        style={{ transform: `translateY(${scrollY * -0.12}px)` }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-1.5 font-sans font-bold text-[11px] uppercase tracking-[0.3em] bg-white/5 border border-white/10 rounded-full shadow-lg backdrop-blur-md text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-white/80 animate-spin" />
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
          <p className="text-xs sm:text-sm font-mono text-white/50 tracking-[0.4em] uppercase">
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
            Initiate Alliance
          </a>
          <a href="#portfolio" className={`px-8 py-4 rounded-full font-sans text-xs font-bold tracking-[0.2em] uppercase border transition-all ${
            isDark
              ? "bg-white/5 border-white/20 text-white hover:bg-white hover:text-black"
              : "bg-black/5 border-black/25 text-black hover:bg-black hover:text-white"
          }`}>
            Explore Masterpieces
          </a>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={onVideoToggle}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-300 bg-slate-950/60 border border-slate-800/85 rounded-lg backdrop-blur-sm transition-colors"
            title="Toggle cinematic background video"
          >
            {videoPlayState ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>{videoPlayState ? "PAUSE CINEMATIC MP4" : "PLAY VIDEO REEL"}</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-2" />
    </section>
  );
}

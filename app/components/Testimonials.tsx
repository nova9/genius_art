import React, { useState } from "react";
import { TestimonialItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  isDark: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, isDark }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // SVG avatar seed representation generator (generates premium styled illustrations of professionals)
  const renderAvatar = (seed: string) => {
    const isBlueIris = seed === "sophia";
    const bgGradient = isBlueIris
      ? "from-cyan-950 to-slate-900 border-cyan-500/40"
      : "from-[#1e293b] to-[#0f172a] border-slate-700/60";

    return (
      <div className={`relative h-14 w-14 shrink-0 rounded-full border bg-linear-to-tr p-0.5 shadow-md flex items-center justify-center ${bgGradient}`}>
        {/* Draw abstract geometric executive character */}
        <svg viewBox="0 0 40 40" className="w-10 h-10 overflow-visible">
          {/* Head & Torso */}
          <circle cx="20" cy="14" r="6" fill={isBlueIris ? "#00f0ff" : "#cbd5e1"} />
          <path d="M10 32 Q20 22 30 32" stroke={isBlueIris ? "#0284c7" : "#64748b"} strokeWidth="3" fill="none" />
          
          {/* Glowing cyber spectacles or target lenses matching our theme */}
          {isBlueIris ? (
            <g>
              <line x1="16" y1="13" x2="24" y2="13" stroke="#ffffff" strokeWidth="1" />
              <circle cx="17" cy="13" r="1.5" fill="#00f0ff" />
              <circle cx="23" cy="13" r="1.5" fill="#00f0ff" />
            </g>
          ) : (
            <circle cx="20" cy="14" r="1" fill="#ffffff" />
          )}
        </svg>
        {/* Overlay active verified tick */}
        <span className="absolute bottom-0 right-0 h-4.5 w-4.5 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-slate-950">
          <CheckCircle className="h-2.5 w-2.5 text-slate-950 font-bold" />
        </span>
      </div>
    );
  };

  const currentItem = testimonials[activeIndex] || testimonials[0];

  if (!currentItem) {
    return (
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center font-mono text-xs text-white/40 border border-white/10 rounded-3xl bg-white/2">
        <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white/30 animate-spin mb-3" />
        INITIALIZING RECOGNITION DATABASE...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Structural Headers */}
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
            <Quote className="h-3.3 w-3.3" />
            Active Partnerships
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-[0.95]">
            What Our{" "}
            <span className={`${isDark ? "chrome-text" : "chrome-text-light"}`}>
              Co-Creators State
            </span>
          </h3>
        </div>

        {/* Navigation Arrow buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className={`p-2.5 rounded-full border transition-all ${
              isDark 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" 
                : "bg-black/5 hover:bg-black/10 border-black/10 text-slate-800"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className={`p-2.5 rounded-full border transition-all ${
              isDark 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" 
                : "bg-black/5 hover:bg-black/10 border-black/10 text-slate-800"
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Testimonial Stage Panel with animations */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className={`p-6 md:p-8 rounded-3xl border relative max-w-4xl mx-auto ${
              isDark 
                ? "bg-white/3 border-white/10 carbon-mesh" 
                : "bg-black/1 border-black/10 shadow-lg carbon-mesh-light"
            }`}
          >
            {/* Elegant massive Quote symbol underlay */}
            <Quote className={`absolute top-6 right-8 h-24 w-24 opacity-[0.03] ${isDark ? "text-white" : "text-slate-900"}`} />

            <div className="flex flex-col md:flex-row gap-6 md:items-start items-center">
              {/* Left Side: Avatar seed visualizer */}
              {renderAvatar(currentItem.avatarSeed)}

              {/* Right Side: Copy and Star Rating */}
              <div className="space-y-4 flex-1 md:text-left text-center">
                
                {/* Stars list */}
                <div className="flex items-center md:justify-start justify-center gap-1 text-white/50">
                  {Array.from({ length: currentItem.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white stroke-white/40" />
                  ))}
                  <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase">
                    Pristine 5.0 Rating File
                  </span>
                </div>

                {/* Big Quote block text */}
                <blockquote className={`text-base md:text-xl font-sans italic font-semibold leading-relaxed tracking-tight ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }`}>
                  &ldquo;{currentItem.quote}&rdquo;
                </blockquote>

                {/* Author Credentials */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between pt-4 border-t border-white/15 gap-2">
                  <div>
                    <h5 className={`text-base font-extrabold uppercase tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentItem.author}
                    </h5>
                    <p className="text-xs font-mono text-slate-500">
                      {currentItem.role} &bull; <strong className="text-white font-normal">{currentItem.company}</strong>
                    </p>
                  </div>
                  
                  {/* Verified badge */}
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase self-center md:self-end">
                    VERIFIED PARTNER INDEX &bull; {currentItem.year}
                  </span>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? isDark ? "w-8 bg-white" : "w-8 bg-black"
                : isDark ? "w-2 bg-white/20 hover:bg-white/40" : "w-2 bg-black/10 hover:bg-black/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { PortfolioItem } from "../types";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Eye, X, Zap } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface PortfolioShowcaseProps {
  portfolio: PortfolioItem[];
  isDark: boolean;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ portfolio, isDark }) => {
  const shouldReduceMotion = useReducedMotion();
  const selectedCategory = "All";
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const searchQuery = "";
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [selectedProject]);

  const getYoutubeId = (url?: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/watch")) {
      const parts = url.split("?")[1] || "";
      const params = new URLSearchParams(parts);
      videoId = params.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    return videoId;
  };

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/watch")) {
      const parts = url.split("?")[1] || "";
      const params = new URLSearchParams(parts);
      videoId = params.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";
  };


  // Filter projects based on matching rules
  const filteredProjects = portfolio.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-8">
      {/* section header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 overflow-hidden border-b border-white/10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.04em] uppercase leading-[0.95]">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0.35, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mr-3 md:mr-4 inline-block"
            >
              Our
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? false : { x: 72 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.78, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${isDark ? "chrome-text" : "chrome-text-light"}`}
            >
              Masterpieces
            </motion.span>
          </h3>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0.3, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Every project represents a tailored collaboration leveraging high-contrast textures and deep audience empathy.
          </motion.p>
        </motion.div>
      </div>

      {/* Grid containing project cards */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item) => {
            return (
              <motion.div
                layout
                id={`portfolio-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => setSelectedProject(item)}
                className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                  isDark
                    ? "bg-white/3 border-white/10 hover:border-white/30 hover:bg-white/10 shadow-lg"
                    : "bg-black/1 border-black/10 hover:border-black/20 hover:bg-black/5 shadow-md"
                } hover:-translate-y-1`}
              >
                {/* Scaled/Reflective Image container with Hover details */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  {playingVideoId === item.id && item.videoUrl ? (
                    <>
                      <iframe
                        src={getYoutubeEmbedUrl(item.videoUrl)}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full absolute inset-0 z-10"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-slate-950/90 hover:bg-slate-950 text-white font-mono text-[10px] font-bold flex items-center justify-center transition-all border border-white/20 shadow-lg"
                        title="Close Video"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : hoveredCardId === item.id && item.videoUrl ? (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/${getYoutubeId(item.videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(item.videoUrl)}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full absolute inset-0 z-10 pointer-events-none scale-105"
                      />
                      
                      {/* Category Pill tag on preview image */}
                      <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-mono font-black text-white px-2.5 py-1 rounded-md z-20">
                        {item.category}
                      </span>

                      {/* Year Tag */}
                      <span className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md border border-white/5 text-[10px] uppercase tracking-wider font-mono text-white/60 px-2 py-0.5 rounded-md z-20">
                        {item.year}
                      </span>

                      {/* Hover Overlay featuring eye icon or stats summary */}
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
                        <div className="flex items-center justify-between gap-2 w-full mb-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/80">
                            <Eye className="h-3 w-3 animate-pulse" />
                            Click to inspect
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideoId(item.id);
                            }}
                            className="px-2.5 py-1 text-[10px] font-sans font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full flex items-center gap-1 tracking-wide uppercase transition-all shadow-md active:scale-95"
                          >
                            <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" stroke="none" />
                            </svg>
                            Play Reel
                          </button>
                        </div>
                        <h4 className="text-white text-base font-black font-display uppercase tracking-tight shadow-sm">
                          {item.title}
                        </h4>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover transform group-hover:scale-105 duration-500 ease-out brightness-[0.9] group-hover:brightness-100"
                      />
                      
                      {/* Category Pill tag on preview image */}
                      <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-mono font-black text-white px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>

                      {/* Year Tag */}
                      <span className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md border border-white/5 text-[10px] uppercase tracking-wider font-mono text-white/60 px-2 py-0.5 rounded-md">
                        {item.year}
                      </span>

                      {/* Hover Overlay featuring eye icon or stats summary */}
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        {item.videoUrl ? (
                          <div className="flex items-center justify-between gap-2 w-full mb-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/80">
                              <Eye className="h-3 w-3 animate-pulse" />
                              Click to inspect
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingVideoId(item.id);
                              }}
                              className="px-2.5 py-1 text-[10px] font-sans font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full flex items-center gap-1 tracking-wide uppercase transition-all shadow-md active:scale-95"
                            >
                              <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" stroke="none" />
                              </svg>
                              Play Reel
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/80 mb-1">
                            <Eye className="h-3 w-3 animate-pulse" />
                            Click to inspect specifications
                          </span>
                        )}
                        <h4 className="text-white text-base font-black font-display uppercase tracking-tight shadow-sm">
                          {item.title}
                        </h4>
                      </div>
                    </>
                  )}
                </div>

                {/* Core project copy info */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 tracking-wider block">
                      CLIENT / PARTNER
                    </span>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-extrabold uppercase tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                        {item.client}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono font-extrabold uppercase tracking-wide">
                        IMAGINATION OVERHAUL
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state handler if nothing matches search */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-2">
            <Zap className="h-8 w-8 text-amber-500 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold font-display text-slate-400">
              No matching masterpiece found
            </h4>
            <p className="text-xs text-slate-500">
              Check spelling or change selected service filters.
            </p>
          </div>
        )}
      </motion.div>

      {/* DETAILED PROJECT INSPECTION DRAWER MODAL */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 md:p-6">
              <motion.button
                type="button"
                aria-label="Close project viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 h-full w-full cursor-default bg-slate-950/90 backdrop-blur-sm"
              />

              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-dialog-title-${selectedProject.id}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 16 }}
                transition={shouldReduceMotion
                  ? { duration: 0.1 }
                  : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
                }
                className={`relative z-10 flex h-[100svh] w-full max-w-6xl flex-col overflow-y-auto overscroll-contain shadow-[0_32px_100px_rgba(0,0,0,0.65)] sm:h-auto sm:max-h-[calc(100svh-2rem)] sm:rounded-2xl ${
                  isDark ? "bg-slate-900 text-white" : "bg-white text-slate-950"
                }`}
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black">
                  {selectedProject.videoUrl ? (
                    <iframe
                      src={getYoutubeEmbedUrl(selectedProject.videoUrl)}
                      title={`${selectedProject.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      priority
                      sizes="(min-width: 1280px) 1152px, 100vw"
                      className="object-cover"
                    />
                  )}

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/70 to-transparent" />
                  <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300 sm:left-4 sm:top-4 sm:text-xs">
                    {selectedProject.category}
                  </span>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project viewer"
                    className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-[0_4px_18px_rgba(0,0,0,0.4)] transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:right-4 sm:top-4"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid gap-6 p-5 text-left sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:p-8">
                  <div className="min-w-0 space-y-4">
                    <div className="space-y-2">
                      <h4
                        id={`project-dialog-title-${selectedProject.id}`}
                        className="text-balance font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl md:text-5xl"
                      >
                        {selectedProject.title}
                      </h4>
                      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                        <span className={isDark ? "font-semibold text-white" : "font-semibold text-slate-950"}>
                          {selectedProject.client}
                        </span>
                        <span aria-hidden="true" className="text-cyan-400">/</span>
                        <span>{selectedProject.year}</span>
                      </div>
                    </div>

                    <p className={`max-w-[70ch] text-sm leading-6 sm:text-base sm:leading-7 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}>
                      {selectedProject.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:w-auto ${
                      isDark
                        ? "bg-white/10 text-white hover:bg-white/15"
                        : "bg-slate-100 text-slate-950 hover:bg-slate-200"
                    }`}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Close viewer
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}

    </div>
  );
};

import React, { useState } from "react";
import { PortfolioItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Briefcase, Award, ArrowUpRight, Search, Eye, X, Zap, Video } from "lucide-react";

interface PortfolioShowcaseProps {
  portfolio: PortfolioItem[];
  isDark: boolean;
  onUpdatePortfolio?: (updated: PortfolioItem[]) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ portfolio, isDark, onUpdatePortfolio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeEditVideoId, setActiveEditVideoId] = useState<string | null>(null);
  const [tempVideoUrl, setTempVideoUrl] = useState("");

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

  const handleVideoUrlUpdate = (id: string, newUrl: string) => {
    const updated = portfolio.map((item) => {
      if (item.id === id) {
        return { ...item, videoUrl: newUrl || undefined };
      }
      return item;
    });
    if (onUpdatePortfolio) {
      onUpdatePortfolio(updated);
    }
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject({ ...selectedProject, videoUrl: newUrl || undefined });
    }
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

  const categories = ["All", "Digital Campaign", "Cinematic Reel", "Brand Identity", "Cinematic AI Reel"];

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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-[0.95]">
            <span className="mr-3 md:mr-4 inline-block">Our</span>
            <span className={`${isDark ? "chrome-text" : "chrome-text-light"}`}>
              Masterpieces
            </span>
          </h3>
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Every project represents a tailored collaboration leveraging high-contrast textures and deep audience empathy.
          </p>
        </div>
      </div>

      {/* Grid containing project cards */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item, index) => {
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

                      {/* Quiet active indication */}
                      <div className="absolute top-3 right-16 px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-mono text-[8px] font-black uppercase tracking-wider z-20 flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-slate-950 animate-ping" />
                        PREVIEW
                      </div>

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
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
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
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop backing layer */}
            <motion.div
              layoutId="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Card frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="relative">
                {/* Spectacular Banner Header */}
                <div className="h-56 relative bg-slate-950">
                  {selectedProject.videoUrl ? (
                    <iframe
                      src={getYoutubeEmbedUrl(selectedProject.videoUrl)}
                      title={selectedProject.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full absolute inset-0 z-0"
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-75"
                    />
                  )}
                  {/* Category overlay */}
                  <span className="absolute bottom-4 left-4 bg-slate-950 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-md">
                    {selectedProject.category}
                  </span>
                  
                  {/* Close btn */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body elements */}
                <div className="p-6 md:p-8 space-y-5 text-left">
                  {/* Title & Client metadata */}
                  <div className="space-y-1.5">
                    <h4 className="text-2xl md:text-3xl font-display font-bold">
                      {selectedProject.title}
                    </h4>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Client: <strong className={isDark ? "text-white" : "text-black"}>{selectedProject.client}</strong> &bull; Released: {selectedProject.year}
                    </p>
                  </div>

                  {/* Description text */}
                  <div>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* CTA click close bar */}
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isDark 
                          ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" 
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

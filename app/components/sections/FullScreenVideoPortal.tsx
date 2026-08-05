import React, { useState } from "react";
import { Play, Pause, Maximize2, X, Video, RefreshCw, Check, AppWindow } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FullScreenVideoPortalProps {
  isDark: boolean;
  videoUrl?: string;
  onUpdateVideo: (url: string) => void;
}

export const FullScreenVideoPortal: React.FC<FullScreenVideoPortalProps> = ({
  isDark,
  videoUrl = "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L",
  onUpdateVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputValue, setInputValue] = useState(videoUrl);
  const [isSaved, setIsSaved] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  React.useEffect(() => {
    setInputValue(videoUrl);
  }, [videoUrl]);

  const getYoutubeId = (url: string) => {
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

  const youtubeId = getYoutubeId(videoUrl);
  const embedUrl = youtubeId 
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`
    : "";

  const handleSave = () => {
    onUpdateVideo(inputValue.trim());
    setIsSaved(true);
    setIsPlaying(false);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className={`w-full py-16 md:py-24 border-t transition-all duration-300 ${
      isDark ? "bg-[#030712] border-white/5" : "bg-slate-50 border-slate-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Design Architecture Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-extrabold uppercase tracking-widest">
              <Video className="h-3.5 w-3.5" />
              Show reel
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-[0.95]">
              Our Masterpieces{" "}
              <span className={`${isDark ? "chrome-text" : "chrome-text-light"}`}>
                in 30 Seconds
              </span>
            </h3>
            

          </div>

          {/* Quick configure controls */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Paste YouTube Link..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsSaved(false);
                }}
                className={`w-full sm:w-64 px-4 py-3 rounded-xl border focus:outline-none text-xs font-mono transition-all ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500"
                    : "bg-white border-slate-250 text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500"
                }`}
                aria-label="YouTube Link Input"
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue("")}
                  className="absolute right-2 px-1 text-slate-500 hover:text-slate-200"
                  title="Clear input"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={!inputValue || inputValue === videoUrl}
              className={`px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : !inputValue || inputValue === videoUrl
                  ? "bg-slate-500/10 border border-slate-300/10 text-slate-500 cursor-not-allowed"
                  : isDark
                  ? "bg-[#0d1527] border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-slate-900 border border-slate-200 text-white hover:bg-black"
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Saved
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Update Video
                </>
              )}
            </button>
          </div>
        </div>

        {/* Media Frame Viewer */}
        <div className="max-w-5xl mx-auto w-full group relative">
          
          {/* Beveled glowing outer capsule */}
          <div className={`relative rounded-3xl overflow-hidden border aspect-video shadow-2xl transition-all duration-500 ${
            isDark 
              ? "bg-slate-950 border-white/10 hover:border-cyan-500/30 shadow-cyan-500/5" 
              : "bg-white border-slate-250 hover:border-blue-500/30 shadow-slate-200"
          }`}>
            
            {/* Ambient inner grid overlay for texture */}
            <div className="absolute inset-0 bg-transparent pointer-events-none z-10 select-none opacity-20" 
                 style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            {/* Video embed overlay */}
            {isPlaying && youtubeId ? (
              <iframe
                src={embedUrl}
                title="Cinematic projection"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full absolute inset-0 z-20"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40">
                
                {/* Visual Thumbnail or fallback banner and graphics */}
                {youtubeId ? (
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                    alt="Projection snapshot thumbnail"
                    onError={(e) => {
                      // Fallback just in case maxresdefault fails for short links or custom uploads
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80";
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-slate-900 to-blue-950/20" />
                )}

                <div className="text-center space-y-6 max-w-lg">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mx-auto h-16 w-16 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Play className="h-6 w-6 fill-current translate-x-0.5 text-slate-950" />
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                      SYSTEM COMPLIANT MEDIA READY
                    </p>
                    <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      {youtubeId ? "Click to play custom showcase reel" : "No active stream configured"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Format: YouTube video link &bull; Resolution: Dynamic Scaling &bull; Frame: Cinematic 16:9
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick action: Theater projection */}
            {youtubeId && (
              <button
                onClick={() => setTheaterMode(true)}
                className="absolute bottom-4 right-4 z-30 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-black/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/20 transition-all flex items-center gap-1.5"
                title="Open inside immersive Theater Mode"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Fullscreen Theater Panel
              </button>
            )}

            {/* Inline play indicator tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1 text-[9px] font-mono rounded bg-black/80 text-cyan-400 border border-cyan-500/30">
              <span className={`h-1.5 w-1.5 rounded-full bg-cyan-400 ${isPlaying ? "animate-ping" : ""}`} />
              <span>{isPlaying ? "PROJECTING ACTIVE WAVEFRONT" : "PORTAL IDLE"}</span>
            </div>
            
          </div>
        </div>

        {/* Technical Subtext specifications */}
        <div className="text-center font-mono text-[9px] text-slate-500 uppercase tracking-widest max-w-5xl mx-auto w-full flex flex-col sm:flex-row justify-between gap-3 pt-2">
          <span>PORTAL ACTIVE FEED: {youtubeId ? `YT_NODE_${youtubeId.toUpperCase()}` : "NONE"}</span>
          <span>SYSTEM ENCRYPTION MATRIX CONFORMS TO LOCAL CACHE ENGINES</span>
          <span>STREAM STATUS: ONLINE</span>
        </div>

      </div>

      {/* IMMERSIVE THEATER MODAL OVERLAY */}
      <AnimatePresence>
        {theaterMode && youtubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-6 md:p-10 select-none select-none"
            onClick={() => setTheaterMode(false)}
          >
            {/* Elegant Top Bar Control */}
            <div className="flex items-center justify-between gap-6 relative z-10 w-full" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  SECURE THEATER INJECTION
                </span>
                <h4 className="text-white text-base md:text-lg font-display font-black uppercase tracking-tight">
                  IMAGINATION PROJECTION REEL
                </h4>
              </div>
              
              <button
                onClick={() => setTheaterMode(false)}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center text-white"
                title="Exit theater"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Immersive centered aspect-video container */}
            <div className="flex-1 w-full flex items-center justify-center max-w-6xl mx-auto px-2" onClick={(e) => e.stopPropagation()}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 w-full aspect-video shadow-2xl bg-slate-950">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                  title="Fullscreen Interactive Theater Projection Reel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 z-10"
                />
              </div>
            </div>

            {/* Elegant footer bar specs */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/40 gap-4 uppercase tracking-widest pt-2 relative z-10" onClick={(e) => e.stopPropagation()}>
              <span>CINEMATIC AUDIO ARRAY OPTIMIZED FOR THEATER PLAYBACK</span>
              <span className="text-cyan-400 md:animate-pulse">PRESS &quot;ESC&quot; OR TAP CLOSE BUTTON TO RETURN</span>
              <span>GENIUS ART CAMPAIGN SYSTEM 2026</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

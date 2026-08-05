import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Film, Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

interface CinematicShowcaseProps {
  isDark: boolean;
}

export function CinematicShowcase({ isDark }: CinematicShowcaseProps) {
  // --- CINEMATIC SHOWCASE VIDEO PLAYER ENGAGEMENT ENGINE ---
  const [showcasePlayState, setShowcasePlayState] = useState(false);
  const [showcaseMuted, setShowcaseMuted] = useState(true);
  const [showcaseVolume, setShowcaseVolume] = useState(0.85);
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [showcaseDuration, setShowcaseDuration] = useState(0);
  const [showcaseCurrentTime, setShowcaseCurrentTime] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  const showcaseVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  const SHOWCASE_VIDEOS = [
    {
      id: "shop-branding-3d",
      title: "3D Shop Branding & Retail Design",
      desc: "Immersive architectural prototyping, space branding, and visual identity mapping",
      url: "https://www.youtube.com/embed/RdQyIS-mvcw",
      isYoutube: true,
      youtubeId: "RdQyIS-mvcw",
      resolution: "3840 x 2160 (Ultra HD)",
      bitrate: "VBR Adaptive",
      fps: "60 FPS"
    },
    {
      id: "space-odyssey",
      title: "Cosmic Odyssey Reel",
      desc: "Infinite spatial topology and galactic particle density arrays",
      url: "https://player.vimeo.com/external/371433846.hd.mp4?s=231773fa99e691815e11f841145a34799049e9cf&profile_id=174&oauth2_token_id=57447761",
      resolution: "3840 x 2160 (Cinema 4K)",
      bitrate: "24.5 Mbps",
      fps: "60 FPS"
    },
    {
      id: "organic-liquid",
      title: "Metallic Fluid Gravity",
      desc: "Organic Chrome fluid-dynamic simulation under active pressure fields",
      url: "https://player.vimeo.com/external/459389137.hd.mp4?s=87d39a06fa4573a098c869405f63901b0f19c08d&profile_id=170&oauth2_token_id=57447761",
      resolution: "3840 x 2160 (Cinema 4K)",
      bitrate: "32.0 Mbps",
      fps: "60 FPS"
    }
  ];

  const handleShowcasePlayPause = () => {
    const video = SHOWCASE_VIDEOS[activeVideoIndex];
    if (video.isYoutube) {
      setShowcasePlayState(!showcasePlayState);
    } else if (showcaseVideoRef.current) {
      if (showcasePlayState) {
        showcaseVideoRef.current.pause();
      } else {
        showcaseVideoRef.current.play().catch(e => console.warn("Showcase playback failed", e));
      }
      setShowcasePlayState(!showcasePlayState);
    }
  };

  const handleShowcaseMuteToggle = () => {
    const video = SHOWCASE_VIDEOS[activeVideoIndex];
    if (video.isYoutube) {
      setShowcaseMuted(!showcaseMuted);
    } else if (showcaseVideoRef.current) {
      const nextMute = !showcaseMuted;
      showcaseVideoRef.current.muted = nextMute;
      setShowcaseMuted(nextMute);
    }
  };

  const handleShowcaseVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setShowcaseVolume(vol);
    const video = SHOWCASE_VIDEOS[activeVideoIndex];
    if (!video.isYoutube && showcaseVideoRef.current) {
      showcaseVideoRef.current.volume = vol;
      showcaseVideoRef.current.muted = vol === 0;
      setShowcaseMuted(vol === 0);
    } else {
      setShowcaseMuted(vol === 0);
    }
  };

  const handleShowcaseProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setShowcaseProgress(val);
    const video = SHOWCASE_VIDEOS[activeVideoIndex];
    if (!video.isYoutube && showcaseVideoRef.current && showcaseDuration) {
      const newTime = (val / 100) * showcaseDuration;
      showcaseVideoRef.current.currentTime = newTime;
      setShowcaseCurrentTime(newTime);
    } else if (video.isYoutube) {
      setShowcaseCurrentTime((val / 100) * 120); // Simulated progress for YouTube indicator
    }
  };

  const handleShowcaseTimeUpdate = () => {
    if (showcaseVideoRef.current) {
      const current = showcaseVideoRef.current.currentTime;
      const dur = showcaseVideoRef.current.duration || 0;
      setShowcaseCurrentTime(current);
      setShowcaseDuration(dur);
      if (dur > 0) {
        setShowcaseProgress((current / dur) * 100);
      }
    }
  };

  const formatShowcaseTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const changeShowcaseVideoIndex = (idx: number) => {
    setActiveVideoIndex(idx);
    setShowcaseProgress(0);
    setShowcaseCurrentTime(0);
    const video = SHOWCASE_VIDEOS[idx];
    if (video.isYoutube) {
      setShowcasePlayState(true);
      setShowcaseDuration(120); // 2 minutes simulated length for timeline specs
    } else {
      setShowcasePlayState(false);
      setTimeout(() => {
        if (showcaseVideoRef.current) {
          showcaseVideoRef.current.src = video.url;
          // Autoplay selected track
          const playPromise = showcaseVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setShowcasePlayState(true))
              .catch(err => console.warn("Autoplay prevented", err));
          }
        }
      }, 50);
    }
  };

  const toggleShowcaseFullscreen = () => {
    setIsFullscreenMode(!isFullscreenMode);
  };

  return (
    <>
      {/* ---------------- NEW CINEMATIC FULLSCREEN SHOWCASE VIDEO PLAYER ---------------- */}
      <section className={`py-16 md:py-24 border-b relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#020408]/40 border-white/10" : "bg-slate-100/50 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono rounded-full border border-cyan-500/35 bg-cyan-500/5 text-cyan-400 font-bold uppercase tracking-wider">
                <Film className="h-3 w-3 animate-pulse" />
                Active Media Showcase
              </div>
            </div>

            {/* Quick Actions: Enable Simulated Full Theater */}
            <div className="text-left">
              <button
                onClick={toggleShowcaseFullscreen}
                className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all duration-300 ${
                  isDark
                    ? "bg-[#0a0f1d] border-cyan-500/20 text-cyan-400 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-white border-slate-300 text-slate-700 hover:border-slate-500 hover:shadow-lg"
                }`}
              >
                <Maximize2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Launch Full Screen Theater</span>
              </button>
            </div>
          </div>

          {/* Interactive Player Frame */}
          <div className="max-w-5xl mx-auto w-full">
            
            {/* Player Main Viewport Panel */}
            <div className="flex flex-col justify-between">
              
              {/* Outer Beveled Cybercard */}
              <div 
                ref={showcaseContainerRef}
                className={`relative group rounded-3xl overflow-hidden border aspect-video shadow-2xl transition-all duration-300 ${
                  isDark ? "bg-slate-950 border-white/10" : "bg-white border-slate-200"
                }`}
              >
                {/* 3D Accent Lines (Hover Effect) */}
                <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/10 rounded-3xl pointer-events-none transition-colors z-20" />
                
                {/* HTML5 Video or YouTube Iframe Layer */}
                {SHOWCASE_VIDEOS[activeVideoIndex].isYoutube ? (
                  showcasePlayState ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}?autoplay=1&mute=${showcaseMuted ? 1 : 0}&loop=1&playlist=${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}&controls=1&rel=0&modestbranding=1`}
                      title={SHOWCASE_VIDEOS[activeVideoIndex].title}
                      className="w-full h-full object-cover bg-black border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full group/yt overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}/maxresdefault.jpg`}
                        alt={SHOWCASE_VIDEOS[activeVideoIndex].title}
                        className="w-full h-full object-cover cursor-pointer group-hover/yt:scale-105 transition-transform duration-700"
                        onClick={() => setShowcasePlayState(true)}
                      />
                    </div>
                  )
                ) : (
                  <video
                    ref={showcaseVideoRef}
                    src={SHOWCASE_VIDEOS[activeVideoIndex].url}
                    autoPlay={false}
                    loop
                    muted={showcaseMuted}
                    onTimeUpdate={handleShowcaseTimeUpdate}
                    onClick={handleShowcasePlayPause}
                    className="w-full h-full object-cover cursor-pointer bg-black"
                  />
                )}

                {/* Simulated Overlay Status Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1 text-[9px] font-mono rounded bg-black/80 text-cyan-400 border border-cyan-500/30">
                  <span className={`h-1.5 w-1.5 rounded-full bg-cyan-400 ${showcasePlayState ? "animate-ping" : ""}`} />
                  <span>{showcasePlayState ? "RENDER: ACTIVE" : "PLAYBACK: PAUSED"}</span>
                </div>

                {/* Simulated Overlay Video Resolution Specs */}
                <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-2.5 py-1 text-[9px] font-mono rounded bg-black/80 text-white/50 border border-white/10">
                  <span>{SHOWCASE_VIDEOS[activeVideoIndex].resolution}</span>
                  <span className="text-white/20">|</span>
                  <span>{SHOWCASE_VIDEOS[activeVideoIndex].fps}</span>
                </div>

                {/* Big Center Play Overlay (when paused) */}
                <AnimatePresence>
                  {!showcasePlayState && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setShowcasePlayState(true)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
                    >
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                        <Play className="h-8 w-8 text-cyan-400 fill-cyan-400 translate-x-0.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CONTROL BAR (Bottom anchor) */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 md:p-6 space-y-3">
                  
                  {/* Progress bar controller */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-white/70 min-w-[32px]">
                      {formatShowcaseTime(showcaseCurrentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.05"
                      value={showcaseProgress}
                      onChange={handleShowcaseProgressChange}
                      className="flex-1 accent-cyan-400 h-1 rounded bg-white/20 appearance-none cursor-pointer hover:h-1.5 transition-all"
                      aria-label="Seek video duration"
                    />
                    <span className="text-[10px] font-mono text-white/45 min-w-[32px]">
                      {formatShowcaseTime(showcaseDuration)}
                    </span>
                  </div>

                  {/* Playback Controls & Utility Row */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    
                    {/* Play/Pause & Mute/Volume controls */}
                    <div className="flex items-center gap-4">
                      
                      {/* Play Action */}
                      <button
                        onClick={handleShowcasePlayPause}
                        className="text-white hover:text-cyan-400 transition-colors p-1"
                        title={showcasePlayState ? "Pause playback" : "Start playback"}
                      >
                        {showcasePlayState ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5 fill-current" />
                        )}
                      </button>

                      {/* Mute toggle button and mini-slider */}
                      <div className="flex items-center gap-2 group/volume">
                        <button
                          onClick={handleShowcaseMuteToggle}
                          className="text-white hover:text-cyan-400 transition-colors p-1"
                          title={showcaseMuted ? "Unmute sound" : "Mute sound"}
                        >
                          {showcaseMuted || showcaseVolume === 0 ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={showcaseVolume}
                          onChange={handleShowcaseVolumeChange}
                          className="w-16 sm:w-20 accent-cyan-400 h-1 rounded bg-white/20 appearance-none cursor-pointer transition-opacity"
                          aria-label="Adjust audio volume"
                        />
                      </div>

                    </div>

                    {/* Right-hand specs & immersive views togglers */}
                    <div className="flex items-center gap-4">
                      
                      {/* Active video index pointer label */}
                      <span className="hidden sm:inline font-mono text-[10px] text-white/60 uppercase tracking-widest">
                        TRACK {activeVideoIndex + 1}/{SHOWCASE_VIDEOS.length}
                      </span>

                      {/* Direct viewport launcher button */}
                      <button
                        onClick={toggleShowcaseFullscreen}
                        className="text-white hover:text-cyan-400 transition-colors p-1"
                        title="Simulate theater viewing"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FULL-WINDOW FIXED IMMERSIVE THEATER MODAL */}
      <AnimatePresence>
        {isFullscreenMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#020408]/98 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 outline-none text-left"
          >
            {/* Top exit and header bar */}
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase block">IMMERSIVE CINEMA SCREEN</span>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  {SHOWCASE_VIDEOS[activeVideoIndex].title}
                </h4>
              </div>
              
              <button
                onClick={toggleShowcaseFullscreen}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-xl border border-white/10 flex items-center gap-2 uppercase tracking-widest transition-all"
              >
                <X className="h-4 w-4" />
                <span>Exit Space</span>
              </button>
            </div>

            {/* Immersive Video Center Viewport */}
            <div className="flex-1 max-w-5xl mx-auto w-full flex items-center justify-center my-6">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-black">
                
                {SHOWCASE_VIDEOS[activeVideoIndex].isYoutube ? (
                  showcasePlayState ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}?autoplay=1&mute=${showcaseMuted ? 1 : 0}&loop=1&playlist=${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}&controls=1&rel=0`}
                      title={SHOWCASE_VIDEOS[activeVideoIndex].title}
                      className="w-full h-full object-cover border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ maxHeight: "70vh" }}
                    />
                  ) : (
                    <div className="relative w-full h-full cursor-pointer" onClick={() => setShowcasePlayState(true)}>
                      <img
                        src={`https://img.youtube.com/vi/${SHOWCASE_VIDEOS[activeVideoIndex].youtubeId}/maxresdefault.jpg`}
                        alt={SHOWCASE_VIDEOS[activeVideoIndex].title}
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                        style={{ maxHeight: "70vh" }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center hover:scale-105 transition-transform">
                          <Play className="h-8 w-8 text-cyan-400 fill-cyan-400 translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <video
                    src={SHOWCASE_VIDEOS[activeVideoIndex].url}
                    autoPlay={showcasePlayState}
                    loop
                    muted={showcaseMuted}
                    onTimeUpdate={handleShowcaseTimeUpdate}
                    onClick={handleShowcasePlayPause}
                    className="w-full h-full object-cover cursor-pointer"
                    style={{ maxHeight: "70vh" }}
                  />
                )}

                {/* Subtitle / Ambient Branding Overlay */}
                <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none max-w-lg px-4 space-y-2 z-10">
                  <motion.p
                    key={activeVideoIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.85, y: 0 }}
                    className="text-xs sm:text-sm text-cyan-400 font-mono tracking-wider font-semibold uppercase bg-black/75 px-4 py-2 rounded-xl"
                  >
                    {SHOWCASE_VIDEOS[activeVideoIndex].desc}
                  </motion.p>
                </div>

                {/* Overlay controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent p-4 sm:p-6 space-y-2.5">
                  {/* Progress tracker */}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-white/50">{formatShowcaseTime(showcaseCurrentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.05"
                      value={showcaseProgress}
                      onChange={handleShowcaseProgressChange}
                      className="flex-1 accent-cyan-400 h-1 rounded bg-white/20 appearance-none cursor-pointer"
                      aria-label="Seek video duration"
                    />
                    <span className="text-[9px] font-mono text-white/50">{formatShowcaseTime(showcaseDuration)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button onClick={handleShowcasePlayPause} className="text-white hover:text-cyan-400 p-1">
                        {showcasePlayState ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                      </button>

                      <div className="flex items-center gap-2">
                        <button onClick={handleShowcaseMuteToggle} className="text-white hover:text-cyan-400 p-1">
                          {showcaseMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={showcaseVolume}
                          onChange={handleShowcaseVolumeChange}
                          className="w-16 accent-cyan-400 h-1 bg-white/20 appearance-none cursor-pointer"
                          aria-label="Adjust audio volume"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {SHOWCASE_VIDEOS.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => changeShowcaseVideoIndex(idx)}
                          className={`px-3 py-1 text-[9px] font-mono rounded border transition-colors ${
                            activeVideoIndex === idx
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          T{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Immersive bottom specs footer */}
            <div className="text-center font-mono text-[9px] text-white/40 uppercase tracking-widest max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between gap-3">
              <span>ACTIVE SYSTEM: RENDER_NODE_SECURE: OK</span>
              <span>GENIUS ART CREATIVE DIGITAL ALLIANCE &bull; SRI LANKA 2026</span>
              <span>STREAM STATUS: ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

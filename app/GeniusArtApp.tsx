"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { ServiceItem, PortfolioItem, TestimonialItem } from "./types";
import { initializeCacheStore, saveCacheStore } from "./lib/cache";
import {
  CapabilitiesSection,
  CinematicShowcase,
  ContactSection,
  FullScreenVideoPortal,
  HeroSection,
  ParallaxBanner,
  PortfolioSection,
  SiteFooter,
  SiteHeader,
  TestimonialsSection,
} from "./components/sections";

export default function App() {
  // Theme & interactive global states
  const [isDark, setIsDark] = useState(true);
  const [videoPlayState, setVideoPlayState] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cached datasets
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [portalVideoUrl, setPortalVideoUrl] = useState<string>("");

  const handleUpdatePortfolio = (updatedPortfolio: PortfolioItem[]) => {
    setPortfolio(updatedPortfolio);
    const store = initializeCacheStore();
    store.portfolio = updatedPortfolio;
    saveCacheStore(store);
  };

  const handleUpdatePortalVideo = (newUrl: string) => {
    setPortalVideoUrl(newUrl);
    const store = initializeCacheStore();
    store.settings.portalVideoUrl = newUrl;
    saveCacheStore(store);
  };

  // Video and Canvas Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Hydrate Cache & settings on first mount
  useEffect(() => {
    const store = initializeCacheStore();
    setServices(store.services);
    setPortfolio(store.portfolio);
    setTestimonials(store.testimonials);
    setPortalVideoUrl(store.settings.portalVideoUrl || "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L");
    setIsDark(store.settings.theme === "dark");

    // Track scroll event for parallax calculations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HTML5 Particle Starfield Fallback Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // Watch resize
    const handleCanvasResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleCanvasResize);

    // Particle schema
    const particleCount = 60;
    const particles: {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      glowing: boolean;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedY: (Math.random() * 0.3 + 0.1) * -1, // floating upwards
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        glowing: Math.random() > 0.7
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint structural grid background to echo the carbon mesh theme from images
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.015)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render and update stars
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Custom neon cyan or white glow
        if (p.glowing) {
          ctx.fillStyle = isDark ? `rgba(0, 240, 255, ${p.opacity})` : `rgba(30, 144, 255, ${p.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = isDark ? "#00f0ff" : "#1e90ff";
        } else {
          ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${p.opacity})` : `rgba(15, 23, 42, ${p.opacity / 2})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Move
        p.y += p.speedY;
        p.x += p.speedX;

        // Loop boundaries. If float past top, reappear at bottom
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleCanvasResize);
    };
  }, [isDark]);

  // Video state toggle
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoPlayState) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.warn("Video failed auto-play reactivation", e));
      }
      setVideoPlayState(!videoPlayState);
    }
  };

  // Toggle Theme state & persist to local caching settings
  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const store = initializeCacheStore();
    store.settings.theme = newTheme ? "dark" : "light";
    saveCacheStore(store);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      isDark ? "bg-slate-950 text-slate-100 carbon-mesh" : "bg-slate-50 text-slate-800 carbon-mesh-light"
    }`}>
      
      <SiteHeader
        isDark={isDark}
        mobileMenuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMenuClose={() => setMobileMenuOpen(false)}
        onThemeChange={handleThemeChange}
      />

      <HeroSection
        isDark={isDark}
        scrollY={scrollY}
        videoPlayState={videoPlayState}
        videoRef={videoRef}
        canvasRef={canvasRef}
        onVideoToggle={toggleVideoPlay}
      />

      <CinematicShowcase isDark={isDark} />

      <CapabilitiesSection services={services} isDark={isDark} />

      <FullScreenVideoPortal
        isDark={isDark}
        videoUrl={portalVideoUrl}
        onUpdateVideo={handleUpdatePortalVideo}
      />

      <ParallaxBanner isDark={isDark} scrollY={scrollY} />
      <PortfolioSection portfolio={portfolio} isDark={isDark} onUpdatePortfolio={handleUpdatePortfolio} />
      <TestimonialsSection testimonials={testimonials} isDark={isDark} />
      <ContactSection services={services} isDark={isDark} />
      <SiteFooter isDark={isDark} />

    </div>
  );
}

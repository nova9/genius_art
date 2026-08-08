"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ServiceItem, PortfolioItem } from "./types";
import { initializeCacheStore, saveCacheStore } from "./lib/cache";
import {
  ApproachSection,
  CapabilitiesSection,
  ContactSection,
  FullScreenVideoPortal,
  HeroSection,
  ParallaxBanner,
  PortfolioSection,
  SiteFooter,
  SiteHeader,
} from "./components/sections";

export default function App() {
  // Theme & interactive global states
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cached datasets
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [portalVideoUrl, setPortalVideoUrl] = useState<string>("");

  // Hydrate Cache & settings on first mount
  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const store = initializeCacheStore();
      setServices(store.services);
      setPortfolio(store.portfolio);
      setPortalVideoUrl(store.settings.portalVideoUrl || "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L");
      setIsDark(store.settings.theme === "dark");
    }, 0);

    // Track scroll event for parallax calculations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(hydrationTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      />

      <FullScreenVideoPortal
        isDark={isDark}
        immersive
        showHeading={false}
        backgroundVideoUrl="/video/hero.mp4"
        overlayEyebrow="A Cinematic Journey"
        overlayTitle="Imagination Unleashed"
        overlayDescription="Watch imagination take flight as strategy, creativity and cinematic AI come together."
        videoUrl="https://youtu.be/RdQyIS-mvcw"
        thumbnailUrl="https://img.youtube.com/vi/RdQyIS-mvcw/maxresdefault.jpg"
      />

      <CapabilitiesSection services={services} isDark={isDark} />

      <ApproachSection isDark={isDark} />

      <FullScreenVideoPortal
        isDark={isDark}
        videoUrl={portalVideoUrl}
        thumbnailUrl="https://img.youtube.com/vi/OqRClNpVqZw/maxresdefault.jpg"
        headingSuffix="in a Minute"
      />

      <ParallaxBanner isDark={isDark} />
      <PortfolioSection portfolio={portfolio} isDark={isDark} />
      <ContactSection isDark={isDark} />
      <SiteFooter isDark={isDark} />

    </div>
  );
}

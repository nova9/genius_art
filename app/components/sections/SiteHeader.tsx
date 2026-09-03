"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import geniusArtLogo from "../../assets/images/logo.png";

const links = [
  ["#portfolio", "Work"],
  ["#capabilities", "Services"],
  ["#approach", "Approach"],
] as const;

const startProjectLabel = "Contact Us";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    let animationFrame = 0;
    lastScrollY.current = window.scrollY;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (mobileMenuOpen || currentScrollY < 48) {
        setHeaderVisible(true);
      } else if (scrollDelta > 8) {
        setHeaderVisible(false);
      } else if (scrollDelta < -8) {
        setHeaderVisible(true);
      }

      if (Math.abs(scrollDelta) > 8 || currentScrollY < 48) {
        lastScrollY.current = currentScrollY;
      }
      animationFrame = 0;
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{ y: headerVisible || mobileMenuOpen ? "0%" : "-125%" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
      }
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-2 text-white md:px-6 md:pt-5"
    >
      <div className="pointer-events-auto relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-xl bg-[#08090c]/90 px-1 shadow-[0_18px_55px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.11)] backdrop-blur-xl md:h-[4.5rem] md:rounded-2xl md:px-3">
        <a
          href="#"
          id="brand-logo-link"
          onClick={closeMobileMenu}
          className="group flex h-full items-center rounded-lg px-2 outline-none focus-visible:bg-white/10 md:rounded-xl md:px-4"
          aria-label="Genius arT — back to top"
        >
          <Image
            src={geniusArtLogo}
            alt="Genius arT"
            className="h-8 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025] md:h-10"
          />
        </a>

        <nav
          className="hidden h-full items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="group relative rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65 outline-none transition-colors duration-300 hover:bg-white/7 hover:text-white focus-visible:bg-white/10 focus-visible:text-white lg:px-5"
            >
              <span>{label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-cyber-blue transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 lg:inset-x-5"
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href="#alliance"
            className="group flex items-center gap-3 rounded-xl bg-cyber-blue px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#02080a] outline-none transition-colors duration-300 hover:bg-white focus-visible:bg-white lg:px-6"
          >
            <span>{startProjectLabel}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg text-white outline-none hover:text-cyber-blue focus-visible:text-cyber-blue md:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/6 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Menu className="h-4.5 w-4.5" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+0.375rem)] overflow-hidden rounded-xl bg-[#08090c]/96 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.11)] backdrop-blur-xl md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pb-2 pt-1">
                {links.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className="group flex items-center justify-between rounded-xl px-3 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white/75 outline-none transition-colors hover:bg-white/7 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-white/35 transition-colors group-hover:text-cyber-blue group-focus-visible:text-cyber-blue"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
              <a
                href="#alliance"
                onClick={closeMobileMenu}
                className="group flex min-h-14 items-center justify-between rounded-xl bg-cyber-blue px-5 text-xs font-black uppercase tracking-[0.15em] text-[#02080a] outline-none transition-colors hover:bg-white focus-visible:bg-white"
              >
                <span>{startProjectLabel}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

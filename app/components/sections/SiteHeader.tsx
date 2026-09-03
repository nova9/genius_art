"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import geniusArtLogo from "../../assets/images/logo.png";

const links = [
  ["#portfolio", "Portfolio"],
  ["#capabilities", "Services"],
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-studio-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" id="brand-logo-link">
          <Image
            src={geniusArtLogo}
            alt="Genius arT"
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10 uppercase text-[11px] font-bold tracking-[0.2em]">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-white/70 transition-colors hover:text-white">
              {label}
            </a>
          ))}
          <a href="#alliance" className="rounded-full border border-white/25 px-5 py-2 text-white/85 transition-all hover:bg-white hover:text-black">
            Inquire
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden p-2.5 rounded-xl border bg-slate-900 border-slate-800 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-900 bg-slate-950 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-sm font-mono tracking-wider uppercase text-left">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 border-b border-slate-800/20 text-slate-300"
                >
                  {label}
                </a>
              ))}
              <a href="#alliance" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-300">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

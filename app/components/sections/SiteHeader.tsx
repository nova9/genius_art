import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import geniusArtLogo from "../../assets/images/logo.png";
import geniusArtLogoLight from "../../assets/images/logo_light.png";

interface SiteHeaderProps {
  isDark: boolean;
  mobileMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onThemeChange: () => void;
}

const links = [
  ["#capabilities", "Capabilities"],
  ["#portfolio", "Portfolio"],
] as const;

export function SiteHeader({
  isDark,
  mobileMenuOpen,
  onMenuToggle,
  onMenuClose,
  onThemeChange,
}: SiteHeaderProps) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark ? "bg-studio-dark/80 border-white/10" : "bg-white/80 border-black/5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" id="brand-logo-link">
          <Image
            src={isDark ? geniusArtLogo : geniusArtLogoLight}
            alt="Genius arT"
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10 uppercase text-[11px] font-bold tracking-[0.2em]">
          {links.map(([href, label]) => (
            <a key={href} href={href} className={`transition-colors ${
              isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            }`}>
              {label}
            </a>
          ))}
          <a href="#alliance" className={`px-5 py-2 border rounded-full transition-all ${
            isDark
              ? "border-white/25 text-white/85 hover:bg-white hover:text-black"
              : "border-black/25 text-black/85 hover:bg-black hover:text-white"
          }`}>
            Inquire
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onThemeChange}
            id="theme-toggler-btn"
            className={`h-10 w-10 rounded-xl border transition-all hover:scale-105 active:scale-95 duration-200 flex items-center justify-center ${
              isDark
                ? "bg-slate-900 border-slate-800 text-yellow-500 hover:border-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button
            onClick={onMenuToggle}
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
            className={`md:hidden border-t overflow-hidden ${
              isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-sm font-mono tracking-wider uppercase text-left">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={onMenuClose}
                  className="py-1.5 border-b border-slate-800/20 text-slate-300"
                >
                  {label}
                </a>
              ))}
              <a href="#alliance" onClick={onMenuClose} className="py-1.5 text-slate-300">
                Contact Form
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

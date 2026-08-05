interface SiteFooterProps { isDark: boolean; }
export function SiteFooter({ isDark }: SiteFooterProps) {
  return (
    <footer className={`border-t py-12 text-xs font-mono transition-colors duration-300 ${
      isDark ? "bg-black border-white/10 text-white/45" : "bg-white border-black/5 text-slate-500"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-black tracking-widest font-display uppercase ${isDark ? "text-white" : "text-black"}`}>
            GENIUS ART
          </span>
          <span className={`text-[9px] font-mono ${isDark ? "text-white/30" : "text-slate-500"}`}>
            | &copy; 2026 IMAGINATION UNLEASHED
          </span>
        </div>
      </div>
    </footer>
  );
}

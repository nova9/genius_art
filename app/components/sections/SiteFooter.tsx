interface SiteFooterProps { isDark: boolean; }
export function SiteFooter({ isDark }: SiteFooterProps) {
  return (
    <>
      {/* ---------------- FOOTER BRIDGES ---------------- */}
      <footer className={`border-t py-12 text-xs font-mono transition-colors duration-300 ${
        isDark ? "bg-black border-white/10 text-white/45" : "bg-white border-black/5 text-slate-500"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo replica */}
          <div className="flex items-center gap-2">
            <span className={`text-sm font-black tracking-widest font-display uppercase ${isDark ? "text-white" : "text-black"}`}>
              GENIUS ART
            </span>
            <span className="text-[9px] text-slate-600 font-mono text-white/30">
              | &copy; 2026 IMAGINATION UNLEASHED
            </span>
          </div>

          {/* Quick legal stats */}
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-white/40">
            <span>Local Database Caching Active</span>
            <span>&bull;</span>
            <span>SVG Specular Lighting Enabled</span>
            <span>&bull;</span>
            <span>Ultra Compressed Assets</span>
            <span>&bull;</span>
            <span>Bold Typography v1.0</span>
          </div>

          <div className="text-[10px]">
            Development Environment &bull; Securing Cloud Run Container
          </div>

        </div>
      </footer>
    </>
  );
}

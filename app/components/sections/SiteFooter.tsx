import packageJson from "../../../package.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 font-mono text-xs text-white/45">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-black uppercase tracking-widest text-white">
            GENIUS ART
          </span>
          <span className="font-mono text-[9px] text-white/30">
            v{packageJson.version} | &copy; 2026 IMAGINATION UNLEASHED
          </span>
        </div>
      </div>
    </footer>
  );
}

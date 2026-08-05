import { Film } from "lucide-react";

interface CinematicShowcaseProps {
  isDark: boolean;
}

const SHOWCASE_VIDEO_ID = "RdQyIS-mvcw";

export function CinematicShowcase({ isDark }: CinematicShowcaseProps) {
  return (
    <section
      className={`relative overflow-hidden border-b py-16 transition-colors duration-300 md:py-24 ${
        isDark
          ? "border-white/10 bg-[#020408]/40"
          : "border-slate-200 bg-slate-100/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/35 bg-cyan-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            <Film className="h-3 w-3" />
            Cinematic showcase
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
            Selected work in motion
          </h2>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            Explore our latest experiments in branded spaces, motion, and visual design.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${SHOWCASE_VIDEO_ID}?rel=0&controls=1`}
              title="3D Shop Branding and Retail Design"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

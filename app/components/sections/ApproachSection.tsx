interface ApproachSectionProps {
  isDark: boolean;
}

const process = [
  {
    number: "01",
    title: "Discover",
    copy: "We uncover valuable insights by understanding your business objectives, target audience and market dynamics, ensuring every creative decision is informed.",
  },
  {
    number: "02",
    title: "Develop",
    copy: "We explore creative concepts and visual directions, refining the strongest ideas into strategic solutions aligned with your business objectives and brand vision.",
  },
  {
    number: "03",
    title: "Produce",
    copy: "Genius arT brings ideas to life through cinematic AI-powered content and advanced production technologies, creating meaningful marketing assets that engage audiences, respect your budget and strengthen your brand.",
  },
] as const;

export function ApproachSection({ isDark }: ApproachSectionProps) {
  return (
    <section
      id="approach"
      className={`relative overflow-hidden border-y transition-colors duration-500 ${
        isDark
          ? "border-white/10 bg-[#070b10] text-white"
          : "border-black/10 bg-white text-slate-950"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_45%,rgba(0,180,255,0.07),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.45fr] lg:gap-24 lg:py-32">
        <div>
          <p className={`mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${
            isDark ? "text-white/55" : "text-black/55"
          }`}>
            <span className={`h-px w-7 ${isDark ? "bg-white/45" : "bg-black/45"}`} />
            How we work
          </p>

          <h2 className="max-w-xl text-[clamp(2.75rem,5.2vw,5.25rem)] font-light leading-[0.98] tracking-[-0.055em]">
            One Studio.
            <br />
            Three Disciplines.
            <br />
            Clear Thinking and
            <br />
            Close Collaboration.
          </h2>
        </div>

        <div className={`border-t ${isDark ? "border-white/20" : "border-black/20"}`}>
          {process.map(({ number, title, copy }) => (
            <article
              key={number}
              className={`grid gap-4 border-b py-8 sm:grid-cols-[3rem_8rem_1fr] sm:gap-7 md:py-9 ${
                isDark ? "border-white/20" : "border-black/20"
              }`}
            >
              <span className="pt-1 font-mono text-[11px] text-cyan-500">{number}</span>
              <h3 className="text-xl font-normal tracking-[-0.025em] md:text-2xl">{title}</h3>
              <p className={`max-w-2xl text-[15px] leading-7 md:text-base ${
                isDark ? "text-white/58" : "text-black/58"
              }`}>
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

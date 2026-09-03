"use client";

import { motion, useReducedMotion } from "motion/react";

const process = [
  {
    title: "Discover",
    copy: "We uncover valuable insights by understanding your business objectives, target audience and market dynamics, ensuring every creative decision is informed.",
  },
  {
    title: "Develop",
    copy: "We explore creative concepts and visual directions, refining the strongest ideas into strategic solutions aligned with your business objectives and brand vision.",
  },
  {
    title: "Produce",
    copy: "Genius arT brings ideas to life through cinematic AI-powered content and advanced production technologies, creating meaningful marketing assets that engage audiences, respect your budget and strengthen your brand.",
  },
] as const;

const headline = [
  ["One Studio."],
  ["Three Disciplines."],
  ["Clear Thinking and", "Close Collaboration."],
] as const;

export function ApproachSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-[#070b10] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_45%,rgba(0,180,255,0.07),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
        >
          <motion.span
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="h-px w-7 origin-left bg-white/45"
          />
          How we work
        </motion.p>

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.45fr] lg:items-stretch lg:gap-24">
          <h2 className="grid max-w-xl gap-4 text-[clamp(2.5rem,4.4vw,4.5rem)] font-light leading-[0.94] tracking-[-0.04em] md:gap-5">
            {headline.map((sentence, index) => (
              <motion.span
                key={sentence.join(" ")}
                className="block"
                initial={shouldReduceMotion ? false : {
                  opacity: 0.22,
                  x: index % 2 === 0 ? -42 : 42,
                  filter: "blur(6px)",
                }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.72,
                  delay: shouldReduceMotion ? 0 : index * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {sentence.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="grid content-stretch gap-10 lg:grid-rows-3 lg:gap-0"
          >
            {process.map(({ title, copy }, index) => (
              <motion.article
                key={title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={shouldReduceMotion ? undefined : { x: 7 }}
                className="group grid content-start gap-4 sm:grid-cols-[8rem_1fr] sm:gap-9"
              >
                <h3 className="relative w-fit text-xl font-medium tracking-[-0.025em] text-cyan-300 transition-[color,text-shadow] duration-200 group-hover:text-cyan-200 group-hover:[text-shadow:0_8px_24px_rgba(34,211,238,0.28)] md:text-2xl">
                  <span>{title}</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </h3>
                <p className="max-w-2xl text-[15px] leading-7 text-white/58 md:text-base">
                  {copy}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

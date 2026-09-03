"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeId } from "../../lib/youtube";

interface FullScreenVideoPortalProps {
  videoUrl: string;
  thumbnailUrl: string;
  eyebrow?: string;
  heading: string;
  headingSuffix?: string;
}

export function FullScreenVideoPortal({
  videoUrl,
  thumbnailUrl,
  eyebrow,
  heading,
  headingSuffix,
}: FullScreenVideoPortalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const youtubeId = getYouTubeId(videoUrl);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const headingWords = heading.trim().split(/\s+/);
  const hasAnimatedHeading = Boolean(eyebrow) && !shouldReduceMotion;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-8">
        <motion.div
          initial={hasAnimatedHeading ? "rest" : false}
          whileInView="reveal"
          viewport={{ once: true, amount: 0.55 }}
          variants={{
            rest: {},
            reveal: {
              transition: {
                delayChildren: 0.12,
                staggerChildren: 0.13,
              },
            },
          }}
          className="mx-auto max-w-5xl space-y-2 py-1 text-center text-white md:space-y-3"
        >
          {eyebrow && (
            <motion.p
              variants={{
                rest: {
                  opacity: 0.4,
                  x: -18,
                  filter: "blur(4px)",
                },
                reveal: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300 sm:text-xs"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h2
            aria-label={[heading, headingSuffix].filter(Boolean).join(" ")}
            className="text-balance px-1 py-1 text-3xl font-black uppercase leading-[1.05] tracking-[-0.04em] sm:text-4xl md:text-5xl"
          >
            {headingWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                aria-hidden="true"
                className="inline-block px-[0.125em] pb-[0.08em]"
              >
                <motion.span
                  variants={{
                    rest: {
                      opacity: 0.55,
                      y: "28%",
                      filter: "blur(4px)",
                    },
                    reveal: {
                      opacity: 1,
                      y: "0%",
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.72,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            {headingSuffix && (
              <span aria-hidden="true" className="chrome-text inline-block px-[0.125em]">
                {headingSuffix}
              </span>
            )}
          </motion.h2>
        </motion.div>

        <div className="group relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
          {isPlaying && youtubeId ? (
            <iframe
              src={embedUrl}
              title="Genius arT show reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950 p-6">
              <Image
                src={thumbnailUrl}
                alt="Show reel preview"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                unoptimized
                loading="lazy"
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                disabled={!youtubeId}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg transition-transform hover:scale-105 hover:bg-cyan-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={youtubeId ? "Play show reel" : "Show reel unavailable"}
              >
                <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

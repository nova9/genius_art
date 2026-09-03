"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeId } from "../../lib/youtube";

interface FullScreenVideoPortalProps {
  videoUrl: string;
  thumbnailUrl: string;
  immersive?: boolean;
  heading?: string;
  headingSuffix?: string;
  overlayEyebrow?: string;
  overlayTitle?: string;
}

export function FullScreenVideoPortal({
  videoUrl,
  thumbnailUrl,
  immersive = false,
  heading,
  headingSuffix,
  overlayEyebrow,
  overlayTitle,
}: FullScreenVideoPortalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const youtubeId = getYouTubeId(videoUrl);
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const hasOverlay = Boolean(overlayTitle);
  const overlayTitleWords = overlayTitle?.trim().split(/\s+/) ?? [];

  return (
    <section className={immersive ? "w-full" : "w-full py-16 md:py-24"}>
      <div className={immersive ? "w-full" : "mx-auto max-w-7xl space-y-10 px-4 md:px-8"}>
        {heading && (
          <div className="py-1 text-center">
            <h2 className="text-balance px-1 py-1 text-3xl font-black uppercase leading-[1.05] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              <span className="inline-block px-1">{heading}</span>
              {headingSuffix && (
                <>
                  {" "}
                  <span className="chrome-text">{headingSuffix}</span>
                </>
              )}
            </h2>
          </div>
        )}

        <div
          className={`group relative mx-auto w-full overflow-hidden border border-white/10 bg-transparent ${
            immersive
              ? "h-[70svh] min-h-[28rem] border-x-0 border-y-0 md:h-[calc(100svh-4.75rem)] md:min-h-[38rem]"
              : "aspect-video max-w-5xl rounded-3xl"
          }`}
        >
          <div
            className={
              hasOverlay
                ? "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-4 sm:px-6 md:gap-5 md:px-8 md:py-5"
                : "absolute inset-0"
            }
          >
            {overlayTitle && (
              <motion.div
                initial={shouldReduceMotion ? false : "rest"}
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
                className="max-w-3xl shrink-0 space-y-2 text-center text-white md:space-y-3"
              >
                {overlayEyebrow && (
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
                    {overlayEyebrow}
                  </motion.p>
                )}
                <motion.h2
                  aria-label={overlayTitle}
                  className="text-3xl font-black uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl"
                >
                  {overlayTitleWords.map((word, index) => (
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
                </motion.h2>
              </motion.div>
            )}

            <div
              className={
                hasOverlay
                  ? `relative aspect-video w-full max-w-4xl shrink overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl ${
                      immersive
                        ? "md:max-w-[min(56rem,calc((100svh-14rem)*16/9))]"
                        : ""
                    }`
                  : "absolute inset-0"
              }
            >
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
                    loading={immersive ? "eager" : "lazy"}
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
        </div>
      </div>
    </section>
  );
}

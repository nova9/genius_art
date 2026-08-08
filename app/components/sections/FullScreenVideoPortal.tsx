import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

interface PortalVideo {
  videoUrl: string;
  thumbnailUrl: string;
}

interface FullScreenVideoPortalProps {
  isDark: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  videos?: PortalVideo[];
  loop?: boolean;
  autoPlayDirect?: boolean;
  immersive?: boolean;
  showHeading?: boolean;
  headingSuffix?: string;
  backgroundVideoUrl?: string;
  overlayEyebrow?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  sharedParticleBackground?: boolean;
}

const DEFAULT_VIDEO_URL = "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L";

function getYouTubeId(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (parsedUrl.hostname === "youtube.com" || parsedUrl.hostname.endsWith(".youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") ?? "";
      }

      const [, route, videoId] = parsedUrl.pathname.split("/");
      if (["embed", "shorts", "live"].includes(route)) {
        return videoId ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function FullScreenVideoPortal({
  isDark,
  videoUrl = DEFAULT_VIDEO_URL,
  thumbnailUrl = "",
  videos,
  loop = false,
  autoPlayDirect = false,
  immersive = false,
  showHeading = true,
  headingSuffix = "in 30 Seconds",
  backgroundVideoUrl,
  overlayEyebrow,
  overlayTitle,
  sharedParticleBackground = false,
}: FullScreenVideoPortalProps) {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadBackgroundVideo, setShouldLoadBackgroundVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBackgroundVideoReady, setIsBackgroundVideoReady] = useState(false);
  const slides = videos?.length ? videos : [{ videoUrl, thumbnailUrl }];
  const activeVideo = slides[activeIndex] ?? slides[0];
  const youtubeId = useMemo(() => getYouTubeId(activeVideo.videoUrl), [activeVideo.videoUrl]);
  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&controls=1${
        loop ? `&loop=1&playlist=${youtubeId}` : ""
      }`
    : "";
  const isDirectVideo = /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(activeVideo.videoUrl);
  const isCarousel = slides.length > 1;
  const hasOverlay = Boolean(overlayTitle);

  useEffect(() => {
    if (!backgroundVideoUrl) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleCallback = 0;
    const startLoading = () => setShouldLoadBackgroundVideo(true);

    if ("requestIdleCallback" in window) {
      idleCallback = window.requestIdleCallback(startLoading, { timeout: 2500 });
    } else {
      timer = globalThis.setTimeout(startLoading, 1800);
    }

    return () => {
      if (idleCallback) window.cancelIdleCallback(idleCallback);
      if (timer) globalThis.clearTimeout(timer);
    };
  }, [backgroundVideoUrl]);

  useEffect(() => {
    const backgroundVideo = backgroundVideoRef.current;
    if (!backgroundVideo || !backgroundVideoUrl || !shouldLoadBackgroundVideo) return;

    const resumeBackgroundVideo = () => {
      if (backgroundVideo.ended) backgroundVideo.currentTime = 0;
      void backgroundVideo.play().catch(() => {
        // Muted autoplay can still be deferred by the browser until the page is active.
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) resumeBackgroundVideo();
    };

    resumeBackgroundVideo();
    backgroundVideo.addEventListener("ended", resumeBackgroundVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      backgroundVideo.removeEventListener("ended", resumeBackgroundVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [backgroundVideoUrl, shouldLoadBackgroundVideo]);

  const changeSlide = (index: number) => {
    setIsPlaying(false);
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section
      className={`w-full border-t transition-colors duration-300 ${immersive ? "py-0" : "py-16 md:py-24"} ${
        sharedParticleBackground
          ? "border-white/5 bg-transparent"
          : isDark ? "border-white/5 bg-[#030712]" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className={immersive ? "w-full" : "mx-auto max-w-7xl space-y-10 px-4 md:px-8"}>
        {showHeading && <div className="space-y-3 text-center">
          <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tighter sm:text-4xl md:text-5xl">
            Our Masterpieces{" "}
            <span className={isDark ? "chrome-text" : "chrome-text-light"}>
              {headingSuffix}
            </span>
          </h2>
        </div>}

        <div className={`group relative mx-auto w-full overflow-hidden border border-white/10 shadow-2xl ${
          sharedParticleBackground ? "bg-transparent" : "bg-slate-950"
        } ${
          immersive
            ? "h-[70svh] min-h-[28rem] border-x-0 md:h-[calc(100svh-4.75rem)] md:min-h-[38rem]"
            : "aspect-video max-w-5xl rounded-3xl"
        }`}>
          {backgroundVideoUrl && (
            <>
              <video
                ref={backgroundVideoRef}
                src={shouldLoadBackgroundVideo ? backgroundVideoUrl : undefined}
                autoPlay
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                onLoadStart={() => setIsBackgroundVideoReady(false)}
                onLoadedMetadata={() => setIsBackgroundVideoReady(true)}
                onLoadedData={() => setIsBackgroundVideoReady(true)}
                onCanPlay={() => setIsBackgroundVideoReady(true)}
                onPlaying={() => setIsBackgroundVideoReady(true)}
                onPause={(event) => {
                  if (!document.hidden && event.currentTarget.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                    void event.currentTarget.play().catch(() => undefined);
                  }
                }}
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className={`absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-700 ${
                isBackgroundVideoReady ? "opacity-100" : "opacity-0"
              }`} />
            </>
          )}

          <div className={hasOverlay
            ? "absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 p-4 sm:p-6 md:gap-7 md:p-8"
            : "absolute inset-0"
          }>
          {overlayTitle && (
            <div className="max-w-3xl space-y-2 text-center text-white md:space-y-3">
              {overlayEyebrow && (
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300 sm:text-xs">
                  {overlayEyebrow}
                </p>
              )}
              <h2 className="font-display text-3xl font-black uppercase leading-[0.92] tracking-tighter [word-spacing:0.25em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {overlayTitle}
              </h2>
            </div>
          )}
          <div className={hasOverlay
            ? "relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl"
            : "absolute inset-0"
          }>
          {(isPlaying || (autoPlayDirect && isDirectVideo)) && (youtubeId || isDirectVideo) ? (
            youtubeId ? (
              <iframe
                src={embedUrl}
                title="Genius Art show reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnailUrl}
                controls
                autoPlay
                loop={loop}
                muted={autoPlayDirect}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950 p-6">
              {activeVideo.thumbnailUrl && (
                <Image
                  src={activeVideo.thumbnailUrl}
                  alt="Show reel preview"
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  unoptimized
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
              )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                disabled={!youtubeId && !isDirectVideo}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg transition-transform hover:scale-105 hover:bg-cyan-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={youtubeId || isDirectVideo ? "Play show reel" : "Show reel unavailable"}
              >
                <Play className="h-6 w-6 translate-x-0.5 fill-current" />
              </button>
            </div>
          )}

          {isCarousel && (
            <>
              <button
                type="button"
                onClick={() => changeSlide(activeIndex - 1)}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-950"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => changeSlide(activeIndex + 1)}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-950"
                aria-label="Next video"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.videoUrl}
                    type="button"
                    onClick={() => changeSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex ? "w-7 bg-cyan-400" : "w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Show video ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            </>
          )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

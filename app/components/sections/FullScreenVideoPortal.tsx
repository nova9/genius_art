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
}

const DEFAULT_VIDEO_URL = "https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L";

function LoadingParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      drift: number;
      opacity: number;
    }> = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = Array.from({ length: Math.max(45, Math.round(width / 18)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        speed: Math.random() * 0.35 + 0.12,
        drift: Math.random() * 0.18 - 0.09,
        opacity: Math.random() * 0.55 + 0.2,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(103, 232, 249, ${particle.opacity})`;
        context.shadowBlur = particle.radius > 1.4 ? 8 : 0;
        context.shadowColor = "#22d3ee";
        context.fill();

        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -4) {
          particle.y = height + 4;
          particle.x = Math.random() * width;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-2 h-full w-full transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

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
  overlayDescription,
}: FullScreenVideoPortalProps) {
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

  const changeSlide = (index: number) => {
    setIsPlaying(false);
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section
      className={`w-full border-t transition-colors duration-300 ${immersive ? "py-0" : "py-16 md:py-24"} ${
        isDark ? "border-white/5 bg-[#030712]" : "border-slate-200 bg-slate-50"
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

        <div className={`group relative mx-auto w-full overflow-hidden border border-white/10 bg-slate-950 shadow-2xl ${
          immersive
            ? "h-[70svh] min-h-[28rem] border-x-0 md:h-[calc(100svh-4.75rem)] md:min-h-[38rem]"
            : "aspect-video max-w-5xl rounded-3xl"
        }`}>
          {backgroundVideoUrl && (
            <>
              <video
                src={backgroundVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onLoadStart={() => setIsBackgroundVideoReady(false)}
                onLoadedData={() => setIsBackgroundVideoReady(true)}
                onCanPlay={() => setIsBackgroundVideoReady(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />
              <LoadingParticles active={!isBackgroundVideoReady} />
            </>
          )}

          <div className={backgroundVideoUrl
            ? "absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 p-4 sm:p-6 md:gap-7 md:p-8"
            : "absolute inset-0"
          }>
          {backgroundVideoUrl && overlayTitle && (
            <div className="max-w-3xl space-y-2 text-center text-white md:space-y-3">
              {overlayEyebrow && (
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300 sm:text-xs">
                  {overlayEyebrow}
                </p>
              )}
              <h2 className="font-display text-3xl font-black uppercase leading-[0.92] tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {overlayTitle}
              </h2>
              {overlayDescription && (
                <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm md:text-base">
                  {overlayDescription}
                </p>
              )}
            </div>
          )}
          <div className={backgroundVideoUrl
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

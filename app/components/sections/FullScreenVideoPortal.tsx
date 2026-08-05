import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Video } from "lucide-react";

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
}: FullScreenVideoPortalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
      className={`w-full border-t py-16 transition-colors duration-300 md:py-24 ${
        isDark ? "border-white/5 bg-[#030712]" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
            <Video className="h-3.5 w-3.5" />
            Show reel
          </div>

          <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tighter sm:text-4xl md:text-5xl">
            Our Masterpieces{" "}
            <span className={isDark ? "chrome-text" : "chrome-text-light"}>
              in 30 Seconds
            </span>
          </h2>
        </div>

        <div className="group relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
          {isPlaying && (youtubeId || isDirectVideo) ? (
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
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950 p-6">
              {activeVideo.thumbnailUrl && (
                <img
                  src={activeVideo.thumbnailUrl}
                  alt="Show reel preview"
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

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
    </section>
  );
}

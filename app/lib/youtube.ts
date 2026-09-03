export function getYouTubeId(url: string): string {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname.endsWith(".youtube.com")
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") ?? "";
      }

      const [, route, videoId] = parsedUrl.pathname.split("/");
      return ["embed", "shorts", "live"].includes(route) ? (videoId ?? "") : "";
    }
  } catch {
    return "";
  }

  return "";
}

export function getYouTubeEmbedUrl(url: string, options = ""): string {
  const videoId = getYouTubeId(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${options}`
    : "";
}

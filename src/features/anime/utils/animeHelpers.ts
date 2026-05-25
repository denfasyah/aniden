import type { AnimeItem } from "@/features/anime/types/anime";

export function getSlug(anime: AnimeItem): string {
  if (anime.slug) return anime.slug;

  if (anime.href) {
    const parts = anime.href.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  }

  return anime.title.toLowerCase().replace(/\s+/g, "-");
}

export function generateSynopsis(title: string): string {
  return `${title} adalah salah satu anime ongoing terpopuler saat ini. Ikuti petualangan seru yang penuh aksi, emosi, dan kejutan di setiap episodenya. Jangan sampai ketinggalan update terbaru!`;
}

export function getRealtimeTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}
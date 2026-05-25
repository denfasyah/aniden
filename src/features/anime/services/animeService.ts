import { AnimeItem } from "../types/anime";
import { GenreItem } from "../types/anime";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOngoingAnime(): Promise<AnimeItem[]> {
  const res = await fetch(`${BASE_URL}/ongoing`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API ongoing");
  }

  const responseData = await res.json();
  return responseData.data?.animeList || [];
}

export async function getAnimeGenres(): Promise<GenreItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/genres`, { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch genres: ${res.status}`);
    }

    const responseData = await res.json();
    // Mengambil array dari data.genreList sesuai dengan skema response API asli
    return responseData.data?.genreList || [];
  } catch (error) {
    console.error("Error inside getAnimeGenres service:", error);
    return []; // Kembalikan array kosong sebagai fallback aman
  }
}
import { AnimeItem } from "../types/anime";
import { GenreItem } from "../types/anime";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOngoingAnime(): Promise<AnimeItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/ongoing`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal fetch ongoing data");

    const responseData = await res.json();
    const rawAnimeList: AnimeItem[] = responseData.data?.animeList || [];

    // Trik Cepat: Fetch data score detail secara paralel bersamaan
    const ongoingWithScore = await Promise.all(
      rawAnimeList.map(async (anime) => {
        // Jika dari API ongoing tidak ada score, kita mintakan ke endpoint detail
        const score = anime.score || await fetchScoreDetail(anime.animeId);
        return {
          ...anime,
          score, // Masukkan score detail ke dalam object anime ongoing
        };
      })
    );

    return ongoingWithScore;
  } catch (error) {
    console.error("Error in getOngoingAnimeWithScore:", error);
    return [];
  }
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

export async function getCompletedAnime(): Promise<AnimeItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/completed`, { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch completed anime: ${res.status}`);
    }

    const responseData = await res.json();
    // Mengambil array dari data.animeList sesuai dengan respons API kamu
    return responseData.data?.animeList || [];
  } catch (error) {
    console.error("Error inside getCompletedAnime service:", error);
    return []; // Fallback array kosong jika API bermasalah
  }
}

async function fetchScoreDetail(animeId: string): Promise<string> {
  try {
    // Memanggil endpoint detail untuk mengambil score asli
    const res = await fetch(`${BASE_URL}/anime/${animeId}`, { cache: "no-store" });
    if (!res.ok) return "0.0";
    
    const responseData = await res.json();
    return responseData.data?.score || "0.0";
  } catch {
    return "0.0"; // Fallback aman jika gagal fetch detail
  }
}
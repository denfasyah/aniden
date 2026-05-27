
import { 
  AnimeItem, 
  GenreItem, 
  DaySchedule, 
  AnimeDetailData, 
  ApiResponseGeneric, 
  EpisodeStreamData,
  CategoryPaginatedResult
} from "../types/anime";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = 12;

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

export async function getAnimeSchedule(): Promise<DaySchedule[]> {
  try {
    const res = await fetch(`${BASE_URL}/schedule`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil jadwal rilis");

    const responseData = await res.json();
    // Membaca wrapper data sesuai response API kamu
    return responseData.data?.days || responseData.data || [];
  } catch (error) {
    console.error("Error pada getAnimeSchedule service:", error);
    return [];
  }
}


export async function getAnimeDetail(animeId: string): Promise<AnimeDetailData | null> {
  try {
    const res = await fetch(`${BASE_URL}/anime/${animeId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal fetch detail");

    const response: ApiResponseGeneric<AnimeDetailData> = await res.json();

    return response.ok ? response.data : null;
  } catch (error) {
    console.error("Error di getAnimeDetail:", error);
    return null;
  }
}

// services/animeService.ts (Tambahkan fungsi ini)

export async function getEpisodeStream(episodeId: string): Promise<EpisodeStreamData | null> {
  try {
    const res = await fetch(`${BASE_URL}/episode/${episodeId}`, { cache: "no-store" });
    if (!res.ok) return null;

    const response: ApiResponseGeneric<EpisodeStreamData> = await res.json();
    return response.ok ? response.data : null;
  } catch (error) {
    console.error("Gagal fetch stream:", error);
    return null;
  }
}



const cache: Record<string, AnimeItem[]> = {};

async function fetchAllPages(endpoint: string): Promise<AnimeItem[]> {
  let allAnime: AnimeItem[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(`${BASE_URL}/${endpoint}?page=${page}`, { cache: "no-store" });
    if (!res.ok) break;

    const responseData = await res.json();
    const pageList: AnimeItem[] = responseData.data?.animeList ?? [];

    if (pageList.length === 0) break;

    allAnime = [...allAnime, ...pageList];

    const hasNextPage: boolean = responseData.pagination?.hasNextPage ?? false;
    if (!hasNextPage) break;
    page++;
    await new Promise((r) => setTimeout(r, 300));
  }

  return allAnime;
}

export async function getCategoryAnimePaginated(
  endpoint: string,
  page = 1
): Promise<CategoryPaginatedResult> {
  try {
    if (!cache[endpoint]) {
      cache[endpoint] = await fetchAllPages(endpoint);
    }

    const all = cache[endpoint];
    const total = all.length;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const sliced = all.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return { animeList: sliced, currentPage: page, totalPages, total };
  } catch (error) {
    console.error(`Error getCategoryAnimePaginated [${endpoint}]:`, error);
    delete cache[endpoint];
    return { animeList: [], currentPage: page, totalPages: 1, total: 0 };
  }
}

export function clearCategoryCache(endpoint?: string) {
  if (endpoint) delete cache[endpoint];
  else Object.keys(cache).forEach((k) => delete cache[k]);
}
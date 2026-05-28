import {
  AnimeItem,
  GenreItem,
  DaySchedule,
  AnimeDetailData,
  ApiResponseGeneric,
  EpisodeStreamData,
  CategoryPaginatedResult,
  AzGroup,
} from "../types/anime";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const score = anime.score || (await fetchScoreDetail(anime.animeId));
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

export async function getCategoryAnimePaginated(
  endpoint: string,
  page = 1
): Promise<CategoryPaginatedResult> {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}?page=${page}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal fetch");

    const responseData = await res.json();
    const pageList: AnimeItem[] = responseData.data?.animeList ?? [];

    // --- PROSES PENGAMBILAN SKOR PARALEL ---
    // Kita perkaya data animeList dengan skor dari endpoint detail
    const animeListWithScore = await Promise.all(
      pageList.map(async (anime) => {
        // Jika skor sudah ada di response API, gunakan itu.
        // Jika tidak, fetch ke endpoint detail (fetchScoreDetail).
        const score =
          anime.score && anime.score !== "0.0"
            ? anime.score
            : await fetchScoreDetail(anime.animeId);

        return {
          ...anime,
          score,
        };
      })
    );
    // ----------------------------------------

    return {
      animeList: animeListWithScore, // Gunakan data yang sudah ada skornya
      currentPage: page,
      totalPages: responseData.pagination?.lastPage || 10,
      total: responseData.pagination?.total || 100,
    };
  } catch (error) {
    console.error("Error fetching category with scores:", error);
    return { animeList: [], currentPage: page, totalPages: 1, total: 0 };
  }
}

export async function getAzList(): Promise<AzGroup[]> {
  try {
    const res = await fetch(`${BASE_URL}/anime`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal fetch A-Z list");

    const response = await res.json();
    return response.data?.list || [];
  } catch (error) {
    console.error("Error getAzList:", error);
    return [];
  }
}

export async function getGenreDetail(
  genreId: string,
  page: number = 1
): Promise<CategoryPaginatedResult> {
  try {
    const res = await fetch(`${BASE_URL}/genres/${genreId}?page=${page}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gagal fetch data genre");

    const json = await res.json();

    // Sesuaikan dengan struktur JSON dari API Anda (image_bbfb3f.jpg)
    return {
      animeList: json.data?.animeList || [],
      currentPage: json.pagination?.currentPage || page,
      totalPages: json.pagination?.totalPages || 1,
      total: json.pagination?.total || 0,
    };
  } catch (error) {
    console.error("Error fetching genre:", error);
    return { animeList: [], currentPage: page, totalPages: 1, total: 0 };
  }
}

// Di src/features/anime/services/animeService.ts
// src/features/anime/services/animeService.ts
export async function searchAnime(query: string): Promise<AnimeItem[]> {
  try {
    // Pastikan URL di .env sudah benar: NEXT_PUBLIC_API_URL=http://localhost:3001/otakudesu
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();

    // Sesuaikan dengan struktur JSON API Anda (biasanya di dalam data.animeList)
    return json.data?.animeList || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

import { AnimeItem } from "../types/anime";

export async function getOngoingAnime(): Promise<AnimeItem[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${BASE_URL}/ongoing`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API ongoing");
  }

  const responseData = await res.json();
  return responseData.data?.animeList || [];
}
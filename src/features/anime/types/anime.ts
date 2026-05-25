export interface AnimeItem {
  title: string;
  poster: string;
  episodes: number;
  releaseDay: string;
  latestReleaseDate: string;
  animeId: string;
  slug?: string;
  href?: string;
}

export interface ApiResponse {
  statusCode: number;
  ok: boolean;
  data: {
    animeList: AnimeItem[];
  };
}
export interface AnimeItem {
  title: string;
  poster: string;
  status?: string;
  rating?: string; 
  score?: string; 
  episodes: number;
  releaseDay: string;
  latestReleaseDate: string;
  animeId: string;
  slug?: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: AnimeItem[];
  };
}

export interface GenreItem {
  title: string;   // Contoh: "Action"
  genreId: string; // Contoh: "action"
  href: string;
}
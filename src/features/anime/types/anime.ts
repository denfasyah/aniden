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
  lastEpisodeId?: string; // Tambahkan ini jika API menyediakannya
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

export interface ApiResponseGeneric<T> {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: T;
}

export interface GenreItem {
  title: string;   // Contoh: "Action"
  genreId: string; // Contoh: "action"
  href: string;
    otakudesuUrl?: string; // tambah ini
}

// Tambahkan ini di file types/anime.ts kamu jika belum ada
export interface ScheduleItem {
  title: string;
  animeId: string;
  href: string;
}

export interface DaySchedule {
  day: string;
  // animeList: ScheduleItem[];
   anime_list: AnimeItem[];
}


// --- Detail Page Interfaces ---
export interface EpisodeItem {
  title: number | string;
  episodeId: string;
  href: string;
  otakudesuUrl?: string;
}

export interface RecommendedAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  otakudesuUrl?: string;
}

export interface AnimeDetailData {
  title: string;
  poster: string;
  japanese: string;
  score: string;
  producers: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch: {
    title: string;
    batchId: string;
    href: string;
    otakudesuUrl: string;
  } | null;
  synopsis: {
    paragraphs: string[];
    connections: unknown[];
  };
  genreList: GenreItem[];
  episodeList: EpisodeItem[];
  recommendedAnimeList: RecommendedAnime[];
}

// types/anime.ts (Tambahkan bagian ini)

export interface StreamServer {
  title: string;
  serverId: string;
  href: string;
}

export interface StreamQuality {
  title: string;
  serverList: StreamServer[];
}

export interface DownloadLink {
  title: string;
  url: string;
}

export interface DownloadQuality {
  title: string;
  size: string;
  urls: DownloadLink[];
}

export interface EpisodeStreamData {
  title: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: {
    episodeId: string;
  } | null;
  hasNextEpisode: boolean;
  nextEpisode: {
    episodeId: string;
  } | null;
  server: {
    qualities: StreamQuality[];
  };
  downloadUrl: {
    qualities: DownloadQuality[];
  };
}


export interface CategoryPaginatedResult {
  animeList: AnimeItem[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface AzAnimeItem {
  title: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

export interface AzGroup {
  startWith: string;
  animeList: AzAnimeItem[];
}


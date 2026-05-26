"use client";

import Link from "next/link";
import { ArrowLeft, Star, Clock, Calendar, Bookmark } from "lucide-react";
import { AnimeDetailData } from "../../types/anime";

interface HeroSectionProps {
  anime: AnimeDetailData;
  animeId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeroSection({ anime, animeId }: HeroSectionProps) {
  return (
    <div className="border-border-main/10 relative flex min-h-[55vh] w-full items-end overflow-hidden border-b pt-28 pb-12 sm:min-h-[65vh]">
      {/* Backdrop Image */}
      <div
        className="absolute inset-0 scale-100 bg-cover bg-center opacity-25 dark:opacity-35"
        style={{ backgroundImage: `url(${anime.poster})` }}
      />
      {/* Gradient overlay */}
      <div className="from-bg-main via-bg-main/80 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="from-bg-main/90 via-bg-main/30 absolute inset-0 hidden bg-linear-to-r to-transparent md:block" />

      {/* Tombol Navigasi Kembali */}
      <Link
        href="/"
        className="bg-surface/60 hover:bg-surface border-border-main/30 text-main transition-cinematic absolute top-18 left-4 z-10 flex items-center justify-center rounded-xl border p-2.5 shadow-lg backdrop-blur-md sm:left-8"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Konten Utama */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
          {/* Poster */}
          <div className="border-border-main/40 bg-surface relative aspect-3/4 w-44 shrink-0 overflow-hidden rounded-2xl border shadow-2xl sm:w-52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={anime.poster} alt={anime.title} className="h-full w-full object-cover" />
          </div>

          {/* Info & Meta */}
          <div className="mb-2 flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-main line-clamp-2 text-2xl leading-tight font-black tracking-tight drop-shadow-sm sm:text-4xl">
              {anime.title}
            </h1>

            {/* Meta Data */}
            <div className="text-main/80 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold md:justify-start">
              <div className="flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 font-black text-black shadow-sm">
                <Star className="h-3 w-3 fill-black" />
                {anime.score && anime.score !== "N/A" && anime.score.trim() !== ""
                  ? anime.score
                  : "N/A"}
              </div>

              <button className="bg-surface/80 hover:bg-surface border-border-main/60 text-main rounded-lg border p-1.5 shadow-sm transition-colors">
                <Bookmark className="h-3.5 w-3.5" />
              </button>

              <div className="border-border-main/30 flex items-center gap-1 border-l pl-2.5 opacity-90">
                <Clock className="text-main/60 h-3.5 w-3.5" />
                <span>{anime.duration || "-"}</span>
              </div>

              <div className="border-border-main/30 flex items-center gap-1 border-l pl-2.5 opacity-90">
                <Calendar className="text-main/60 h-3.5 w-3.5" />
                <span>{anime.aired || "-"}</span>
              </div>

              <div className="bg-secondary border-secondary/20 rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                {anime.status}
              </div>

              {anime.episodes && (
                <div className="bg-surface/80 border-border-main/40 text-main/90 rounded-md border px-2 py-0.5 text-[11px] shadow-sm">
                  {anime.episodes} Episodes
                </div>
              )}
            </div>

            {/* Genre Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-1 md:justify-start">
              {anime.genreList?.map((genre) => (
                <Link
                  key={genre.genreId}
                  href={`/genres/${genre.genreId}`}
                  className="bg-surface/80 hover:bg-surface border-border-main/40 text-main/90 rounded-full border px-3.5 py-1 text-xs font-bold shadow-sm backdrop-blur-xs transition-colors"
                >
                  {genre.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { AnimeItem } from "@/features/anime/types/anime";

interface AnimeCardProps {
  anime: AnimeItem;
  infoSuffix?: string;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const rawDate = anime.latestReleaseDate || anime.lastReleaseDate || "";


  const cleanDate = rawDate.split("-")[0]?.trim() || "";

  return (
    <Link
      href={`/anime/${anime.animeId}`}
      className="group flex w-full flex-col focus:outline-none"
    >
      {/* IMAGE CONTAINER */}
      <div className="bg-surface border-border-main group-hover:border-secondary/50 neon-glow-secondary transition-cinematic relative aspect-3/4 w-full overflow-hidden rounded-lg border shadow-md">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          sizes="(max-w-640px) 45vw, (max-w-1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* BADGE EPS*/}
        <div className="bg-primary absolute top-0 left-0 z-10 rounded-br-lg px-2 py-1 text-[9px] font-black tracking-wider text-white uppercase shadow-md will-change-transform sm:text-[10px]">
          Eps {anime.episodes}
        </div>

        {/* RATING BADGE  */}
        {anime.score && anime.score !== "0.0" && anime.score !== "0" ? (
          <div className="bg-bg-main/80 text-warning absolute top-0 right-0 z-10 flex h-5.75 w-10.5 items-center justify-center gap-0.5 rounded-bl-lg text-[9px] font-black shadow-md backdrop-blur-md will-change-transform sm:w-11.5 sm:text-[10px]">
            <Star className="fill-warning h-2.5 w-2.5 shrink-0" />
            <span className="tabular-nums">
              {/* Mengonversi nilai ke angka desimal satu digit belakang koma (misal 8.28 -> 8.3) */}
              {!isNaN(Number(anime.score)) ? Number(anime.score).toFixed(1) : anime.score}
            </span>
          </div>
        ) : (
          /* Fallback jika ada anime baru rilis yang memang benar-benar belum memiliki rating apa pun di detailnya */
          <div className="bg-bg-main/80 text-warning absolute top-0 right-0 z-10 flex h-5.75 w-10.5 items-center justify-center gap-0.5 rounded-bl-lg text-[9px] font-black shadow-md backdrop-blur-md will-change-transform sm:w-11.5 sm:text-[10px]">
            <Star className="fill-warning h-2.5 w-2.5 shrink-0" />
            <span className="tabular-nums">N/A</span> {/* Skor default estetik industri */}
          </div>
        )}

        {/* HOVER OVERLAY CINEMATIC */}
        <div className="from-bg-main/90 absolute inset-0 flex items-end bg-linear-to-t via-transparent to-transparent p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-muted line-clamp-2 text-[10px] font-medium">
            Saksikan episode {anime.episodes} sub indo terbaru di AniDen.
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-2 flex flex-col space-y-0.5 px-0.5">
        <h3 className="text-main group-hover:text-secondary transitions line-clamp-1 text-xs font-bold sm:text-sm">
          {anime.title}
        </h3>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-text-muted text-[10px] font-medium sm:text-[11px]">
            {cleanDate}
          </span>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimeDetailData } from "@/features/anime/types/anime";
import HeroSection from "./HeroSection";
import SynopsisSection from "./SynopsisSection";
import EpisodeList from "./EpisodeList";
import ProductionInfo from "./ProductionInfo";
import Recommendation from "./Recommendation";
import { getAnimeDetail } from "../../services/animeService";

function AnimeDetailSkeleton() {
  return (
    <div className="bg-main min-h-screen w-full animate-pulse">
      <div className="bg-surface/40 relative flex h-[55vh] items-end pb-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 md:flex-row">
          <div className="bg-border-main/40 mx-auto h-72 w-44 shrink-0 rounded-2xl sm:w-52 md:mx-0" />
          <div className="flex-1 space-y-4 pt-12 md:pt-24">
            <div className="bg-border-main/40 mx-auto h-10 w-3/4 rounded-xl md:mx-0" />
            <div className="bg-border-main/40 mx-auto h-4 w-1/4 rounded-lg md:mx-0" />
            <div className="bg-border-main/40 mx-auto h-6 w-1/2 rounded-lg md:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnimeDetailClientProps {
  animeId: string;
}

export default function AnimeDetailClient({ animeId }: AnimeDetailClientProps) {
  const [mounted, setMounted] = useState(false);
  const [anime, setAnime] = useState<AnimeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);

  const fetchAnimeDetail = async () => {
    try {
      setLoading(true);
      // Panggil fungsi service yang sudah kita buat, jangan fetch manual lagi
      const data = await getAnimeDetail(animeId);

      if (data) {
        setAnime(data);
      } else {
        throw new Error("Data anime tidak ditemukan");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  if (animeId) fetchAnimeDetail();
}, [animeId]);

  if (!mounted || loading) return <AnimeDetailSkeleton />;

  if (error || !anime) {
    return (
      <div className="bg-main text-main flex min-h-screen w-full flex-col items-center justify-center gap-4">
        <p className="text-sm font-semibold opacity-70">{error || "Anime tidak ditemukan."}</p>
        <Link
          href="/"
          className="bg-surface border-border-main hover:bg-border-main/20 rounded-xl border px-4 py-2 text-xs font-bold transition-all"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-main text-main min-h-screen w-full pb-16">
      <HeroSection anime={anime} animeId={animeId} />

      <div className="relative z-20 mx-auto mt-10 max-w-5xl px-4">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <SynopsisSection paragraphs={anime.synopsis?.paragraphs ?? []} />
            <EpisodeList
              animeId={animeId}
              episodeList={anime.episodeList}
              batch={anime.batch}
            />
          </div>

          <div className="space-y-6">
            <ProductionInfo studios={anime.studios} producers={anime.producers} />
          </div>
        </div>

        <Recommendation recommendedAnimeList={anime.recommendedAnimeList} />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--secondary, #00e5ff);
        }
      `}</style>
    </div>
  );
}
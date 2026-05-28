"use client";

import React, { useState, useEffect, useCallback } from "react";
import AnimeCard from "@/components/ui/AnimeCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { AnimeItem } from "@/features/anime/types/anime";
import { getCategoryAnimePaginated } from "@/features/anime/services/animeService";
import { getRealtimeTime } from "@/features/anime/utils/animeHelpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryHeader from "@/components/ui/CategoryHeader";

const ITEMS_PER_PAGE = 12;

interface AnimeCategoryPageProps {
  endpoint: string;       // "ongoing" | "completed"
  title: string;          // "On-Going" | "Completed"
  backHref?: string;
  backLabel?: string;
}

function Skeleton() {
  return (
    <div className="mx-auto w-full mt-10 max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-40 rounded-lg" />
        <div className="bg-border-main h-5 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function AnimeCategoryPage({
  endpoint,
  title,
  backHref = "/",
  backLabel = "Back Home",
}: AnimeCategoryPageProps) {
  const [mounted, setMounted] = useState(false);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const updateTime = () => setCurrentTime(getRealtimeTime());
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPage = useCallback(async (page: number) => {
    const data = await getCategoryAnimePaginated(endpoint, page);
    setAnimeList(data.animeList);
    setTotalPages(data.totalPages);
  }, [endpoint]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      await fetchPage(1);
      setLoading(false);
    }
    init();
  }, [fetchPage]);

  const goToPage = useCallback(async (page: number) => {
    if (page < 1 || page > totalPages || pageLoading) return;
    setPageLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
    await fetchPage(page);
    setPageLoading(false);
  }, [totalPages, pageLoading, fetchPage]);

  const pageNumbers = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  })();

  if (!mounted || loading) return <Skeleton />;

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* HEADER */}
      <CategoryHeader title={title} backHref={backHref} backLabel={backLabel} />

      {animeList.length === 0 ? (
        <div className="border-border-main bg-surface/50 flex flex-col items-center justify-center rounded-2xl border border-dashed py-12">
          <p className="text-text-muted text-sm">Tidak ada data ditemukan.</p>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className={`grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 transition-opacity duration-300 ${
            pageLoading ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}>
            {pageLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => <CardSkeleton key={idx} />)
              : animeList.map((anime) => (
                  <AnimeCard key={anime.animeId} anime={anime} infoSuffix={currentTime} />
                ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1 || pageLoading}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-main/40 bg-surface text-xs font-bold transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {pageNumbers.map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-xs opacity-40">
                    ···
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    disabled={pageLoading}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-black transition-all ${
                      currentPage === p
                        ? "border-secondary bg-secondary text-black shadow-lg scale-[1.05]"
                        : "border-border-main/40 bg-surface hover:border-secondary hover:text-secondary disabled:cursor-not-allowed"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages || pageLoading}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-main/40 bg-surface text-xs font-bold transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-[10px] font-bold opacity-30 tracking-widest uppercase">
            Halaman {currentPage} dari {totalPages}
          </p>
        </>
      )}
    </section>
  );
}
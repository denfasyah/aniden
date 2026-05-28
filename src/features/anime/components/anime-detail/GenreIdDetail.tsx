"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import AnimeCard from "@/components/ui/AnimeCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { getGenreDetail } from "@/features/anime/services/animeService";
import { CategoryPaginatedResult } from "@/features/anime/types/anime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryHeader from "@/components/ui/CategoryHeader";

const ITEMS_PER_PAGE = 12;

function Skeleton() {
  return (
    <div className="mx-auto w-full mt-10 max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-40 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function GenreDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const genreId = params.genreId as string;
  const page = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<CategoryPaginatedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchData = useCallback(async (p: number) => {
    setPageLoading(true);
    const res = await getGenreDetail(genreId, p);
    setData(res);
    setLoading(false);
    setPageLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [genreId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page);
  }, [fetchData, page]);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || (data && newPage > data.totalPages)) return;
    router.push(`/genres/${genreId}?page=${newPage}`);
  };

  const pageNumbers = (() => {
    if (!data) return [];
    const { currentPage, totalPages } = data;
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
    else if (currentPage >= totalPages - 3) pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    return pages;
  })();

  if (loading) return <Skeleton />;

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader title={`${genreId.replace("-", " ")}`} backHref="/" backLabel="Back Home" />

      {data?.animeList.length === 0 ? (
        <div className="border-border-main bg-surface/50 flex flex-col items-center justify-center rounded-2xl border border-dashed py-12">
          <p className="text-text-muted text-sm">Tidak ada anime ditemukan.</p>
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 transition-opacity duration-300 ${pageLoading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            {data?.animeList.map((anime) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </div>

          {/* PAGINATION */}
          {data && data.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <button onClick={() => goToPage(data.currentPage - 1)} disabled={data.currentPage === 1 || pageLoading} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-main/40 bg-surface text-xs font-bold transition-colors hover:border-secondary hover:text-secondary disabled:opacity-30">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {pageNumbers.map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-xs opacity-40">···</span>
                ) : (
                  <button key={p} onClick={() => goToPage(p as number)} disabled={pageLoading} className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-black transition-all ${data.currentPage === p ? "border-secondary bg-secondary text-black scale-[1.05]" : "border-border-main/40 bg-surface hover:border-secondary hover:text-secondary"}`}>
                    {p}
                  </button>
                )
              )}
              <button onClick={() => goToPage(data.currentPage + 1)} disabled={data.currentPage === data.totalPages || pageLoading} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-main/40 bg-surface text-xs font-bold transition-colors hover:border-secondary hover:text-secondary disabled:opacity-30">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
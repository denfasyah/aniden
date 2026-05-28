"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchAnime } from "@/features/anime/services/animeService";
import { AnimeItem } from "@/features/anime/types/anime";
import AnimeCard from "@/components/ui/AnimeCard";
import CategoryHeader from "@/components/ui/CategoryHeader";

// 1. Komponen ini berisi logika pencarian Anda
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchAnime(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching all results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <CategoryHeader title={`Search Results for: ${query}`} backHref={"/"} backLabel={"Back Home"} />

      {loading ? (
        <div className="text-center py-20">Loading results...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">No anime found for {query}</div>
      )}
    </>
  );
}

// 2. Halaman utama membungkus SearchContent dengan Suspense
export default function SearchPage() {
  return (
    <main className="min-h-screen pt-10 px-4 max-w-5xl mx-auto">
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
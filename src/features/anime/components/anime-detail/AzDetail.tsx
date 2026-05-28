"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAzList } from "@/features/anime/services/animeService";
import { AzGroup } from "@/features/anime/types/anime";
import CategoryHeader from "@/components/ui/CategoryHeader";

export default function AzPage() {
  const [data, setData] = useState<AzGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAzList().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="mx-auto max-w-5xl mt-20 px-4 py-10 animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-8 h-8 w-48 rounded-lg bg-surface" />

      {/* Navigasi Huruf Skeleton */}
      <div className="mb-10 flex flex-wrap gap-2">
        {Array.from({ length: 26 }).map((_, i) => (
          <div key={i} className="h-8 w-8 rounded-lg bg-surface" />
        ))}
      </div>

      {/* Daftar Anime Skeleton */}
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-7 w-10 rounded-lg bg-surface" />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-10 w-full rounded-lg bg-surface" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <CategoryHeader title={"Anime A-Z List"} backHref={"/"} backLabel={"Back Home"} />

      {/* Navigasi Huruf */}
      <div className="mb-10 flex flex-wrap gap-2">
        {data.map((group) => (
          <a
            key={group.startWith}
            href={`#group-${group.startWith}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border-main text-xs font-bold hover:bg-secondary hover:text-white transition-colors"
          >
            {group.startWith}
          </a>
        ))}
      </div>

      {/* Daftar Anime */}
      <div className="space-y-10">
        {data.map((group) => (
          <div key={group.startWith} id={`group-${group.startWith}`}>
            <h2 className="mb-4 border-b border-border-main pb-2 text-xl font-black text-secondary">
              {group.startWith}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {group.animeList.map((anime) => (
                <Link
                  key={anime.animeId}
                  href={`/anime/${anime.animeId}`}
                  className="rounded-lg bg-surface p-3 text-sm hover:bg-secondary/10 hover:text-secondary transition-all truncate"
                >
                  {anime.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
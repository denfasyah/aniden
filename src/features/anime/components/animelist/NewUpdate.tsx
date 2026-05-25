"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimeCard from "@/components/ui/AnimeCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { AnimeItem } from "../../types/anime";
import { getOngoingAnime } from "../../services/animeService";
import { getRealtimeTime } from "../../utils/animeHelpers";

// SUB-KOMPONEN SKELETON INTERNAL
function NewUpdateSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-40 rounded-lg" />
        <div className="bg-border-main h-5 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

// MAIN EXPORT SECTION COMPONENT
export default function NewUpdate() {
  const [mounted, setMounted] = useState(false);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Handler Jam Realtime
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const updateTime = () => {
      setCurrentTime(getRealtimeTime());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Data 12 Anime Ongoing Teratas
  useEffect(() => {
    async function fetchUpdates() {
      try {
        const data = await getOngoingAnime();
        setAnimeList(data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching new updates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  if (!mounted || loading) return <NewUpdateSkeleton />;

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* HEADER SECTION (Reusable UI Component) */}
      <SectionHeader 
        title="⚡ New Update" 
        viewAllHref="/anime/ongoing" 
      />

      {animeList.length === 0 ? (
        <div className="border-border-main bg-surface/50 flex flex-col items-center justify-center rounded-2xl border border-dashed py-12">
          <p className="text-text-muted text-sm">Tidak ada data rilis terbaru ditemukan.</p>
        </div>
      ) : (
        /* GRID CARD ANIME */
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {animeList.map((anime) => (
            <AnimeCard 
              key={anime.animeId} 
              anime={anime} 
              infoSuffix={currentTime} 
            />
          ))}
        </div>
      )}
    </section>
  );
}
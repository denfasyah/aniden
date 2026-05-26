"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimeCard from "@/components/ui/AnimeCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeItem } from "../../types/anime";
import { getCompletedAnime } from "../../services/animeService";

// ==========================================
// 1. SUB-KOMPONEN: SKELETON LOADING INTERNAL
// ==========================================
function CompletedAnimeSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      {/* Skeleton Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-40 rounded-lg" />
        <div className="bg-border-main h-5 w-20 rounded-lg" />
      </div>
      {/* Skeleton Carousel Track */}
      <div className="flex gap-4 overflow-hidden py-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="w-36.25 shrink-0 sm:w-40 md:w-45">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN COMPONENT: COMPLETED ANIME SECTION
// ==========================================
export default function CompletedAnime() {
  const [mounted, setMounted] = useState(false);
  const [completedAnime, setCompletedAnime] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ambil data menggunakan service yang sudah dipisah
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    async function fetchCompletedData() {
      const data = await getCompletedAnime();
      // Batasi hanya menampilkan maksimal 15 data anime teratas
      setCompletedAnime(data.slice(0, 12));
      setLoading(false);
    }
    fetchCompletedData();
  }, []);

  // Handler Navigasi Scroll Carousel menggunakan tombol panah (Desktop)
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75; // Geser 75% dari lebar container
      
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!mounted || loading) return <CompletedAnimeSkeleton />;

  // Jika data kosong, sembunyikan section secara elegan
  if (completedAnime.length === 0) return null;

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <SectionHeader 
        title="🎬 Completed" 
        viewAllHref="/completed" 
      />

      {/* CAROUSEL TRACK WRAPPER */}
      <div className="group/carousel relative w-full">
        {/* Tombol Geser Kiri (Desktop Only) */}
        <button
          onClick={() => handleScroll("left")}
          className="bg-bg-main/80 border-border-main hover:border-secondary/50 text-main absolute -left-4 top-1/3 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border p-2 shadow-lg opacity-0 transition-all duration-300 backdrop-blur-md hover:scale-105 group-hover/carousel:opacity-100 md:flex"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* TRACK CONTAINER ITEMS (Menggunakan snap-proximity agar scroll tombol lebih mulus) */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth py-2 snap-x snap-proximity"
          style={{ scrollbarWidth: "none" }}
        >
          {completedAnime.map((anime) => (
            <div 
              key={anime.animeId} 
              // Lebar statis valid agar ukurannya presisi mirip New Update kamu
              className="w-36.25 shrink-0 snap-start"
            >
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>

        {/* Tombol Geser Kanan (Desktop Only) */}
        <button
          onClick={() => handleScroll("right")}
          className="bg-bg-main/80 border-border-main hover:border-secondary/50 text-main absolute -right-4 top-1/3 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border p-2 shadow-lg opacity-0 transition-all duration-300 backdrop-blur-md hover:scale-105 group-hover/carousel:opacity-100 md:flex"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
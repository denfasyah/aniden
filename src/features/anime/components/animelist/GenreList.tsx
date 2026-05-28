"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { GenreItem } from "../../types/anime";
import { getAnimeGenres } from "../../services/animeService";

// ==========================================
// 1. SUB-KOMPONEN: SKELETON LOADING INTERNAL
// ==========================================
function GenreListSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-32 rounded-lg" />
        <div className="bg-border-main h-5 w-20 rounded-lg" />
      </div>
      <div className="flex gap-2 overflow-hidden py-1">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div 
            key={idx} 
            className="bg-border-main h-9 w-24 shrink-0 rounded-xl sm:h-10 sm:w-28" 
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. SUB-KOMPONEN: PILL TOMBOL GENRE INDIVIDUAL
// ==========================================
interface GenrePillProps {
  genre: GenreItem;
  onClick: (genreId: string) => void;
}

function GenrePill({ genre, onClick }: GenrePillProps) {
  return (
    <button
      onClick={() => onClick(genre.genreId)}
      className="bg-surface text-main border-border-main hover:bg-border-main/40 hover:border-secondary/40 transition-cinematic shrink-0 snap-start rounded-xl border px-5 py-2 text-xs font-bold shadow-xs focus:outline-none sm:px-6 sm:py-2.5 sm:text-sm"
    >
      {genre.title}
    </button>
  );
}

// ==========================================
// 3. MAIN COMPONENT EXPORT: GENRE LIST SECTION
// ==========================================
export default function GenreList() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ambil data menggunakan service yang sudah dipisah
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    async function fetchGenresData() {
      const data = await getAnimeGenres();
      setGenres(data);
      setLoading(false);
    }
    fetchGenresData();
  }, []);

  // Handler geser carousel via tombol navigasi desktop
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6; // Geser sejauh 60% viewport carousel
      
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handler navigasi ketika pill di-klik oleh user
  const handleGenreNavigate = (genreId: string) => {
    router.push(`/genres/${genreId}`);
  };

  if (!mounted || loading) return <GenreListSkeleton />;

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER SECTION - Konsisten Menggunakan UI Reusable Component */}
      <SectionHeader 
      icon={<Grid3X3 size={20} className="text-secondary" />}
        title="Genre" 
        viewAllHref="/genres" 
      />

      {/* CAROUSEL CONTROLLER WRAPPER */}
      <div className="group/carousel relative w-full">
        {/* Tombol Navigasi Kiri (Desktop Only) */}
        <button
          onClick={() => handleScroll("left")}
          className="bg-bg-main/80 border-border-main hover:border-secondary/50 text-main absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border p-2 shadow-lg opacity-0 transition-all duration-300 backdrop-blur-md hover:scale-105 group-hover/carousel:opacity-100 md:flex"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* CONTAINER SLIDER CAPSULE PILLS */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex w-full gap-2 overflow-x-auto scroll-smooth py-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {genres.map((genre) => (
            <GenrePill
              key={genre.genreId}
              genre={genre}
              onClick={handleGenreNavigate}
            />
          ))}
        </div>

        {/* Tombol Navigasi Kanan (Desktop Only) */}
        <button
          onClick={() => handleScroll("right")}
          className="bg-bg-main/80 border-border-main hover:border-secondary/50 text-main absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border p-2 shadow-lg opacity-0 transition-all duration-300 backdrop-blur-md hover:scale-105 group-hover/carousel:opacity-100 md:flex"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
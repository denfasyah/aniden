"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchAnime } from "@/features/anime/services/animeService";
import { AnimeItem } from "@/features/anime/types/anime";

interface Props {
  searchOpen: boolean;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export default function SearchBar({
  searchOpen, setSearchOpen, searchQuery, setSearchQuery
}: Props) {
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchAnime(searchQuery.trim());
        setResults(data.slice(0, 5));
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full right-0 w-full md:w-80 mt-2 z-9999"
        >
          {/* Kolom Input (Muncul di Mobile & Desktop) */}
          <div className="bg-surface border border-border-main rounded-xl p-1 mb-2">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full bg-transparent py-2 px-3 text-sm outline-none"
            />
          </div>

          {/* Dropdown Hasil Pencarian */}
          <div className="bg-surface border border-border-main rounded-xl shadow-2xl overflow-hidden">
            {loading ? (
              <div className="p-4 text-xs text-center text-text-muted">Searching...</div>
            ) : searchQuery.trim().length >= 2 && results.length > 0 ? (
              <>
                {results.map((anime) => (
                  <Link 
                    key={anime.animeId} 
                    href={`/anime/${anime.animeId}`}
                    className="flex items-center gap-3 p-2 hover:bg-secondary/10 transition-colors"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="relative w-10 h-14 shrink-0">
                      <Image 
                        src={anime.poster} 
                        alt={anime.title} 
                        fill 
                        className="object-cover rounded shadow-sm" 
                      />
                    </div>
                    <div className="text-xs font-bold truncate pr-2">{anime.title}</div>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                  className="block py-2.5 text-center text-[11px] font-black bg-secondary text-black hover:bg-secondary/90 transition-colors uppercase tracking-wider"
                  onClick={() => setSearchOpen(false)}
                >
                  View all results
                </Link>
              </>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="p-4 text-xs text-center text-text-muted">No results found</div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
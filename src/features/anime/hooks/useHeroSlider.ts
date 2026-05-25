"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import type {
  AnimeItem,
  ApiResponse,
} from "@/features/anime/types/anime";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTO_PLAY_DURATION = 7000;

export function useHeroSlider() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchOngoing() {
      try {
        const res = await fetch(
          `${API_URL}/ongoing`
        );

        const json: ApiResponse = await res.json();

        if (json.ok && json.data.animeList.length > 0) {
          setAnimeList(json.data.animeList.slice(0, 5));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchOngoing();
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % animeList.length);
    setProgress(0);
  }, [animeList.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) =>
      (i - 1 + animeList.length) % animeList.length
    );
    setProgress(0);
  }, [animeList.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (animeList.length === 0 || isPaused) return;

    const step = (50 / AUTO_PLAY_DURATION) * 100;

    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + step));
    }, 50);

    intervalRef.current = setInterval(
      next,
      AUTO_PLAY_DURATION
    );

    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current);

      if (progressRef.current)
        clearInterval(progressRef.current);
    };
  }, [animeList.length, isPaused, next, currentIndex]);

  return {
    animeList,
    currentIndex,
    loading,
    error,
    isPaused,
    setIsPaused,
    progress,
    next,
    prev,
    goTo,
  };
}
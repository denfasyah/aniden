"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Tv, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimeItem } from "../../types/anime";
import { getOngoingAnime } from "../../services/animeService";
const AUTO_PLAY_DURATION = 7000;

function generateSynopsis(title: string): string {
  return `${title} adalah salah satu anime ongoing terpopuler saat ini. Ikuti petualangan seru yang penuh aksi, emosi, dan kejutan di setiap episodenya. Jangan sampai ketinggalan update terbaru!`;
}

function HeroSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "480px", background: "var(--surface)" }}
    >
      <div className="absolute inset-0 animate-pulse" style={{ background: "var(--elevated)" }} />
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12">
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-10 w-2/3 rounded-xl" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-full rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-5/6 rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-3/4 rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="mt-2 flex gap-3">
                <div className="h-11 w-36 rounded-xl" style={{ background: "var(--elevated)" }} />
                <div className="h-11 w-28 rounded-xl" style={{ background: "var(--elevated)" }} />
              </div>
            </div>
            <div
              className="hidden h-72 w-48 shrink-0 rounded-2xl md:block"
              style={{ background: "var(--elevated)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    async function fetchOngoing() {
      try {
        const data = await getOngoingAnime();
        if (data && Array.isArray(data) && data.length > 0) {
          setAnimeList(data.slice(0, 5));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching ongoing anime in HeroSection:", err);
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
    setCurrentIndex((i) => (i - 1 + animeList.length) % animeList.length);
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
    intervalRef.current = setInterval(next, AUTO_PLAY_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [animeList.length, isPaused, next, currentIndex]);

  function getSlug(anime: AnimeItem): string {
    if (anime.slug) return anime.slug;
    if (anime.href) {
      const parts = anime.href.split("/").filter(Boolean);
      return parts[parts.length - 1] ?? "";
    }
    return anime.title.toLowerCase().replace(/\s+/g, "-");
  }

  if (loading) return <HeroSkeleton />;
  if (error || animeList.length === 0) return null;

  const current = animeList[currentIndex];
  const slug = getSlug(current);
  const synopsis = generateSynopsis(current.title);

  // ── Theme-aware values ─────────────────────────────────────────────────────
  const isDark = !mounted || resolvedTheme === "dark";

  // Backdrop filter: dark = gelap dramatis, light = terang soft
  const backdropFilter = isDark
    ? "brightness(0.3) saturate(1.3)"
    : "brightness(0.85) saturate(0.8) blur(2px)";

  // Gradient overlay utama kiri → kanan
  const overlayGradient = isDark
    ? "linear-gradient(to right, rgba(7,11,20,1) 0%, rgba(7,11,20,0.88) 40%, rgba(7,11,20,0.45) 70%, rgba(7,11,20,0.05) 100%)"
    : "linear-gradient(to right, rgba(248,250,252,1) 0%, rgba(248,250,252,0.92) 40%, rgba(248,250,252,0.6) 70%, rgba(248,250,252,0.1) 100%)";

  // Bottom fade
  const bottomFade = isDark
    ? "linear-gradient(to top, rgba(7,11,20,1), transparent)"
    : "linear-gradient(to top, rgba(248,250,252,1), transparent)";

  // Title color
  const titleColor = isDark ? "#ffffff" : "var(--text-primary)";

  // Nav/control button style
  const controlBtnStyle = isDark
    ? {
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.8)",
      }
    : {
        background: "rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.12)",
        color: "rgba(0,0,0,0.6)",
      };

  // Detail button style
  const detailBtnStyle = isDark
    ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }
    : { background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.8)" };

  // Dot inactive
  const dotInactive = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "480px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Backdrop ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`backdrop-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={current.poster}
            alt={current.title}
            fill
            className="object-cover object-center"
            style={{ filter: backdropFilter }}
            priority
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay gradient ── */}
      <div className="absolute inset-0 z-1" style={{ background: overlayGradient }} />
      <div
        className="absolute right-0 bottom-0 left-0 z-1 h-24"
        style={{ background: bottomFade }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto h-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-6">
          {/* ── Left ── */}
          <div className="flex max-w-lg flex-1 flex-col gap-4">
            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="line-clamp-1 text-3xl leading-tight font-black tracking-tight md:text-4xl lg:text-5xl"
                style={{ color: titleColor }}
              >
                {current.title}
              </motion.h1>
            </AnimatePresence>

            {/* Synopsis */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`synopsis-${currentIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {synopsis}
              </motion.p>
            </AnimatePresence>

            {/* Meta */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${currentIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Tv size={14} style={{ color: "var(--secondary)" }} />
                  Tayang {current.releaseDay}
                </span>
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{
                    background: "color-mix(in srgb, var(--secondary) 15%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--secondary) 35%, transparent)",
                    color: "var(--secondary)",
                  }}
                >
                  {current.episodes} Episode
                </span>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${currentIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <Link href={`/anime/${current.animeId}`}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))",
                      boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 45%, transparent)",
                    }}
                  >
                    <Play size={15} fill="white" />
                    Tonton Sekarang
                  </motion.button>
                </Link>
                
                <Link href="https://sociabuzz.com/x7akira/support">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                    style={detailBtnStyle}
                  >
                    <Heart size={15} />
                    Support
                  </motion.button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Poster ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`poster-${currentIndex}`}
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.96 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative hidden shrink-0 md:block"
              style={{ width: "200px", height: "290px" }}
            >
              <div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{
                  background: "color-mix(in srgb, var(--primary) 20%, transparent)",
                  transform: "scale(0.88) translateY(10px)",
                }}
              />
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl"
                style={{
                  border: "2px solid color-mix(in srgb, var(--primary) 35%, transparent)",
                  boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.6)" : "0 20px 50px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src={current.poster}
                  alt={current.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Controls ── */}
      <div className="absolute right-0 bottom-5 left-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {animeList.map((anime, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${anime.title}`}
                className="flex items-center"
              >
                {i === currentIndex ? (
                  <div
                    className="relative h-2 overflow-hidden rounded-full"
                    style={{
                      width: "36px",
                      background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: "var(--primary)", width: `${progress}%` }}
                    />
                  </div>
                ) : (
                  <div
                    className="h-2 w-2 rounded-full transition-all duration-300 hover:scale-125"
                    style={{ background: dotInactive }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={controlBtnStyle}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={controlBtnStyle}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

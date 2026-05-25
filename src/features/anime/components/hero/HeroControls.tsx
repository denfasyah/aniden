import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AnimeItem } from "@/features/anime/types/anime";

interface Props {
  animeList: AnimeItem[];
  currentIndex: number;
  progress: number;
  isDark: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export default function HeroControls({
  animeList, currentIndex, progress, isDark, onPrev, onNext, onGoTo,
}: Props) {
  const controlBtnStyle = isDark
    ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }
    : { background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.6)" };

  const dotInactive = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
  const dotTrack = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  return (
    <div className="absolute bottom-5 left-0 right-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Dots + progress */}
        <div className="flex items-center gap-2">
          {animeList.map((anime, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              aria-label={`Go to ${anime.title}`}
              className="flex items-center"
            >
              {i === currentIndex ? (
                <div
                  className="relative h-2 overflow-hidden rounded-full"
                  style={{ width: "36px", background: dotTrack }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
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
            onClick={onPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={controlBtnStyle}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={controlBtnStyle}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
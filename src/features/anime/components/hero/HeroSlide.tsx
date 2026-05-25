import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Tv } from "lucide-react";

interface Props {
  title: string;
  synopsis: string;
  episodes: number;
  releaseDay: string;
  slug: string;
  currentIndex: number;
  isDark: boolean;
}

export default function HeroSlide({
  title, synopsis, episodes, releaseDay, slug, currentIndex, isDark,
}: Props) {
  const titleColor = isDark ? "#ffffff" : "var(--text-primary)";
  const detailBtnStyle = isDark
    ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }
    : { background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.8)" };

  return (
    <div className="flex flex-1 flex-col gap-4 max-w-lg">

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-3xl font-black leading-tight tracking-tight line-clamp-2 md:text-4xl lg:text-5xl"
          style={{ color: titleColor }}
        >
          {title}
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
            Tayang {releaseDay}
          </span>
          <span
            className="rounded-lg px-2.5 py-1 text-xs font-bold"
            style={{
              background: "color-mix(in srgb, var(--secondary) 15%, transparent)",
              border: "1px solid color-mix(in srgb, var(--secondary) 35%, transparent)",
              color: "var(--secondary)",
            }}
          >
            {episodes} Episode
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
          <Link href={`/anime/${slug}`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))",
                boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 45%, transparent)",
              }}
            >
              <Play size={15} fill="white" />
              Tonton Sekarang
            </motion.button>
          </Link>

          <Link href={`/anime/${slug}`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
              style={detailBtnStyle}
            >
              <Info size={15} />
              Detail
            </motion.button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
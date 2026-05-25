import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  poster: string;
  title: string;
  currentIndex: number;
  isDark: boolean;
}

export default function HeroPoster({ poster, title, currentIndex, isDark }: Props) {
  return (
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
        {/* Glow */}
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
            src={poster}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            unoptimized
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
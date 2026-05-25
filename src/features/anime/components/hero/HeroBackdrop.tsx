import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  poster: string;
  title: string;
  currentIndex: number;
  isDark: boolean;
}

export default function HeroBackdrop({ poster, title, currentIndex, isDark }: Props) {
  const backdropFilter = isDark
    ? "brightness(0.3) saturate(1.3)"
    : "brightness(0.85) saturate(0.8) blur(2px)";

  const overlayGradient = isDark
    ? "linear-gradient(to right, rgba(7,11,20,1) 0%, rgba(7,11,20,0.88) 40%, rgba(7,11,20,0.45) 70%, rgba(7,11,20,0.05) 100%)"
    : "linear-gradient(to right, rgba(248,250,252,1) 0%, rgba(248,250,252,0.92) 40%, rgba(248,250,252,0.6) 70%, rgba(248,250,252,0.1) 100%)";

  const bottomFade = isDark
    ? "linear-gradient(to top, rgba(7,11,20,1), transparent)"
    : "linear-gradient(to top, rgba(248,250,252,1), transparent)";

  return (
    <>
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
            src={poster}
            alt={title}
            fill
            className="object-cover object-center"
            style={{ filter: backdropFilter }}
            priority
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 z-1" style={{ background: overlayGradient }} />
      <div className="absolute bottom-0 left-0 right-0 z-1 h-24" style={{ background: bottomFade }} />
    </>
  );
}
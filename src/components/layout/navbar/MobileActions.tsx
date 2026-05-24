"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

interface Props {
  mounted: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export default function MobileActions({
  mounted, isDark, toggleTheme, setSearchOpen, mobileOpen, setMobileOpen,
}: Props) {
  return (
    <div className="flex items-center gap-1 md:hidden">
      <button onClick={() => setSearchOpen((v) => !v)} className="icon-btn">
        <Search size={18} />
      </button>

      {mounted && (
        <button onClick={toggleTheme} className="icon-btn relative overflow-hidden" aria-label="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span key="sun-m"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                <Sun size={18} />
              </motion.span>
            ) : (
              <motion.span key="moon-m"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                <Moon size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}

      <button onClick={() => setMobileOpen((v) => !v)} className="icon-btn" aria-label="Toggle menu">
        <AnimatePresence mode="wait" initial={false}>
          {mobileOpen ? (
            <motion.span key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
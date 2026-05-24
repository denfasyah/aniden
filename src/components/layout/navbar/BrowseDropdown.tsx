"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { browseItems, navLinkBase, underlineBase } from "@/constants/navItems";
import type { RefObject } from "react";

interface Props {
  browseOpen: boolean;
  setBrowseOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  browseRef: RefObject<HTMLDivElement | null>;
  isDark: boolean;
}

export default function BrowseDropdown({ browseOpen, setBrowseOpen, browseRef, isDark }: Props) {
  const dropdownBg = isDark ? "rgba(14,10,30,0.92)" : "rgba(255,255,255,0.95)";

  return (
    <div ref={browseRef} className="relative">
      <button
        onClick={() => setBrowseOpen((v) => !v)}
        className={navLinkBase}
        aria-expanded={browseOpen}
      >
        Browse
        <motion.span animate={{ rotate: browseOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown size={14} strokeWidth={2.5} />
        </motion.span>
        <span className={underlineBase} />
      </button>

      <AnimatePresence>
        {browseOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-50 mt-4 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border"
            style={{
              background: dropdownBg,
              backdropFilter: "blur(20px)",
              borderColor: "var(--glass-border)",
              boxShadow: "0 0 0 1px var(--glass-border), 0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="h-0.5 w-full"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--secondary), var(--primary))" }}
            />
            <div className="p-2">
              {browseItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setBrowseOpen(false)}
                    className="dropdown-item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                  >
                    <span className="shrink-0 text-(--primary)">{item.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-sm leading-none font-semibold text-(--deblack)">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-0.5 text-[11px] text-(--lowblack)">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
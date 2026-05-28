"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, LogIn, Heart, } from "lucide-react";
import type { RefObject } from "react";
import { useRef, useState, useEffect } from "react";

interface Props {
  mounted: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
}

const profileItems = [
  { label: "Sign In",  href: "/auth/login",    icon: <LogIn size={15} />,    description: "Access your account" },
];

export default function DesktopActions({
  mounted, isDark, toggleTheme,
  setSearchOpen, 
}: Props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dropdownBg = isDark ? "rgba(14,10,30,0.92)" : "rgba(255,255,255,0.95)";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="hidden items-center gap-1 md:flex">

      {/* ── Search ── */}
 {/* ── Search Toggle Button ── */}
<button 
  onClick={() => setSearchOpen((prev) => !prev)} 
  className="icon-btn"
>
  <Search size={18} />
</button>

      {/* ── Bookmark ── */}
      {/* <Link href="/bookmarks" className="icon-btn">
        <Bookmark size={18} />
      </Link> */}

      {/* ── Dark mode toggle ── */}
      {mounted && (
        <button onClick={toggleTheme} className="icon-btn relative overflow-hidden" aria-label="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                <Sun size={18} />
              </motion.span>
            ) : (
              <motion.span key="moon"
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

      {/* ── Profile Dropdown ── */}
      <div ref={profileRef} className="relative ml-1">
        {/* <button
          onClick={() => setProfileOpen((v) => !v)}
          className="profile-btn flex h-8 items-center gap-1 rounded-full border-2 px-2.5 transition-all duration-300"
          aria-expanded={profileOpen}
        >
          <User size={15} strokeWidth={2.5} />
          <motion.span
            animate={{ rotate: profileOpen ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <ChevronDown size={12} strokeWidth={2.5} />
          </motion.span>
        </button> */}

        <Link href ="https://sociabuzz.com/x7akira/support" className="profile-btn flex h-8 items-center gap-1 rounded-full border-2 px-2.5 transition-all duration-300">
        <Heart size={15} />
          <span className="text-sm font-medium">Support</span>
        </Link>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 z-50 mt-4 w-52 overflow-hidden rounded-2xl border"
              style={{
                background: dropdownBg,
                backdropFilter: "blur(20px)",
                borderColor: "var(--glass-border)",
                boxShadow: "0 0 0 1px var(--glass-border), 0 20px 50px rgba(0,0,0,0.2)",
              }}
            >
              {/* Top accent gradient — sama persis Browse */}
              <div
                className="h-0.5 w-full"
                style={{ background: "linear-gradient(90deg, var(--accent), var(--secondary), var(--primary))" }}
              />

              {/* Guest header */}
              {/* <div
                className="flex items-center gap-2.5 border-b px-4 py-3"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                >
                  <User size={14} className="text-(--primary)" />
                </div>
                <div>
                  <p className="text-xs font-bold text-(--deblack)">Guest User</p>
                  <p className="text-[11px] text-(--lowblack)">Not signed in</p>
                </div>
              </div> */}

              {/* Menu items — sama persis Browse */}
              <div className="p-2">
                {profileItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setProfileOpen(false)}
                      className="dropdown-item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                    >
                      <span className="shrink-0 text-(--primary)">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none text-(--deblack)">
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

    </div>
  );
}
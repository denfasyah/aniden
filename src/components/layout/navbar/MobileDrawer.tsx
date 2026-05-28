"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, X } from "lucide-react";
import { browseItems } from "@/constants/navItems";
import NavBrand from "./NavBrand";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileBrowseOpen: boolean;
  setMobileBrowseOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export default function MobileDrawer({
  mobileOpen,
  setMobileOpen,
  mobileBrowseOpen,
  setMobileBrowseOpen,
}: Props) {
  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col md:hidden"
            style={{
              background: "var(--surface)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid var(--glass-border)",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="h-1 w-full shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), var(--secondary), var(--primary))",
              }}
            />

            <div className="flex items-center justify-between border-b border-(--border-main) px-5 py-4">
              <NavBrand />
              <button onClick={() => setMobileOpen(false)} className="icon-btn">
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
              {/* Home */}
              <Link href="/" onClick={() => setMobileOpen(false)} className="mobile-nav-link">
                Home
              </Link>

              {/* Browse accordion */}
              <div>
                <button
                  onClick={() => setMobileBrowseOpen((v) => !v)}
                  className="mobile-nav-link flex w-full items-center justify-between"
                  style={{
                    background: mobileBrowseOpen
                      ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                      : "transparent",
                  }}
                >
                  <span>Browse</span>
                  <motion.span
                    animate={{ rotate: mobileBrowseOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileBrowseOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 ml-4 space-y-0.5 border-l border-(--primary) pl-3">
                        {browseItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="mobile-sub-link flex items-center gap-2.5"
                          >
                            <span className="text-(--primary)">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ongoing */}
              <Link
                href="/ongoing"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link flex items-center gap-2.5"
              >
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-(--primary)" />
                Ongoing
              </Link>

              {/* Schedule */}
              <Link
                href="/schedule"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link"
              >
                Schedule
              </Link>

              {/* Bookmarks */}
              {/* <Link href="/bookmarks" onClick={() => setMobileOpen(false)} className="mobile-nav-link flex items-center gap-2.5">
                <Bookmark size={15} />
                Bookmarks
              </Link> */}
            </nav>

            <div className="border-t border-(--border-main) px-4 pt-3 pb-6">
              <Link
                href="https://sociabuzz.com/x7akira/support"
                className="profile-btn flex h-8 items-center gap-1 rounded-full border-2 px-2.5 transition-all duration-300"
              >
                <Heart size={15} />
                <span className="text-sm font-medium">Support</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

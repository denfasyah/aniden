"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import type { RefObject } from "react";

interface Props {
  searchOpen: boolean;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
}

export default function SearchBar({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOpen, setSearchOpen, searchQuery, setSearchQuery, searchRef,
}: Props) {
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden md:hidden"
        >
          <div className="pt-1 pb-3">
            <div className="relative">
              <Search
                size={15}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-(--primary) opacity-60"
              />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="search-input w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm font-medium outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import Link from "next/link";
import { navLinkBase, underlineBase } from "@/constants/navItems";
import BrowseDropdown from "./BrowseDropdown";
import type { RefObject } from "react";

interface Props {
  browseOpen: boolean;
  setBrowseOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  browseRef: RefObject<HTMLDivElement | null>;
  isDark: boolean;
}

export default function DesktopNav({ browseOpen, setBrowseOpen, browseRef, isDark }: Props) {
  return (
    <div className="hidden items-center gap-7 md:flex">
      <Link href="/" className={navLinkBase}>
        Home
        <span className={underlineBase} />
      </Link>

      <BrowseDropdown
        browseOpen={browseOpen}
        setBrowseOpen={setBrowseOpen}
        browseRef={browseRef}
        isDark={isDark}
      />

      <Link href="/ongoing" className={navLinkBase}>
        <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-(--primary)" />
        Ongoing
        <span className={underlineBase} />
      </Link>

      <Link href="/schedule" className={navLinkBase}>
        Schedule
        <span className={underlineBase} />
      </Link>
    </div>
  );
}
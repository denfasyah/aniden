import { Grid3X3, CheckCircle2, AlignLeft } from "lucide-react";
import type { DropdownItem } from "@/types/navbar";

export const browseItems: DropdownItem[] = [
  { label: "Genres",    href: "/genres",    icon: <Grid3X3 size={15} />,      description: "Filter by genre" },
  // { label: "Popular",   href: "/popular",   icon: <Flame size={15} />,        description: "Trending now" },
  // { label: "Season",    href: "/season",    icon: <CalendarDays size={15} />,  description: "Current & past seasons" },
  { label: "Completed", href: "/completed", icon: <CheckCircle2 size={15} />, description: "Finished series" },
  { label: "A–Z",       href: "/anime/a-z",        icon: <AlignLeft size={15} />,    description: "Alphabetical list" },
];

export const navLinkBase =
  "group relative text-[color:var(--deblack)] text-sm font-semibold cursor-pointer transition-all duration-300 outline-none hover:text-[color:var(--primary)] focus:text-[color:var(--primary)] pb-1 flex items-center gap-1";

export const underlineBase =
  "absolute left-0 bottom-0 h-[2px] w-0 bg-[color:var(--primary)] transition-all duration-300 group-hover:w-full group-focus:w-full";
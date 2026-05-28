"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  info?: string;
  viewAllHref: string;
}

export default function SectionHeader({ title, icon, info, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="border-accent mb-6 flex items-center justify-between border-b pb-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h2 className="font-heading flex gap-2 text-primary text-xl font-black tracking-tight uppercase sm:text-2xl">
          <span className="flex items-center gap-2 fill-accent"> {icon}  </span>
          {title}
        </h2>
        {info && (
          <span className="text-text-muted text-[11px] font-medium">
            {info}
          </span>
        )}
      </div>
      <Link
        href={viewAllHref}
        className="group text-muted hover:text-secondary transition-cinematic flex items-center gap-1 text-xs font-bold"
      >
        View All
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
"use client";

import { useState } from "react";

interface SynopsisSectionProps {
  paragraphs: string[];
}

export default function SynopsisSection({ paragraphs }: SynopsisSectionProps) {
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-primary text-xl font-black tracking-tight sm:text-2xl">
        Synopsis
      </h2>
      <div
        className="text-main/80 transition-cinematic space-y-4 overflow-hidden text-justify text-sm leading-relaxed font-medium"
        style={{
          display: isSynopsisExpanded ? "block" : "-webkit-box",
          WebkitLineClamp: isSynopsisExpanded ? "unset" : 5,
          WebkitBoxOrient: "vertical",
        }}
      >
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <button
        onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
        className="text-secondary transition-cinematic flex cursor-pointer items-center gap-1 pt-1 text-xs font-bold hover:underline"
      >
        {isSynopsisExpanded ? "Lihat Sedikit" : "Lihat Selengkapnya"}
      </button>
    </div>
  );
}
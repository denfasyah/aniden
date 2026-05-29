"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Play, ArrowUpDown, Layers, ChevronRight } from "lucide-react";
import { EpisodeItem } from "../../types/anime";

interface EpisodeListProps {
  animeId: string;
  episodeList: EpisodeItem[];
  batch: {
    title: string;
    batchId: string;
    href: string;
    otakudesuUrl: string;
  } | null;
}

export default function EpisodeList({ animeId, episodeList, batch }: EpisodeListProps) {
  const [isNewestFirst, setIsNewestFirst] = useState(false);
  const [scrollTop, setTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setTop(e.currentTarget.scrollTop);
  };

  const sortedEpisodes = useMemo(() => {
    if (!episodeList) return [];
    const baseList = [...episodeList];
    if (isNewestFirst) {
      return baseList.reverse();
    }
    return baseList;
  }, [episodeList, isNewestFirst]);

  const itemsPerRow = 3;
  const rowHeight = 54;
  const visibleRows = 10;

  const computedVirtualEpisodes = useMemo(() => {
    const list = sortedEpisodes;
    const totalRows = Math.ceil(list.length / itemsPerRow);
    const totalHeight = totalRows * rowHeight;

    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
    const endRow = Math.min(totalRows, startRow + visibleRows + 4);

    const visibleItems = [];
    for (let row = startRow; row < endRow; row++) {
      const rowItems = [];
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < list.length) {
          rowItems.push(list[index]);
        }
      }
      if (rowItems.length > 0) {
        visibleItems.push({ rowIndex: row, items: rowItems });
      }
    }

    return {
      visibleItems,
      totalHeight,
      paddingTop: startRow * rowHeight,
    };
  }, [sortedEpisodes, scrollTop]);

  return (
    <div className="space-y-4">
      <div className="border-border-main/20 flex items-center justify-between border-b pb-2">
        <h2 className="font-heading text-primary text-xl font-black tracking-tight sm:text-2xl">
          List Episode
        </h2>

        {episodeList && episodeList.length > 0 && (
          <button
            onClick={() => setIsNewestFirst(!isNewestFirst)}
            className="text-secondary bg-secondary/10 hover:bg-secondary/20 border-secondary/20 transition-cinematic flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold"
          >
            <ArrowUpDown className="h-3 w-3" />
            <span>Urutkan: {isNewestFirst ? "Terbaru" : "Eps 1"}</span>
          </button>
        )}
      </div>

      {sortedEpisodes.length > 0 ? (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="custom-scrollbar max-h-85 w-full overflow-y-auto pr-1"
          style={{ position: "relative" }}
        >
          <div
            style={{
              height: `${computedVirtualEpisodes.totalHeight}px`,
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                transform: `translateY(${computedVirtualEpisodes.paddingTop}px)`,
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              {computedVirtualEpisodes.visibleItems.map((row) => (
                <div
                  key={row.rowIndex}
                  className="grid grid-cols-3 gap-2"
                  style={{ height: `${rowHeight}px` }}
                >
                  {row.items.map((ep, index) => (
                    <div key={index} className="pt-1.5">
                      <Link
                        href={`/anime/${animeId}/streaming/${ep.episodeId}`}
                        className="bg-surface border-border-main/50 hover:border-secondary hover:bg-secondary/5 transition-cinematic group flex h-10.5 items-center justify-between rounded-xl border p-3"
                      >
                        <span className="text-main/90 group-hover:text-secondary transition-cinematic line-clamp-1 text-xs font-bold">
                          Eps {ep.title}
                        </span>
                        <Play className="text-main/30 group-hover:text-secondary transition-cinematic fill-secondary/20 h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100" />
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-main/40 py-2 text-xs">Belum ada episode tersedia.</p>
      )}

      {/* Batch Download Link */}
      {batch && (
        <Link
          href={`/batch/${batch.batchId}`}
          className="from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 border-secondary/20 transition-cinematic group flex w-full items-center justify-between rounded-2xl border bg-linear-to-r p-4 shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="bg-secondary rounded-xl p-2 text-white shadow-xs">
              <Layers className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-secondary text-xs font-bold tracking-wider uppercase">
                Download Sekaligus
              </p>
              <p className="text-main/70 line-clamp-1 text-xs font-semibold">{batch.title}</p>
            </div>
          </div>
          <ChevronRight className="text-secondary h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
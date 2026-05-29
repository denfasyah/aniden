"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play, ArrowLeft, ArrowRight, List, Download,
  Info, ChevronRight, Monitor, Loader2, Tv, Server,
} from "lucide-react";
import { AnimeDetailData, EpisodeStreamData, StreamQuality } from "@/features/anime/types/anime";

interface StreamingClientProps {
  id: string;
  episodeId: string;
  anime: AnimeDetailData;
  stream: EpisodeStreamData;
}

export default function StreamingClient({ id, episodeId, anime, stream }: StreamingClientProps) {
  const qualityList: StreamQuality[] =
    stream.server?.qualityList ||
    stream.server?.qualities ||
    [];

  const downloadList =
    stream.download?.qualityList ||
    stream.download?.qualities ||
    stream.downloadUrl?.qualityList ||
    stream.downloadUrl?.qualities ||
    [];

  // Episode list: prefer data from stream.info, fallback to anime
  const episodeList = stream.info?.episodeList || anime.episodeList || [];

  // Player state
  const [iframeSrc, setIframeSrc] = useState(stream.defaultStreamingUrl);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loadingServerId, setLoadingServerId] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Cinema mode and expanded qualities states
  const [cinemaMode, setCinemaMode] = useState(false);
  const [expandedQualities, setExpandedQualities] = useState<Record<number, boolean>>({});

  const toggleQualityExpand = (idx: number) => {
    setExpandedQualities((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getQualityColors = (title: string) => {
    const clean = title.toLowerCase();
    if (clean.includes("360")) {
      return {
        headerBg: "bg-zinc-600 border-zinc-500 hover:bg-zinc-500",
      };
    }
    if (clean.includes("480")) {
      return {
        headerBg: "bg-sky-600 border-sky-500 hover:bg-sky-500",
      };
    }
    if (clean.includes("720")) {
      return {
        headerBg: "bg-rose-700 border-rose-600 hover:bg-rose-600",
      };
    }
    if (clean.includes("1080")) {
      return {
        headerBg: "bg-violet-700 border-violet-600 hover:bg-violet-600",
      };
    }
    return {
      headerBg: "bg-slate-700 border-slate-600 hover:bg-slate-600",
    };
  };

  // Click a server → fetch the URL and update iframe
  const handleServerClick = (serverId: string) => {
    if (serverId === activeServerId) return;
    setLoadingServerId(serverId);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/proxy/server/${serverId}`, { cache: "no-store" });
        const json = await res.json();
        const url = json?.data?.details?.url || json?.data?.url || null;
        if (url) {
          setIframeSrc(url);
          setActiveServerId(serverId);
        }
      } catch (e) {
        console.error("Gagal ambil URL server:", e);
      } finally {
        setLoadingServerId(null);
      }
    });
  };

  return (
    <div className="bg-main text-main min-h-screen w-full pb-20 pt-24 relative">
      {/* Cinema Mode Backdrop */}
      {cinemaMode && (
        <div
          className="fixed inset-0 bg-black/95 z-[45] transition-opacity duration-500 cursor-pointer animate-fade-in"
          onClick={() => setCinemaMode(false)}
        />
      )}

      <div className="mx-auto max-w-5xl px-4">

        {/* BREADCRUMB */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-50">
            <Link href="/" className="hover:text-secondary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/anime/${id}`} className="hover:text-secondary line-clamp-1">
              {anime.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">Streaming</span>
          </div>
          <h1 className="text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
            {stream.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* ── KOLOM KIRI ── */}
          <div className="lg:col-span-8 space-y-5">

            {/* VIDEO PLAYER */}
            <div className={`bg-black relative aspect-video w-full overflow-hidden rounded-2xl border border-border-main/20 shadow-2xl transition-all duration-300 ${cinemaMode ? "z-50 ring-4 ring-secondary/20 scale-[1.01]" : "z-0"}`}>
              {isPending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                  <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                </div>
              )}
              <iframe
                ref={iframeRef}
                key={iframeSrc}
                src={iframeSrc}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                scrolling="no"
              />
            </div>

            {/* PREV / ALL EPS / NEXT */}
            <div className="flex items-center justify-between gap-3">
              {stream.hasPrevEpisode && stream.prevEpisode ? (
                <Link
                  href={`/anime/${id}/streaming/${stream.prevEpisode.episodeId}`}
                  className="bg-surface hover:bg-secondary/10 hover:border-secondary transition-cinematic flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-main/50 py-3 text-xs font-bold"
                >
                  <ArrowLeft className="h-4 w-4" /> Prev
                </Link>
              ) : (
                <div className="bg-surface/30 cursor-not-allowed flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-main/10 py-3 text-xs font-bold opacity-30">
                  <ArrowLeft className="h-4 w-4" /> Prev
                </div>
              )}

              <Link
                href={`/anime/${id}`}
                className="bg-surface hover:bg-secondary/10 hover:border-secondary transition-cinematic flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-main/50 py-3 text-xs font-bold"
              >
                <List className="h-4 w-4" /> All Eps
              </Link>

              {stream.hasNextEpisode && stream.nextEpisode ? (
                <Link
                  href={`/anime/${id}/streaming/${stream.nextEpisode.episodeId}`}
                  className="bg-secondary text-black hover:scale-[1.02] transition-cinematic flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-black shadow-lg"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="bg-surface/30 cursor-not-allowed flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-main/10 py-3 text-xs font-bold opacity-30">
                  Next <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* ── QUALITY / SERVER SELECTOR (OTAKUDESU STYLE) ── */}
            {qualityList.length > 0 && (
              <div className="space-y-4">
                {/* Header & Cinema Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tv className="text-secondary h-4 w-4" />
                    <h3 className="text-xs font-black tracking-widest uppercase">Pilih Kualitas / Server</h3>
                  </div>
                  <button
                    onClick={() => setCinemaMode(!cinemaMode)}
                    className={`uppercase text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg transition-all duration-300 shadow-md ${
                      cinemaMode 
                        ? "bg-secondary text-black animate-pulse shadow-[0_0_15px_rgba(0,229,255,0.4)] font-black" 
                        : "bg-red-600 text-white hover:bg-red-700 hover:scale-105"
                    }`}
                  >
                    Cinema {cinemaMode ? "On" : "Off"}
                  </button>
                </div>

                 {/* Grid of Qualities (Side-by-side even on mobile) */}
                <div 
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${qualityList.length}, minmax(0, 1fr))` }}
                >
                  {qualityList.map((quality, qIdx) => {
                    const colors = getQualityColors(quality.title);
                    const isExpanded = expandedQualities[qIdx] ?? false;
                    
                    let cleanTitle = quality.title.trim();
                    if (cleanTitle.toLowerCase().startsWith("mirror")) {
                      cleanTitle = cleanTitle.replace(/mirror/i, "").trim();
                    }

                    return (
                      <div key={qIdx} className="bg-surface border border-border-main/20 flex flex-col overflow-hidden rounded-xl shadow-md">
                        {/* Header Quality Button */}
                        <button
                          onClick={() => toggleQualityExpand(qIdx)}
                          className={`w-full py-3 px-1 sm:px-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-white font-black text-[10px] sm:text-xs uppercase tracking-wide transition-all duration-300 ${colors.headerBg}`}
                        >
                          <Monitor className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-white fill-white/20 shrink-0" />
                          <span className="text-center truncate">
                            <span className="hidden min-[400px]:inline">Mirror </span>
                            <span>{cleanTitle}</span>
                          </span>
                        </button>

                        {/* Collapsible Mirror Server list */}
                        {isExpanded && (
                          <div className="divide-y divide-border-main/10 bg-[#0f0f11]/60 transition-all duration-300 animate-slide-down">
                            {quality.serverList.map((server, sIdx) => {
                              const isLoading = loadingServerId === server.serverId;
                              const isActive = activeServerId === server.serverId;
                              return (
                                <button
                                  key={sIdx}
                                  onClick={() => handleServerClick(server.serverId)}
                                  disabled={isLoading || isPending}
                                  className={`w-full py-3 px-1 sm:px-4 text-center text-[10px] sm:text-xs font-bold transition-all block relative truncate ${
                                    isActive
                                      ? "bg-secondary/15 text-secondary border-l-4 border-l-secondary"
                                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                                  } ${isLoading ? "opacity-60 cursor-wait" : ""}`}
                                >
                                  {isLoading ? (
                                    <div className="flex items-center justify-center gap-1">
                                      <Loader2 className="h-3 w-3 animate-spin shrink-0" />
                                      <span className="hidden sm:inline">Loading...</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center gap-1 truncate">
                                      {isActive && <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current shrink-0" />}
                                      <span className="truncate">{server.title}</span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── DOWNLOAD LINKS ── */}
            {downloadList.length > 0 && (
              <div className="bg-surface border-border-main/40 overflow-hidden rounded-2xl border shadow-sm">
                <div className="bg-border-main/10 flex items-center gap-2 px-5 py-3 border-b border-border-main/40">
                  <Download className="text-secondary h-4 w-4" />
                  <h3 className="text-xs font-black tracking-widest uppercase">Download Links</h3>
                </div>
                <div className="divide-y divide-border-main/20">
                  {downloadList.map((qual, idx) => {
                    const links = qual.urlList || qual.urls || [];
                    return (
                      <div
                        key={idx}
                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="bg-secondary/10 text-secondary rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wide">
                            {qual.title}
                          </span>
                          <span className="text-[11px] font-bold opacity-40">{qual.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {links.map((link, lIdx) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-border-main/10 hover:bg-secondary border-border-main/30 hover:text-black hover:border-secondary transition-cinematic rounded-lg border px-3 py-1.5 text-[10px] font-bold"
                            >
                              {link.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── KOLOM KANAN: SIDEBAR ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* MINI ANIME INFO */}
            <div className="bg-surface border-border-main/40 relative overflow-hidden rounded-2xl border p-5 shadow-sm">
              <div className="flex gap-4">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  className="aspect-3/4 w-24 shrink-0 rounded-lg object-cover shadow-md"
                  width={96}
                  height={128}
                  unoptimized
                />
                <div className="flex-1 space-y-2 min-w-0">
                  <h4 className="line-clamp-2 text-sm font-black">{anime.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {(anime.genreList || []).slice(0, 2).map((g) => (
                      <span
                        key={g.genreId}
                        className="bg-border-main/10 rounded px-2 py-0.5 text-[9px] font-bold opacity-70"
                      >
                        {g.title}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium opacity-50 leading-relaxed line-clamp-3">
                    {anime.synopsis?.paragraphList?.[0] ||
                      anime.synopsis?.paragraphs?.[0] ||
                      "Tidak ada sinopsis."}
                  </p>
                </div>
              </div>
              <Link
                href={`/anime/${id}`}
                className="text-secondary mt-4 flex items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10 transition-cinematic"
              >
                <Info className="h-3 w-3" /> Full Info
              </Link>
            </div>

            {/* EPISODE LIST SIDEBAR */}
            <div className="bg-surface border-border-main/40 flex flex-col rounded-2xl border shadow-sm">
              <div className="bg-border-main/10 border-b border-border-main/40 px-5 py-4">
                <h3 className="text-xs font-black tracking-widest uppercase">Episode Lainnya</h3>
              </div>
              <div className="custom-scrollbar max-h-96 overflow-y-auto divide-y divide-border-main/10">
                {episodeList.map((ep) => {
                  const isActive = ep.episodeId === episodeId;
                  return (
                    <Link
                      key={ep.episodeId}
                      href={`/anime/${id}/streaming/${ep.episodeId}`}
                      className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                        isActive
                          ? "bg-secondary/10 border-l-4 border-l-secondary"
                          : "hover:bg-border-main/5"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                          isActive
                            ? "bg-secondary border-secondary text-black"
                            : "bg-border-main/10 border-border-main/20 opacity-50"
                        }`}
                      >
                        {isActive ? (
                          <Play className="h-3 w-3 fill-current" />
                        ) : (
                          <Monitor className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-[11px] font-bold ${
                            isActive ? "text-secondary" : "opacity-80"
                          }`}
                        >
                          Episode {ep.title}
                        </span>
                        <span className="text-[9px] opacity-40">Subtitle Indonesia</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* REKOMENDASI */}
            {(anime.recommendedAnimeList || []).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[11px] font-black tracking-widest uppercase opacity-40">
                  Kamu Mungkin Suka
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {anime.recommendedAnimeList.slice(0, 4).map((rec) => (
                    <Link
                      key={rec.animeId}
                      href={`/anime/${rec.animeId}`}
                      className="group flex items-center gap-3"
                    >
                      <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md border border-border-main/20">
                        <Image
                          src={rec.poster}
                          alt={rec.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          width={80}
                          height={112}
                          unoptimized
                        />
                      </div>
                      <h5 className="group-hover:text-secondary transition-cinematic line-clamp-2 text-xs font-bold leading-snug">
                        {rec.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--secondary, #00e5ff); }
      `}</style>
    </div>
  );
}

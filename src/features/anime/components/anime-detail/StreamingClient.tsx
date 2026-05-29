"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  List,
  Download,
  Info,
  ChevronRight,
  Monitor,
  Loader2,
} from "lucide-react";
import { AnimeDetailData, EpisodeStreamData } from "@/features/anime/types/anime";

const BASE_URL = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL! : "/api/proxy";

interface Props {
  id: string;
  episodeId: string;
  anime: AnimeDetailData;
  stream: EpisodeStreamData;
}

export default function StreamingView({ id, episodeId, anime, stream }: Props) {
  // Tambahkan state untuk kualitas aktif
  const [currentUrl, setCurrentUrl] = useState(stream.defaultStreamingUrl);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeQuality, setActiveQuality] = useState<string>(
    stream.server?.qualities[0]?.title || ""
  );
  const [activeServerId, setActiveServerId] = useState<string>(
    stream.server?.qualities[0]?.serverList[0]?.serverId || "default"
  );
  const [loadingServerId, setLoadingServerId] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState(stream.server.qualities[0]?.title);

  const handleServerClick = async (serverId: string, qualityTitle: string) => {
    if (activeServerId === serverId) return;

    setLoadingServerId(serverId);
    try {
      // Pastikan endpoint API Anda menerima parameter yang benar untuk mengambil URL baru
      const res = await fetch(`${BASE_URL}/anime/server/?serverId=${serverId}`);
      const json = await res.json();

      if (json.ok && json.data?.url) {
        setCurrentUrl(json.data.url);
        setActiveServerId(serverId);
        setActiveQuality(qualityTitle);
      }
    } catch (e) {
      console.error("Gagal fetch server URL:", e);
    } finally {
      setLoadingServerId(null);
    }
  };
  return (
    <div className="bg-main text-main min-h-screen w-full pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4">
        {/* BREADCRUMB */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-50">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/anime/${id}`} className="hover:text-secondary line-clamp-1">
              {anime.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">Streaming</span>
          </div>
          <h1 className="text-xl leading-tight font-black sm:text-2xl lg:text-3xl">
            {stream.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* KIRI */}
          <div className="space-y-6 lg:col-span-8">
            {/* PLAYER */}
            <div className="border-border-main/20 relative aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl">
              <iframe
                key={currentUrl}
                src={currentUrl}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                scrolling="no"
              />
            </div>

            {/* SERVER / QUALITY SELECTOR */}
            {stream.server?.qualities?.length > 0 && (
  <div className="bg-surface border-border-main/40 space-y-4 rounded-2xl border p-4">
    <p className="text-[10px] font-black tracking-widest uppercase opacity-50">
      Pilih Kualitas & Server
    </p>

    {/* Tab Pemilih Kualitas */}
    <div className="flex gap-2">
      {stream.server.qualities.map((qual) => (
        <button
          key={qual.title}
          onClick={() => setSelectedQuality(qual.title)}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${
            selectedQuality === qual.title
              ? "bg-secondary border-secondary text-black"
              : "bg-surface-secondary border-border-main/40 hover:border-secondary"
          }`}
        >
          {qual.title}
        </button>
      ))}
    </div>

    {/* Daftar Server berdasarkan Kualitas yang dipilih */}
    <div className="flex flex-wrap gap-2 pt-2">
      {stream.server.qualities
        .find((q) => q.title === selectedQuality)
        ?.serverList.map((server) => {
          const isActive = activeServerId === server.serverId;
          const isLoading = loadingServerId === server.serverId;
          return (
            <button
              key={server.serverId}
              onClick={() => handleServerClick(server.serverId, selectedQuality)}
              disabled={isLoading}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold capitalize transition-all ${
                isActive
                  ? "bg-secondary border-secondary text-black"
                  : "bg-surface-secondary border-border-main/40 hover:border-secondary hover:text-secondary"
              }`}
            >
              {isLoading ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : null}
              {server.title.trim()}
            </button>
          );
        })}
    </div>
  </div>
)}

            {/* NAVIGASI */}
            <div className="flex items-center justify-between gap-4">
              {stream.hasPrevEpisode && stream.prevEpisode ? (
                <Link
                  href={`/anime/${id}/streaming/${stream.prevEpisode.episodeId}`}
                  className="bg-surface hover:bg-secondary/10 hover:border-secondary transition-cinematic border-border-main/50 flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold"
                >
                  <ArrowLeft className="h-4 w-4" /> Prev
                </Link>
              ) : (
                <div className="bg-surface/30 border-border-main/10 flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold opacity-30">
                  <ArrowLeft className="h-4 w-4" /> Prev
                </div>
              )}
              <Link
                href={`/anime/${id}`}
                className="bg-surface hover:bg-secondary/10 hover:border-secondary transition-cinematic border-border-main/50 flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold"
              >
                <List className="h-4 w-4" /> All Eps
              </Link>
              {stream.hasNextEpisode && stream.nextEpisode ? (
                <Link
                  href={`/anime/${id}/streaming/${stream.nextEpisode.episodeId}`}
                  className="bg-secondary transition-cinematic flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-black text-black shadow-lg hover:scale-[1.02]"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="bg-surface/30 border-border-main/10 flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold opacity-30">
                  Next <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* DOWNLOAD */}
            <div className="bg-surface border-border-main/40 overflow-hidden rounded-2xl border shadow-sm">
              <div className="bg-border-main/10 border-border-main/40 flex items-center gap-2 border-b px-5 py-3">
                <Download className="text-secondary h-4 w-4" />
                <h3 className="text-xs font-black tracking-widest uppercase">Download Links</h3>
              </div>
              <div className="divide-border-main/20 divide-y">
                {stream.downloadUrl.qualities.map((qual, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-secondary/10 text-secondary rounded-md px-2 py-1 text-[10px] font-black uppercase">
                        {qual.title}
                      </span>
                      <span className="text-[11px] font-bold opacity-50">{qual.size}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {qual.urls.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-surface-secondary hover:bg-secondary border-border-main/40 hover:border-secondary transition-cinematic rounded-lg border px-3 py-1.5 text-[10px] font-bold hover:text-black"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KANAN SIDEBAR */}
          <div className="space-y-8 lg:col-span-4">
            {/* MINI INFO */}
            <div className="bg-surface border-border-main/40 relative overflow-hidden rounded-2xl border p-5 shadow-sm">
              <div className="flex gap-4">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  className="aspect-3/4 w-24 rounded-lg object-cover shadow-md"
                  width={96}
                  height={128}
                />
                <div className="flex-1 space-y-2">
                  <h4 className="line-clamp-2 text-sm font-black">{anime.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {anime.genreList.slice(0, 2).map((g) => (
                      <span
                        key={g.genreId}
                        className="bg-border-main/10 rounded px-2 py-0.5 text-[9px] font-bold opacity-70"
                      >
                        {g.title}
                      </span>
                    ))}
                  </div>
                  <p className="line-clamp-3 text-[10px] leading-relaxed font-medium opacity-50">
                    {anime.synopsis.paragraphs[0]}
                  </p>
                </div>
              </div>
              <Link
                href={`/anime/${id}`}
                className="text-secondary border-secondary/20 bg-secondary/5 hover:bg-secondary/10 mt-4 flex items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] font-black tracking-widest uppercase"
              >
                <Info className="h-3 w-3" /> Full Info
              </Link>
            </div>

            {/* EPISODE LIST SIDEBAR */}
            <div className="bg-surface border-border-main/40 flex flex-col rounded-2xl border shadow-sm">
              <div className="bg-border-main/10 border-border-main/40 border-b px-5 py-4">
                <h3 className="text-xs font-black tracking-widest uppercase">Episode Lainnya</h3>
              </div>
              <div className="custom-scrollbar divide-border-main/10 max-h-96 divide-y overflow-y-auto">
                {anime.episodeList.map((ep) => {
                  const isActive = ep.episodeId === episodeId;
                  return (
                    <Link
                      key={ep.episodeId}
                      href={`/anime/${id}/streaming/${ep.episodeId}`}
                      className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                        isActive
                          ? "bg-secondary/10 border-l-secondary border-l-4"
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
                          className={`text-[11px] font-bold ${isActive ? "text-secondary" : "opacity-80"}`}
                        >
                          Episode {ep.eps}
                        </span>
                        <span className="text-[9px] opacity-40">Subtitle Indonesia</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* REKOMENDASI */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black tracking-widest uppercase opacity-40">
                Kamu Mungkin Suka
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {anime.recommendedAnimeList.slice(0, 3).map((rec) => (
                  <Link
                    key={rec.animeId}
                    href={`/anime/${rec.animeId}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="border-border-main/20 h-16 w-12 overflow-hidden rounded-md border">
                      <Image
                        src={rec.poster}
                        alt={rec.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        width={96}
                        height={128}
                      />
                    </div>
                    <h5 className="group-hover:text-secondary transition-cinematic line-clamp-2 text-xs leading-snug font-bold">
                      {rec.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { getAnimeDetail, getEpisodeStream } from "@/features/anime/services/animeService";
import { notFound } from "next/navigation";
import { 
  Play, ArrowLeft, ArrowRight, List, Download, 
  Info, ChevronRight, Monitor, 
} from "lucide-react";
import Image from "next/image";

export default async function StreamingPage({ 
  params 
}: { 
  params: Promise<{ id: string; episodeId: string }> 
}) {
  const { id, episodeId } = await params;

  // Fetch 2 data sekaligus (Detail Anime untuk Sidebar & Data Stream untuk Player)
  const [anime, stream] = await Promise.all([
    getAnimeDetail(id),
    getEpisodeStream(episodeId)
  ]);

  if (!anime || !stream) notFound();

  return (
    <div className="bg-main text-main min-h-screen w-full pb-20 pt-24">
      <div className="mx-auto max-w-5xl px-4">
        
        {/* 1. BREADCRUMB / JUDUL */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-50">
            <Link href="/" className="hover:text-secondary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/anime/${id}`} className="hover:text-secondary line-clamp-1">{anime.title}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">Streaming</span>
          </div>
          <h1 className="text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
            {stream.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* KOLOM KIRI: PLAYER & INFO (LG: 8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* VIDEO PLAYER CONTAINER */}
            <div className="bg-black relative aspect-video w-full overflow-hidden rounded-2xl border border-border-main/20 shadow-2xl">
              <iframe
                src={stream.defaultStreamingUrl}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                scrolling="no"
              />
            </div>

            {/* NAVIGASI EPISODE (PREV, ALL, NEXT) */}
            <div className="flex items-center justify-between gap-4">
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

            {/* DOWNLOAD SECTION (MIRIP SAMEHADAKU) */}
            <div className="bg-surface border-border-main/40 overflow-hidden rounded-2xl border shadow-sm">
              <div className="bg-border-main/10 flex items-center gap-2 px-5 py-3 border-b border-border-main/40">
                <Download className="text-secondary h-4 w-4" />
                <h3 className="text-xs font-black tracking-widest uppercase">Download Links</h3>
              </div>
              <div className="divide-y divide-border-main/20">
                {(stream.download?.qualityList || 
                  stream.download?.qualities || 
                  stream.downloadUrl?.qualityList || 
                  stream.downloadUrl?.qualities || 
                  []).map((qual, idx) => {
                    const links = qual.urlList || qual.urls || [];
                    return (
                      <div key={idx} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="bg-secondary/10 text-secondary rounded-md px-2 py-1 text-[10px] font-black uppercase">
                            {qual.title}
                          </span>
                          <span className="text-[11px] font-bold opacity-50">{qual.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {links.map((link, lIdx) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-surface-secondary hover:bg-secondary border-border-main/40 hover:text-black hover:border-secondary transition-cinematic rounded-lg border px-3 py-1.5 text-[10px] font-bold"
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
          </div>

          {/* KOLOM KANAN: SIDEBAR (LG: 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* MINI ANIME INFO */}
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
                      <span key={g.genreId} className="bg-border-main/10 rounded px-2 py-0.5 text-[9px] font-bold opacity-70">
                        {g.title}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium opacity-50 leading-relaxed line-clamp-3">
                    {anime.synopsis?.paragraphList?.[0] || anime.synopsis?.paragraphs?.[0] || ""}
                  </p>
                </div>
              </div>
              <Link 
                href={`/anime/${id}`}
                className="text-secondary mt-4 flex items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10"
              >
                <Info className="h-3 w-3" /> Full Info
              </Link>
            </div>

            {/* SIDEBAR EPISODE LIST (EPISODE SELECTOR) */}
            <div className="bg-surface border-border-main/40 flex flex-col rounded-2xl border shadow-sm">
              <div className="bg-border-main/10 border-b border-border-main/40 px-5 py-4">
                <h3 className="text-xs font-black tracking-widest uppercase">Episode Lainnya</h3>
              </div>
              <div className="custom-scrollbar max-h-100 overflow-y-auto divide-y divide-border-main/10">
                {anime.episodeList.map((ep) => {
                  const isActive = ep.episodeId === episodeId;
                  return (
                    <Link
                      key={ep.episodeId}
                      href={`/anime/${id}/streaming/${ep.episodeId}`}
                      className={`flex items-center gap-3 px-5 py-4 transition-colors ${
                        isActive 
                        ? "bg-secondary/10 border-l-4 border-l-secondary" 
                        : "hover:bg-border-main/5"
                      }`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                        isActive ? "bg-secondary border-secondary text-black" : "bg-border-main/10 border-border-main/20 opacity-50"
                      }`}>
                        {isActive ? <Play className="h-3 w-3 fill-current" /> : <Monitor className="h-3 w-3" />}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-bold ${isActive ? "text-secondary" : "opacity-80"}`}>
                          Episode {ep.title}
                        </span>
                        <span className="text-[9px] opacity-40">Subtitle Indonesia</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* REKOMENDASI MINI */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black tracking-widest uppercase opacity-40">Kamu Mungkin Suka</h3>
              <div className="grid grid-cols-1 gap-4">
                {anime.recommendedAnimeList.slice(0, 3).map((rec) => (
                  <Link 
                    key={rec.animeId} 
                    href={`/anime/${rec.animeId}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="h-16 w-12 overflow-hidden rounded-md border border-border-main/20">
                      <Image 
                        src={rec.poster} 
                        alt={rec.title} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                        width={96}
                        height={128}
                      />
                    </div>
                    <h5 className="group-hover:text-secondary transition-cinematic line-clamp-2 text-xs font-bold leading-snug">
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
import React from "react";
import { getAnimeDetail, getEpisodeStream } from "@/features/anime/services/animeService";
import { notFound } from "next/navigation";
import StreamingClient from "./StreamingClient";

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
    <StreamingClient 
      id={id} 
      episodeId={episodeId} 
      anime={anime} 
      stream={stream} 
    />
  );
}
import { getAnimeDetail, getEpisodeStream } from "@/features/anime/services/animeService";
import { notFound } from "next/navigation";
import StreamingClient from "@/features/anime/components/anime-detail/StreamingClient";

export default async function StreamingPage({
  params,
}: {
  params: Promise<{ id: string; episodeId: string }>;
}) {
  const { id, episodeId } = await params;

  const [anime, stream] = await Promise.all([
    getAnimeDetail(id),
    getEpisodeStream(episodeId),
  ]);

  if (!anime || !stream) notFound();

  return <StreamingClient id={id} episodeId={episodeId} anime={anime} stream={stream} />;
}
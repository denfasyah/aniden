import AnimeDetailClient from "@/features/anime/components/anime-detail/AnimeDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <AnimeDetailClient animeId={id} />;
}
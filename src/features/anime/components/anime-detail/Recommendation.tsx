import Link from "next/link";
import { RecommendedAnime } from "../../types/anime";

interface RecommendationProps {
  recommendedAnimeList: RecommendedAnime[];
}

export default function Recommendation({ recommendedAnimeList }: RecommendationProps) {
  if (!recommendedAnimeList || recommendedAnimeList.length === 0) return null;

  return (
    <div className="border-border-main/20 mt-16 border-t pt-10">
      <h2 className="font-heading text-primary text-xl font-black tracking-tight sm:text-2xl mb-6">
        Recommendations
      </h2>

      <div className="w-full overflow-hidden">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4">
          {recommendedAnimeList.map((rec, idx) => (
            <Link
              key={idx}
              href={`/anime/${rec.animeId}`}
              className="group block w-32 shrink-0 snap-start space-y-2 text-left sm:w-40"
            >
              <div className="bg-surface border-border-main/60 group-hover:border-secondary/40 transition-cinematic relative aspect-3/4 w-full overflow-hidden rounded-xl border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rec.poster}
                  alt={rec.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-main group-hover:text-secondary transition-cinematic line-clamp-2 text-xs leading-snug font-bold">
                {rec.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
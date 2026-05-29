// "use client";

// import React, { useState, useEffect } from "react";
// import { GenreItem } from "@/features/anime/types/anime";
// import { getAnimeGenres } from "@/features/anime/services/animeService";
// import CategoryHeader from "@/components/ui/CategoryHeader";
// import Link from "next/link";

// function GenreListSkeleton() {
//   return (
//     <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mb-6 flex items-center justify-between">
//         <div className="bg-border-main h-7 w-32 rounded-lg" />
//         <div className="bg-border-main h-5 w-20 rounded-lg" />
//       </div>
//       <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
//         {Array.from({ length: 12 }).map((_, idx) => (
//           <div key={idx} className="bg-border-main h-9 rounded-xl sm:h-10" />
//         ))}
//       </div>
//     </div>
//   );
// }

// function GenrePill({ genre }: { genre: GenreItem }) {
//   return (
//     <Link
//       href={`/genres/${genre.genreId}`}
//       className="bg-surface text-main border-border-main hover:bg-border-main/40 hover:border-secondary/40 hover:text-secondary transition-cinematic w-full truncate rounded-xl border px-3 py-2 text-center text-xs font-bold shadow-xs focus:outline-none sm:px-4 sm:py-2.5 sm:text-sm"
//     >
//       {genre.title}
//     </Link>
//   );
// }

// export default function GenreList() {
//   const [mounted, setMounted] = useState(false);
//   const [genres, setGenres] = useState<GenreItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setMounted(true);
//     async function fetchGenresData() {
//       const data = await getAnimeGenres();
//       setGenres(data);
//       setLoading(false);
//     }
//     fetchGenresData();
//   }, []);


//   if (!mounted || loading) return <GenreListSkeleton />;

//   return (
//     <section className="bg-main transition-cinematic mx-auto mb-8 w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
//       <CategoryHeader title="Genres" backHref="/" backLabel="Back Home" />

//       <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
//         {genres.map((genre) => (
//           <GenrePill key={genre.genreId} genre={genre} />
//         ))}
//       </div>
//     </section>
//   );
// }

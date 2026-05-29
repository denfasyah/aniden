import CompletedAnime from "@/features/anime/components/animelist/CompletedAnime";
// import GenreSection from "@/features/anime/components/animelist/GenreList";
import NewUpdate from "@/features/anime/components/animelist/NewUpdate";
import HeroSection from "@/features/anime/components/hero/HeroSection"
import ScheduleList from "@/features/anime/components/animelist/ScheduleList";
import SociabuzzMarquee from "@/features/anime/components/animelist/SociabuzzMarquee";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <HeroSection />
      <SociabuzzMarquee />
      <NewUpdate />
      {/* <GenreSection /> */}
      <CompletedAnime />
      <ScheduleList />

    </div>
  );
}

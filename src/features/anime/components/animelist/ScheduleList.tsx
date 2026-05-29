"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Rabbit } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { DaySchedule } from "@/features/anime/types/anime";
import { getAnimeSchedule } from "@/features/anime/services/animeService";

function ScheduleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-48 rounded-lg" />
        <div className="bg-border-main h-5 w-20 rounded-lg" />
      </div>
      <div className="flex gap-2 overflow-hidden py-1">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="bg-border-main h-9 w-24 shrink-0 rounded-xl" />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-border-main h-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function SchedulePill({ day, isActive, onClick }: { day: string; isActive: boolean; onClick: (day: string) => void }) {
  return (
    <button
      onClick={() => onClick(day)}
      className={`transition-all shrink-0 rounded-xl border px-5 py-2 text-xs font-bold ${
        isActive
          ? "border-secondary bg-secondary text-white"
          : "bg-surface text-main border-border-main hover:bg-border-main"
      }`}
    >
      {day}
    </button>
  );
}

export default function AnimeSchedule() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScheduleData() {
      const data = await getAnimeSchedule();
      setSchedule(data);
      if (data.length > 0) setActiveDay(data[0].day);
      setLoading(false);
    }
    fetchScheduleData();
  }, []);

  if (loading) return <ScheduleSkeleton />;
  if (schedule.length === 0) return null;

  const currentDayData = schedule.find((item) => item.day === activeDay);
  // PENTING: Akses anime_list (snake_case) sesuai JSON baru
  const limitedAnimeList = currentDayData?.anime_list ? currentDayData.anime_list.slice(0, 6) : [];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <SectionHeader icon={<Calendar size={20} className="text-secondary" />} title="Jadwal Rilis" viewAllHref="/schedule" />

      <div className="w-full overflow-hidden pt-1 pb-5">
        <div className="flex w-full gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {schedule.map((item) => (
            <SchedulePill key={item.day} day={item.day} isActive={item.day === activeDay} onClick={setActiveDay} />
          ))}
        </div>
      </div>

      {limitedAnimeList.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {limitedAnimeList.map((anime) => (
            <Link
              key={anime.slug}
              href={`/anime/${anime.slug}`}
              className="bg-surface border-border-main hover:border-secondary/40 flex items-center justify-between rounded-xl border p-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-border-main/30 flex h-9 w-9 items-center justify-center rounded-lg">
                  <Rabbit className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-main line-clamp-1">{anime.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-main/40" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-border-main flex h-24 items-center justify-center rounded-xl border border-dashed text-sm font-bold">
          Tidak ada jadwal rilis.
        </div>
      )}
    </section>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, Rabbit } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { DaySchedule } from "../../types/anime";
import { getAnimeSchedule } from "../../services/animeService";

// ==========================================
// 1. SUB-KOMPONEN: SKELETON LOADING INTERNAL
// ==========================================
function ScheduleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-border-main h-7 w-48 rounded-lg" />
        <div className="bg-border-main h-5 w-20 rounded-lg" />
      </div>
      <div className="flex gap-2 overflow-hidden py-1">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="bg-border-main h-9 w-24 shrink-0 rounded-xl sm:h-10 sm:w-28" />
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

// ==========================================
// 2. SUB-KOMPONEN: PILL TOMBOL HARI INDIVIDUAL
// ==========================================
interface SchedulePillProps {
  day: string;
  isActive: boolean;
  onClick: (day: string) => void;
}

function SchedulePill({ day, isActive, onClick }: SchedulePillProps) {
  return (
    <button
      onClick={() => onClick(day)}
      className={`transition-cinematic shrink-0 snap-start rounded-xl border px-5 py-2 text-xs font-bold shadow-xs outline-none focus:outline-none sm:px-6 sm:py-2.5 sm:text-sm ${
        isActive
          ? "border-secondary bg-secondary text-white shadow-md shadow-secondary/20"
          : "bg-surface text-main border-border-main hover:bg-border-main/40 hover:border-secondary/40 focus:border-secondary/40"
      }`}
    >
      {day}
    </button>
  );
}

// ==========================================
// 3. MAIN COMPONENT EXPORT: ANIME SCHEDULE SECTION
// ==========================================
export default function AnimeSchedule() {
  const [mounted, setMounted] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Ambil data menggunakan service yang sudah dipisah murni
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    async function fetchScheduleData() {
      try {
        const data = await getAnimeSchedule();
        
        // Sesuaikan fungsi fetchScheduleData untuk mengambil data dari response.data.scheduleList
        // Dan tambahkan null check / array check agar aplikasi tidak crash jika API mengembalikan data kosong
        let scheduleArray: DaySchedule[] = [];
        if (data && Array.isArray(data)) {
          scheduleArray = data;
        } else if (data && typeof data === "object") {
          const anyData = data as any;
          if (Array.isArray(anyData.data?.scheduleList)) {
            scheduleArray = anyData.data.scheduleList;
          } else if (Array.isArray(anyData.scheduleList)) {
            scheduleArray = anyData.scheduleList;
          } else if (Array.isArray(anyData.data?.days)) {
            scheduleArray = anyData.data.days;
          } else if (Array.isArray(anyData.days)) {
            scheduleArray = anyData.days;
          } else if (Array.isArray(anyData.data)) {
            scheduleArray = anyData.data;
          }
        }

        if (Array.isArray(scheduleArray) && scheduleArray.length > 0) {
          setSchedule(scheduleArray);
          // Update logika setActiveday karena sekarang menggunakan properti title untuk nama hari
          const firstDay = scheduleArray[0].title || scheduleArray[0].day || "";
          setActiveDay(firstDay);
        } else {
          setSchedule([]);
        }
      } catch (error) {
        console.error("Error fetching schedule data inside component:", error);
        setSchedule([]);
      } finally {
        setLoading(false);
      }
    }
    fetchScheduleData();
  }, []);

  if (!mounted || loading) return <ScheduleSkeleton />;
  
  // Tambahkan null check agar aplikasi tidak crash jika API mengembalikan data kosong
  if (!Array.isArray(schedule) || schedule.length === 0) return null;

  // Pastikan schedule adalah array yang valid sebelum diolah (logika schedule.find diperbaiki)
  const currentDayData = Array.isArray(schedule)
    ? schedule.find((item) => item && (item.title || item.day) === activeDay)
    : undefined;
    
  const limitedAnimeList = currentDayData?.animeList && Array.isArray(currentDayData.animeList)
    ? currentDayData.animeList.slice(0, 6)
    : [];

  return (
    <section className="bg-main transition-cinematic mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <SectionHeader
        icon={<Calendar size={20} className="text-secondary" />}
        title="Jadwal Rilis"
        viewAllHref="/schedule"
      />

      {/* CONTAINER SLIDER CAPSULE PILLS */}
      <div className="w-full overflow-hidden pt-1 pb-5">
        <div
          className="no-scrollbar flex w-full gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory style-remove-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {schedule.map((item, idx) => {
            const dayName = item.title || item.day || `Hari ${idx + 1}`;
            return (
              <SchedulePill
                key={dayName}
                day={dayName}
                isActive={dayName === activeDay}
                onClick={setActiveDay}
              />
            );
          })}
        </div>
      </div>

      {/* GRID KARTU TEXT LIST ANIME */}
      {limitedAnimeList.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {limitedAnimeList.map((anime) => (
            <Link
              key={anime.animeId}
              href={`/anime/${anime.animeId}`}
              className="bg-surface border-border-main hover:border-secondary/40 transition-cinematic group flex items-center justify-between rounded-xl border p-4 shadow-xs"
            >
              <div className="flex items-center gap-3 pr-4">
                <div className="bg-border-main/30 text-main/60 group-hover:bg-secondary/10 group-hover:text-secondary transition-cinematic flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Rabbit className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-main group-hover:text-secondary transition-cinematic line-clamp-1 text-sm font-bold">
                  {anime.title}
                </span>
              </div>
              <ChevronRight className="text-main/40 group-hover:text-secondary transition-cinematic h-4 w-4 shrink-0 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-surface border-border-main text-main/50 flex h-24 items-center justify-center rounded-xl border border-dashed text-sm font-bold">
          Tidak ada jadwal rilis untuk hari ini.
        </div>
      )}

      {/* Pembersih Webkit Scrollbar */}
      <style jsx global>{`
        .style-remove-scroll::-webkit-scrollbar {
          display: none !important;
        }
        .style-remove-scroll {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
}
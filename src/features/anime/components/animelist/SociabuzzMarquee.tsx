"use client";

import { useState } from "react";

export default function SociabuzzMarquee() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mx-auto my-6 h-9 w-full max-w-5xl px-4">
      {/* 1. Komponen Skeleton (Muncul saat isLoading = true) */}
      {isLoading && (
        <div className="absolute inset-x-4 inset-y-0 z-0 animate-pulse rounded-xl bg-gray-800" />
      )}

      {/* 2. Iframe (Diberi onLoad untuk mengubah state loading) */}
      <iframe
        src="https://sociabuzz.com/pro/tribe/toprunningtext/v2/8965122592"
        className={`h-full w-full border-none transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        title="Support Marquee"
        onLoad={() => setIsLoading(false)}
      />

      {/* 3. Overlay link */}
      <a
        href="https://sociabuzz.com/x7akira/support"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 block"
      />
    </div>
  );
}
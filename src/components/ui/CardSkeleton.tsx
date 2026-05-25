"use client";

import React from "react";

export default function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 animate-pulse">
      <div className="bg-border-main aspect-3/4 w-full rounded-xl" />
      <div className="bg-border-main h-4 w-5/6 rounded" />
      <div className="bg-border-main h-3 w-1/2 rounded" />
    </div>
  );
}
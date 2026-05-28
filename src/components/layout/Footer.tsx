"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full border-t mt-20" style={{ borderColor: "var(--glass-border)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), var(--secondary), var(--primary), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Links row ── */}
        <div className="flex items-center justify-center gap-6 pt-6 pb-4">
          <Link
            href="/disclaimer"
            className="text-sm text-(--lowblack) transition-colors duration-200 hover:text-(--primary)"
          >
            Disclaimer
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-(--lowblack) transition-colors duration-200 hover:text-(--primary)"
          >
            Privacy Policy
          </Link>
        </div>

        {/* ── Copyright ── */}
        <div className="flex items-center justify-center pb-3">
          <p className="text-xs text-(--lowblack)">
            © {new Date().getFullYear()} Aniden. All rights reserved.
          </p>
        </div>

        {/* ── Disclaimer bar ── */}
        <div
          className="mb-4 rounded-lg px-4 py-2.5 text-center text-xs leading-relaxed"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            color: "var(--lowblack)",
          }}
        >
            Aniden does not store any files on its server. All contents are provided by non-affiliated third parties.
        </div>

      </div>
    </footer>
  );
}
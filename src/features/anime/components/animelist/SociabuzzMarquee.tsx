"use client";

export default function SociabuzzMarquee() {
  return (
    // 1. Parent div dengan relative agar posisi anak-anaknya terkunci
    <div className="mx-auto my-6 h-9 w-full max-w-5xl px-4 relative">
      
      {/* 2. Iframe tetap di bawah */}
      <iframe
        src="https://sociabuzz.com/pro/tribe/toprunningtext/v2/8965122592"
        className="w-full h-full border-none"
        title="Support Marquee"
      />

      {/* 3. Overlay link transparan yang menutupi iframe sehingga bisa diklik */}
      <a
        href="https://sociabuzz.com/x7akira/support"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 block"
      />
      
    </div>
  );
}
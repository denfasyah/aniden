export default function HeroSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "480px", background: "var(--surface)" }}
    >
      <div className="absolute inset-0 animate-pulse" style={{ background: "var(--elevated)" }} />
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12">
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-10 w-2/3 rounded-xl" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-full rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-5/6 rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="h-4 w-3/4 rounded-full" style={{ background: "var(--elevated)" }} />
              <div className="mt-2 flex gap-3">
                <div className="h-11 w-36 rounded-xl" style={{ background: "var(--elevated)" }} />
                <div className="h-11 w-28 rounded-xl" style={{ background: "var(--elevated)" }} />
              </div>
            </div>
            <div
              className="hidden md:block w-48 h-72 rounded-2xl shrink-0"
              style={{ background: "var(--elevated)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
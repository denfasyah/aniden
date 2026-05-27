import Link from "next/link";

const CategoryHeader = ({ title, backHref, backLabel }: { title: string; backHref: string; backLabel: string }) => {
  return (
    <div className="border-accent mt-10 mb-6 flex items-center justify-between border-b pb-3 md:mt-16">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h2 className="font-heading text-primary text-xl font-black tracking-tight uppercase sm:text-2xl">
          {title}
        </h2>
      </div>
      <Link
        href={backHref}
        className="group text-muted hover:text-secondary transition-cinematic flex items-center gap-1 text-xs font-bold"
      >
        {backLabel}
      </Link>
    </div>
  );
};

export default CategoryHeader;

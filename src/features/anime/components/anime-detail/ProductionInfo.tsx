import { Tv, Film } from "lucide-react";

interface ProductionInfoProps {
  studios: string;
  producers: string;
}

export default function ProductionInfo({ studios, producers }: ProductionInfoProps) {
  return (
    <div className="bg-surface border-border-main/40 space-y-5 rounded-2xl border p-5 shadow-xs">
      <h3 className="text-main/40 border-border-main/40 border-b pb-2 text-xs font-extrabold tracking-wider uppercase">
        Production Info
      </h3>

      <div className="space-y-4.5">
        <div className="flex items-start gap-3">
          <Tv className="text-secondary mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="text-main/40 text-[10px] font-bold tracking-wider uppercase">Studio</p>
            <p className="text-main/90 text-xs font-bold sm:text-sm">{studios || "-"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Film className="text-secondary mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="text-main/40 text-[10px] font-bold tracking-wider uppercase">
              Producers
            </p>
            <p className="text-main/90 text-xs font-bold sm:text-sm">{producers || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
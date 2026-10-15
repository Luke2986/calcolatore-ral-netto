import { useMemo, useState } from "react";
import { calcolaNettoCompleto, calcolaMensilitaMultiple } from "@/utils/calculations";
import { formatEuro } from "@/utils/formatters";
import { CITIES, CITY_CODES } from "@/data/cityConfig";
import { REGIONI } from "@/data/regionConfig";
import type { CityCode } from "@/types/calculator";
import { cn } from "@/lib/utils";
import { ChevronDown, MapPin } from "lucide-react";

interface CityComparisonProps {
  ral: number;
  currentCity: CityCode;
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
const COLLAPSED_COUNT = 5;

export function CityComparison({ ral, currentCity }: CityComparisonProps) {
  const [expanded, setExpanded] = useState(false);

  const results = useMemo(
    () =>
      CITY_CODES.map((code) => {
        const calc = calcolaNettoCompleto(ral, code);
        return {
          code,
          name: CITIES[code].name,
          emoji: CITIES[code].emoji,
          regione: REGIONI[CITIES[code].regione].name,
          nettoMensile: calcolaMensilitaMultiple(calc.netto.annuale).netto13,
        };
      })
        .sort((a, b) => b.nettoMensile - a.nettoMensile)
        .map((r, i) => ({ ...r, rank: i + 1 })),
    [ral]
  );

  const best = results[0];
  const worst = results[results.length - 1];
  const difference = best.nettoMensile - worst.nettoMensile;
  const current = results.find((r) => r.code === currentCity)!;
  const bestDiff = best.nettoMensile - current.nettoMensile;
  const range = difference || 1;

  const visible = expanded
    ? results
    : results.filter((r) => r.rank <= COLLAPSED_COUNT || r.code === currentCity);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
      <div className="px-6 py-5 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Classifica città</h3>
              <p className="text-xs text-muted-foreground">
                Netto mensile a 13 mensilità · {results.length} città
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-muted-foreground mb-0.5">Differenza max</div>
            <div className="font-bold text-success">{formatEuro(difference)}/mese</div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-primary/6 border border-primary/20 dark:bg-primary/10">
          <p className="text-sm text-foreground/80">
            {bestDiff > 0 ? (
              <>
                <span className="font-semibold text-foreground">{current.name}</span> è{" "}
                <span className="font-semibold">{current.rank}ª</span> su {results.length}. A{" "}
                <span className="font-semibold text-primary">{best.name}</span> guadagneresti{" "}
                <span className="font-bold text-success">+{formatEuro(bestDiff)}/mese</span>.
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">{current.name}</span> è la città dove
                il tuo netto è più alto. 🎉
              </>
            )}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-1.5">
        {visible.map((result, index) => {
          const isCurrent = result.code === currentCity;
          const diffFromBest = best.nettoMensile - result.nettoMensile;
          const barPercent = 15 + 85 * ((result.nettoMensile - worst.nettoMensile) / range);
          const gap = index > 0 && result.rank - visible[index - 1].rank > 1;

          return (
            <div key={result.code}>
              {gap && <div className="text-center text-muted-foreground text-xs py-1">⋯</div>}
              <div
                className={cn(
                  "px-3.5 py-2.5 rounded-xl border transition-all",
                  isCurrent
                    ? "border-primary border-2 bg-primary/5 dark:bg-primary/10"
                    : "border-border/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {MEDALS[result.rank] ?? result.rank}
                  </span>
                  <span className="text-lg flex-shrink-0">{result.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground truncate">{result.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white">
                          TU
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{result.regione}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className="font-bold text-sm text-foreground"
                      data-testid={`text-comparison-${result.code}`}
                    >
                      {formatEuro(result.nettoMensile)}
                    </div>
                    {diffFromBest > 0.5 && (
                      <div className="text-[11px] text-destructive font-medium">
                        −{formatEuro(diffFromBest)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 h-1 bg-black/6 dark:bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700",
                      result.rank === 1 ? "bg-success" : "bg-primary/50"
                    )}
                    style={{ width: `${barPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {results.length > COLLAPSED_COUNT && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="w-full mt-2 py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? "Mostra meno" : `Mostra tutte le ${results.length} città`}
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>
    </div>
  );
}

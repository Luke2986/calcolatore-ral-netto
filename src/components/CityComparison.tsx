import { calcolaNettoCompleto, calcolaMensilitaMultiple } from "@/utils/calculations";
import { formatEuro } from "@/utils/formatters";
import { CITIES } from "@/data/cityConfig";
import type { CityCode } from "@/types/calculator";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface CityComparisonProps {
  ral: number;
  currentCity: CityCode;
}

interface CityResult {
  code: CityCode;
  name: string;
  emoji: string;
  nettoMensile: number;
  rank: number;
}

const rankStyles: Record<number, { medal: string; bg: string; border: string }> = {
  1: { medal: "🥇", bg: "bg-yellow-50 dark:bg-yellow-500/8", border: "border-yellow-200 dark:border-yellow-500/25" },
  2: { medal: "🥈", bg: "bg-slate-50 dark:bg-slate-400/8", border: "border-slate-200 dark:border-slate-400/25" },
  3: { medal: "🥉", bg: "bg-orange-50 dark:bg-orange-400/8", border: "border-orange-200 dark:border-orange-400/25" },
  4: { medal: "4️⃣", bg: "", border: "border-border/60" },
};

export function CityComparison({ ral, currentCity }: CityComparisonProps) {
  const cities: CityCode[] = ["milano", "bologna", "roma", "napoli"];

  const results: CityResult[] = cities
    .map((cityCode) => {
      const calc = calcolaNettoCompleto(ral, cityCode);
      const city = CITIES[cityCode];
      const mensilita = calcolaMensilitaMultiple(calc.netto.annuale);
      return { code: cityCode, name: city.name, emoji: city.emoji, nettoMensile: mensilita.netto13, rank: 0 };
    })
    .sort((a, b) => b.nettoMensile - a.nettoMensile)
    .map((result, index) => ({ ...result, rank: index + 1 }));

  const best = results[0];
  const worst = results[results.length - 1];
  const difference = best.nettoMensile - worst.nettoMensile;
  const currentResult = results.find((r) => r.code === currentCity)!;
  const bestDiff = best.nettoMensile - currentResult.nettoMensile;

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
      <div className="px-6 py-5 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Confronto città</h3>
              <p className="text-xs text-muted-foreground">Netto mensile a 13 mensilità</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-muted-foreground mb-0.5">Differenza max</div>
            <div className="font-bold text-success">{formatEuro(difference)}/mese</div>
          </div>
        </div>

        {bestDiff > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-primary/6 border border-primary/20 dark:bg-primary/10">
            <p className="text-sm text-foreground/80">
              Spostandoti da{" "}
              <span className="font-semibold text-foreground">{currentResult.name}</span> a{" "}
              <span className="font-semibold text-primary">{best.name}</span> guadagneresti{" "}
              <span className="font-bold text-success">+{formatEuro(bestDiff)}/mese</span> in più.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2.5">
        {results.map((result, index) => {
          const isCurrentCity = result.code === currentCity;
          const styles = rankStyles[result.rank];
          const diffFromBest = best.nettoMensile - result.nettoMensile;
          const barPercent = (result.nettoMensile / best.nettoMensile) * 100;

          return (
            <div
              key={result.code}
              className={cn(
                "animate-slide-in p-4 rounded-xl border-2 transition-all",
                styles.bg,
                isCurrentCity ? "border-primary shadow-primary/10 shadow-md" : styles.border
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-xl flex-shrink-0">{result.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">{result.name}</span>
                    <span className="text-sm">{styles.medal}</span>
                    {isCurrentCity && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white">
                        TU
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-black text-base text-foreground" data-testid={`text-comparison-${result.code}`}>
                    {formatEuro(result.nettoMensile)}
                  </div>
                  {diffFromBest > 0 && (
                    <div className="text-xs text-destructive font-medium">−{formatEuro(diffFromBest)}</div>
                  )}
                </div>
              </div>

              <div className="h-1.5 bg-black/6 dark:bg-white/8 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", result.rank === 1 ? "bg-success" : "bg-primary/50")}
                  style={{ width: `${barPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

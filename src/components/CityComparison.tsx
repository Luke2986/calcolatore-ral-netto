import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calcolaNettoCompleto, calcolaMensilitaMultiple } from "@/utils/calculations";
import { formatEuro } from "@/utils/formatters";
import { CITIES } from "@/data/cityConfig";
import type { CityCode } from "@/types/calculator";

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

export function CityComparison({ ral, currentCity }: CityComparisonProps) {
  const cities: CityCode[] = ["milano", "bologna", "roma", "napoli"];

  // Calcola per tutte le città
  const results: CityResult[] = cities
    .map((cityCode) => {
      const calc = calcolaNettoCompleto(ral, cityCode);
      const city = CITIES[cityCode];
      const mensilita = calcolaMensilitaMultiple(calc.netto.annuale);
      return {
        code: cityCode,
        name: city.name,
        emoji: city.emoji,
        nettoMensile: mensilita.netto13,
        rank: 0,
      };
    })
    .sort((a, b) => b.nettoMensile - a.nettoMensile)
    .map((result, index) => ({
      ...result,
      rank: index + 1,
    }));

  const best = results[0];
  const worst = results[results.length - 1];
  const difference = best.nettoMensile - worst.nettoMensile;

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "4️⃣";
    }
  };

  return (
    <Card className="p-6 bg-card shadow-medium">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Confronto città 🗺️</h3>
        <p className="text-sm text-muted-foreground">
          A <span className="font-semibold text-foreground">{best.name}</span> guadagni{" "}
          <span className="font-semibold text-success">{formatEuro(difference)}/mese</span> in più che
          a <span className="font-semibold text-foreground">{worst.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {results.map((result, index) => {
          const isCurrentCity = result.code === currentCity;
          const isBest = result.rank === 1;

          return (
            <div
              key={result.code}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                className={`p-4 text-center transition-all duration-300 ${
                  isCurrentCity
                    ? "border-2 border-primary shadow-medium"
                    : "border border-border"
                } ${isBest ? "bg-success/5" : "bg-card"}`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl">{result.emoji}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getRankEmoji(result.rank)}
                  </Badge>
                </div>

                <div className="font-semibold text-sm mb-1">{result.name}</div>

                <div className="text-lg font-bold text-foreground">
                  {formatEuro(result.nettoMensile)}
                </div>
                <div className="text-xs text-muted-foreground">al mese</div>

                {isCurrentCity && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    Selezionata
                  </Badge>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

import { useState, useMemo } from "react";
import { CITIES, CITY_CODES } from "@/data/cityConfig";
import { REGIONI } from "@/data/regionConfig";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import type { CityCode, RegioneCode } from "@/types/calculator";

interface CitySelectorProps {
  value: CityCode;
  onChange: (city: CityCode) => void;
  className?: string;
}

export function CitySelector({ value, onChange, className }: CitySelectorProps) {
  const selectedRegione = CITIES[value].regione;
  const [activeRegione, setActiveRegione] = useState<RegioneCode>(selectedRegione);

  const regioniWithCities = useMemo(() => {
    const map = new Map<RegioneCode, CityCode[]>();
    for (const code of CITY_CODES) {
      const regione = CITIES[code].regione;
      if (!map.has(regione)) map.set(regione, []);
      map.get(regione)!.push(code);
    }
    return map;
  }, []);

  const regioni = useMemo(
    () => Array.from(regioniWithCities.keys()).sort((a, b) => REGIONI[a].name.localeCompare(REGIONI[b].name)),
    [regioniWithCities]
  );
  const [showCities, setShowCities] = useState(
    () => (regioniWithCities.get(selectedRegione)?.length ?? 0) > 1
  );

  const handleRegioneClick = (regione: RegioneCode) => {
    setActiveRegione(regione);
    const cities = regioniWithCities.get(regione)!;
    if (cities.length === 1) {
      onChange(cities[0]);
    } else {
      setShowCities(true);
    }
  };

  const handleBack = () => {
    setShowCities(false);
  };

  const activeCities = regioniWithCities.get(activeRegione) || [];

  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {showCities ? "Città" : "Regione"} 🗺️
      </p>

      {showCities ? (
        <div className="space-y-2.5">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>
              Tutte le regioni · <span className="font-semibold text-foreground">{REGIONI[activeRegione].name}</span>
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {activeCities.map((cityCode) => {
              const city = CITIES[cityCode];
              const isSelected = value === cityCode;
              return (
                <button
                  key={cityCode}
                  onClick={() => onChange(cityCode)}
                  data-testid={`button-city-${cityCode}`}
                  className={cn(
                    "relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left group",
                    "hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    isSelected
                      ? "border-primary bg-primary/8 dark:bg-primary/12 shadow-primary"
                      : "border-border/60 bg-background dark:bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{city.emoji}</span>
                    <span className={cn(
                      "font-semibold text-sm leading-tight transition-colors",
                      isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {city.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {regioni.map((regioneCode) => {
            const regione = REGIONI[regioneCode];
            const cities = regioniWithCities.get(regioneCode)!;
            const isActive = regioneCode === selectedRegione;
            return (
              <button
                key={regioneCode}
                onClick={() => handleRegioneClick(regioneCode)}
                className={cn(
                  "p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left group",
                  "hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  isActive
                    ? "border-primary bg-primary/8 dark:bg-primary/12"
                    : "border-border/60 bg-background dark:bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
                )}
              >
                <div className="font-semibold text-xs leading-tight text-foreground group-hover:text-primary">
                  {regione.name}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {cities.map(c => CITIES[c].name).join(", ")}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

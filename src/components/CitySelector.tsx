import { useMemo, useState } from "react";
import { CITIES, CITY_CODES } from "@/data/cityConfig";
import { REGIONI } from "@/data/regionConfig";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import type { CityCode } from "@/types/calculator";

interface CitySelectorProps {
  value: CityCode;
  onChange: (city: CityCode) => void;
  className?: string;
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const SORTED_CITIES = [...CITY_CODES].sort((a, b) => CITIES[a].name.localeCompare(CITIES[b].name));

export function CitySelector({ value, onChange, className }: CitySelectorProps) {
  const [query, setQuery] = useState("");

  const cities = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return SORTED_CITIES;
    return SORTED_CITIES.filter(
      (c) =>
        normalize(CITIES[c].name).includes(q) || normalize(REGIONI[CITIES[c].regione].name).includes(q)
    );
  }, [query]);

  const selected = CITIES[value];

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Città 🗺️
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-primary">{selected.name}</span> · {REGIONI[selected.regione].name}
        </p>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca città o regione"
          aria-label="Cerca città o regione"
          className="w-full h-10 pl-9 pr-9 rounded-xl border border-border/60 bg-background dark:bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all [&::-webkit-search-cancel-button]:hidden"
          data-testid="input-city-search"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Cancella ricerca"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="max-h-[15.5rem] overflow-y-auto -mx-1 px-1 py-0.5 overscroll-contain">
        {cities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nessuna città trovata</p>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {cities.map((code) => {
              const city = CITIES[code];
              const isSelected = value === code;
              return (
                <button
                  key={code}
                  onClick={() => onChange(code)}
                  aria-pressed={isSelected}
                  data-testid={`button-city-${code}`}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all group",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border/60 bg-background dark:bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  <span className="text-lg leading-none flex-shrink-0">{city.emoji}</span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-sm leading-tight truncate",
                        isSelected ? "text-primary font-semibold" : "text-foreground font-medium group-hover:text-primary"
                      )}
                    >
                      {city.name}
                    </span>
                    <span className="block text-[11px] text-muted-foreground truncate">
                      {REGIONI[city.regione].name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

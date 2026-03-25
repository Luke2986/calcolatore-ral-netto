import { CITIES } from "@/data/cityConfig";
import { cn } from "@/lib/utils";
import type { CityCode } from "@/types/calculator";

interface CitySelectorProps {
  value: CityCode;
  onChange: (city: CityCode) => void;
  className?: string;
}

export function CitySelector({ value, onChange, className }: CitySelectorProps) {
  const cities: CityCode[] = ["milano", "bologna", "roma", "napoli"];

  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Città 🗺️
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {cities.map((cityCode) => {
          const city = CITIES[cityCode];
          const isSelected = value === cityCode;

          return (
            <button
              key={cityCode}
              onClick={() => onChange(cityCode)}
              data-testid={`button-city-${cityCode}`}
              className={cn(
                "relative p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left group",
                "hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isSelected
                  ? "border-primary bg-primary/8 dark:bg-primary/12 shadow-primary"
                  : "border-border/60 bg-background dark:bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
              )}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary" />
              )}
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{city.emoji}</span>
                <div>
                  <div className={cn(
                    "font-semibold text-sm leading-tight transition-colors",
                    isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {city.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{city.regione}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { CITIES } from "@/utils/calculations";
import { cn } from "@/lib/utils";
import type { CityCode } from "@/hooks/useCalcolatore";

interface CitySelectorProps {
  value: CityCode;
  onChange: (city: CityCode) => void;
  className?: string;
}

export function CitySelector({ value, onChange, className }: CitySelectorProps) {
  const cities: CityCode[] = ["milano", "bologna", "roma", "napoli"];

  return (
    <div className={className}>
      <h2 className="text-base font-semibold mb-3">Seleziona la tua città</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cities.map((cityCode) => {
          const city = CITIES[cityCode];
          const isSelected = value === cityCode;
          
          return (
            <Card
              key={cityCode}
              onClick={() => onChange(cityCode)}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-medium",
                isSelected
                  ? "bg-success/10 border-success border-2 shadow-success"
                  : "bg-card border-2 border-transparent hover:border-border"
              )}
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">{city.emoji}</div>
                <div>
                  <div className="font-semibold text-sm">{city.name}</div>
                  <div className="text-xs text-muted-foreground">{city.region}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

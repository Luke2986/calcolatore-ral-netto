import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface RalInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function RalInput({ value, onChange, className }: RalInputProps) {
  const min = 15000;
  const max = 100000;
  const step = 500;

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(rawValue) || 0;
    onChange(Math.min(Math.max(numValue, min), max));
  };

  const formatInputValue = (val: number): string => {
    return new Intl.NumberFormat("it-IT").format(val);
  };

  return (
    <div className={className}>
      <Label htmlFor="ral-input" className="text-base font-semibold mb-3 block">
        RAL promessa ✨
      </Label>
      <div className="space-y-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
            €
          </span>
          <Input
            id="ral-input"
            type="text"
            value={formatInputValue(value)}
            onChange={handleInputChange}
            className="text-2xl font-bold h-14 pl-10 pr-4 bg-card shadow-soft"
            placeholder="Es: 35.000 (sognare è gratis)"
          />
        </div>
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="w-full touch-none"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>€{formatInputValue(min)}</span>
          <span>€{formatInputValue(max)}</span>
        </div>
      </div>
    </div>
  );
}

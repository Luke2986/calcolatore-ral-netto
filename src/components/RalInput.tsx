import { useState, useEffect } from "react";
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

  const formatInputValue = (val: number): string => {
    return new Intl.NumberFormat("it-IT").format(val);
  };

  const [inputValue, setInputValue] = useState(formatInputValue(value));
  const [isFocused, setIsFocused] = useState(false);

  // Sync when external value changes (e.g., from slider)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(formatInputValue(value));
    }
  }, [value, isFocused]);

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(rawValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numValue = parseInt(inputValue.replace(/[^0-9]/g, "")) || min;
    const clampedValue = Math.min(Math.max(numValue, min), max);
    onChange(clampedValue);
    setInputValue(formatInputValue(clampedValue));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(value.toString());
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
            value={isFocused ? inputValue : formatInputValue(value)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
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

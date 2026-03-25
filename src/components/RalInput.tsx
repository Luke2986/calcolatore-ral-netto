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

  const formatInputValue = (val: number): string =>
    new Intl.NumberFormat("it-IT").format(val);

  const [inputValue, setInputValue] = useState(formatInputValue(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) setInputValue(formatInputValue(value));
  }, [value, isFocused]);

  const handleSliderChange = (values: number[]) => onChange(values[0]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numValue = parseInt(inputValue.replace(/[^0-9]/g, "")) || min;
    const clamped = Math.min(Math.max(numValue, min), max);
    onChange(clamped);
    setInputValue(formatInputValue(clamped));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(value.toString());
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      <Label htmlFor="ral-input" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 block">
        RAL Lorda ✨
      </Label>

      <div className="space-y-5">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg pointer-events-none select-none">
            €
          </div>
          <Input
            id="ral-input"
            type="text"
            value={isFocused ? inputValue : formatInputValue(value)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="text-3xl font-black h-16 pl-9 pr-4 bg-background dark:bg-muted/30 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl shadow-xs"
            placeholder="35.000"
            data-testid="input-ral"
          />
        </div>

        <div className="space-y-3">
          <Slider
            value={[value]}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            className="w-full touch-none"
            aria-label="Seleziona la RAL"
            data-testid="slider-ral"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>€{formatInputValue(min)}</span>
            <span className="text-primary font-semibold">{percentage.toFixed(0)}%</span>
            <span>€{formatInputValue(max)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

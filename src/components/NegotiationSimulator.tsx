import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { calcolaNettoCompleto, formatEuro } from "@/utils/calculations";
import type { CityCode } from "@/hooks/useCalcolatore";
interface NegotiationSimulatorProps {
  currentRal: number;
  citta: CityCode;
}
export function NegotiationSimulator({
  currentRal,
  citta
}: NegotiationSimulatorProps) {
  const [ralIncrease, setRalIncrease] = useState(5000);
  const currentResults = calcolaNettoCompleto(currentRal, citta);
  const newResults = calcolaNettoCompleto(currentRal + ralIncrease, citta);
  const nettoMensileIncrease = newResults.nettoMensile - currentResults.nettoMensile;
  const nettoAnnualeIncrease = newResults.nettoAnnuale - currentResults.nettoAnnuale;
  return;
}
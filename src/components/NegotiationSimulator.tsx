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

  return (
    <Card className="p-6 bg-card shadow-medium">
      <h3 className="text-xl font-bold mb-4">Simulatore Negoziazione 💼</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium">Aumento RAL richiesto</label>
            <span className="text-lg font-bold text-primary">+{formatEuro(ralIncrease)}</span>
          </div>
          <Slider
            value={[ralIncrease]}
            onValueChange={(value) => setRalIncrease(value[0])}
            min={1000}
            max={20000}
            step={500}
            className="w-full"
          />
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-base text-foreground">
            Se chiedessi <span className="font-bold text-primary">+{formatEuro(ralIncrease)}</span> più di RAL,
            avresti <span className="font-bold text-success">+{formatEuro(nettoMensileIncrease)}</span> netti al mese
            <span className="text-sm text-muted-foreground"> (+{formatEuro(nettoAnnualeIncrease)} l'anno)</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { calcolaNettoCompleto, formatEuro } from "@/utils/calculations";
import type { CityCode } from "@/hooks/useCalcolatore";

interface NegotiationSimulatorProps {
  currentRal: number;
  citta: CityCode;
}

export function NegotiationSimulator({ currentRal, citta }: NegotiationSimulatorProps) {
  const [ralIncrease, setRalIncrease] = useState(5000);

  const currentResults = calcolaNettoCompleto(currentRal, citta);
  const newResults = calcolaNettoCompleto(currentRal + ralIncrease, citta);
  
  const nettoMensileIncrease = newResults.nettoMensile - currentResults.nettoMensile;
  const nettoAnnualeIncrease = newResults.nettoAnnuale - currentResults.nettoAnnuale;

  return (
    <Card className="p-6 md:p-8 bg-card shadow-soft border border-border">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            💼 Simulatore di Negoziazione
          </h3>
          <p className="text-muted-foreground">
            Quanto ti porterebbe a casa un aumento di stipendio?
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-foreground">
                Aumento RAL richiesto
              </label>
              <span className="text-lg font-bold text-primary">
                +{formatEuro(ralIncrease)}
              </span>
            </div>
            <Slider
              value={[ralIncrease]}
              onValueChange={(values) => setRalIncrease(values[0])}
              min={1000}
              max={30000}
              step={500}
              className="w-full"
              aria-label="Aumento RAL richiesto"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>+€1.000</span>
              <span>+€30.000</span>
            </div>
          </div>

          <div className="bg-gradient-success text-white rounded-xl p-6 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium opacity-90">Se chiedessi</span>
              <span className="text-2xl font-bold">
                {formatEuro(currentRal + ralIncrease)}
              </span>
              <span className="text-sm font-medium opacity-90">di RAL...</span>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <div>
                <div className="text-sm opacity-80 mb-1">Avresti in più ogni mese 💸</div>
                <div className="text-3xl font-bold">
                  +{formatEuro(nettoMensileIncrease)}
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm opacity-80 mb-1">In più all'anno 📈</div>
                <div className="text-xl font-semibold">
                  +{formatEuro(nettoAnnualeIncrease)}
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-sm">
              <p className="opacity-90">
                💡 <strong>Tip:</strong> Considera che un aumento di {formatEuro(ralIncrease)} lordi 
                si traduce in circa {Math.round((nettoMensileIncrease / ralIncrease) * 12 * 100)}% netto. 
                Lo Stato prende la sua parte!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <div className="text-muted-foreground mb-1">RAL Attuale</div>
              <div className="text-xl font-bold text-foreground">
                {formatEuro(currentRal)}
              </div>
              <div className="text-muted-foreground mt-2">Netto mensile</div>
              <div className="text-lg font-semibold text-foreground">
                {formatEuro(currentResults.nettoMensile)}
              </div>
            </div>

            <div className="bg-success/10 rounded-lg p-4 border border-success/20">
              <div className="text-muted-foreground mb-1">RAL Negoziata</div>
              <div className="text-xl font-bold text-success">
                {formatEuro(currentRal + ralIncrease)}
              </div>
              <div className="text-muted-foreground mt-2">Netto mensile</div>
              <div className="text-lg font-semibold text-success">
                {formatEuro(newResults.nettoMensile)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

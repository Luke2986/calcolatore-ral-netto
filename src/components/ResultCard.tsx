import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEuro, getAliquotaMessage, getEasterEgg } from "@/utils/calculations";
import { useEffect, useState } from "react";

interface ResultCardProps {
  nettoAnnuale: number;
  nettoMensile: number;
  aliquotaEffettiva: number;
  ral: number;
}

export function ResultCard({ nettoAnnuale, nettoMensile, aliquotaEffettiva, ral }: ResultCardProps) {
  const [show, setShow] = useState(false);
  const easterEgg = getEasterEgg(ral);
  const message = getAliquotaMessage(aliquotaEffettiva);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, [nettoAnnuale]);

  return (
    <Card className="p-8 bg-gradient-success shadow-success border-0 text-white relative overflow-hidden">
      <div className="relative z-10">
        {easterEgg && (
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            {easterEgg}
          </Badge>
        )}
        
        <div className="space-y-6">
          <div className={cn("transition-all duration-500", show ? "opacity-100" : "opacity-0")}>
            <div className="text-sm font-medium mb-2 text-white/80">Quello che vedrai sul conto 💰</div>
            <div className="text-5xl font-bold mb-1 animate-counter">
              {formatEuro(nettoAnnuale)}
            </div>
            <div className="text-sm text-white/80">all'anno</div>
          </div>

          <div className={cn("transition-all duration-500 delay-100", show ? "opacity-100" : "opacity-0")}>
            <div className="text-sm font-medium mb-1 text-white/80">Per 13 mesi, perché la tredicesima esiste 📅</div>
            <div className="text-3xl font-bold animate-counter">
              {formatEuro(nettoMensile)}
            </div>
            <div className="text-sm text-white/80">al mese</div>
          </div>

          <div className={cn("pt-4 border-t border-white/20 transition-all duration-500 delay-200", show ? "opacity-100" : "opacity-0")}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white/80 mb-1">Aliquota effettiva 📊</div>
                <div className="text-2xl font-bold">{aliquotaEffettiva.toFixed(1)}%</div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {message}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
    </Card>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

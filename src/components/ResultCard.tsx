import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEuro } from "@/utils/formatters";
import { getAliquotaMessage, getEasterEgg } from "@/utils/messages";
import { calcolaMensilitaMultiple } from "@/utils/calculations";
import { useEffect, useState } from "react";

interface ResultCardProps {
  nettoAnnuale: number;
  nettoMensile: number;
  aliquotaEffettiva: number;
  ral: number;
}

export function ResultCard({
  nettoAnnuale,
  nettoMensile,
  aliquotaEffettiva,
  ral,
}: ResultCardProps) {
  const [show, setShow] = useState(false);
  const easterEgg = getEasterEgg(ral);
  const message = getAliquotaMessage(aliquotaEffettiva);
  const mensilita = calcolaMensilitaMultiple(nettoAnnuale);

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
          <div
            className={`transition-all duration-500 ${show ? "opacity-100" : "opacity-0"}`}
          >
            <div className="text-sm font-medium mb-2 text-white/80">
              Quello che vedrai sul conto 💰
            </div>
            <div className="text-5xl font-bold mb-1 animate-counter">
              {formatEuro(nettoAnnuale)}
            </div>
            <div className="text-sm text-white/80">all'anno</div>
          </div>

          <div
            className={`transition-all duration-500 delay-100 ${
              show ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-sm font-medium mb-3 text-white/80">
              Al mese (dipende dal contratto) 📅
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-xs text-white/70 mb-1">12 mensilità</div>
                <div className="text-xl font-bold">{formatEuro(mensilita.netto12)}</div>
                <div className="text-xs text-white/70">/mese</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/30 hover:bg-white/15 transition-all relative">
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 bg-white/30 text-white border-white/40 text-xs"
                >
                  Più comune
                </Badge>
                <div className="text-xs text-white/70 mb-1">13 mensilità</div>
                <div className="text-xl font-bold">{formatEuro(mensilita.netto13)}</div>
                <div className="text-xs text-white/70">/mese</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-xs text-white/70 mb-1">14 mensilità</div>
                <div className="text-xl font-bold">{formatEuro(mensilita.netto14)}</div>
                <div className="text-xs text-white/70">/mese</div>
              </div>
            </div>
          </div>

          <div
            className={`pt-4 border-t border-white/20 transition-all duration-500 delay-200 ${
              show ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white/80 mb-1">
                  Aliquota effettiva 📊
                </div>
                <div className="text-2xl font-bold">
                  {(aliquotaEffettiva * 100).toFixed(1)}%
                </div>
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

import { Badge } from "@/components/ui/badge";
import { formatEuro } from "@/utils/formatters";
import { getAliquotaMessage, getEasterEgg } from "@/utils/messages";
import { calcolaMensilitaMultiple } from "@/utils/calculations";
import { useEffect, useState } from "react";
import { TrendingDown, CalendarDays, Percent } from "lucide-react";

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
  const mensilita = calcolaMensilitaMultiple(nettoAnnuale);
  const trattenute = ral - nettoAnnuale;
  const perditaPerc = ((trattenute / ral) * 100).toFixed(1);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, [nettoAnnuale]);

  return (
    <div className="hero-gradient rounded-2xl overflow-hidden shadow-large relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary/60 blur-[80px]" />
      </div>

      <div className="relative z-10 p-7 md:p-8">
        {easterEgg && (
          <div className="mb-5">
            <Badge className="bg-white/15 text-white border-white/25 hover:bg-white/20 text-xs font-medium">
              {easterEgg}
            </Badge>
          </div>
        )}

        {/* Main result */}
        <div className={`transition-all duration-600 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">Netto annuale</p>
          <div className="flex items-end gap-4 mb-1">
            <span className="text-6xl md:text-7xl font-black text-white leading-none animate-counter" data-testid="text-netto-annuale">
              {formatEuro(nettoAnnuale)}
            </span>
          </div>
          <p className="text-white/40 text-sm">sul tuo conto bancario ogni anno</p>
        </div>

        {/* Stats row */}
        <div className={`mt-8 grid grid-cols-3 gap-3 transition-all duration-600 delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className="bg-white/8 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingDown className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Trattenute</span>
            </div>
            <div className="text-white font-bold text-lg" data-testid="text-trattenute">
              {formatEuro(trattenute)}
            </div>
            <div className="text-white/40 text-xs mt-0.5">{perditaPerc}% della RAL</div>
          </div>

          <div className="bg-white/8 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Percent className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Aliquota</span>
            </div>
            <div className="text-white font-bold text-lg" data-testid="text-aliquota">
              {(aliquotaEffettiva * 100).toFixed(1)}%
            </div>
            <div className="text-white/40 text-xs mt-0.5 truncate">{message}</div>
          </div>

          <div className="bg-white/8 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <CalendarDays className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Al giorno</span>
            </div>
            <div className="text-white font-bold text-lg">
              {formatEuro(Math.round(nettoAnnuale / 365))}
            </div>
            <div className="text-white/40 text-xs mt-0.5">ogni giorno</div>
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className={`mt-5 transition-all duration-600 delay-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">
            Al mese — in base alle mensilità
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "12 mensilità", value: mensilita.netto12, popular: false },
              { label: "13 mensilità", value: mensilita.netto13, popular: true },
              { label: "14 mensilità", value: mensilita.netto14, popular: false },
            ].map(({ label, value, popular }) => (
              <div
                key={label}
                className={`relative rounded-xl p-3.5 border transition-all ${
                  popular
                    ? "bg-white/15 border-white/30 ring-1 ring-white/20"
                    : "bg-white/8 border-white/15"
                }`}
              >
                {popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Comune
                    </span>
                  </div>
                )}
                <div className="text-white/50 text-xs mb-1.5 mt-0.5">{label}</div>
                <div className="text-white font-bold text-lg" data-testid={`text-mensile-${label.replace(/\s/g, "-")}`}>
                  {formatEuro(value)}
                </div>
                <div className="text-white/40 text-xs">/mese</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

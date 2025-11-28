import { Card } from "@/components/ui/card";
import { CalcoloResult, formatEuro, CITIES } from "@/utils/calculations";

interface BreakdownListProps {
  trattenute: CalcoloResult;
  citta: string;
}

interface BreakdownItem {
  icon: string;
  label: string;
  description: string;
  amount: number;
  isPositive?: boolean;
  percentage: number;
}

export function BreakdownList({ trattenute, citta }: BreakdownListProps) {
  const city = CITIES[citta] || CITIES.milano;
  
  const items: BreakdownItem[] = [
    {
      icon: "💼",
      label: "INPS",
      description: "Per la pensione che forse vedremo",
      amount: trattenute.contributiINPS,
      percentage: (trattenute.contributiINPS / trattenute.ralLorda) * 100,
    },
    {
      icon: "🏛️",
      label: "IRPEF Lorda",
      description: "Prima dello sconto",
      amount: trattenute.irpefLorda,
      percentage: (trattenute.irpefLorda / trattenute.ralLorda) * 100,
    },
    {
      icon: "✨",
      label: "Detrazioni",
      description: "Lo sconto che ti spetta",
      amount: -trattenute.detrazioniLavoro,
      isPositive: true,
      percentage: (trattenute.detrazioniLavoro / trattenute.ralLorda) * 100,
    },
    {
      icon: "🏛️",
      label: "IRPEF Netta",
      description: "Il pizzo di Stato (legale)",
      amount: trattenute.irpefNetta,
      percentage: (trattenute.irpefNetta / trattenute.ralLorda) * 100,
    },
    {
      icon: "🗺️",
      label: "Addizionale Regionale",
      description: `Il pedaggio per vivere in ${city.region}`,
      amount: trattenute.addizionaleRegionale,
      percentage: (trattenute.addizionaleRegionale / trattenute.ralLorda) * 100,
    },
    {
      icon: "🏘️",
      label: "Addizionale Comunale",
      description: "Il contributo per le buche nelle strade",
      amount: trattenute.addizionaleComunale,
      percentage: (trattenute.addizionaleComunale / trattenute.ralLorda) * 100,
    },
  ];

  const maxAmount = Math.max(...items.map(item => Math.abs(item.amount)));

  return (
    <Card className="p-6 bg-card shadow-medium">
      <h3 className="text-xl font-bold mb-6">Breakdown trattenute 📊</h3>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`font-bold text-sm ${item.isPositive ? "text-success" : "text-destructive"}`}>
                  {item.isPositive ? "+" : "−"}{formatEuro(Math.abs(item.amount))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.isPositive ? "bg-success" : "bg-destructive"
                }`}
                style={{ width: `${(Math.abs(item.amount) / maxAmount) * 100}%` }}
              />
            </div>
          </div>
        ))}
        
        {/* Total */}
        <div className="pt-4 border-t-2 border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💸</span>
              <div className="font-bold">Totale Trattenute</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-destructive">
                −{formatEuro(trattenute.totaleTrattenute)}
              </div>
              <div className="text-xs text-muted-foreground">
                {trattenute.aliquotaEffettiva.toFixed(1)}% della RAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

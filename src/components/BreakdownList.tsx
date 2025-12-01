import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type { CalcoloResult } from "@/types/calculator";
import { CITIES } from "@/data/cityConfig";
import { formatEuro } from "@/utils/formatters";
import { BONUS_NOT_APPLICABLE_REASONS, BONUS_TOOLTIP_TEXTS } from "@/utils/messages";

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
  isActive?: boolean; // Nuovo: indica se il bonus è attivo
  tooltip?: {
    title: string;
    description: string;
    details?: string;
    normativa?: string;
  };
}

export function BreakdownList({ trattenute, citta }: BreakdownListProps) {
  const city = CITIES[citta] || CITIES.milano;
  
  // Determina i motivi di applicabilità per ogni bonus
  const getBonusReason = (reason: string, reasons: Record<string, string>) => {
    return reasons[reason] || reasons.eligible;
  };

  const bonusCuneoDescription = getBonusReason(
    trattenute.flags.bonusCuneoReason,
    BONUS_NOT_APPLICABLE_REASONS.bonusCuneo
  );
  const detrazioneCuneoDescription = getBonusReason(
    trattenute.flags.detrazioneCuneoReason,
    BONUS_NOT_APPLICABLE_REASONS.detrazioneCuneo
  );
  const trattamentoIntegrativoDescription = getBonusReason(
    trattenute.flags.trattamentoIntegrativoReason,
    BONUS_NOT_APPLICABLE_REASONS.trattamentoIntegrativo
  );
  
  const items: BreakdownItem[] = [
    {
      icon: "💼",
      label: "INPS",
      description: "Per la pensione che forse vedremo",
      amount: trattenute.trattenute.contributiINPS,
      percentage: (trattenute.trattenute.contributiINPS / trattenute.input.ral) * 100,
    },
    {
      icon: "🏛️",
      label: "IRPEF Lorda",
      description: "Prima dello sconto",
      amount: trattenute.trattenute.irpefLorda,
      percentage: (trattenute.trattenute.irpefLorda / trattenute.input.ral) * 100,
    },
    {
      icon: "✨",
      label: "Detrazioni Lavoro",
      description: "Lo sconto che ti spetta",
      amount: -trattenute.trattenute.detrazioneLavoroDipendente,
      isPositive: true,
      percentage: (trattenute.trattenute.detrazioneLavoroDipendente / trattenute.input.ral) * 100,
    },
    // DETRAZIONE CUNEO: sempre mostrata
    {
      icon: trattenute.flags.hasDetrazioneCuneo ? "🎯" : "⛔",
      label: "Ulteriore Detrazione Cuneo",
      description: detrazioneCuneoDescription,
      amount: -trattenute.trattenute.detrazioneCuneoFiscale,
      isPositive: true,
      isActive: trattenute.flags.hasDetrazioneCuneo,
      percentage: (trattenute.trattenute.detrazioneCuneoFiscale / trattenute.input.ral) * 100,
      tooltip: {
        title: BONUS_TOOLTIP_TEXTS.detrazioneCuneo.title,
        description: BONUS_TOOLTIP_TEXTS.detrazioneCuneo.description,
        details: BONUS_TOOLTIP_TEXTS.detrazioneCuneo.importo,
        normativa: BONUS_TOOLTIP_TEXTS.detrazioneCuneo.normativa,
      },
    },
    {
      icon: "🏛️",
      label: "IRPEF Netta",
      description: "Il pizzo di Stato (legale)",
      amount: trattenute.trattenute.irpefNetta,
      percentage: (trattenute.trattenute.irpefNetta / trattenute.input.ral) * 100,
    },
    {
      icon: "🗺️",
      label: "Addizionale Regionale",
      description: `Il pedaggio per vivere in ${city.regione}`,
      amount: trattenute.trattenute.addizionaleRegionale,
      percentage: (trattenute.trattenute.addizionaleRegionale / trattenute.input.ral) * 100,
    },
    {
      icon: "🏘️",
      label: "Addizionale Comunale",
      description: "Il contributo per le buche nelle strade",
      amount: trattenute.trattenute.addizionaleComunale,
      percentage: (trattenute.trattenute.addizionaleComunale / trattenute.input.ral) * 100,
    },
    // BONUS CUNEO: sempre mostrato
    {
      icon: trattenute.flags.hasBonusCuneo ? "💰" : "⛔",
      label: "Bonus Cuneo Fiscale",
      description: bonusCuneoDescription,
      amount: trattenute.bonus.bonusCuneoFiscale,
      isPositive: true,
      isActive: trattenute.flags.hasBonusCuneo,
      percentage: (trattenute.bonus.bonusCuneoFiscale / trattenute.input.ral) * 100,
      tooltip: {
        title: BONUS_TOOLTIP_TEXTS.bonusCuneo.title,
        description: BONUS_TOOLTIP_TEXTS.bonusCuneo.description,
        details: BONUS_TOOLTIP_TEXTS.bonusCuneo.percentuali,
        normativa: BONUS_TOOLTIP_TEXTS.bonusCuneo.normativa,
      },
    },
    // TRATTAMENTO INTEGRATIVO: sempre mostrato
    {
      icon: trattenute.flags.hasTrattamentoIntegrativo ? "🎁" : "⛔",
      label: "Trattamento Integrativo",
      description: trattamentoIntegrativoDescription,
      amount: trattenute.bonus.trattamentoIntegrativo,
      isPositive: true,
      isActive: trattenute.flags.hasTrattamentoIntegrativo,
      percentage: (trattenute.bonus.trattamentoIntegrativo / trattenute.input.ral) * 100,
      tooltip: {
        title: BONUS_TOOLTIP_TEXTS.trattamentoIntegrativo.title,
        description: BONUS_TOOLTIP_TEXTS.trattamentoIntegrativo.description,
        details: BONUS_TOOLTIP_TEXTS.trattamentoIntegrativo.importo,
        normativa: BONUS_TOOLTIP_TEXTS.trattamentoIntegrativo.normativa,
      },
    },
  ];

  const maxAmount = Math.max(...items.map((item) => Math.abs(item.amount)));

  // Calcola riepilogo benefici 2025
  const benefici2025 = [
    {
      label: "Detrazione Cuneo Fiscale",
      amount: trattenute.trattenute.detrazioneCuneoFiscale,
      isActive: trattenute.flags.hasDetrazioneCuneo,
      reason: detrazioneCuneoDescription,
    },
    {
      label: "Bonus Cuneo Fiscale",
      amount: trattenute.bonus.bonusCuneoFiscale,
      isActive: trattenute.flags.hasBonusCuneo,
      reason: bonusCuneoDescription,
    },
    {
      label: "Trattamento Integrativo",
      amount: trattenute.bonus.trattamentoIntegrativo,
      isActive: trattenute.flags.hasTrattamentoIntegrativo,
      reason: trattamentoIntegrativoDescription,
    },
  ];

  const totaleBeneficiAttivi = benefici2025
    .filter((b) => b.isActive)
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Riepilogo Benefici 2025 */}
        <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20 shadow-medium">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-bold">I tuoi benefici fiscali 2025</h3>
          </div>
          
          <div className="space-y-3">
            {benefici2025.map((beneficio, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  beneficio.isActive
                    ? "bg-success/10 border border-success/30"
                    : "bg-muted/30 border border-border/50"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xl">
                    {beneficio.isActive ? "✅" : "⛔"}
                  </span>
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-sm ${
                        beneficio.isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {beneficio.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {beneficio.reason}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-bold text-sm ${
                    beneficio.isActive ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {beneficio.isActive ? `+${formatEuro(beneficio.amount)}` : "—"}
                </div>
              </div>
            ))}
          </div>

          {totaleBeneficiAttivi > 0 && (
            <div className="mt-4 pt-4 border-t border-success/30">
              <div className="flex items-center justify-between">
                <div className="font-bold">Totale benefici attivi</div>
                <div className="font-bold text-lg text-success">
                  +{formatEuro(totaleBeneficiAttivi)}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Breakdown Dettagliato */}
        <Card className="p-6 bg-card shadow-medium">
          <h3 className="text-xl font-bold mb-6">Dettaglio trattenute 📊</h3>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={`space-y-2 animate-slide-in ${
                  item.isActive === false ? "opacity-60" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-semibold text-sm ${
                            item.isActive === false ? "text-muted-foreground" : ""
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.tooltip && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="inline-flex items-center">
                                <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <div className="space-y-2">
                                <div className="font-bold text-sm">{item.tooltip.title}</div>
                                <div className="text-xs leading-relaxed">
                                  {item.tooltip.description}
                                </div>
                                {item.tooltip.details && (
                                  <div className="text-xs leading-relaxed whitespace-pre-line border-t border-border pt-2">
                                    {item.tooltip.details}
                                  </div>
                                )}
                                {item.tooltip.normativa && (
                                  <div className="text-xs text-muted-foreground italic pt-1">
                                    {item.tooltip.normativa}
                                  </div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div
                        className={`text-xs ${
                          item.isActive === false
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`font-bold text-sm ${
                        item.isActive === false
                          ? "text-muted-foreground"
                          : item.isPositive
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {item.amount === 0 && item.isActive === false
                        ? "—"
                        : `${item.isPositive ? "+" : "−"}${formatEuro(Math.abs(item.amount))}`}
                    </div>
                    {item.amount > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {(item.isActive !== false && item.amount > 0) && (
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.isPositive ? "bg-success" : "bg-destructive"
                      }`}
                      style={{
                        width: `${(Math.abs(item.amount) / maxAmount) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Totals */}
            <div className="pt-4 border-t-2 border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💸</span>
              <div className="font-bold">Totale Trattenute</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-destructive">
                −{formatEuro(trattenute.trattenute.totale)}
              </div>
              <div className="text-xs text-muted-foreground">
                {(trattenute.percentuali.aliquotaEffettiva * 100).toFixed(1)}% della RAL
              </div>
            </div>
          </div>

          {trattenute.bonus.totale > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div className="font-bold">Totale Bonus</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-success">
                  +{formatEuro(trattenute.bonus.totale)}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div className="font-bold text-lg">Netto Annuale</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-primary">
                {formatEuro(trattenute.netto.annuale)}
              </div>
            </div>
          </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Info, TrendingDown, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import type { CalcoloResult } from "@/types/calculator";
import { CITIES } from "@/data/cityConfig";
import { formatEuro } from "@/utils/formatters";
import { BONUS_NOT_APPLICABLE_REASONS, BONUS_TOOLTIP_TEXTS } from "@/utils/messages";
import { cn } from "@/lib/utils";

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
  isActive?: boolean;
  tooltip?: {
    title: string;
    description: string;
    details?: string;
    normativa?: string;
  };
}

export function BreakdownList({ trattenute, citta }: BreakdownListProps) {
  const city = CITIES[citta] || CITIES.milano;

  const getBonusReason = (reason: string, reasons: Record<string, string>) =>
    reasons[reason] || reasons.eligible;

  const bonusCuneoDescription = getBonusReason(trattenute.flags.bonusCuneoReason, BONUS_NOT_APPLICABLE_REASONS.bonusCuneo);
  const detrazioneCuneoDescription = getBonusReason(trattenute.flags.detrazioneCuneoReason, BONUS_NOT_APPLICABLE_REASONS.detrazioneCuneo);
  const trattamentoIntegrativoDescription = getBonusReason(trattenute.flags.trattamentoIntegrativoReason, BONUS_NOT_APPLICABLE_REASONS.trattamentoIntegrativo);

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

  const totaleBeneficiAttivi = benefici2025.filter((b) => b.isActive).reduce((sum, b) => sum + b.amount, 0);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Benefici 2025 */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center">
                  <span className="text-sm">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Benefici fiscali 2026</h3>
                  <p className="text-xs text-muted-foreground">Le misure di sostegno al reddito</p>
                </div>
              </div>
              {totaleBeneficiAttivi > 0 && (
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-0.5">Totale attivo</div>
                  <div className="font-bold text-success">+{formatEuro(totaleBeneficiAttivi)}</div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 space-y-2">
            {benefici2025.map((beneficio, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-xl border transition-all",
                  beneficio.isActive
                    ? "bg-success/6 border-success/20 dark:bg-success/10"
                    : "bg-muted/30 border-border/40"
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {beneficio.isActive
                    ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    : <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  }
                  <div className="min-w-0">
                    <div className={cn("font-semibold text-sm truncate", beneficio.isActive ? "text-foreground" : "text-muted-foreground")}>
                      {beneficio.label}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{beneficio.reason}</div>
                  </div>
                </div>
                <div className={cn("font-bold text-sm ml-3 flex-shrink-0", beneficio.isActive ? "text-success" : "text-muted-foreground")}>
                  {beneficio.isActive ? `+${formatEuro(beneficio.amount)}` : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown dettagliato */}
        <div className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Dettaglio trattenute</h3>
                <p className="text-xs text-muted-foreground">Come viene calcolato il tuo netto</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn("animate-slide-in", item.isActive === false && "opacity-50")}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl flex-shrink-0 leading-none">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={cn("font-semibold text-sm", item.isActive === false && "text-muted-foreground")}>
                          {item.label}
                        </span>
                        {item.tooltip && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                                <Info className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <div className="space-y-2">
                                <div className="font-bold text-sm">{item.tooltip.title}</div>
                                <div className="text-xs leading-relaxed">{item.tooltip.description}</div>
                                {item.tooltip.details && (
                                  <div className="text-xs leading-relaxed whitespace-pre-line border-t border-border pt-2">{item.tooltip.details}</div>
                                )}
                                {item.tooltip.normativa && (
                                  <div className="text-xs text-muted-foreground italic">{item.tooltip.normativa}</div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 flex items-center gap-1.5">
                    {item.isPositive
                      ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                      : <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                    }
                    <div>
                      <div className={cn(
                        "font-bold text-sm",
                        item.isActive === false ? "text-muted-foreground"
                          : item.isPositive ? "text-success"
                          : "text-destructive"
                      )}>
                        {item.amount === 0 && item.isActive === false
                          ? "—"
                          : `${item.isPositive ? "+" : "−"}${formatEuro(Math.abs(item.amount))}`}
                      </div>
                      {item.amount > 0 && (
                        <div className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {item.isActive !== false && item.amount > 0 && (
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out",
                        item.isPositive ? "bg-success" : "bg-destructive/70"
                      )}
                      style={{ width: `${(Math.abs(item.amount) / maxAmount) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Summary */}
            <div className="pt-5 mt-5 border-t border-border/50 space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-destructive/6 border border-destructive/20">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">💸</span>
                  <div className="font-semibold text-sm">Totale trattenute</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-destructive">−{formatEuro(trattenute.trattenute.totale)}</div>
                  <div className="text-xs text-muted-foreground">{(trattenute.percentuali.aliquotaEffettiva * 100).toFixed(1)}% RAL</div>
                </div>
              </div>

              {trattenute.bonus.totale > 0 && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-success/6 border border-success/20">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🎁</span>
                    <div className="font-semibold text-sm">Totale bonus</div>
                  </div>
                  <div className="font-bold text-success">+{formatEuro(trattenute.bonus.totale)}</div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/8 border border-primary/25 dark:bg-primary/12">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">💰</span>
                  <div className="font-bold">Netto annuale</div>
                </div>
                <div className="font-black text-xl text-primary">{formatEuro(trattenute.netto.annuale)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

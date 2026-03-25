import { useCalcolatore } from "@/hooks/useCalcolatore";
import { RalInput } from "@/components/RalInput";
import { CitySelector } from "@/components/CitySelector";
import { ResultCard } from "@/components/ResultCard";
import { BreakdownList } from "@/components/BreakdownList";
import { CityComparison } from "@/components/CityComparison";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Calculator } from "lucide-react";

const Index = () => {
  const { ral, citta, risultati, setRal, setCitta } = useCalcolatore();
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] -translate-x-1/3 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center shadow-primary">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-sm tracking-wide">CalcoloRAL</span>
              </div>
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 text-white/80 hover:text-white"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="container mx-auto px-4 pt-12 pb-20">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground/80 text-xs font-medium tracking-wider uppercase backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Aggiornato al 2025
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                RAL → Netto
                <span className="block text-primary mt-1">2025</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed font-light">
                Il calcolatore che ti dice la verità —{" "}
                <span className="text-white/80 font-medium">quella che HR non ti dice</span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-6 pb-16">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl shadow-soft border border-border/60 p-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
              <RalInput value={ral} onChange={setRal} />
            </div>
            <div className="bg-card rounded-2xl shadow-soft border border-border/60 p-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
              <CitySelector value={citta} onChange={setCitta} />
            </div>
          </div>

          {/* Results */}
          <div className="animate-fade-up" style={{ animationDelay: "160ms" }}>
            <ResultCard
              nettoAnnuale={risultati.netto.annuale}
              nettoMensile={risultati.netto.mensile}
              aliquotaEffettiva={risultati.percentuali.aliquotaEffettiva}
              ral={ral}
            />
          </div>

          {/* Breakdown */}
          <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            <BreakdownList trattenute={risultati} citta={citta} />
          </div>

          {/* City Comparison */}
          <div className="animate-fade-up" style={{ animationDelay: "320ms" }}>
            <CityComparison ral={ral} currentCity={citta} />
          </div>

          {/* Disclaimer */}
          <div className="animate-fade-up rounded-xl border border-border/60 bg-card p-5" style={{ animationDelay: "400ms" }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-warning/15 border border-warning/30 flex items-center justify-center">
                <span className="text-base">⚠️</span>
              </div>
              <div className="space-y-3">
                <h2 className="font-semibold text-sm text-foreground">Note e limitazioni</h2>
                <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                  <p>
                    <span className="font-medium text-foreground/80">Include:</span>{" "}
                    IRPEF 2025 (scaglioni 23%, 35%, 43%), contributi INPS, detrazioni lavoro dipendente,
                    bonus cuneo fiscale, ulteriore detrazione cuneo, trattamento integrativo, addizionali regionali e comunali.
                  </p>
                  <p>
                    <span className="font-medium text-foreground/80">Non include:</span>{" "}
                    Familiari a carico, TFR, welfare aziendale, fringe benefit, detrazioni 730 personalizzate.
                  </p>
                  <p>
                    <span className="font-medium text-foreground/80">Ipotesi:</span>{" "}
                    Dipendente a tempo indeterminato, 13 mensilità, anno completo lavorato. Per calcoli precisi rivolgiti a un commercialista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground max-w-5xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded teal-gradient flex items-center justify-center">
                <Calculator className="w-3 h-3 text-white" />
              </div>
              <span>CalcoloRAL — Calcola il tuo vero stipendio</span>
            </div>
            <p>
              Realizzato con ❤️ da{" "}
              <span className="font-medium text-foreground">Luca Versilia</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

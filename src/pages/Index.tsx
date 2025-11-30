import { useCalcolatore } from "@/hooks/useCalcolatore";
import { RalInput } from "@/components/RalInput";
import { CitySelector } from "@/components/CitySelector";
import { ResultCard } from "@/components/ResultCard";
import { BreakdownList } from "@/components/BreakdownList";
import { CityComparison } from "@/components/CityComparison";
const Index = () => {
  const {
    ral,
    citta,
    risultati,
    setRal,
    setCitta
  } = useCalcolatore();
  return <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Calcolatore RAL → Netto 2025
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Il calcolatore che ti dice la verità (quella che HR non ti dice)
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <RalInput value={ral} onChange={setRal} />
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <CitySelector value={citta} onChange={setCitta} />
            </div>
          </div>

          {/* Results Section */}
          <ResultCard nettoAnnuale={risultati.nettoAnnuale} nettoMensile={risultati.nettoMensile} aliquotaEffettiva={risultati.aliquotaEffettiva} ral={ral} />

          {/* Breakdown Section */}
          <BreakdownList trattenute={risultati} citta={citta} />

          {/* City Comparison */}
          <CityComparison ral={ral} currentCity={citta} />

          {/* Footer / Disclaimer */}
          <div className="bg-warning/10 border-l-4 border-warning rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <h2 className="font-semibold text-warning-foreground mb-2">
                  Disclaimer
                </h2>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Include:</strong> IRPEF 2025 (scaglioni 23%, 35%, 43%), contributi INPS, 
                    detrazioni lavoro dipendente, <strong>bonus cuneo fiscale</strong>, 
                    <strong>ulteriore detrazione cuneo</strong>, <strong>trattamento integrativo</strong>, 
                    addizionali regionali e comunali.
                  </p>
                  <p>
                    <strong>NON include:</strong> Familiari a carico, TFR, welfare aziendale, 
                    fringe benefit, detrazioni 730 personalizzate.
                  </p>
                  <p>
                    <strong>Ipotesi:</strong> Dipendente tempo indeterminato, 13 mensilità, 
                    anno completo lavorato. Per calcoli precisi e consulenza fiscale personalizzata, 
                    rivolgiti a un commercialista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Realizzato con ❤️ per rendere le tasse meno noiose</p>
            <p className="mt-2">
              Powered by <span className="font-semibold text-foreground">Luca Versilia </span>
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
import { useState } from "react";
import { X } from "lucide-react";

export const EasterEgg = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl flex items-center justify-center text-2xl animate-bounce hover:animate-none cursor-pointer"
        aria-label="Easter egg"
      >
        🎭
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-card rounded-2xl shadow-xl max-w-md w-full mx-4 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Chiudi"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-4">
              So di essere già stato scartato.
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground mb-6">
              <li>• Forfettino: 11 utenti attivi, fatto in 7 giorni con Claude Code da autodidatta</li>
              <li>• Corso Product Builder in partenza fine mese</li>
              <li>• IRPEF/INPS/detrazioni: la prima volta non sapevo rispondere, ora un po' meglio</li>
              <li>• Codice di questo prototipo? Ora so spiegare le logiche principali</li>
            </ul>

            <p className="font-bold text-foreground mb-6">
              Se vi interessa, ci sono.
            </p>

            <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
              <span className="font-medium text-foreground">Luca Versilia</span>
              <a
                href="tel:3334435111"
                className="text-primary hover:underline font-medium"
              >
                333 443 5111
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

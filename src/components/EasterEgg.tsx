import { useState } from "react";
import { X } from "lucide-react";

export const EasterEgg = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl flex items-center justify-center text-2xl animate-bounce hover:animate-none cursor-pointer"
        aria-label="Easter egg">

        🎭
      </button>

      {open &&
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
        onClick={() => setOpen(false)}>

          <div
          className="relative bg-card rounded-2xl shadow-xl max-w-md w-full mx-4 p-8"
          onClick={(e) => e.stopPropagation()}>

            <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Chiudi">

              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-4">
              So di essere già stato scartato.
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <a target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2" href="">Forfettino</a>: 11 utenti attivi, fatto in 7 giorni con Claude Code da autodidatta
                </span>
              </li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span><span>Corso Product Builder in partenza fine mese</span></li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span><span>IRPEF/INPS/detrazioni: la prima volta non sapevo rispondere, ora un po' meglio</span></li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span><span>Codice di questo prototipo? Ora so spiegare le logiche principali</span></li>
            </ul>

            <p className="font-bold text-foreground mb-2">
              Se vi interessa, ci sono.
            </p>

            <p className="text-sm text-muted-foreground mb-6">
              (Forfettino è qui:
              <a href="https://forfettino.it/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-medium ml-1">provami</a>)
            </p>

            <div className="text-sm text-muted-foreground border-t border-border pt-4">
              <span className="font-medium text-foreground">Luca Versilia</span>
            </div>
          </div>
        </div>
      }
    </>);

};
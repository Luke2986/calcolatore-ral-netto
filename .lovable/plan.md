

## Piano: Easter Egg per il team JetHR

### Cosa faremo

Creare un pulsante flottante con emoji teatro (maschera) nell'angolo in basso a destra dello schermo. Cliccandolo si apre un modal con un messaggio personale per il team JetHR.

### File coinvolti

| File | Azione |
|------|--------|
| `src/components/EasterEgg.tsx` | Nuovo - componente con pulsante flottante + modal |
| `src/pages/Index.tsx` | Modifica minima - importare e inserire `<EasterEgg />` |

### Dettagli tecnici

**1. `src/components/EasterEgg.tsx`** (nuovo file)

- `useState<boolean>` per gestire apertura/chiusura del modal
- Pulsante flottante:
  - `fixed bottom-6 right-6 z-50`
  - Cerchio con gradiente `from-purple-600 to-pink-600`
  - Shadow elevata (`shadow-xl`)
  - Emoji teatro come icona
  - `animate-bounce` che si ferma con `hover:animate-none`
- Modal (renderizzato condizionalmente):
  - Overlay scuro (`bg-black/60`) con `onClick` per chiudere
  - z-index 50+ per stare sopra tutto
  - Pulsante X con icona `X` da lucide-react in alto a destra
  - Contenuto:
    - Titolo: "So di essere gia stato scartato."
    - Lista puntata con i 4 messaggi richiesti
    - CTA in grassetto: "Se vi interessa, ci sono."
    - Footer con "Luca Versilia" a sinistra e "333 443 5111" (link `tel:`) a destra
  - Chiusura: click su X oppure click sull'overlay

**2. `src/pages/Index.tsx`** (modifica minima)

- Aggiungere import di `EasterEgg`
- Inserire `<EasterEgg />` alla fine del JSX, prima della chiusura del `</div>` principale

### Cosa NON viene toccato

- Nessun file di calcolo (`calculations.ts`, `fiscalData2025.ts`, ecc.)
- Nessun componente esistente della dashboard (ResultCard, BreakdownList, ecc.)
- Nessuno stile globale


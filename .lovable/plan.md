

## Piano: Aggiungere link a Forfettino nell'Easter Egg

### Modifiche al file `src/components/EasterEgg.tsx`

**1. Aggiornare il primo bullet point** per rendere "Forfettino" un link cliccabile verso `https://forfettino.lovable.app`

**2. Aggiungere il paragrafo "provalo qui"** subito dopo la CTA "Se vi interessa, ci sono."

### Risultato finale del contenuto del modal

```
Titolo: "So di essere gia stato scartato."

- [Forfettino](link): 11 utenti attivi, fatto in 7 giorni con Claude Code da autodidatta
- Corso Product Builder in partenza fine mese
- IRPEF/INPS/detrazioni: la prima volta non sapevo rispondere, ora un po' meglio
- Codice di questo prototipo? Ora so spiegare le logiche principali

Se vi interessa, ci sono.
(Forfettino e live: provalo qui ->)

--- separatore ---
Luca Versilia
```

### Dettaglio tecnico

Modifiche alla lista (righe 38-43):
- Il primo `<li>` diventa un flex container con bullet viola e link a Forfettino
- Gli altri bullet mantengono lo stesso stile con flex + span per coerenza visiva

Aggiunta dopo la CTA (dopo riga 47):
- Un paragrafo `text-sm text-muted-foreground` con link a `https://forfettino.it/`
- Il link usa `text-purple-600 hover:text-purple-700` per risaltare

Note sullo stile:
- Si mantengono le classi semantiche (`text-foreground`, `text-muted-foreground`) per compatibilita col tema
- Solo i link usano `text-purple-600` come accento di colore
- Tutti i link esterni hanno `target="_blank"` e `rel="noopener noreferrer"`

### Cosa NON viene toccato
- Nessun altro file
- Nessun componente di calcolo o dashboard

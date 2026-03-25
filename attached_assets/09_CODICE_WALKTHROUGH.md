# Calcolatore RAL → Netto — Walkthrough del Codice

Questo documento è la versione leggibile del file `calcolatore_ral_netto.html`. Mostra la struttura del codice, le funzioni, i commenti e le basi di calcolo. Serve per prepararsi alle domande tecniche in colloquio.

---

## La pipeline — Schema completo

```
RAL (lordo)
 ↓
 INPS = RAL × 9,19%                          ← calcolato sulla RAL
 ↓
 Imponibile = RAL - INPS                      ← questo è il perno di tutto
 ↓
 IRPEF lorda = scaglioni su Imponibile         (23% / 33% / 43%)
 Detrazioni = formula su Imponibile            (ma sottratte dall'imposta, non dal reddito)
 Ult. detrazione cuneo = su Imponibile         (solo €20K-€40K)
 IRPEF netta = lorda - detrazioni              (minimo zero)
 ↓
 Add. regionale = scaglioni su Imponibile      (Lombardia: 1,23%-1,73%)
 Add. comunale = aliquota su Imponibile        (Milano: 0,8%, esente sotto €23K)
 ↓
 Bonus cuneo = % su reddito lav. dip.          (solo sotto €20K, non tassato)
 Trattamento integrativo = €1.200              (solo sotto €15K, con capienza)
 ↓
 Netto = RAL - INPS - IRPEF netta - addizionali + bonus cuneo + tratt. integrativo
```

La parola chiave: **la base di calcolo cambia a ogni step**. L'INPS parte dal lordo. Tutto il resto parte dall'imponibile. Le detrazioni non abbassano il reddito ma abbassano l'imposta.

---

## Struttura del file

Il file HTML è diviso in 3 blocchi:

1. **CSS** — Design system (variabili, layout, componenti)
2. **HTML** — Struttura pagina (input, risultati, breakdown)
3. **JavaScript** — Motore di calcolo + rendering

Il blocco JS è a sua volta diviso in:

```
CONFIG              → Costanti fiscali 2026 (un unico oggetto)
Funzioni di calcolo → Una per ogni step della pipeline
eseguiCalcolo()     → Orchestratore che chiama tutto nell'ordine
UI                  → Input handling + rendering risultati
```

---

## CONFIG — Costanti fiscali 2026

Tutte le costanti in un unico oggetto. Per aggiornare anno fiscale → modifica solo questo blocco.

Fonti: L. 199/2025, Circolare INPS 6/2026, Art. 13 TUIR.

```javascript
const CONFIG = {

  anno: 2026,

  // --- STEP 1: Contributi INPS a carico dipendente ---
  // Fonte: FPLD, Circolare INPS 6/2026
  // Base: RAL (lordo)
  inps: {
    aliquota: 0.0919,           // 9,19% sulla RAL intera
    sogliaAggiuntivo: 56224,    // Prima fascia pensionabile 2026
    aliquotaAggiuntivo: 0.01    // 1% sulla quota eccedente
  },

  // --- STEP 3: Scaglioni IRPEF ---
  // Fonte: Art. 11 TUIR, modificato da L. 199/2025
  // Base: imponibile fiscale (RAL - contributi INPS)
  // NOTA 2026: secondo scaglione ridotto dal 35% al 33%
  irpef: [
    { fino: 28000, aliquota: 0.23 },
    { fino: 50000, aliquota: 0.33 },  // era 0.35 nel 2025
    { fino: Infinity, aliquota: 0.43 }
  ],

  // --- STEP 4: Detrazioni lavoro dipendente ---
  // Fonte: Art. 13, comma 1, TUIR — confermate senza modifiche per il 2026
  // Si applicano al reddito complessivo, riducono l'IMPOSTA (non il reddito)
  detrazioni: {
    fascia1: { limite: 15000, importo: 1955, minimo: 690 },
    fascia2: { limite: 28000, base: 1910, incremento: 1190, divisore: 13000 },
    fascia3: { limite: 50000, base: 1910, divisore: 22000 },
    maggiorazione65: { da: 25000, a: 35000, importo: 65 }
  },

  // --- STEP 5: Ulteriore detrazione cuneo fiscale ---
  // Fonte: Art. 1, commi 6-7, L. 207/2024, confermata per il 2026
  // Si applica su reddito complessivo €20.001-€40.000
  ulterioreDetrazione: {
    da: 20000,
    pienoFino: 32000,
    importo: 1000,
    decalageFino: 40000,
    divisore: 8000
  },

  // --- Bonus cuneo fiscale (redditi bassi) ---
  // Fonte: Art. 1, commi 4-5, L. 207/2024, confermato per il 2026
  // NON concorre a reddito imponibile
  // Percentuale applicata al reddito da LAVORO DIPENDENTE
  bonusCuneo: {
    sogliaReddito: 20000,
    fasce: [
      { fino: 8500,  pct: 0.071 },
      { fino: 15000, pct: 0.053 },
      { fino: 20000, pct: 0.048 }
    ]
  },

  // --- Trattamento integrativo (ex Bonus Renzi) ---
  // Fonte: Art. 1, DL 3/2020, confermato per il 2026
  trattamentoIntegrativo: {
    importo: 1200,
    sogliaReddito: 15000,
    sogliaNoTax: 8500,
    riduzioneCapienza: 75
  },

  // --- Addizionale regionale Lombardia ---
  // Fonte: Regione Lombardia (regime transitorio 2026)
  // Base: imponibile fiscale (come IRPEF)
  addRegionale: [
    { fino: 15000, aliquota: 0.0123 },
    { fino: 28000, aliquota: 0.0158 },
    { fino: 50000, aliquota: 0.0172 },
    { fino: Infinity, aliquota: 0.0173 }
  ],

  // --- Addizionale comunale Milano ---
  // Fonte: Comune di Milano, Delibera C.C. 36/2013
  // Base: imponibile fiscale
  addComunale: {
    aliquota: 0.008,
    sogliaEsenzione: 23000   // esenzione totale (NON franchigia)
  }
};
```

---

## Pipeline di calcolo — Funzione per funzione

### STEP 1 — `calcolaINPS(ral)`

**Domanda colloquio: "INPS da dove lo deduci?"**

Base di calcolo: **RAL (lordo)**. L'INPS si calcola PRIMA di tutto il resto.

```javascript
function calcolaINPS(ral) {
  const base = ral * CONFIG.inps.aliquota;                    // 9,19% sulla RAL
  const soglia = CONFIG.inps.sogliaAggiuntivo;                // €56.224
  const aggiuntivo = ral > soglia
    ? (ral - soglia) * CONFIG.inps.aliquotaAggiuntivo         // 1% sulla quota eccedente
    : 0;
  return { base, aggiuntivo, totale: base + aggiuntivo };
}
```

---

### STEP 2 — `calcolaImponibile(ral, inpsTotale)`

Questo numero è la **BASE per tutto il resto**: IRPEF, detrazioni, addizionali.

```javascript
function calcolaImponibile(ral, inpsTotale) {
  return ral - inpsTotale;    // RAL meno contributi INPS
}
```

---

### STEP 3 — `calcolaIRPEFLorda(imponibile)`

**Domanda colloquio: "L'aliquota da che numero la calcoli?"**

Base di calcolo: **imponibile fiscale** (NON la RAL). Scaglioni 2026: 23% fino a 28K, **33%** fino a 50K, 43% oltre.

```javascript
function calcolaIRPEFLorda(imponibile) {
  if (imponibile <= 0) return 0;
  let imposta = 0;
  let precedente = 0;

  for (const scaglione of CONFIG.irpef) {
    const base = Math.min(imponibile, scaglione.fino) - precedente;
    if (base <= 0) break;
    imposta += base * scaglione.aliquota;    // progressivo: ogni aliquota solo sulla sua fascia
    precedente = scaglione.fino;
  }

  return imposta;
}
```

---

### STEP 4 — `calcolaDetrazioniLavDip(reddito)`

**Domanda colloquio: "Le detrazioni sono sul lordo? Netto?"**

Base di calcolo: **reddito complessivo** (= imponibile nel caso semplice). Ma **riducono l'IMPOSTA, non il reddito**. Sono detrazioni d'imposta, non deduzioni.

```javascript
function calcolaDetrazioniLavDip(reddito) {
  if (reddito <= 0) return 0;

  // Fascia 1: fino a €15.000 → detrazione fissa 1.955 (min 690 per TI)
  if (reddito <= 15000) {
    return Math.max(1955, 690);
  }

  // Fascia 2: €15.001 - €28.000 → formula decrescente
  if (reddito <= 28000) {
    return 1910 + 1190 * (28000 - reddito) / 13000;
  }

  // Fascia 3: €28.001 - €50.000 → formula decrescente + eventuale +€65
  if (reddito <= 50000) {
    let det = 1910 * (50000 - reddito) / 22000;
    if (reddito > 25000 && reddito <= 35000) det += 65;   // maggiorazione comma 1.1
    return det;
  }

  // Oltre €50.000 → nessuna detrazione
  return 0;
}
```

---

### STEP 5 — `calcolaUlterioreDetrazioneCuneo(reddito)`

Solo per reddito complessivo €20.001 - €40.000. Riduce l'imposta (come le detrazioni lavoro dip.).

```javascript
function calcolaUlterioreDetrazioneCuneo(reddito) {
  if (reddito > 20000 && reddito <= 32000)
    return 1000;                                            // importo pieno

  if (reddito > 32000 && reddito <= 40000)
    return 1000 * (40000 - reddito) / 8000;                // décalage

  return 0;
}
```

---

### STEP 6 — `calcolaIRPEFNetta(irpefLorda, detrazioniLavDip, ultDetCuneo)`

IRPEF lorda meno tutte le detrazioni. Minimo zero (le detrazioni non generano credito nel calcolo mensile).

```javascript
function calcolaIRPEFNetta(irpefLorda, detrazioniLavDip, ultDetCuneo) {
  return Math.max(0, irpefLorda - detrazioniLavDip - ultDetCuneo);
}
```

---

### STEP 7 — `calcolaTrattamentoIntegrativo(reddito, irpefLorda, detrazioniLavDip)`

€1.200/anno (ex Bonus Renzi). Solo se reddito ≤ €15.000 e c'è capienza fiscale.

```javascript
function calcolaTrattamentoIntegrativo(reddito, irpefLorda, detrazioniLavDip) {
  if (reddito > 15000) return 0;                            // semplificazione: solo sotto 15K
  if (reddito <= 8500) return 0;                            // no-tax area → incapiente

  // Verifica capienza: IRPEF lorda > detrazione - 75
  if (irpefLorda > (detrazioniLavDip - 75)) return 1200;
  return 0;
}
```

---

### STEP 8 — `calcolaBonusCuneo(redditoComplessivo, redditoLavDip)`

Solo per reddito complessivo ≤ €20.000. NON concorre a reddito imponibile (è un netto aggiuntivo).

```javascript
function calcolaBonusCuneo(redditoComplessivo, redditoLavDip) {
  if (redditoComplessivo > 20000) return 0;

  if (redditoLavDip <= 8500)  return redditoLavDip * 0.071;   // 7,1%
  if (redditoLavDip <= 15000) return redditoLavDip * 0.053;   // 5,3%
  return redditoLavDip * 0.048;                                // 4,8%
}
```

---

### STEP 9a — `calcolaAddRegionale(imponibile)`

**Domanda colloquio: "Le addizionali partono dal lordo?"**

Base di calcolo: **imponibile fiscale** (come IRPEF, NON dal lordo).

```javascript
function calcolaAddRegionale(imponibile) {
  if (imponibile <= 0) return 0;
  let imposta = 0;
  let precedente = 0;

  for (const s of CONFIG.addRegionale) {
    const base = Math.min(imponibile, s.fino) - precedente;
    if (base <= 0) break;
    imposta += base * s.aliquota;
    precedente = s.fino;
  }

  return imposta;
}
```

---

### STEP 9b — `calcolaAddComunale(imponibile)`

Base di calcolo: **imponibile fiscale**. Aliquota unica 0,8%. Esenzione totale sotto €23.000.

```javascript
function calcolaAddComunale(imponibile) {
  if (imponibile <= 23000) return 0;       // esenzione totale (NON franchigia)
  return imponibile * 0.008;
}
```

---

## Orchestratore — `eseguiCalcolo(ral)`

Chiama tutte le funzioni nell'ordine corretto. Ogni riga è uno step della pipeline.

```javascript
function eseguiCalcolo(ral) {
  // Step 1: INPS (base = RAL)
  const inps = calcolaINPS(ral);

  // Step 2: Imponibile (RAL - INPS)
  const imponibile = calcolaImponibile(ral, inps.totale);

  // Step 3: IRPEF lorda (base = imponibile)
  const irpefLorda = calcolaIRPEFLorda(imponibile);

  // Step 4: Detrazioni (base = reddito complessivo = imponibile)
  const detLavDip = calcolaDetrazioniLavDip(imponibile);

  // Step 5: Ulteriore detrazione cuneo
  const ultDetCuneo = calcolaUlterioreDetrazioneCuneo(imponibile);

  // Step 6: IRPEF netta
  const irpefNetta = calcolaIRPEFNetta(irpefLorda, detLavDip, ultDetCuneo);

  // Step 7: Trattamento integrativo
  const trattInteg = calcolaTrattamentoIntegrativo(imponibile, irpefLorda, detLavDip);

  // Step 8: Bonus cuneo
  const bonusCuneo = calcolaBonusCuneo(imponibile, imponibile);

  // Step 9: Addizionali (base = imponibile)
  const addReg = calcolaAddRegionale(imponibile);
  const addCom = calcolaAddComunale(imponibile);

  // Totali
  const trattenute = inps.totale + irpefNetta + addReg + addCom;
  const bonus = bonusCuneo + trattInteg;
  const netto = ral - trattenute + bonus;

  return { ral, inps, imponibile, irpefLorda, detLavDip, ultDetCuneo,
           irpefNetta, trattInteg, bonusCuneo, addReg, addCom,
           trattenute, bonus, netto,
           nettoMese13: netto / 13,
           nettoMese12: netto / 12,
           aliquotaEffettiva: (trattenute - bonus) / ral * 100 };
}
```

---

## Cheat sheet per il colloquio

| Domanda | Funzione da mostrare | Frase chiave |
|---------|---------------------|--------------|
| "INPS da dove la calcoli?" | `calcolaINPS()` | "Dalla RAL. È l'unico step che parte dal lordo." |
| "L'aliquota IRPEF su che numero?" | `calcolaIRPEFLorda()` | "Sull'imponibile fiscale: RAL meno INPS." |
| "Le detrazioni sul lordo o netto?" | `calcolaDetrazioniLavDip()` | "Sul reddito complessivo, ma riducono l'imposta, non il reddito." |
| "Addizionali dal lordo?" | `calcolaAddRegionale()` | "No, dall'imponibile fiscale. Stessa base dell'IRPEF." |
| "Dove cambio anno?" | `CONFIG` | "Un oggetto solo in cima al file. Cambio lì, cambia tutto." |
| "Mostrami l'ordine" | `eseguiCalcolo()` | "10 righe, ogni step commentato con la base di calcolo." |

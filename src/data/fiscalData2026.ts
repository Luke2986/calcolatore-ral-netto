// Dati fiscali 2026 - Legge di Bilancio 2026 (L. 199/2025)

/**
 * Scaglioni IRPEF 2026
 * Fonte: Art. 11 TUIR, modificato da L. 199/2025 (Legge di Bilancio 2026)
 * Novità 2026: 2° scaglione ridotto dal 35% al 33%
 */
export const SCAGLIONI_IRPEF_2026 = [
  { limite: 28000, aliquota: 0.23 },
  { limite: 50000, aliquota: 0.33 },
  { limite: Infinity, aliquota: 0.43 },
] as const;

/**
 * Contributi INPS dipendenti 2026
 * Base: 9,19% (FPLD) su tutta la RAL
 * Aggiuntivo: +1% sulla quota eccedente €56.224 (prima fascia pensionabile 2026)
 * Fonte: Circolare INPS 6/2026
 */
export const INPS = {
  soglia: 56224,
  aliquotaBase: 0.0919,
  aliquotaAggiuntiva: 0.01,
} as const;

/**
 * Detrazioni lavoro dipendente 2026
 * Fonte: Art. 13 TUIR, confermato senza modifiche per il 2026
 */
export const DETRAZIONI = {
  lavoroMax: 1955,
  lavoroBase: 1910,
  lavoroIncremento: 1190,
  lavoroBonusMin: 690,
  bonusExtra: 65,
  bonusExtraMin: 25001,
  bonusExtraMax: 35000,
} as const;

/**
 * Soglie bonus e detrazioni fiscali 2026
 * Fonte: L. 207/2024 (bonus cuneo e ulteriore detrazione confermati per il 2026)
 */
export const SOGLIE_BONUS = {
  // Bonus cuneo fiscale (somma netta) — redditi ≤ €20.000
  cuneoFiscale: 20000,

  // Ulteriore detrazione cuneo fiscale — redditi €20.001-€40.000
  detrazioneCuneo: {
    min: 20000,
    max: 40000,
    flat: 32000,
    importoMax: 1000,
  },

  // Trattamento integrativo (ex Bonus Renzi)
  // Semplificazione prototipo: solo redditi ≤ €15.000
  // Fascia €15.001-€28.000 non implementata (condizioni complesse)
  trattamentoIntegrativo: {
    soglia: 15000,
    importoMax: 1200,
    riduzione_capienza: 75,
  },
} as const;

/**
 * Percentuali bonus cuneo fiscale per fasce di reddito
 * Fonte: Art. 1, commi 4-5, L. 207/2024, confermato per il 2026
 */
export const PERCENTUALI_BONUS_CUNEO = [
  { limite: 8500, percentuale: 0.071 },
  { limite: 15000, percentuale: 0.053 },
  { limite: 20000, percentuale: 0.048 },
] as const;

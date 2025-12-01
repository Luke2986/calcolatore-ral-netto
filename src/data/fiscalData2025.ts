// Dati fiscali 2025 - Legge di Bilancio 2025

/**
 * Scaglioni IRPEF 2025 (strutturali)
 * Fonte: L. 207/2024
 */
export const SCAGLIONI_IRPEF_2025 = [
  { limite: 28000, aliquota: 0.23 },
  { limite: 50000, aliquota: 0.35 },
  { limite: Infinity, aliquota: 0.43 },
] as const;

/**
 * Contributi INPS dipendenti 2025
 * Base: 9,19% + 1% aggiuntivo oltre €55.448
 */
export const INPS = {
  soglia: 55448,
  aliquotaBase: 0.0919,
  aliquotaAggiuntiva: 0.01,
} as const;

/**
 * Detrazioni lavoro dipendente 2025
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
 * Soglie bonus e detrazioni fiscali 2025
 */
export const SOGLIE_BONUS = {
  // Bonus cuneo fiscale (somma netta)
  cuneoFiscale: 20000,
  
  // Detrazione cuneo fiscale
  detrazioneCuneo: {
    min: 20000,
    max: 40000,
    flat: 32000,
    importoMax: 1000,
  },
  
  // Trattamento integrativo (ex Bonus Renzi)
  trattamentoIntegrativo: {
    soglia1: 15000,
    soglia2: 28000,
    importoMax: 1200,
  },
} as const;

/**
 * Percentuali bonus cuneo fiscale per fasce di reddito
 */
export const PERCENTUALI_BONUS_CUNEO = [
  { limite: 8500, percentuale: 0.071 },
  { limite: 15000, percentuale: 0.053 },
  { limite: 20000, percentuale: 0.048 },
] as const;

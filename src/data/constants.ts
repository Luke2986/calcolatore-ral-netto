// Costanti globali dell'applicazione

/**
 * Range valori RAL ammessi
 */
export const RAL_RANGE = {
  min: 0,
  max: 500000,
  default: 35000,
  step: 500,
} as const;

/**
 * Configurazione mensilità
 */
export const MENSILITA = {
  standard: 13,
  min: 12,
  max: 14,
} as const;

/**
 * Ore lavorative standard
 */
export const ORE_LAVORATIVE = {
  giorniAnno: 260, // ~52 settimane * 5 giorni
  oreGiorno: 8,
} as const;

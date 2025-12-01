// Utility per formattazione numeri e valute

/**
 * Formatta un numero come valuta italiana (Euro)
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatta un numero come percentuale
 */
export function formatPercentuale(value: number, decimali: number = 1): string {
  return `${(value * 100).toFixed(decimali)}%`;
}

/**
 * Formatta un numero con separatore migliaia
 */
export function formatNumero(value: number, decimali: number = 0): string {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: decimali,
    maximumFractionDigits: decimali,
  }).format(value);
}

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

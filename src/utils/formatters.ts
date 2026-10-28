// Utility per formattazione numeri e valute

// In it-IT il separatore delle migliaia scatta solo da 5 cifre (CLDR minimumGroupingDigits = 2),
// quindi 2169 restava senza punto accanto a 26.032: forziamo il raggruppamento sempre.
// "always" non è nei tipi ES2020; i browser che non lo supportano ricadono sul comportamento di default.
const GROUPING = { useGrouping: "always" } as unknown as Pick<Intl.NumberFormatOptions, "useGrouping">;

const euroFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  ...GROUPING,
});

const numeroFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 0,
  ...GROUPING,
});

/**
 * Formatta un numero come valuta italiana (Euro)
 */
export function formatEuro(value: number): string {
  return euroFormatter.format(value);
}

/**
 * Formatta un numero intero con separatore delle migliaia italiano
 */
export function formatNumero(value: number): string {
  return numeroFormatter.format(value);
}

/**
 * Formatta una percentuale (già moltiplicata per 100) con virgola decimale
 */
export function formatPercentuale(value: number, decimali = 1): string {
  return (
    new Intl.NumberFormat("it-IT", {
      minimumFractionDigits: decimali,
      maximumFractionDigits: decimali,
    }).format(value) + "%"
  );
}

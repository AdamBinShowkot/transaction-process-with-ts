/**
 * Normalize currency code from Excel cell
 */
export function parseCurrency(value: any): string | null {
  if (value == null) return null;

  const str = String(value).trim().toUpperCase();
  if (!str) return null;

  // Optional: validate against known ISO codes
  const validCurrencies = new Set([
    "USD","EUR","GBP","JPY","CAD","AUD","CNY","CHF"
    // Add more if needed
  ]);

  return validCurrencies.has(str) ? str : null;
}

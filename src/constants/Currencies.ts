export const VALID_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "BDT"
] as const;

export type CurrencyCode = (typeof VALID_CURRENCIES)[number];

export const CURRENCY_MAP: Record<string, CurrencyCode> = {
  USD: "USD",
  "$": "USD",
  "DOLLAR": "USD",
  "US DOLLAR": "USD",
  "USDOLLAR": "USD",

  EUR: "EUR",
  "EURO": "EUR",

  GBP: "GBP",
  "POUND": "GBP",

  CAD: "CAD",
  "CAD$": "CAD",

  BDT: "BDT",
  "TAKA": "BDT"
};
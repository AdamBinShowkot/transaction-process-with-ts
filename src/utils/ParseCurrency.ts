export function parseCurrency(value: any): string | null {
  if (value == null) return null;

  let str = String(value).trim().toUpperCase();

  const map: Record<string,string> = {
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
    "TAKA": "BDT",
  };

  return map[str] ?? null;
}

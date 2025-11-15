/**
 * Parse messy currency/amount strings into a number
 */
export function parseAmount(value: any): number | null {
  if (value == null) return null;

  let str = String(value).trim();

  if (!str) return null;

  // Remove any currency symbols or letters
  str = str.replace(/[^\d.,-]/g, "");

  // Handle European format: if comma is decimal separator
  const commaCount = (str.match(/,/g) || []).length;
  const dotCount = (str.match(/\./g) || []).length;

  // Example: "1.200,50" => 1200.50
  if (commaCount === 1 && dotCount > 0 && str.indexOf(",") > str.indexOf(".")) {
    str = str.replace(/\./g, "").replace(",", ".");
  }
  // Example: "1,200.75" => 1200.75
  else if (commaCount > 0 && dotCount === 1 && str.indexOf(".") > str.indexOf(",")) {
    str = str.replace(/,/g, "");
  }
  // Example: "1,200" or "1.200" (no decimals)
  else if (commaCount > 0 && dotCount === 0) {
    str = str.replace(/,/g, "");
  } else if (dotCount > 0 && commaCount === 0) {
    // leave as is, decimal dot
  }

  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

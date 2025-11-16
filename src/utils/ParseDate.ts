import dayjs from "dayjs";

/**
 * Smart date parser: supports dd/mm/yyyy, yyyyMMdd, Excel, messy formats
 */
export function parseExcelDate(input: any): Date | null {
  if (input == null) return null;

  // Already a Date
  if (input instanceof Date && !isNaN(input.getTime())) return input;

  // Excel serial number (integer)
  if (!isNaN(Number(input)) && String(input).trim().length <= 5) {
    const n = Number(input);
    const excelEpoch = new Date(1899, 11, 30);
    excelEpoch.setDate(excelEpoch.getDate() + n);
    return excelEpoch;
  }

  const str = String(input).trim();

  // dd-mm-yyyy or dd/mm/yyyy
  const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (dmy) {
    let d = Number(dmy[1]);
    let m = Number(dmy[2]) - 1;
    let y = Number(dmy[3]);
    if (y < 100) y += 2000; // convert 25 → 2025
    return new Date(y, m, d);
  }

  // yyyyMMdd
  if (/^\d{8}$/.test(str)) {
    const y = Number(str.slice(0, 4));
    const m = Number(str.slice(4, 6)) - 1;
    const d = Number(str.slice(6, 8));
    return new Date(y, m, d);
  }

  // Try dayjs fallback
  const parsed = dayjs(str);
  return parsed.isValid() ? parsed.toDate() : null;
}

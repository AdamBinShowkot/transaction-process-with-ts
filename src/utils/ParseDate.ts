import dayjs from "dayjs";

/**
 * Parse any input (string, number, Date) and return Date | null
 * @param input - value from Excel cell
 */
export function parseExcelDate(input: any): Date | null {
  if (input == null) return null;

  // If already a Date object
  if (input instanceof Date && !isNaN(input.getTime())) {
    return input;
  }

  // If it's a number (Excel serial date)
  if (typeof input === "number") {
    // Excel date start: Jan 1, 1900
    const excelEpoch = new Date(1899, 11, 30);
    excelEpoch.setDate(excelEpoch.getDate() + input);
    return excelEpoch;
  }

  // If it's a string, try parsing with dayjs
  const parsed = dayjs(input);
  if (parsed.isValid()) {
    return parsed.toDate();
  }

  // Fallback
  return null;
}

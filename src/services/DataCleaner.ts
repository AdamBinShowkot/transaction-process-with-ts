import dayjs from "dayjs";
import { 
    RawTransaction,
    ProcessedTransaction 
} from "../models/Transaction.js";
import {
    CURRENCY_MAP
} from "../constants/Currencies.js"
import {
    STATUS_MAP
} from "../constants/Status.js"

/**
 * Cleans different formats:
 * - date: uses dayjs to parse loose values (Date objects remain)
 * - amount: remove $ , . thousand separators and transform comma-decimal if needed
 * - currency/status casing
 */

export class TransactionDataCleaner {
    Clean(list:RawTransaction[]):ProcessedTransaction[] {
        return list.map<ProcessedTransaction>((t) => ({
            ...t,
            date: this.parseExcelDate(t.date),
            amount: this.parseAmount(t.amount),
            currency: this.parseCurrency(t.currency),
            status: this.parseStatus(t.status),
            validationErrors:[],
            isValid:false
        }));
    }
    // parse Currency
    private  parseCurrency(value: any): string | null {
         if (value == null) return null;

        const str = String(value).trim().toUpperCase();

        // Check map first
        if (CURRENCY_MAP[str]) return CURRENCY_MAP[str];

        // Direct match to valid currency list
        if (Object.values(CURRENCY_MAP).includes(str as any)) return str;

        return null;
    }
    // Parse Date
    private parseExcelDate(input: any): Date | null {
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
    // Parse Amount
    private parseAmount(value: any): number | null {
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
    // Clean String
    private cleanString(s: any): string | null {
        if (s == null) return null;
        const v = String(s).trim();
        return v.length === 0 ? null : v;
    }
    // Parsse Status
    private parseStatus(s: any): string | null {
       const v = this.cleanString(s);
        if (!v) return null;

        const lowered = v.toLowerCase();

        // Look up alias map
        if (STATUS_MAP[lowered]) return STATUS_MAP[lowered];

        return null; // invalid status
    }
}


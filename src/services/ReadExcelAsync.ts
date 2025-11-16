import fs from 'fs';
import { parse } from "csv-parse/sync";
import { RawTransaction } from "../models/Transaction.js";
import { parseExcelDate } from "../utils/ParseDate.js";
import {parseAmount} from "../utils/ParseAmount.js";
import { parseCurrency } from "../utils/ParseCurrency.js";

/**
 * Expected sheet columns (first row header):
 * transaction_id, customer_id, date, amount, currency, status
 */

export class ReadTransactionsCsvAsync {
  /** Detects delimiter from a line */
  private detectDelimiter(line: string): string {
    const delims = ["\t", ";", ","];

    const counts = delims.map(d => ({
      d,
      count: (line.split(d).length - 1)
    }));

    counts.sort((a, b) => b.count - a.count);

    return counts[0].count > 0 ? counts[0].d : ","; // default
  }

  /**
    * Map dynamic CSV headers to standard Transaction keys
  */
  private HeaderMapper(headers: string[]): Record<string, number> {
    const mapIndex: Record<string, number> = {
      transaction_id: -1,
      customer_id: -1,
      date: -1,
      amount: -1,
      currency: -1,
      status: -1,
    };

    headers.forEach((h, i) => {
      const header = String(h).toLowerCase().trim();

      if (header.includes("transaction_id")) mapIndex.transaction_id = i;
      else if (header.includes("customer_id")) mapIndex.customer_id = i;
      else if (header.includes("date")) mapIndex.date = i;
      else if (header.includes("amount") || header.includes("value")) mapIndex.amount = i;
      else if (header.includes("currency") || header.includes("curr")) mapIndex.currency = i;
      else if (header.includes("status")) mapIndex.status = i;
    });

    return mapIndex;
  }


  async read(filePath: string): Promise<RawTransaction[]> {
    const content = fs.readFileSync(filePath, "utf-8");

    // Detect delimiter: tab, semicolon, or comma
    const firstLine = content.split(/\r?\n/)[0];
    const delimiter = this.detectDelimiter(firstLine);

    const rows = parse(content, {
      skip_empty_lines: true,
      delimiter,
      relax_column_count: true,
      relax_quotes: true
    });

    if (!rows || rows.length < 1) return [];

    const mapIndex = this.HeaderMapper(rows[0]);

    const out: RawTransaction[] = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const t: RawTransaction = {
        transactionId:
          mapIndex.transaction_id >= 0 && r[mapIndex.transaction_id] != null
            ? String(r[mapIndex.transaction_id])
            : "",
        customerId:
          mapIndex.customer_id >= 0 && r[mapIndex.customer_id] != null
            ? String(r[mapIndex.customer_id])
            : null,
        date:
          mapIndex.date >= 0 && r[mapIndex.date] != null
            ? r[mapIndex.date]
            : null,
        amount:
          mapIndex.amount >= 0 && r[mapIndex.amount] != null
            ? r[mapIndex.amount]
            : null,
        currency:
          mapIndex.currency >= 0 && r[mapIndex.currency] != null
            ? r[mapIndex.currency]
            : null,
        status:
          mapIndex.status >= 0 && r[mapIndex.status] != null
            ? String(r[mapIndex.status])
            : null,
      };
      out.push(t);
    }

    return out;
  }
}
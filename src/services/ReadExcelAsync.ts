import fs from 'fs';
import { parse } from "csv-parse/sync";
import { RawTransaction } from "../models/Transaction.js";
import { parseExcelDate } from "../utils/ParseDate.js";
import {parseAmount} from "../utils/ParseAmount.js";
import { parseCurrency } from "../utils/ParseCurrency.js";
import { HeaderMapper } from '../utils/HeaderMapper.js';

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

    const mapIndex = HeaderMapper(rows[0]);

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
            ? parseExcelDate(r[mapIndex.date])
            : null,
        amount:
          mapIndex.amount >= 0 && r[mapIndex.amount] != null
            ? parseAmount(r[mapIndex.amount])
            : null,
        currency:
          mapIndex.currency >= 0 && r[mapIndex.currency] != null
            ? parseCurrency(r[mapIndex.currency])
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
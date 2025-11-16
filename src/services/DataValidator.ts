import {
    ProcessedTransaction
} from "../models/Transaction.js";
import { VALID_CURRENCIES } from "../constants/Currencies.js";
import { VALID_STATUSES } from "../constants/Status.js";

export class TransactionDataValidator {

   validateDataset(list: ProcessedTransaction[]) {
        const validRows: ProcessedTransaction[] = [];
        const invalidRows: (ProcessedTransaction & { errors: string[] })[] = [];

        const duplicateIds = this.findDuplicates(list);

        for (const row of list) {
            const errors = this.validateRow(row);

            if (duplicateIds.has(row.transactionId)) {
                errors.push("Duplicate transaction_id");
            }

            if (errors.length === 0) {
                validRows.push({
                    ...row,
                    isValid: true,
                    validationErrors: []
                });
            } else {
                invalidRows.push({
                    ...row,
                    isValid: false,
                    validationErrors: errors,
                    errors
                });
            }
        }

        return { validRows, invalidRows, duplicateIds: Array.from(duplicateIds) };
    }

    private validateRow(row: ProcessedTransaction): string[] {
        const errors: string[] = [];

        // Required fields
        if (!row.transactionId) errors.push("Missing transaction_id");
        if (!row.customerId) errors.push("Missing customer_id");
        if (!row.date) errors.push("Invalid date");

        // Amount checks
        if (row.amount == null) errors.push("Invalid amount");
        else if (row.amount <= 0) errors.push("Amount must be positive");

        // Currency
        if (!row.currency) {
            errors.push("Missing currency");
        } else if (!VALID_CURRENCIES.includes(row.currency as any)) {
            errors.push(`Unsupported currency: ${row.currency}`);
        }

        // Status
        if (!row.status) {
            errors.push("Missing status");
        } else if (!VALID_STATUSES.includes(row.status.toLowerCase() as any)) {
            errors.push(`Invalid status: ${row.status}`);
        }

        return errors;
    }

    // Find duplicate transaction IDs
    private findDuplicates(list: ProcessedTransaction[]): Set<string> {
        const seen = new Map<string, number>();
        const duplicates = new Set<string>();

        for (const row of list) {
            const id = row.transactionId;

            if (!id) continue;

            if (seen.has(id)) {
                duplicates.add(id);
            } else {
                seen.set(id, 1);
            }
        }

        return duplicates;
    }
}
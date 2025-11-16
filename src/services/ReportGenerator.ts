import {ProcessedTransaction} from "../models/Transaction.js";

export class TransactionReportGenerator {
    generateSummary(valid: ProcessedTransaction[], invalid: ProcessedTransaction[], duplicateIds: string[]) {
        const totalProcessed = valid.length + invalid.length;

        // Financial summaries
        const usdTotal = valid
            .filter(x => x.currency === "USD")
            .reduce((sum, r) => sum + (r.amount || 0), 0);

        const eurTotal = valid
            .filter(x => x.currency === "EUR")
            .reduce((sum, r) => sum + (r.amount || 0), 0);

        // Status breakdown
        const statusBreakdown: Record<string, number> = {};
        for (const row of valid) {
            const st = row.status || "unknown";
            statusBreakdown[st] = (statusBreakdown[st] || 0) + 1;
        }

        return {
            generated_time: new Date().toISOString(),
            processing_summary: {
                total_processed: totalProcessed,
                valid_transactions: valid.length,
                invalid_transactions: invalid.length,
                duplicate_transactions: duplicateIds.length
            },
            financial_summary: {
                total_amount_usd: usdTotal,
                total_amount_eur: eurTotal
            },
            status_breakdown: statusBreakdown
        };
    }

    formatReport(summary: any): string {
        const lines: string[] = [];

        lines.push("==========================================================");
        lines.push(" ACME PAYMENTS TRANSACTION PROCESSING REPORT ");
        lines.push("==========================================================");
        lines.push(`Generated: ${summary.generated_time}`);
        lines.push("");
        lines.push("PROCESSING SUMMARY:");
        lines.push(`Total transactions processed: ${summary.processing_summary.total_processed}`);
        lines.push(`Valid transactions: ${summary.processing_summary.valid_transactions}`);
        lines.push(`Invalid transactions: ${summary.processing_summary.invalid_transactions}`);
        lines.push(`Duplicate transactions: ${summary.processing_summary.duplicate_transactions}`);
        lines.push("");
        lines.push("FINANCIAL SUMMARY:");
        lines.push(`Total amount (USD): ${summary.financial_summary.total_amount_usd.toFixed(2)}`);
        lines.push(`Total amount (EUR): ${summary.financial_summary.total_amount_eur.toFixed(2)}`);
        lines.push("");
        lines.push("TRANSACTION STATUS BREAKDOWN:");
        for (const [status, count] of Object.entries(summary.status_breakdown)) {
            lines.push(`${status.toUpperCase()} transactions: ${count}`);
        }
        lines.push("==========================================================");

        return lines.join("\n");
    }
}
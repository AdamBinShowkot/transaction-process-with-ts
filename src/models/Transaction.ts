export interface Transaction {
    transactionId: string;
    customerId: string | null;
    date: Date | null;
    amount: number | null;
    currency: string | null;
    status: string | null;
    isValid?: boolean;
}
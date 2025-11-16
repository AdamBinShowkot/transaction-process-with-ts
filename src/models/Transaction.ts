export interface Transaction {
    transactionId: string;
    customerId: string | null;
    date: Date | null;
    amount: number | null;
    currency: string | null;
    status: string | null;
    isValid?: boolean;
}

// Read for raw data
export interface RawTransaction {
    transactionId: any;
    customerId: any;
    date: any;
    amount:any;
    currency: any;
    status: any;
}

// For process data
export interface ProcessedTransaction{
    transactionId: string; 
    customerId: string;    
    date: Date | null;     
    amount: number | null;        
    currency: string | null;       
    status: string | null;         
    isValid?: boolean;
    validationErrors: string[] | null;
}
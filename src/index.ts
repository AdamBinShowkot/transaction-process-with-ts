import { Transaction } from "./models/Transaction";

let data: Transaction = {
    transactionId: "tx123",
    customerId: "cust456",  
    date: new Date(),
    amount: 100.50,
    currency: "USD",
    status: "completed",
    isValid: true
};
console.log(data);
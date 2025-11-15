/**
 * Map dynamic CSV headers to standard Transaction keys
 */
export function HeaderMapper(headers: string[]): Record<string, number> {
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

export const VALID_STATUSES = [
  "Completed",
  "Pending",
  "Failed",
  "Cancelled"
] as const;

export type TransactionStatus = (typeof VALID_STATUSES)[number];

export const STATUS_MAP: Record<string, TransactionStatus> = {
  // Completed group
  "completed": "Completed",
  "complete": "Completed",
  "done": "Completed",
  "ok": "Completed",
  "success": "Completed",

  // Failed group
  "failed": "Failed",
  "fail": "Failed",
  "error": "Failed",
  "cancelled": "Failed",

  // Pending group
  "pending": "Pending",
  "processing": "Pending",
  "ongoing": "Pending"
};
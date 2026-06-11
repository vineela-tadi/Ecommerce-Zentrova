/**
 * Currency utility to convert USD prices to Indian Rupees (INR) and format them elegantly.
 * 1 USD = 83 INR
 */
export const EXCHANGE_RATE = 83;

export function convertToINR(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE);
}

export function formatPrice(usd: number): string {
  const inr = convertToINR(usd);
  return `₹${inr.toLocaleString("en-IN")}`;
}

export function formatPriceDirect(inr: number): string {
  return `₹${Math.round(inr).toLocaleString("en-IN")}`;
}

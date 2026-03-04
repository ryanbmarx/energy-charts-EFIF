/**
 * @param v The value of money to be formatted.
 * @param decimals Optional fixed number of decimal places. When omitted, trailing
 *   zeros are dropped but at least one decimal is kept (e.g. $3.10 → $3.1).
 * @returns A compact string like $3.1B, $-2.5M, $450.0K. Returns '' for 0.
 */

export function formatMoney(v: number, decimals?: number): string {
  const isNegative = v < 0;
  const absV = Math.abs(v);
  const sign = isNegative ? '-' : '';
  if (absV >= 1_000_000_000) {
    return `${sign}$${(absV / 1_000_000_000).toFixed(decimals ?? 2)}B`;
  }
  if (absV >= 1_000_000) {
    return `${sign}$${(absV / 1_000_000).toFixed(decimals ?? 1)}M`;
  }
  if (absV >= 1_000) {
    return `${sign}$${(absV / 1_000).toFixed(decimals ?? 1)}K`;
  }

  return v.toLocaleString();
}

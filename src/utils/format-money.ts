export type FormatParts = {
  prefix: string;
  value: number;
  suffix: 'B' | 'M' | 'K' | '';
};

/**
 * @param v The value of money to be formatted.
 * @param decimals Optional fixed number of decimal places. When omitted, trailing
 *   zeros are dropped but at least one decimal is kept (e.g. $3.10 → $3.1).
 * @returns A compact string like $3.1B, $-2.5M, $450.0K. Returns '' for 0.
 */
export function formatMoney(v: number, decimals?: number): string {
  const { prefix, value, suffix } = formatMoneyParts(v, decimals);
  return `${prefix}${value}${suffix}`;
}
export function formatMoneyParts(v: number, decimals?: number): FormatParts {
  const isNegative = v < 0;
  const absV = Math.abs(v);
  const prefix = isNegative ? '-$' : '$';
  if (absV >= 1_000_000_000) {
    return {
      prefix,
      value: parseFloat((absV / 1_000_000_000).toFixed(decimals ?? 2)),
      suffix: 'B',
    };
  }
  if (absV >= 1_000_000) {
    return { prefix, value: parseFloat((absV / 1_000_000).toFixed(decimals ?? 1)), suffix: 'M' };
  }
  if (absV >= 1_000) {
    return { prefix, value: parseFloat((absV / 1_000).toFixed(decimals ?? 1)), suffix: 'K' };
  }
  return { prefix, value: absV, suffix: '' };
}

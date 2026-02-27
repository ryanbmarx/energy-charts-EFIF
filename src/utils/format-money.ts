/**
 * @param v The value of money to be formatted.
 * @returns A compact string like $3.1B, $-2.5M, $450.0K. Returns '' for 0.
 */
export function formatMoney(v: number): string {
  if (v === 0) return '';
  // drop one trailing zero (.00 → .0, .10 → .1) but keep at least one decimal
  function withSuffix(n: number, suffix: string): string {
    const two = n.toFixed(2);
    return `$${two.endsWith('0') ? n.toFixed(1) : two}${suffix}`;
  }
  if (Math.abs(v) >= 1e9) return withSuffix(v / 1e9, 'B');
  if (Math.abs(v) >= 1e6) return withSuffix(v / 1e6, 'M');
  return withSuffix(v / 1e3, 'K');
}
export function formatMoney2(v: number) {
  const isNegative = v < 0;
  const absV = Math.abs(v);
  if (absV >= 1_000_000_000) {
    return `${isNegative ? '-' : ''}$${(absV / 1_000_000_000).toFixed(2)}B`;
  }
  if (absV >= 1_000_000) {
    return `${isNegative ? '-' : ''}$${(absV / 1_000_000).toFixed(1)}M`;
  }
  if (absV >= 1_000) {
    return `${isNegative ? '-' : ''}$${(absV / 1_000).toFixed(1)}K`;
  }

  return v.toLocaleString();
}

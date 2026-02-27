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

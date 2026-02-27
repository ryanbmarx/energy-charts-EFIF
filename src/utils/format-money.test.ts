import { describe, test, expect } from 'vitest';
import { formatMoney2 } from './format-money';

type Case = { label: string; input: number; expected: string };

describe('formatMoney2', () => {
  describe('billions (>= 1e9)', () => {
    const cases: Case[] = [
      { label: 'positive: 1B', input: 1_000_000_000, expected: '$1.00B' },
      { label: 'positive: 3.539B', input: 3_539_000_000, expected: '$3.54B' },
      { label: 'negative: -3.539B', input: -3_539_000_000, expected: '-$3.54B' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney2(input)).toBe(expected);
      });
    }
  });

  describe('millions (>= 1e6, < 1e9)', () => {
    const cases: Case[] = [
      { label: 'positive: 25M', input: 25_000_000, expected: '$25.0M' },
      { label: 'positive: 1M', input: 1_000_000, expected: '$1.0M' },
      { label: 'negative: -25M', input: -25_000_000, expected: '-$25.0M' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney2(input)).toBe(expected);
      });
    }
  });

  describe('thousands (>= 1e3, < 1e6)', () => {
    const cases: Case[] = [
      { label: 'positive: 1.5K', input: 1_500, expected: '$1.5K' },
      { label: 'positive: 1K', input: 1_000, expected: '$1.0K' },
      { label: 'negative: -1.5K', input: -1_500, expected: '-$1.5K' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney2(input)).toBe(expected);
      });
    }
  });

  describe('sub-thousand (falls through to toLocaleString)', () => {
    const cases: Case[] = [
      { label: 'zero', input: 0, expected: '0' },
      { label: 'positive: 500', input: 500, expected: '500' },
      { label: 'negative: -500', input: -500, expected: '-500' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney2(input)).toBe(expected);
      });
    }
  });
});

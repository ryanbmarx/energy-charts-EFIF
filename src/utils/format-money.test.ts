import { describe, test, expect } from 'vitest';
import { formatMoney, formatMoneyParts, type FormatParts } from './format-money';

type Case = { label: string; input: number; expected: string };
type PartCase = { label: string; input: number; expected: FormatParts };

describe('formatMoney', () => {
  describe('billions (>= 1e9)', () => {
    const cases: Case[] = [
      // parseFloat drops trailing zeros, so 1.00 → 1
      { label: 'positive: 1B', input: 1_000_000_000, expected: '$1B' },
      { label: 'positive: 3.54B', input: 3_539_000_000, expected: '$3.54B' },
      { label: 'negative: -3.54B', input: -3_539_000_000, expected: '-$3.54B' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney(input)).toBe(expected);
      });
    }
  });

  describe('millions (>= 1e6, < 1e9)', () => {
    const cases: Case[] = [
      // parseFloat drops trailing zeros, so 25.0 → 25
      { label: 'positive: 25M', input: 25_000_000, expected: '$25M' },
      { label: 'positive: 1M', input: 1_000_000, expected: '$1M' },
      { label: 'negative: -25M', input: -25_000_000, expected: '-$25M' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney(input)).toBe(expected);
      });
    }
  });

  describe('thousands (>= 1e3, < 1e6)', () => {
    const cases: Case[] = [
      { label: 'positive: 1.5K', input: 1_500, expected: '$1.5K' },
      // parseFloat drops trailing zeros, so 1.0 → 1
      { label: 'positive: 1K', input: 1_000, expected: '$1K' },
      { label: 'negative: -1.5K', input: -1_500, expected: '-$1.5K' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney(input)).toBe(expected);
      });
    }
  });

  describe('sub-thousand (< 1e3)', () => {
    const cases: Case[] = [
      { label: 'zero', input: 0, expected: '$0' },
      { label: 'positive: 500', input: 500, expected: '$500' },
      { label: 'negative: -500', input: -500, expected: '-$500' },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoney(input)).toBe(expected);
      });
    }
  });
});

describe('formatMoneyParts', () => {
  describe('billions (>= 1e9)', () => {
    const cases: PartCase[] = [
      {
        label: 'positive: 1B',
        input: 1_000_000_000,
        expected: { prefix: '$', value: 1, suffix: 'B' },
      },
      {
        label: 'positive: 3.54B',
        input: 3_539_000_000,
        expected: { prefix: '$', value: 3.54, suffix: 'B' },
      },
      {
        label: 'negative: -3.54B',
        input: -3_539_000_000,
        expected: { prefix: '-$', value: 3.54, suffix: 'B' },
      },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoneyParts(input)).toEqual(expected);
      });
    }
  });

  describe('millions (>= 1e6, < 1e9)', () => {
    const cases: PartCase[] = [
      {
        label: 'positive: 25M',
        input: 25_000_000,
        expected: { prefix: '$', value: 25, suffix: 'M' },
      },
      { label: 'positive: 1M', input: 1_000_000, expected: { prefix: '$', value: 1, suffix: 'M' } },
      {
        label: 'negative: -25M',
        input: -25_000_000,
        expected: { prefix: '-$', value: 25, suffix: 'M' },
      },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoneyParts(input)).toEqual(expected);
      });
    }
  });

  describe('thousands (>= 1e3, < 1e6)', () => {
    const cases: PartCase[] = [
      { label: 'positive: 1.5K', input: 1_500, expected: { prefix: '$', value: 1.5, suffix: 'K' } },
      { label: 'positive: 1K', input: 1_000, expected: { prefix: '$', value: 1, suffix: 'K' } },
      {
        label: 'negative: -1.5K',
        input: -1_500,
        expected: { prefix: '-$', value: 1.5, suffix: 'K' },
      },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoneyParts(input)).toEqual(expected);
      });
    }
  });

  describe('sub-thousand (< 1e3)', () => {
    const cases: PartCase[] = [
      { label: 'zero', input: 0, expected: { prefix: '$', value: 0, suffix: '' } },
      { label: 'positive: 500', input: 500, expected: { prefix: '$', value: 500, suffix: '' } },
      { label: 'negative: -500', input: -500, expected: { prefix: '-$', value: 500, suffix: '' } },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoneyParts(input)).toEqual(expected);
      });
    }
  });

  describe('decimals override', () => {
    const cases: PartCase[] = [
      {
        label: '3.539B at 1 decimal',
        input: 3_539_000_000,
        expected: { prefix: '$', value: 3.5, suffix: 'B' },
      },
      {
        label: '25M at 2 decimals',
        input: 25_000_000,
        expected: { prefix: '$', value: 25, suffix: 'M' },
      },
    ];

    for (const { label, input, expected } of cases) {
      test(label, () => {
        expect(formatMoneyParts(input, label.includes('1 decimal') ? 1 : 2)).toEqual(expected);
      });
    }
  });
});

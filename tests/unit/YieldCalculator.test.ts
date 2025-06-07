import { describe, it, expect } from 'vitest';

// Mock yield calculator function (to be implemented by Engineer 2)
export function calculateYield(
  amount: number, 
  period: 'flexible' | '1year' | '2year',
  compounding: boolean = false
) {
  if (amount <= 0) {
    return { error: 'Invalid amount' };
  }

  const rates = {
    flexible: 0.10,  // 10% APY
    '1year': 0.12,   // 12% APY
    '2year': 0.15    // 15% APY
  };

  const rate = rates[period];
  const years = period === 'flexible' ? 1 : period === '1year' ? 1 : 2;

  let total: number;
  if (compounding) {
    total = amount * Math.pow(1 + rate, years);
  } else {
    total = amount * (1 + rate * years);
  }

  const profit = total - amount;
  const dailyEarnings = profit / (years * 365);

  return {
    total: Math.round(total * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    apy: rate * 100,
    dailyEarnings: Math.round(dailyEarnings * 100) / 100
  };
}

describe('YieldCalculator', () => {
  describe('Basic Calculations', () => {
    it('calculates flexible period correctly', () => {
      const result = calculateYield(10000, 'flexible');
      expect(result).toEqual({
        total: 11000,
        profit: 1000,
        apy: 10,
        dailyEarnings: 2.74
      });
    });

    it('calculates 1-year period correctly', () => {
      const result = calculateYield(10000, '1year');
      expect(result).toEqual({
        total: 11200,
        profit: 1200,
        apy: 12,
        dailyEarnings: 3.29
      });
    });

    it('calculates 2-year period correctly', () => {
      const result = calculateYield(10000, '2year');
      expect(result).toEqual({
        total: 13000,
        profit: 3000,
        apy: 15,
        dailyEarnings: 4.11
      });
    });
  });

  describe('Compound Interest', () => {
    it('calculates compound interest for 1 year', () => {
      const result = calculateYield(10000, '1year', true);
      expect(result.total).toBe(11200);
      expect(result.profit).toBe(1200);
    });

    it('calculates compound interest for 2 years', () => {
      const result = calculateYield(10000, '2year', true);
      expect(result.total).toBe(13225);
      expect(result.profit).toBe(3225);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero amount', () => {
      const result = calculateYield(0, 'flexible');
      expect(result.error).toBe('Invalid amount');
    });

    it('handles negative amount', () => {
      const result = calculateYield(-100, 'flexible');
      expect(result.error).toBe('Invalid amount');
    });

    it('handles very large amounts', () => {
      const result = calculateYield(1000000, '2year', true);
      expect(result.total).toBe(1322500);
      expect(result.profit).toBe(322500);
    });

    it('handles decimal amounts', () => {
      const result = calculateYield(1234.56, 'flexible');
      expect(result.total).toBe(1358.02);
      expect(result.profit).toBe(123.46);
    });
  });

  describe('Daily Earnings', () => {
    it('calculates daily earnings correctly for flexible period', () => {
      const result = calculateYield(36500, 'flexible');
      expect(result.dailyEarnings).toBe(10); // $10 per day
    });

    it('calculates daily earnings correctly for 2-year period', () => {
      const result = calculateYield(36500, '2year');
      expect(result.dailyEarnings).toBe(15); // $15 per day over 2 years
    });
  });
});
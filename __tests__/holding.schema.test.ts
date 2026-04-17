import { describe, it, expect } from '@jest/globals';
import { AddHoldingInputSchema } from '../src/schemas/holding';

describe('AddHoldingInputSchema', () => {
  it('valid input passes', () => {
    const validInput = {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ticker).toBe('AAPL');
      expect(result.data.quantity).toBe(10);
      expect(result.data.purchasePrice).toBe(150.50);
    }
  });

  it('lowercase ticker fails', () => {
    const invalidInput = {
      ticker: 'aapl',
      quantity: 10,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('ticker');
      expect(result.error.issues[0].message).toMatch(/uppercase/i);
    }
  });

  it('ticker over 5 chars fails', () => {
    const invalidInput = {
      ticker: 'TOOLONG',
      quantity: 10,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('ticker');
      expect(result.error.issues[0].message).toMatch(/2-5/);
    }
  });

  it('zero quantity fails', () => {
    const invalidInput = {
      ticker: 'AAPL',
      quantity: 0,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('quantity');
      expect(result.error.issues[0].message).toMatch(/greater than zero/i);
    }
  });

  it('fractional quantity fails', () => {
    const invalidInput = {
      ticker: 'AAPL',
      quantity: 10.5,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('quantity');
      expect(result.error.issues[0].message).toMatch(/integer/i);
    }
  });

  it('more than 2 decimal places on price fails', () => {
    const invalidInput = {
      ticker: 'AAPL',
      quantity: 10,
      purchasePrice: 150.555,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('purchasePrice');
      expect(result.error.issues[0].message).toMatch(/2 decimal places/i);
    }
  });

  it('ticker with 2 chars passes', () => {
    const validInput = {
      ticker: 'FB',
      quantity: 5,
      purchasePrice: 200.00,
    };

    const result = AddHoldingInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('empty ticker fails', () => {
    const invalidInput = {
      ticker: '',
      quantity: 10,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('ticker');
    }
  });

  it('negative quantity fails', () => {
    const invalidInput = {
      ticker: 'AAPL',
      quantity: -5,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('quantity');
      expect(result.error.issues[0].message).toMatch(/greater than zero/i);
    }
  });

  it('negative purchase price fails', () => {
    const invalidInput = {
      ticker: 'AAPL',
      quantity: 10,
      purchasePrice: -150.50,
    };

    const result = AddHoldingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('purchasePrice');
      expect(result.error.issues[0].message).toMatch(/greater than zero/i);
    }
  });

  it('optional name field works', () => {
    const inputWithoutName = {
      ticker: 'AAPL',
      quantity: 10,
      purchasePrice: 150.50,
    };

    const result = AddHoldingInputSchema.safeParse(inputWithoutName);
    expect(result.success).toBe(true);
  });
});

import type { Holding } from '../types';

export const calculateCurrentValue = (holding: Holding): number => {
  return holding.quantity * holding.currentPrice;
};

export const calculatePL = (holding: Holding): number => {
  return (holding.currentPrice - holding.purchasePrice) * holding.quantity;
};

export const calculateTotalInvested = (holdings: Holding[]): number => {
  return holdings.reduce((sum, h) => sum + h.quantity * h.purchasePrice, 0);
};

export const calculateTotalValue = (holdings: Holding[]): number => {
  return holdings.reduce((sum, h) => sum + calculateCurrentValue(h), 0);
};

export const calculateTotalPL = (holdings: Holding[]): number => {
  return holdings.reduce((sum, h) => sum + calculatePL(h), 0);
};

export const calculatePLPercentage = (
  totalPL: number,
  totalInvested: number,
): number => {
  if (totalInvested === 0) {
    return 0;
  }

  return (totalPL / totalInvested) * 100;
};

export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const sortHoldingsByPLDesc = (holdings: Holding[]): Holding[] => {
  return [...holdings].sort((a, b) => calculatePL(b) - calculatePL(a));
};

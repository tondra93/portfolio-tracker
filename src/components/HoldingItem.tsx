import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Holding } from '../types';
import { calculateCurrentValue, calculatePL, formatCurrency } from '../utils/portfolio';

interface HoldingItemProps {
  holding: Holding;
}

export const HoldingItem = memo(({ holding }: HoldingItemProps) => {
  const currentValue = useMemo(() => calculateCurrentValue(holding), [holding]);
  const pl = useMemo(() => calculatePL(holding), [holding]);
  const isProfit = pl >= 0;
  const prefix = isProfit ? '+' : '';

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.ticker}>{holding.ticker}</Text>
        <Text style={styles.name}>{holding.name || 'Unnamed asset'}</Text>
        <Text style={styles.currentValue}>{formatCurrency(currentValue)}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.plBadge, isProfit ? styles.profitBadge : styles.lossBadge]}>
          <Text style={[styles.plText, isProfit ? styles.profit : styles.loss]}>
            {`${prefix}${formatCurrency(pl)}`}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 18,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  leftSection: {
    flex: 1,
  },
  ticker: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 16,
  },
  name: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 15,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  currentValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  plBadge: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  plText: {
    fontWeight: '700',
    fontSize: 14,
  },
  profitBadge: {
    backgroundColor: '#d7f7e7',
  },
  lossBadge: {
    backgroundColor: '#f9dfe4',
  },
  profit: {
    color: '#2f8e63',
  },
  loss: {
    color: '#9d3f4a',
  },
});

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Holding } from '../types';
import {
  calculatePLPercentage,
  calculateTotalInvested,
  calculateTotalPL,
  calculateTotalValue,
  formatCurrency,
} from '../utils/portfolio';
interface Props {
  holdings: Holding[];
}

export const SummaryCard: React.FC<Props> = ({ holdings }) => {
  const summary = useMemo(() => {
    const totalInvested = calculateTotalInvested(holdings);
    const totalValue = calculateTotalValue(holdings);
    const totalPL = calculateTotalPL(holdings);
    const totalPLPercentage = calculatePLPercentage(totalPL, totalInvested);

    return {
      totalValue,
      totalPL,
      totalPLPercentage,
    };
  }, [holdings]);

  const isProfit = summary.totalPL >= 0;
  const plPrefix = isProfit ? '+' : '';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total portfolio value</Text>
      <Text style={styles.value}>{formatCurrency(summary.totalValue)}</Text>

      <View style={styles.metricsRow}>
        <Text style={styles.metricLabel}>Total P&amp;L</Text>
        <Text style={[styles.metricValue, isProfit ? styles.profit : styles.loss]}>
          {`${plPrefix}${formatCurrency(summary.totalPL)}`}
        </Text>
      </View>
      <View style={styles.metricsRow}>
        <Text style={styles.metricLabel}>Return</Text>
        <Text style={[styles.metricValue, isProfit ? styles.profit : styles.loss]}>
          {`${plPrefix}${summary.totalPLPercentage.toFixed(2)}%`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    backgroundColor: '#0c1738',
    borderRadius: 18,
  },
  label: {
    color: '#aeb6c8',
    fontSize: 16,
    marginBottom: 6,
  },
  value: {
    color: '#fff',
    fontSize: 46,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    color: '#aeb6c8',
    fontSize: 15,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  profit: {
    color: '#95edc7',
  },
  loss: {
    color: '#f0a5ab',
  },
});

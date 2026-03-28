import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// TODO: import Holding type

interface Props {
  // TODO: replace `any[]` with Holding[]
  holdings: any[];
}

// TODO (Step 2): Implement SummaryCard.
// Show: total portfolio value, total P&L (absolute $, and % of cost basis)
// Use useMemo to avoid recomputing on every render.

export const SummaryCard: React.FC<Props> = ({ holdings }) => {
  // TODO: compute totalValue and totalPnL using useMemo

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total value</Text>
      <Text style={styles.value}>{'TODO'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
  },
  label: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});

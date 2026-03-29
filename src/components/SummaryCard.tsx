import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface Props {
  holdings: any[];
}

export const SummaryCard: React.FC<Props> = ({ holdings }) => {
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

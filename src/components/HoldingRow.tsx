import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// TODO: import Holding type

interface Props {
  // TODO: replace `any` with your Holding type
  holding: any;
}

// TODO (Step 2): Implement HoldingRow.
// Display: ticker (bold), name, current value (quantity × currentPrice)
// P&L badge: green background if profit, red if loss
// P&L = (currentPrice - purchasePrice) × quantity
// Extract the P&L calculation into a pure function above the component.

export const HoldingRow: React.FC<Props> = ({ holding }) => {
  return (
    <View style={styles.container}>
      <Text>{'TODO: render holding'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

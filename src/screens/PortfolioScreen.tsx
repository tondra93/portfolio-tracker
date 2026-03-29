import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { usePortfolio } from '../hooks/usePortfolio';
import { SummaryCard } from '../components/SummaryCard';
import { HoldingRow } from '../components/HoldingRow';
import { AddHoldingForm } from '../components/AddHoldingForm';

export const PortfolioScreen: React.FC = () => {
  const { holdings, isLoading, error, addHolding } = usePortfolio();
  const [showForm, setShowForm] = useState(false);

  // TODO (Step 2): Render a FlatList of HoldingRow items.
  // Show ActivityIndicator while loading.
  // Show an error message if error is set.
  // SummaryCard sits above the list (use ListHeaderComponent).
  // "Add Holding" button opens the Modal with AddHoldingForm.

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{'TODO: implement PortfolioScreen'}</Text>

      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <AddHoldingForm
          onSubmit={async data => {
            await addHolding(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

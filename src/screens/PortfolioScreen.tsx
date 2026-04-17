import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { usePortfolio } from '../hooks/usePortfolio';
import { SummaryCard } from '../components/SummaryCard';
import { HoldingItem } from '../components/HoldingItem';
import { AddHoldingModal } from '../components/AddHoldingModal';
import type { Holding } from '../types';
import { sortHoldingsByPLDesc } from '../utils/portfolio';

export const PortfolioScreen: React.FC = () => {
  const {
    holdings,
    isLoading,
    isSubmitting,
    loadError,
    addError,
    addHolding,
    refresh,
    clearAddError,
  } = usePortfolio();
  const [showForm, setShowForm] = useState(false);

  const sortedHoldings = useMemo(() => sortHoldingsByPLDesc(holdings), [holdings]);

  const renderItem = useCallback(
    ({ item }: { item: Holding }) => <HoldingItem holding={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Holding) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loadError ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{loadError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => void refresh()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <FlatList
        data={sortedHoldings}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={
          sortedHoldings.length === 0 ? styles.emptyContainer : styles.listContainer
        }
        ListHeaderComponent={<SummaryCard holdings={sortedHoldings} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No holdings yet</Text>
            <Text style={styles.emptySubtitle}>Add your first holding to get started.</Text>
          </View>
        }
      />

      {addError ? <Text style={styles.inlineError}>{addError}</Text> : null}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          clearAddError();
          setShowForm(true);
        }}>
        <Text style={styles.addButtonText}>Add holding</Text>
      </TouchableOpacity>

      <AddHoldingModal
        visible={showForm}
        isSubmitting={isSubmitting}
        submissionError={addError}
        onClose={() => setShowForm(false)}
        onSubmit={addHolding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    color: '#991b1b',
    marginBottom: 8,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#b91c1c',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 110,
  },
  emptyContainer: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#0c1738',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  inlineError: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 88,
    textAlign: 'center',
    color: '#991b1b',
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    paddingVertical: 8,
  },
});

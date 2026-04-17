import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { portfolioApi } from '../api/portfolio';
import type { AddHoldingInput, Holding } from '../types';

const HOLDINGS_STORAGE_KEY = '@portfolio/holdings';

const readCachedHoldings = async (): Promise<Holding[]> => {
  const cachedValue = await AsyncStorage.getItem(HOLDINGS_STORAGE_KEY);
  if (!cachedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(cachedValue) as Holding[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCachedHoldings = async (holdings: Holding[]): Promise<void> => {
  await AsyncStorage.setItem(HOLDINGS_STORAGE_KEY, JSON.stringify(holdings));
};

export function usePortfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await portfolioApi.fetchHoldings();
      setHoldings(data);
      await writeCachedHoldings(data);
    } catch (err: unknown) {
      const cachedHoldings = await readCachedHoldings();
      if (cachedHoldings.length > 0) {
        setHoldings(cachedHoldings);
      } else {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || 'Failed to load portfolio.'
          : 'Failed to load portfolio.';
        setLoadError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const addHolding = useCallback(async (input: AddHoldingInput): Promise<boolean> => {
    setIsSubmitting(true);
    setAddError(null);

    const optimisticHolding: Holding = {
      id: `temp-${Date.now()}`,
      ticker: input.ticker,
      name: input.name,
      quantity: input.quantity,
      purchasePrice: input.purchasePrice,
      // If server fills currentPrice later, local fallback keeps UI coherent.
      currentPrice: input.purchasePrice,
    };

    const previousHoldings = [...holdings];
    const nextOptimistic = [optimisticHolding, ...previousHoldings];
    setHoldings(nextOptimistic);
    await writeCachedHoldings(nextOptimistic);

    try {
      const savedHolding = await portfolioApi.addHolding(input);
      const updatedHoldings = nextOptimistic.map(item =>
        item.id === optimisticHolding.id ? savedHolding : item,
      );
      setHoldings(updatedHoldings);
      await writeCachedHoldings(updatedHoldings);

      // Clear load error if POST succeeds (connection is working now)
      setLoadError(null);
      return true;
    } catch (err: unknown) {
      // Offline fallback: keep the optimistic item as a locally saved holding.
      const localSavedHolding: Holding = {
        ...optimisticHolding,
        id: `local-${Date.now()}`,
      };
      const locallyUpdated = [localSavedHolding, ...previousHoldings];
      setHoldings(locallyUpdated);
      await writeCachedHoldings(locallyUpdated);

      // Keep UX successful while signaling that backend sync failed.
      setAddError(
        'Saved locally. Connect to API to sync with server.',
      );
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [holdings]);

  return {
    holdings,
    isLoading,
    isSubmitting,
    loadError,
    addError,
    addHolding,
    refresh: fetchData,
    clearAddError: () => setAddError(null),
  };
}

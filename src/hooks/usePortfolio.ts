import { useState, useEffect, useCallback } from 'react';

export function usePortfolio() {
  // Replace these stubs
  const [holdings, setHoldings] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {}, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addHolding = async (_input: unknown) => {};

  return { holdings, isLoading, error, addHolding, refresh: fetchData };
}

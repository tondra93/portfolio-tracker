import { useState, useEffect, useCallback } from 'react';
// TODO: import portfolioApi, Holding, AddHoldingInput

// TODO (Step 1): Implement this hook.
//
// It should expose:
//   holdings     – Holding[]
//   isLoading    – boolean
//   error        – string | null
//   addHolding   – (input: AddHoldingInput) => Promise<void>
//               (optimistically updates state, rolls back on failure)
//   refresh      – () => void
//
// Starter shell:
export function usePortfolio() {
  // Replace these stubs
  const [holdings, setHoldings] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // TODO
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addHolding = async (_input: unknown) => {
    // TODO (Step 3): optimistic update + rollback on error
  };

  return { holdings, isLoading, error, addHolding, refresh: fetchData };
}

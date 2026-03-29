import axios from 'axios';

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator
const BASE_URL = 'http://10.0.2.2:3001';

export const portfolioApi = {
  fetchHoldings: async (): Promise<unknown[]> => {
    // replace unknown[] with Holding[]
    throw new Error('Not implemented');
  },

  addHolding: async (_input: unknown): Promise<unknown> => {
    // replace unknown types
    throw new Error('Not implemented');
  },
};

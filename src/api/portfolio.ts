import axios from 'axios';
// TODO: import your Holding and AddHoldingInput types from schemas

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator
const BASE_URL = 'http://10.0.2.2:3001';

export const portfolioApi = {
  // TODO (Step 1): Implement fetchHoldings.
  // GET /api/portfolio → returns Holding[]
  // Validate the response against HoldingSchema using .parse() or .safeParse()
  fetchHoldings: async (): Promise<unknown[]> => {
    // replace unknown[] with Holding[]
    throw new Error('Not implemented');
  },

  // TODO (Step 3): Implement addHolding.
  // POST /api/portfolio with AddHoldingInput body → returns the created Holding
  addHolding: async (_input: unknown): Promise<unknown> => {
    // replace unknown types
    throw new Error('Not implemented');
  },
};

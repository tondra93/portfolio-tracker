// TODO (Extension task): Write unit tests for your Zod schemas.
//
// Suggested cases for HoldingSchema:
//   - valid full object passes
//   - missing required field fails
//
// Suggested cases for AddHoldingInputSchema:
//   - ticker "AAPL" passes
//   - ticker "aapl" fails (must be uppercase)
//   - ticker "TOOLONG" fails (>5 chars)
//   - quantity 0 fails (must be positive)
//   - quantity 1.5 fails (must be integer)
//   - purchasePrice 10.999 fails (max 2 decimal places)
//   - purchasePrice -5 fails (must be positive)

import { describe, it, expect } from '@jest/globals';
// TODO: import your schemas
// import { HoldingSchema, AddHoldingInputSchema } from '../src/schemas/holding';

describe('AddHoldingInputSchema', () => {
  it.todo('valid input passes');
  it.todo('lowercase ticker fails');
  it.todo('ticker over 5 chars fails');
  it.todo('zero quantity fails');
  it.todo('fractional quantity fails');
  it.todo('more than 2 decimal places on price fails');
});

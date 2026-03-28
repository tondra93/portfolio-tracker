import { z } from 'zod';

// TODO (Step 1): Define the HoldingSchema using Zod.
// Fields: id (string), ticker (string), name (string),
//         quantity (number), purchasePrice (number), currentPrice (number)
//
// export const HoldingSchema = z.object({ ... });
//
// TODO: Derive the TypeScript type from the schema.
// export type Holding = z.infer<typeof HoldingSchema>;

// TODO (Step 1): Define AddHoldingInputSchema for the form.
// Rules:
//   - ticker: 2–5 uppercase letters only
//   - name: optional string
//   - quantity: positive integer
//   - purchasePrice: positive number, max 2 decimal places
//
// export const AddHoldingInputSchema = z.object({ ... });
// export type AddHoldingInput = z.infer<typeof AddHoldingInputSchema>;

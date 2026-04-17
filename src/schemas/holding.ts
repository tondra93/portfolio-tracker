import { z } from 'zod';

export const HoldingSchema = z.object({
  id: z.string(),
  ticker: z.string().min(1),
  name: z.string().optional(),
  quantity: z.number().positive(),
  purchasePrice: z.number().positive(),
  currentPrice: z.number().nonnegative(),
});

export const AddHoldingInputSchema = z.object({
  ticker: z
    .string()
    .trim()
    .min(1, 'Ticker is required')
    .regex(/^[A-Z]{2,5}$/, 'Ticker must be 2-5 uppercase letters'),
  name: z
    .string()
    .trim()
    .transform(val => val === '' ? undefined : val)
    .optional(),
  quantity: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number({ message: 'Quantity is required' }))
    .pipe(z.number().int('Quantity must be an integer').positive('Quantity must be greater than zero')),
  purchasePrice: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number({ message: 'Purchase price is required' }))
    .pipe(
      z.number()
        .positive('Purchase price must be greater than zero')
        .refine(value => Number.isInteger(value * 100), {
          message: 'Purchase price can have at most 2 decimal places',
        })
    ),
});

export type Holding = z.infer<typeof HoldingSchema>;
export type AddHoldingInput = z.infer<typeof AddHoldingInputSchema>;
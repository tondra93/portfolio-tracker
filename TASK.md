# My Portfolio — Interview Task

Welcome! This is a bare React Native (TypeScript) starter. You have **~85 minutes**
to build the features described below. Ask questions at any time.

## Setup

1. Start the mock API server:
   ```bash
   cd mock-server && yarn start
   ```
2. In a separate terminal, run the app:
   ```bash
   # Android
   npx react-native run-android

   # iOS
   npx react-native run-ios
   ```
   The API runs on `http://localhost:3001` (iOS) / `http://10.0.2.2:3001` (Android).

## Your task

Build a **"My Portfolio"** screen with the following features:

### 1. Fetch and display holdings
- Call `GET /api/portfolio` on mount
- Each holding has: `id`, `ticker`, `name`, `quantity`, `purchasePrice`, `currentPrice`
- Show a scrollable list; each row displays:
  - Ticker (bold) and company name
  - Current value: `quantity × currentPrice` (formatted as currency)
  - P&L badge: green if profit, red if loss
    - P&L = `(currentPrice − purchasePrice) × quantity`

### 2. Summary card
- Display above the list: total portfolio value and total P&L ($ and %)

### 3. Add Holding form
- "Add holding" button opens a modal form
- Fields: `ticker`, `name` (optional), `quantity`, `purchasePrice`
- Validate with **Zod** (rules below), wire to form with **react-hook-form**
- On valid submit: POST to `/api/portfolio`, update the list optimistically

### Zod validation rules
| Field | Rule |
|---|---|
| `ticker` | 2–5 uppercase letters only |
| `quantity` | Positive integer |
| `purchasePrice` | Positive number, max 2 decimal places |

### Non-negotiables
- TypeScript throughout — no `any`
- Visible loading and error states
- `FlatList` for the holdings list (not `ScrollView`)

## Extension tasks (if you finish early)
1. Sort holdings by P&L descending using `useMemo`
2. Write unit tests for your Zod schema in `__tests__/holding.schema.test.ts`
3. What would you change if this list had 10,000 items?

## What's already set up
- `axios`, `zod`, `react-hook-form`, `@hookform/resolvers` installed
- Navigation shell in `src/navigation/AppNavigator.tsx`
- Component stubs with TODO comments in `src/components/` and `src/screens/`
- Schema stubs in `src/schemas/holding.ts`
- Hook stub in `src/hooks/usePortfolio.ts`
- Mock API in `mock-server/` — read it if you want to understand the data shape

Good luck!

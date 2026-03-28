import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface Holding {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

const holdings: Holding[] = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    purchasePrice: 145.0,
    currentPrice: 178.5,
  },
  {
    id: '2',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 5,
    purchasePrice: 250.0,
    currentPrice: 198.3,
  },
  {
    id: '3',
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    quantity: 8,
    purchasePrice: 310.0,
    currentPrice: 378.9,
  },
  {
    id: '4',
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    quantity: 3,
    purchasePrice: 420.0,
    currentPrice: 875.4,
  },
];

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

app.get('/api/portfolio', async (_req: Request, res: Response) => {
  await delay(600);
  res.json(holdings);
});

app.post('/api/portfolio', async (req: Request, res: Response) => {
  await delay(400);
  const body = req.body as Omit<Holding, 'id' | 'currentPrice'>;

  // Basic server-side validation (candidate's Zod schema should match this)
  if (!body.ticker || !body.quantity || !body.purchasePrice) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newHolding: Holding = {
    id: String(Date.now()),
    ticker: body.ticker.toUpperCase(),
    name: body.name ?? body.ticker,
    quantity: Number(body.quantity),
    purchasePrice: Number(body.purchasePrice),
    // Simulate a "market price" close to purchase price
    currentPrice: Number(body.purchasePrice) * (0.9 + Math.random() * 0.25),
  };

  holdings.push(newHolding);
  res.status(201).json(newHolding);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});

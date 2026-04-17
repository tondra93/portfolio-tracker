import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

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

const defaultHoldings: Holding[] = [
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

const dataDirPath = path.resolve(__dirname, '../data');
const holdingsFilePath = path.resolve(dataDirPath, 'holdings.json');

const ensureDataFile = (): void => {
  if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath, { recursive: true });
  }

  if (!fs.existsSync(holdingsFilePath)) {
    fs.writeFileSync(holdingsFilePath, JSON.stringify(defaultHoldings, null, 2), 'utf-8');
  }
};

const loadHoldings = (): Holding[] => {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(holdingsFilePath, 'utf-8');
    const parsed = JSON.parse(raw) as Holding[];
    return Array.isArray(parsed) ? parsed : [...defaultHoldings];
  } catch {
    return [...defaultHoldings];
  }
};

const saveHoldings = (holdings: Holding[]): void => {
  ensureDataFile();
  fs.writeFileSync(holdingsFilePath, JSON.stringify(holdings, null, 2), 'utf-8');
};

let holdings: Holding[] = loadHoldings();

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
  const ticker = body.ticker?.trim().toUpperCase();
  const quantity = Number(body.quantity);
  const purchasePrice = Number(body.purchasePrice);

  if (!ticker || !Number.isInteger(quantity) || quantity <= 0 || purchasePrice <= 0) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newHolding: Holding = {
    id: String(Date.now()),
    ticker,
    name: body.name?.trim() || ticker,
    quantity,
    purchasePrice,
    // Simulate a "market price" close to purchase price
    currentPrice: purchasePrice * (0.9 + Math.random() * 0.25),
  };

  holdings.push(newHolding);
  saveHoldings(holdings);
  res.status(201).json(newHolding);
});

const PORT = 3001;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Start server on all network interfaces
const server = app.listen(PORT, HOST, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
  console.log(`Also accessible via your local network IP on port ${PORT}`);
  console.log(`For Android emulator, use: http://10.0.2.2:${PORT}`);
});

export { server };

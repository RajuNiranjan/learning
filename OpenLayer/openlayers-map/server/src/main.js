import express from 'express';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Add rate limiting to prevent overwhelming the OpenStreetMap servers
const RATE_LIMIT_MS = 250;
let lastRequestTime = Date.now();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadTile(z, x, y) {
  const tilePath = path.join(__dirname, 'tiles', String(z), String(x), `${String(y)}.png`);

  if (fs.existsSync(tilePath)) {
    return { status: 'cached', path: tilePath };
  }

  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await delay(RATE_LIMIT_MS - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();

  const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  
  try {
    const response = await fetch(tileUrl);
    if (!response.ok) throw new Error('Failed to fetch tile');

    const buffer = await response.buffer();
    fs.mkdirSync(path.dirname(tilePath), { recursive: true });
    fs.writeFileSync(tilePath, buffer);

    return { status: 'downloaded', path: tilePath };
  } catch (err) {
    throw new Error(`Failed to download tile ${z}/${x}/${y}: ${err.message}`);
  }
}

// Regular tile display endpoint
app.get('/tiles/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;
  const tilePath = path.join(__dirname, 'tiles', String(z), String(x), `${String(y)}.png`);

  if (fs.existsSync(tilePath)) {
    return res.sendFile(tilePath);
  }

  try {
    const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
    const response = await fetch(tileUrl);
    if (!response.ok) throw new Error('Failed to fetch tile');

    const buffer = await response.buffer();
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Tile fetch error:', err);
    res.status(500).send('Tile fetch failed');
  }
});

// Batch download endpoint
app.post('/tiles/batch', async (req, res) => {
  const { tiles } = req.body;
  
  if (!Array.isArray(tiles)) {
    return res.status(400).send('Invalid request format');
  }

  const results = {
    success: [],
    failed: []
  };

  for (const { z, x, y } of tiles) {
    try {
      const result = await downloadTile(z, x, y);
      results.success.push({ z, x, y, status: result.status });
    } catch (err) {
      results.failed.push({ z, x, y, error: err.message });
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`✅ Tile server running at http://localhost:${PORT}`);
});

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

// Add rate limiting to prevent overwhelming the OpenStreetMap servers
const RATE_LIMIT_MS = 250; // 250ms between requests
let lastRequestTime = Date.now();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadTile(z, x, y) {
  // Convert numbers to strings for path creation
  const tilePath = path.join(__dirname, 'tiles', String(z), String(x), `${String(y)}.png`);

  // Return existing tile if available
  if (fs.existsSync(tilePath)) {
    return { status: 'cached', path: tilePath };
  }

  // Rate limiting
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

    // Save tile to disk
    fs.mkdirSync(path.dirname(tilePath), { recursive: true });
    fs.writeFileSync(tilePath, buffer);

    return { status: 'downloaded', path: tilePath };
  } catch (err) {
    throw new Error(`Failed to download tile ${z}/${x}/${y}: ${err.message}`);
  }
}

// Single tile endpoint
app.get('/tiles/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;
  
  try {
    const result = await downloadTile(z, x, y);
    res.sendFile(result.path);
  } catch (err) {
    console.error('Tile fetch error:', err);
    res.status(500).send('Tile fetch failed');
  }
});

// Batch download endpoint
app.post('/tiles/batch', express.json(), async (req, res) => {
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

// Get tile status endpoint
app.get('/tiles/status/:z/:x/:y', (req, res) => {
  const { z, x, y } = req.params;
  const tilePath = path.join(__dirname, 'tiles', z, x, `${y}.png`);
  
  if (fs.existsSync(tilePath)) {
    res.json({ status: 'exists', path: tilePath });
  } else {
    res.json({ status: 'not_found' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Tile server running at http://localhost:${PORT}`);
});

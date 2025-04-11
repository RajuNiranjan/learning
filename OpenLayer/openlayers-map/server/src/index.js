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

app.get('/tiles/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;
  const tilePath = path.join(__dirname, 'tiles', z, x, `${y}.png`);

  if (fs.existsSync(tilePath)) {
    return res.sendFile(tilePath);
  }

  const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  try {
    const response = await fetch(tileUrl);
    if (!response.ok) throw new Error('Failed to fetch tile');

    const buffer = await response.buffer();

    // Save tile to disk
    fs.mkdirSync(path.dirname(tilePath), { recursive: true });
    fs.writeFileSync(tilePath, buffer);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Tile fetch error:', err);
    res.status(500).send('Tile fetch failed');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Tile server running at http://localhost:${PORT}`);
});

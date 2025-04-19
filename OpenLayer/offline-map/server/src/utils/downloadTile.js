import fetch from "node-fetch";
import fs from "fs";

export async function downloadTile(z, x, y, outputPath) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch tile: ${url}`);

  const buffer = await response.buffer();
  fs.writeFileSync(outputPath, buffer);
}

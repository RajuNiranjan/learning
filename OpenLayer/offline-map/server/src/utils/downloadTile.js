import fetch from "node-fetch";
import fs from "fs";
import path from "path";

// Add a simple semaphore for controlling concurrent downloads
class Semaphore {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.queue = [];
  }

  async acquire() {
    if (this.current < this.max) {
      this.current++;
      return;
    }
    await new Promise((resolve) => this.queue.push(resolve));
  }

  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.current--;
    }
  }
}

const downloadSemaphore = new Semaphore(10); // Increased from 5 to 10 concurrent downloads
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const cancelFlags = {}; // key: folderName, value: true/false

export async function downloadTile(
  z,
  x,
  y,
  outputPath,
  mapSource = "OSM",
  retries = 3
) {
  const url =
    mapSource === "Google Map"
      ? `https://mt1.google.com/vt/lyrs=s&x=${x}&y=${y}&z=${z}` // Google Maps tile URL
      : `https://tile.openstreetmap.org/${z}/${x}/${y}.png`; // OSM tile URL

  // Ensure the output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await downloadSemaphore.acquire();

  try {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "OfflineMapTool/1.0",
            Accept: "image/png,image/*",
            // Add a referer for Google Maps tiles
            ...(mapSource === "Google Map" && { Referer: "http://localhost" }),
          },
          timeout: 3000, // Reduced timeout to 3 seconds
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer(); // Use arrayBuffer() instead of buffer()
        const uint8Array = new Uint8Array(buffer);

        // Verify the buffer is actually an image
        if (uint8Array.length < 100) {
          throw new Error("Invalid tile data received");
        }

        fs.writeFileSync(outputPath, uint8Array);
        return;
      } catch (error) {
        console.error(
          `Attempt ${attempt} failed for tile z:${z} x:${x} y:${y} - ${error.message}`
        );

        if (attempt === retries) {
          throw new Error(
            `Failed to download tile after ${retries} attempts: ${error.message}`
          );
        }
        // Exponential backoff with shorter delays
        await delay(500 * Math.pow(1.5, attempt - 1));
      }
    }
  } finally {
    downloadSemaphore.release();
  }
}

import fetch from "node-fetch";
import fs from "fs";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "OfflineMapTool/1.0",
          Accept: "image/png,image/*",
          // Add a referer for Google Maps tiles
          ...(mapSource === "Google Map" && { Referer: "http://localhost" }),
        },
        timeout: 5000,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.buffer();

      const dir = outputPath.substring(0, outputPath.lastIndexOf("/"));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, buffer);
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
      await delay(1000 * 2 ** (attempt - 1));
    }
  }
}

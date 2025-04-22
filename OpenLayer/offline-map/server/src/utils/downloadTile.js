import fetch from "node-fetch";
import fs from "fs";

export async function downloadTile(z, x, y, outputPath) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

  try {
    const response = await fetch(url, {
      headers: {
        // Add User-Agent header to identify your application
        "User-Agent": "OfflineMapTool/1.0",
        // Add Accept header for image types
        Accept: "image/png,image/*",
      },
      // Add timeout to prevent hanging requests
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.buffer();

    // Ensure the directory exists before writing
    const dir = outputPath.substring(0, outputPath.lastIndexOf("/"));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);
  } catch (error) {
    console.error(`Failed to download tile at z:${z} x:${x} y:${y}`, error);
    throw new Error(`Failed to download tile: ${error.message}`);
  }
}

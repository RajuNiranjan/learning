import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path";
import fs from "fs";
import { downloadTile } from "../utils/downloadTile.js";

export const downloadTiles = async (req, res) => {
  const {
    folderName,
    minLon,
    minLat,
    maxLon,
    maxLat,
    extent,
    center,
    projection,
  } = req.body;
  const MIN_ZOOM = 10;
  const MAX_ZOOM = 19;
  const zoomLevel = req.params.zoomLevel;

  try {
    const thumbnailTile = lonLatToTile(center[0], center[1], zoomLevel);

    const thumbnailPath = path.join(
      "tiles",
      folderName,
      `${folderName}_thumbnail.png`
    );

    ensureDirSync(fs, path.join("tiles", folderName));

    await downloadTile(
      zoomLevel,
      thumbnailTile.x,
      thumbnailTile.y,
      thumbnailPath
    );

    for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
      const topLeftTile = lonLatToTile(minLon, maxLat, zoom);
      const bottomRightTile = lonLatToTile(maxLon, minLat, zoom);

      for (let x = topLeftTile.x; x <= bottomRightTile.x; x++) {
        for (let y = topLeftTile.y; y <= bottomRightTile.y; y++) {
          const dirPath = path.join(
            "tiles",
            folderName,
            zoom.toString(),
            x.toString()
          );
          ensureDirSync(fs, dirPath);

          const outputPath = path.join(dirPath, `${y}.png`);
          if (!fs.existsSync(outputPath)) {
            console.log(`Downloading tile ${zoom}/${x}/${y}`);
            await downloadTile(zoom, x, y, outputPath);
            console.log(`Tile ${zoom}/${x}/${y} downloaded successfully`);
          }
        }
      }
    }

    const thumbnailBuffer = fs.readFileSync(thumbnailPath);
    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    const dbData = {
      name: folderName,
      extent,
      center,
      projection,
      thumbnailBase64,
      zoom: [MIN_ZOOM, MAX_ZOOM],
    };

    console.log(dbData);

    res.status(200).json({ message: "Tiles downloaded successfully", dbData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

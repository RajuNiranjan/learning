import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path";
import fs from "fs";
import { downloadTile } from "../utils/downloadTile.js";
import {
  createTileService,
  deleteTileService,
  getTileByIdService,
  getTileService,
} from "../models/tile.model.js";
import os from "os";
import archiver from "archiver";

/**
 * Download the tiles from the GCS bucket and save it to the local machine
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const downloadTilesGCS = async (req, res) => {
  const {
    folderName,
    minLon,
    minLat,
    maxLon,
    maxLat,
    extent,
    center,
    projection,
    mapSource,
  } = req.body;
  const MIN_ZOOM = 10;
  const MAX_ZOOM = 18;
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
      thumbnailPath,
      mapSource
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
            await downloadTile(zoom, x, y, outputPath, mapSource);
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
      thumbnailBase64Img: thumbnailBase64,
      mapSource,
      zoom: [MIN_ZOOM, MAX_ZOOM],
    };

    const createdTile = await createTileService(dbData);

    console.log("===== Tiles downloaded successfully =====");
    res.status(200).json({
      message: "Tiles downloaded successfully",
      createdTile,
    });
  } catch (error) {
    console.log(error);
    const folderPath = path.join("tiles", folderName);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`Removed folder: ${folderPath}`);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Download the tiles from the local machine and save it to the local machine as zip file
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const downloadTilesDisk = async (req, res) => {
  const {
    folderName,
    minLon,
    minLat,
    maxLon,
    maxLat,
    extent,
    center,
    projection,
    mapSource,
  } = req.body;
  const MIN_ZOOM = 10;
  const MAX_ZOOM = 18;
  const zoomLevel = req.params.zoomLevel;

  try {
    const downloadsPath = path.join(os.homedir(), "Downloads");
    const baseFolderPath = path.join(downloadsPath, folderName);
    const tilesFolderPath = path.join(baseFolderPath, `${folderName}_tiles`);
    const jsonFilePath = path.join(baseFolderPath, `${folderName}.json`);

    ensureDirSync(fs, tilesFolderPath);

    const jsonData = {
      folderName,
      minLon,
      minLat,
      maxLon,
      maxLat,
      extent,
      center,
      projection,
      mapSource,
      zoomLevel,
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
      const topLeftTile = lonLatToTile(minLon, maxLat, zoom);
      const bottomRightTile = lonLatToTile(maxLon, minLat, zoom);

      for (let x = topLeftTile.x; x <= bottomRightTile.x; x++) {
        for (let y = topLeftTile.y; y <= bottomRightTile.y; y++) {
          const dirPath = path.join(
            tilesFolderPath,
            zoom.toString(),
            x.toString()
          );
          ensureDirSync(fs, dirPath);

          const outputPath = path.join(dirPath, `${y}.png`);
          if (!fs.existsSync(outputPath)) {
            console.log(`Downloading tile ${zoom}/${x}/${y}`);
            await downloadTile(zoom, x, y, outputPath, mapSource);
            console.log(`Tile ${zoom}/${x}/${y} downloaded successfully`);
          }
        }
      }
    }

    const zipFilePath = path.join(downloadsPath, `${folderName}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res.download(zipFilePath, `${folderName}.zip`, (err) => {
        if (err) {
          console.log("Error sending file:", err);
          res.status(500).json({ error: "Failed to send zip file" });
        }
        fs.rmSync(baseFolderPath, { recursive: true, force: true });
      });
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(baseFolderPath, false);
    archive.finalize();
    console.log("===== Zip file created successfully =====");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const cancelDownload = async (req, res) => {
  try {
    const { folderName } = req.body;
    const tilesFolderPath = path.join("tiles", folderName);

    if (fs.existsSync(tilesFolderPath)) {
      fs.rmSync(tilesFolderPath, { recursive: true, force: true });
      res.status(200).json({ message: "Download canceled and folder removed" });
    } else {
      res.status(404).json({ error: "Folder not found" });
    }
    res.status(200).json({ message: "Download canceled and folder removed" });
    console.log("==== Download Canceled ====");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
/**
 * Get all the tiles from the database
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const getAllTiles = async (req, res) => {
  try {
    const tiles = await getTileService();
    res.status(200).json({ tiles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get the tile by the id from the database
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const getTileById = async (req, res) => {
  try {
    const tileId = req.params.id;

    const tile = await getTileByIdService(tileId);

    if (!tile) {
      return res.status(404).json({ error: "Tile not found" });
    }

    const tileFolderPath = path.join("tiles", tile.name);
    const tileFiles = {};

    for (let zoom = tile.zoom[0]; zoom <= tile.zoom[1]; zoom++) {
      const zoomPath = path.join(tileFolderPath, zoom.toString());
      if (fs.existsSync(zoomPath)) {
        tileFiles[zoom] = {};

        const xDirs = fs
          .readdirSync(zoomPath)
          .filter((file) => !file.startsWith("."));

        for (const x of xDirs) {
          const xPath = path.join(zoomPath, x);
          if (fs.statSync(xPath).isDirectory()) {
            tileFiles[zoom][x] = {};

            const yFiles = fs
              .readdirSync(xPath)
              .filter((file) => file.endsWith(".png"))
              .map((file) => file.replace(".png", ""));

            for (const y of yFiles) {
              const tilePath = path.join(xPath, `${y}.png`);
              const tileBuffer = fs.readFileSync(tilePath);
              const tileBase64 = tileBuffer.toString("base64");
              tileFiles[zoom][x][y] = tileBase64;
            }
          }
        }
      }
    }

    res.status(200).json({
      tile,
      tileFiles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete the tile by the id from the database
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const deleteTile = async (req, res) => {
  try {
    const tileId = req.params.id;
    const tile = await deleteTileService(tileId);
    if (!tile) {
      return res.status(404).json({ error: "Tile not found" });
    }
    const tileFolderPath = path.join("tiles", tile.name);
    if (fs.existsSync(tileFolderPath)) {
      fs.rmSync(tileFolderPath, { recursive: true, force: true });
    }
    res.status(200).json({
      message: "Tile and its folder deleted successfully",
      tile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path";
import fs from "fs";
import { downloadTile } from "../utils/downloadTile.js";
import {
  createTileService,
  deleteTileService,
  getTileByIdService,
  getTileService,
  updateTileService,
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
  const socketId = req.body.socketId;

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

    let totalTiles = 0;
    let downloadedTiles = 0;

    for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
      const topLeftTile = lonLatToTile(minLon, maxLat, zoom);
      const bottomRightTile = lonLatToTile(maxLon, minLat, zoom);
      totalTiles +=
        (bottomRightTile.x - topLeftTile.x + 1) *
        (bottomRightTile.y - topLeftTile.y + 1);
    }

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
            downloadedTiles++;
            if (req.app.get("io") && socketId) {
              req.app
                .get("io")
                .to(socketId)
                .emit("downloadProgress", {
                  progress: Math.round((downloadedTiles / totalTiles) * 100),
                  downloadedTiles,
                  totalTiles,
                });
            }
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
  const socketId = req.body.socketId;

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

    let totalTiles = 0;
    let downloadedTiles = 0;

    for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
      const topLeftTile = lonLatToTile(minLon, maxLat, zoom);
      const bottomRightTile = lonLatToTile(maxLon, minLat, zoom);
      totalTiles +=
        (bottomRightTile.x - topLeftTile.x + 1) *
        (bottomRightTile.y - topLeftTile.y + 1);
    }

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
            downloadedTiles++;
            if (req.app.get("io") && socketId) {
              req.app
                .get("io")
                .to(socketId)
                .emit("downloadProgress", {
                  progress: Math.round((downloadedTiles / totalTiles) * 100),
                  downloadedTiles,
                  totalTiles,
                });
            }
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

/**
 * Cancel the download of the tiles
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const cancelDownload = async (req, res) => {
  try {
    const { folderName } = req.body;
    const tilesFolderPath = path.join("tiles", folderName);

    if (!folderName) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    if (fs.existsSync(tilesFolderPath)) {
      fs.rmSync(tilesFolderPath, { recursive: true, force: true });
      console.log("==== Download Canceled ====");
      return res
        .status(200)
        .json({ message: "Download canceled and folder removed" });
    } else {
      return res.status(404).json({ error: "Folder not found" });
    }
  } catch (error) {
    console.error("Error in cancelDownload:", error);
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
    res.status(200).json({ tile });
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

/**
 * Serve a single tile image as PNG
 * @param {Object} req - The request object containing parameters and body data
 * @param {Object} res - The response object used to send back the desired HTTP response
 */
export const getTileImage = async (req, res) => {
  try {
    const { tileId, z, x, y } = req.params;
    const tile = await getTileByIdService(tileId);
    if (!tile) {
      return res.status(404).send("Tile not found");
    }
    const tilePath = path.join("tiles", tile.name, z, x, `${y}.png`);
    if (!fs.existsSync(tilePath)) {
      return res.status(404).send("Tile image not found");
    }
    res.setHeader("Content-Type", "image/png");
    fs.createReadStream(tilePath).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const updateTile = async (req, res) => {
  try {
    const { tileId } = req.params;
    const { folderName } = req.body;

    const tile = await getTileByIdService(tileId);
    if (!tile) {
      return res.status(404).json({ error: "Tile not found" });
    }

    const oldFolderPath = path.join("tiles", tile.name);
    const newFolderPath = path.join("tiles", folderName);

    if (fs.existsSync(oldFolderPath)) {
      fs.renameSync(oldFolderPath, newFolderPath);
    }

    const updatedTile = await updateTileService(tileId, { name: folderName });

    res.status(200).json({
      message: "Tile updated successfully and folder name changed",
      tile: updatedTile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

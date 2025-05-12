import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path";
import fs from "fs";
import {
  downloadTile,
  cancelFlags,
  genBase64Image,
} from "../utils/downloadTile.js";
import {
  createTileService,
  deleteTileService,
  getTileByIdService,
  getTileService,
  updateTileService,
} from "../models/tile.model.js";
import os from "os";
import archiver from "archiver";
import { io } from "../utils/socket.js";
import AdmZip from "adm-zip";

/**
 * Downloads tiles from Google Cloud Storage/ Openlayers based on the provided parameters.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.folderName - The name of the folder to store tiles.
 * @param {number} req.body.minLon - The minimum longitude of the area.
 * @param {number} req.body.minLat - The minimum latitude of the area.
 * @param {number} req.body.maxLon - The maximum longitude of the area.
 * @param {number} req.body.maxLat - The maximum latitude of the area.
 * @param {Array<number>} req.body.extent - The extent of the area.
 * @param {Array<number>} req.body.center - The center coordinates of the area.
 * @param {string} req.body.projection - The projection type.
 * @param {string} req.body.mapSource - The source of the map tiles.
 * @param {string} req.body.socketId - The socket ID for real-time updates.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
    let lastProgressUpdate = 0;
    const PROGRESS_UPDATE_INTERVAL = 1000; // Update progress every second
    const progressHistory = [];
    const HISTORY_SIZE = 5; // Keep track of last 5 progress values

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

            const currentTime = Date.now();
            if (currentTime - lastProgressUpdate >= PROGRESS_UPDATE_INTERVAL) {
              const currentProgress = Math.round(
                (downloadedTiles / totalTiles) * 100
              );
              progressHistory.push(currentProgress);

              if (progressHistory.length > HISTORY_SIZE) {
                progressHistory.shift();
              }

              // Calculate moving average
              const averageProgress = Math.round(
                progressHistory.reduce((a, b) => a + b, 0) /
                  progressHistory.length
              );

              if (socketId) {
                io.to(socketId).emit("downloadProgress", {
                  progress: averageProgress,
                  downloadedTiles,
                  totalTiles,
                });
              }

              lastProgressUpdate = currentTime;
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
 * Downloads tiles from the local disk based on the provided parameters.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.folderName - The name of the folder to store tiles.
 * @param {number} req.body.minLon - The minimum longitude of the area.
 * @param {number} req.body.minLat - The minimum latitude of the area.
 * @param {number} req.body.maxLon - The maximum longitude of the area.
 * @param {number} req.body.maxLat - The maximum latitude of the area.
 * @param {Array<number>} req.body.extent - The extent of the area.
 * @param {Array<number>} req.body.center - The center coordinates of the area.
 * @param {string} req.body.projection - The projection type.
 * @param {string} req.body.mapSource - The source of the map tiles.
 * @param {string} req.body.socketId - The socket ID for real-time updates.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
    const thumbnailTile = lonLatToTile(center[0], center[1], zoomLevel);
    const thumbnailBase64 = await genBase64Image(
      thumbnailTile,
      zoomLevel,
      mapSource
    );

    const downloadsPath = path.join(os.homedir(), "Downloads");
    const baseFolderPath = path.join(downloadsPath, folderName);
    const tilesFolderPath = path.join(baseFolderPath, `${folderName}`);
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
      zoomLevel: [MIN_ZOOM, MAX_ZOOM],
      thubmnailbase64img: thumbnailBase64,
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    let totalTiles = 0;
    let downloadedTiles = 0;
    let lastProgressUpdate = 0;
    const PROGRESS_UPDATE_INTERVAL = 1000; // Update progress every second
    const progressHistory = [];
    const HISTORY_SIZE = 5; // Keep track of last 5 progress values

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

            const currentTime = Date.now();
            if (currentTime - lastProgressUpdate >= PROGRESS_UPDATE_INTERVAL) {
              const currentProgress = Math.round(
                (downloadedTiles / totalTiles) * 100
              );
              progressHistory.push(currentProgress);

              if (progressHistory.length > HISTORY_SIZE) {
                progressHistory.shift();
              }

              // Calculate moving average
              const averageProgress = Math.round(
                progressHistory.reduce((a, b) => a + b, 0) /
                  progressHistory.length
              );

              if (socketId) {
                io.to(socketId).emit("downloadProgress", {
                  progress: averageProgress,
                  downloadedTiles,
                  totalTiles,
                });
              }

              lastProgressUpdate = currentTime;
            }
          }
        }
      }
    }

    // --- CHANGED: Use a temp directory for the zip file ---
    const tmpDir = os.tmpdir();
    const zipFilePath = path.join(tmpDir, `${folderName}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      // Stream the zip file to the client
      res.download(zipFilePath, `${folderName}.zip`, (err) => {
        // Remove temp zip and base folder after sending
        fs.rmSync(zipFilePath, { force: true });
        fs.rmSync(baseFolderPath, { recursive: true, force: true });
        if (err) {
          console.log("Error sending file:", err);
          res.status(500).json({ error: "Failed to send zip file" });
        }
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
 * Cancels a tile download operation.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.folderName - The name of the folder to store tiles.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */

export const cancelDownload = async (req, res) => {
  try {
    const { folderName } = req.body;
    const tilesFolderPath = path.join("tiles", folderName);

    // Disk download paths
    const downloadsPath = path.join(os.homedir(), "Downloads");
    const diskFolderPath = path.join(downloadsPath, folderName);
    const diskTilesFolderPath = path.join(diskFolderPath, `${folderName}`);
    const diskZipFilePath = path.join(downloadsPath, `${folderName}.zip`);

    if (!folderName) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    let removed = false;

    // Remove GCS/tiles folder if exists
    if (fs.existsSync(tilesFolderPath)) {
      fs.rmSync(tilesFolderPath, { recursive: true, force: true });
      removed = true;
      console.log("==== Download Canceled (tiles folder) ====");
    }

    // Remove disk tiles folder if exists
    if (fs.existsSync(diskTilesFolderPath)) {
      fs.rmSync(diskTilesFolderPath, { recursive: true, force: true });
      removed = true;
      console.log("==== Download Canceled (disk tiles folder) ====");
    }

    // Remove disk folder if exists
    if (fs.existsSync(diskFolderPath)) {
      fs.rmSync(diskFolderPath, { recursive: true, force: true });
      removed = true;
      console.log("==== Download Canceled (disk folder) ====");
    }

    // Remove zip file if exists
    if (fs.existsSync(diskZipFilePath)) {
      fs.rmSync(diskZipFilePath, { force: true });
      removed = true;
      console.log("==== Download Canceled (disk zip file) ====");
    }

    // Set cancel flag
    cancelFlags[folderName] = true;

    if (removed) {
      return res
        .status(200)
        .json({ message: "Download canceled and folder(s)/file(s) removed" });
    } else {
      return res.status(404).json({ error: "Folder not found" });
    }
  } catch (error) {
    console.error("Error in cancelDownload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieves all tiles from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
 * Retrieves a tile by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the tile to retrieve.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
 * Deletes a tile by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the tile to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
 * Retrieves a tile image by its ID, zoom level, x, and y coordinates.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.tileId - The ID of the tile.
 * @param {string} req.params.z - The zoom level.
 * @param {string} req.params.x - The x coordinate.
 * @param {string} req.params.y - The y coordinate.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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

/**
 * Updates a tile by its ID.
 * updating the folder name of the tile
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.folderName - The name of the folder to store tiles.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.tileId - The ID of the tile to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */

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

/**
 * Uploads a tile folder.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.file - The uploaded file.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * uploading the tile folder and the json file
 * the json file contains the tile data
 * the tiles folder stored in the local folders /tiles/folderName
 * the json file stored in the database
 * the tile folder and the json file are zipped and uploaded
 * the zip file is then extracted and the tiles are stored in the local folders
 * the json file is then stored in the database
 */

export const uploadTileFolder = async (req, res) => {
  try {
    const { file } = req;
    const zip = new AdmZip(file.buffer);
    const zipEntries = zip.getEntries();
    let jsonData = null;

    zipEntries.forEach((entry) => {
      const entryName = entry.entryName;
      if (!entry.isDirectory) {
        if (entryName.endsWith(".json")) {
          const data = entry.getData().toString("utf8");
          jsonData = JSON.parse(data);
        } else {
          const outputPath = path.join("tiles", entryName);
          ensureDirSync(fs, path.dirname(outputPath));
          fs.writeFileSync(outputPath, entry.getData());
        }
      }
    });

    if (jsonData) {
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
        zoomLevel,
        thubmnailbase64img,
      } = jsonData;

      const createdTile = await createTileService({
        name: folderName,
        minLon,
        minLat,
        maxLon,
        maxLat,
        extent,
        center,
        projection,
        mapSource,
        zoom: zoomLevel,
        thumbnailBase64Img: thubmnailbase64img,
      });

      res.status(200).json(createdTile);
    } else {
      res.status(400).json({ error: "No JSON data found in the zip file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import express from "express";
import {
  downloadTilesGCS,
  downloadTilesDisk,
  getAllTiles,
  getTileById,
  deleteTile,
  cancelDownload,
  getTileImage,
  updateTile,
} from "../controllers/tile.controller.js";

export const tileRouter = express.Router();

tileRouter.post("/download-tiles/gcs/:zoomLevel", downloadTilesGCS);
tileRouter.post("/download-tiles/disk/:zoomLevel", downloadTilesDisk);
tileRouter.post("/cancel-download", cancelDownload);
tileRouter.get("/", getAllTiles);
tileRouter.get("/:id", getTileById);
tileRouter.delete("/:id", deleteTile);
tileRouter.get("/:tileId/:z/:x/:y.png", getTileImage);
tileRouter.put("/:tileId", updateTile);

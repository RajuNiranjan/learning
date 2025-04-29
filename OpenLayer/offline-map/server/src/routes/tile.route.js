import express from "express";
import {
  downloadTilesGCS,
  downloadTilesDisk,
  getAllTiles,
  getTileById,
  deleteTile,
  cancelDownload,
} from "../controllers/tile.controller.js";

export const tileRouter = express.Router();

tileRouter.post("/download-tiles/gcs/:zoomLevel", downloadTilesGCS);
tileRouter.post("/download-tiles/disk/:zoomLevel", downloadTilesDisk);
tileRouter.post("/cancel-download", cancelDownload);
tileRouter.get("/", getAllTiles);
tileRouter.get("/:id", getTileById);
tileRouter.delete("/:id", deleteTile);

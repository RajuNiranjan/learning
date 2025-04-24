import express from "express";
import {
  downloadTiles,
  getAllTiles,
  getTileById,
  deleteTile,
} from "../controllers/tile.controller.js";

export const tileRouter = express.Router();

tileRouter.post("/download-tiles/:zoomLevel", downloadTiles);
tileRouter.get("/", getAllTiles);
tileRouter.get("/:id", getTileById);
tileRouter.delete("/:id", deleteTile);

import express from 'express'
import { downloadTiles, mapData } from '../controllers/tile.controller.js';

export const tileRouter = express.Router()

tileRouter.post("/download-tiles", downloadTiles)
tileRouter.post("/map-data", mapData)

export default tileRouter;
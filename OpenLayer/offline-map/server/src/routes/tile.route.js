import express from 'express'
import { downloadTiles,  } from '../controllers/tile.controller.js';

export const tileRouter = express.Router()

tileRouter.post("/download-tiles/:zoomLevel", downloadTiles)

export default tileRouter;
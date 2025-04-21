import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path";
import fs from "fs";
import { downloadTile } from "../utils/downloadTile.js";
import { createTileService, deleteTileService, getTileByIdService, getTileService } from "../models/tile.model.js";
import { prisma } from "../prismaClient.js";

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
      thumbnailBase64Img: thumbnailBase64,
      zoom: [MIN_ZOOM, MAX_ZOOM],
    };

    const createdTile = await createTileService(dbData)
    const createdTilePrisma = await prisma.tilePrisma_table.create({  
      data: dbData,
    });

    res.status(200).json({ message: "Tiles downloaded successfully", createdTile, createdTilePrisma });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTiles = async(req, res) =>{
    try {
        const tiles = await getTileService()        
        const tilesPrisma = await prisma.tilePrisma_table.findMany()
        res.status(200).json({tiles, tilesPrisma})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getTileById = async(req, res) =>{
    try {
        const tileId = req.params.id
        const tile = await getTileByIdService(tileId)
        const tilePrisma = await prisma.tilePrisma_table.findUnique({
            where: {
                id: tileId
            }
        })
        if(!tile || !tilePrisma){
            return res.status(404).json({error: "Tile not found"})
        }
        res.status(200).json({tile, tilePrisma})
    } catch (error) {
 console.log(error);
        res.status(500).json({error: "Internal server error"})

    }
}

export const deleteTile = async(req, res) =>{
    try {
    const tileId= req.params.id
    const deletedTile = await deleteTileService(tileId)
    const deletedTilePrisma = await prisma.tilePrisma_table.delete({
        where: {
            id: tileId
        }
    })
    if(!deletedTile || !deletedTilePrisma){
        return res.status(404).json({error: "Tile not found"})
    }
    res.status(200).json({message: "Tile deleted successfully", deletedTile})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
}
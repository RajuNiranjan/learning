import { lonLatToTile, ensureDirSync } from "../utils/tileHelpers.js";
import path from "path"
import fs from "fs"
import { downloadTile } from "../utils/downloadTile.js"

export const downloadTiles = async (req, res) => {
    const { folderName, minLon, minLat, maxLon, maxLat } = req.body
    const MIN_ZOOM = 10 
    const MAX_ZOOM = 19
    try {
        for(let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++){
            const topLeftTile = lonLatToTile(minLon, maxLat, zoom)
            const bottomRightTile = lonLatToTile(maxLon, minLat, zoom)

            for(let x = topLeftTile.x; x <= bottomRightTile.x; x++){
                for(let y = topLeftTile.y; y <= bottomRightTile.y; y++){
                    const dirPath = path.join("tiles", folderName, zoom.toString(), x.toString())
                    ensureDirSync(fs, dirPath)

                    const outputPath = path.join(dirPath, `${y}.png`)
                    if(!fs.existsSync(outputPath)){
                        console.log(`Downloading tile ${zoom}/${x}/${y}`);
                        await downloadTile(zoom, x, y, outputPath)
                        console.log(`Tile ${zoom}/${x}/${y} downloaded successfully`);
                    }
                }
            }
        }

        res.status(200).json({ message: "Tiles downloaded successfully" })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const mapData = async (req, res) => {
 try {
    console.log(req.body);
    res.status(200).json({ message: "Map data fetched successfully" })
 } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
 }
}
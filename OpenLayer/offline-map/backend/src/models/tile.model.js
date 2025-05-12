import { pool } from "../config/database.js";

export const createTileService = async (tileData) => {
  try {
    const result = await pool.query(
      `INSERT INTO tile_table (name, extent, center, zoom, projection, thubmnailBase64Img, mapSource)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
      [
        tileData.name,
        tileData.extent,
        tileData.center,
        tileData.zoom,
        tileData.projection,
        tileData.thumbnailBase64Img,
        tileData.mapSource,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getTileService = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM tile_table ORDER BY name ASC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tiles:", error);
    throw error;
  }
};

export const getTileByIdService = async (tileId) => {
  try {
    const result = await pool.query("SELECT * FROM tile_table WHERE id = $1", [
      tileId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching tile by ID:", error);
    throw error;
  }
};

export const deleteTileService = async (tileId) => {
  try {
    const results = await pool.query(
      `DELETE FROM tile_table WHERE id = $1 RETURNING *`,
      [tileId]
    );
    return results.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateTileService = async (tileId, tileData) => {
  try {
    const result = await pool.query(
      `UPDATE tile_table SET name = $1 WHERE id =$2 RETURNING *`,
      [tileData.name, tileId]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

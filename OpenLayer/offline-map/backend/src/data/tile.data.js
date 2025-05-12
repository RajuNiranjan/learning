import { pool } from "../config/database.js";

export const createTileTable = async () => {
  let tileText = `CREATE TABLE IF NOT EXISTS tile_table(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      extent DOUBLE PRECISION [4] NOT NULL,
      center DOUBLE PRECISION [2],
      zoom DOUBLE PRECISION [2],
      projection VARCHAR(255) NOT NULL,
      mapSource VARCHAR(255) DEFAULT 'OSM Map' NOT NULL,
      thubmnailBase64Img TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  try {
    await pool.query(tileText);
    console.log("Tile table created successfully");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

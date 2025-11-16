import { pool } from "../config/db.js";

export const todoTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS todo (
      id SERIAL PRIMARY KEY,
      task VARCHAR(100) NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Todo table created successfully");
  } catch (err) {
    console.error("Error creating todo table:", err);
  }
};

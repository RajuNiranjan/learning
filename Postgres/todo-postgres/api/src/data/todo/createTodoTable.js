import { pool } from "../../config/db.js";

export const createTodoTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(100) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);`;

  try {
    await pool.query(queryText);
    console.log("todo table is created if not existed");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

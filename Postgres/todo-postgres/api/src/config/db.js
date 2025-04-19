import pkg from "pg";
import { ENV } from "../utils/env.js";
const { Pool } = pkg;

export const pool = new Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Error connecting to the database", err);
});

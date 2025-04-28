import express from "express";
import { envVar } from "./utils/env.js";
import cors from "cors";
import { tileRouter } from "./routes/tile.route.js";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import { createTileTable } from "./data/tile.data.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: envVar.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

createTileTable();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});
app.get("/api/v1/test-pool", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    return res.status(200).json({
      database: `database_name: "${result.rows[0].current_database}"`,
    });
  } catch (error) {
    console.error("Error testing pool connection", error);
    return res.status(500).json({
      message: "Error testing pool connection",
      error: error.message,
    });
  }
});

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    message: "Test endpoint is working",
  });
});

app.use("/api/v1/tile", tileRouter);

app.listen(envVar.PORT, () => {
  console.log(`Server is running on port ${envVar.PORT}`);
});

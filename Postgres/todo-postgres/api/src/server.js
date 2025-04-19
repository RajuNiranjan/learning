import express from "express";
import cors from "cors";
import { ENV } from "./utils/env.js";
import { todoRouter } from "./routes/todo.route.js";
import { pool } from "./config/db.js";
import { createTodoTable } from "./data/todo/createTodoTable.js";

const app = express();

app.use(express.json());
app.use(cors());

createTodoTable();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.status(200).json(result.rows);
});

app.use("/api/v1/todo", todoRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

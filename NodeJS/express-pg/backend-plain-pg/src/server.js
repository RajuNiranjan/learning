import express from "express";
import { pool } from "./config/db.js";
import { PORT } from "./utils/env_config.js";
import { todoTable } from "./db_data/create_task_table.js";
import { todoRouter } from "./routes/todo.route.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.status(200).json({ message: "Hi i am PERN" }));
app.get("/helth-check", (_, res) =>
  res.status(200).json({ message: "I am Good" })
);

await todoTable();

app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`server running at PORT: ${PORT}`);
  pool.connect();
});

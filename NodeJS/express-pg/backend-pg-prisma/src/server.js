import express from "express";
import { todoRoute } from "./routes/todo.route.js";

const app = express();

app.use(express.json());

app.use("/api/todo", todoRoute);
app.listen(8000, () => {
  console.log("server running at 8000 port");
});

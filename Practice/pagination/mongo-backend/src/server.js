import express from "express";
import { connectDB } from "./config/db.js";
import { PORT, FRONTEND_URI } from "./utils/env_config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthRoute } from "./routes/auth.route.js";
import { TodoRoute } from "./routes/todo.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URI,
    credentials: true,
  })
);

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/todo", TodoRoute);

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
  connectDB();
});

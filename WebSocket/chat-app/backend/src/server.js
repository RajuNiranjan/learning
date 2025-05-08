import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, FRONTEND_URL } from "./utils/env_var.js";
import "./config/database.js";
import { authRouter } from "./routers/auth.router.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { messageRouter } from "./routers/messages.router.js";
const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hello world" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

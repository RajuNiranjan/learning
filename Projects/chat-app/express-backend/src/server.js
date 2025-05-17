import { FRONT_END_ORIGIN, PORT } from "./utils/env.js";
import { app, server } from "./utils/socket.js";
import express from "express";
import cors from "cors";
import "./config/database.js";
import coockieParser from "cookie-parser";
import { authRouter } from "./routers/auth.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";

app.use(express.json());
app.use(
  cors({
    origin: FRONT_END_ORIGIN,
    allowedHeaders: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(coockieParser());
app.use(errorHandler);

app.get("/test", (req, res) => {
  return res.json({ message: "Welcome to Express.js" });
});

app.use("/api/v1/auth", authRouter);

server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});

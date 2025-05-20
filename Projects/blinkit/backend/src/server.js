import express from "express";
import cors from "cors";
import coocieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import "./config/database.js";
import { PORT, FRONT_END_ORIGIN } from "./utils/envVar.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routers/auth.router.js";

const app = express();

app.use(express.json());
app.use(coocieParser());
app.use(
  cors({
    origin: FRONT_END_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(errorHandler);
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blinkit server" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Welcome to Blinkit test server" });
});

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});

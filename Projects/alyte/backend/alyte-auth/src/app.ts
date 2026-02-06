import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./config/data-source";
import { envConfig } from "./utils/env";
import { logger } from "./config/logger";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [],
  }),
);
app.use(cookieParser());

app.get("/", (_, res) => res.status(200).json({ message: "Welcome to Alyte" }));
app.get("/helth", (_, res) =>
  res.status(200).json({ message: "My Helth is good!" }),
);

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected");

    app.listen(envConfig.PORT, () => {
      console.log(`server running at http://localhost:${envConfig.PORT}`);
    });
  })
  .catch((e) => logger.error(e));

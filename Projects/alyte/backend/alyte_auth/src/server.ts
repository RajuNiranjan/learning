import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envConfig } from "./utils/envConfig";
import { AppDataSource } from "./data-source";
import { logger } from "./utils/logger";

const app = express();

const { PORT } = envConfig;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (_: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "Welcome to alyte_auth" });
});
app.get("/helth", (_: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "I am working fine" });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));
    console.log("DB connected");
  })
  .catch((e) => console.log("DB connection error", e));

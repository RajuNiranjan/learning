import "./config/db";
import express from "express";
import cookieParser from "cookie-parser";
import { envConfig } from "./utils/env_config";
import cors from "cors";
import { Request, Response } from "express";
import { authRoute } from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: envConfig.FRONTEND_ORIGINS,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ message: "welcom to HR portal" })
);

app.get("/helth-check", (req: Request, res: Response) =>
  res.status(200).json({ message: "yup i am working:)" })
);

app.use("/api/v1/auth", authRoute);

app.listen(envConfig.PORT, () =>
  console.log(`server running at port no: ${envConfig.PORT}`)
);

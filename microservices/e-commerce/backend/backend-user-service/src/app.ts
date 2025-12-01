import express from "express";
import { PORT } from "./config/env";
import { swaggerSpec, swaggerUiMiddleware } from "./config/swaggers";

const app = express();

app.use(express.json());
app.use(
  "/docs",
  swaggerUiMiddleware.serve,
  swaggerUiMiddleware.setup(swaggerSpec)
);
app.get("/", (_, res) => res.json({ message: "Welcome to E-Commerce" }));

app.get("/helth-check", (_, res) => res.json({ message: "I am Good!!" }));

app.listen(PORT, () => console.log(`server runnig at PORT: ${PORT}`));

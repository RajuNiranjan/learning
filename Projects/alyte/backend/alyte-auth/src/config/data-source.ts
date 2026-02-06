import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "../utils/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envConfig.DB_HOST,
  port: Number(envConfig.DB_PORT),
  username: envConfig.DB_USER,
  password: envConfig.DB_PASS,
  database: envConfig.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.ts"],
});

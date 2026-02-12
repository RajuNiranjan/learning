import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "./utils/envConfig";

const { PG_DB, PG_HOST, PG_PASS, PG_PORT, PG_USER } = envConfig;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  entities: [],
  migrations: [__dirname, "src/migrations/**/*.ts"],
  synchronize: true,
  logging: true,
});

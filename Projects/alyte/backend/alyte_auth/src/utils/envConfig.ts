import { config } from "dotenv";

config();

const requiredENV = [
  "PORT",
  "PG_PORT",
  "PG_DB",
  "PG_USER",
  "PG_PASS",
  "PG_HOST",
];

for (let key of requiredENV) {
  if (!process.env[key]) {
    throw new Error(`Missing required ENV ${key}`);
  }
}

export const envConfig = {
  PORT: process.env.PORT,
  PG_PORT: process.env.PG_PORT,
  PG_DB: process.env.PG_DB,
  PG_USER: process.env.PG_USER,
  PG_PASS: process.env.PG_PASS,
  PG_HOST: process.env.PG_HOST,
};

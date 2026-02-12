import { Logger, QueryRunner } from "typeorm";
import fs from "fs";

export class DbLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    fs.appendFileSync(
      "logs/db.log",
      `[QUERY]: ${query} ${parameters && parameters.length > 0 ? JSON.stringify(parameters) : ""}\n\n`,
    );
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    fs.appendFileSync(
      "logs/db.log",
      `[QUERY ERROR]: ${typeof error === "string" ? error : error.message} | ${query} ${parameters && parameters.length > 0 ? JSON.stringify(parameters) : ""}\n\n`,
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    fs.appendFileSync(
      "logs/db.log",
      `[SLOW QUERY - ${time} ms]: ${query} ${parameters && parameters.length > 0 ? JSON.stringify(parameters) : ""}\n\n`,
    );
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    fs.appendFileSync("logs/db.log", `[SCHEMA BUILD]: ${message}\n\n`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    fs.appendFileSync("logs/db.log", `[MIGRATION]: ${message}\n\n`);
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    fs.appendFileSync(
      "logs/db.log",
      `[${level.toUpperCase()}]: ${typeof message === "string" ? message : JSON.stringify(message)}\n\n`,
    );
  }
}

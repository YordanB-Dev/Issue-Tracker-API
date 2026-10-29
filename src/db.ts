import { Pool } from "pg";
import { AppError } from "./utils/AppError.js";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new AppError(`Enviroment values ${name} is required`, 400);
  }

  return value;
};

const pool = new Pool({
  user: getRequiredEnv("DB_USER"),
  host: getRequiredEnv("DB_HOST"),
  database: getRequiredEnv("DB_DATABASE"),
  password: getRequiredEnv("DB_PASSWORD"),
  port: Number(getRequiredEnv("DB_PORT"))
});

export default pool;
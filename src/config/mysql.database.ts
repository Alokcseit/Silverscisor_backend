import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}

const caPath = path.join(process.cwd(), "certs", "ca.pem");

export const pool = mysql.createPool({
  host: getEnv("DB_HOST"),
  port: Number(getEnv("DB_PORT")),
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  database: getEnv("DB_NAME"),

  ssl: {
    ca: fs.readFileSync(caPath),
  },

  waitForConnections: true,
  connectionLimit: 10,
});

/* 🔥 ADD THIS */
export async function sqlDBConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ DB is connected (MySQL)");
  } catch (error) {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  }
}

import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/mysql/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    uri: process.env.MYSQL_URL!,
  },
  driver: "mysql2",
} satisfies Config;

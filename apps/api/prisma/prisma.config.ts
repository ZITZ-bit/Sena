import { config } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, env } from "prisma/config";

config({ path: join(dirname(fileURLToPath(import.meta.url)), ".env") });

export default defineConfig({
  schema: "./schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    path: "./migrations",
  },
});

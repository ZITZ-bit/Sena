import { config } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, env } from "prisma/config";

config({ path: join(dirname(fileURLToPath(import.meta.url)), ".env") });

const dbTarget = process.env.DB_TARGET || "neon";

export default defineConfig({
  schema: "./schema.prisma",
  datasource: {
    url: env(dbTarget === "local" ? "DATABASE_URL_LOCAL" : "DATABASE_URL"),
  },
  migrations: {
    path: "./migrations",
  },
});

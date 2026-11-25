import { PrismaClient } from "@prisma/client";

function getRequiredEnv(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required MySQL environment variable: ${key}`);
  }

  return value;
}

function createMySqlUrl(): string {
  const url = new URL("mysql://localhost");
  url.hostname = getRequiredEnv("MYSQL_HOST");
  url.port = getRequiredEnv("MYSQL_PORT");
  url.username = getRequiredEnv("MYSQL_USER");
  url.password = getRequiredEnv("MYSQL_PASSWORD");
  url.pathname = `/${getRequiredEnv("MYSQL_DATABASE")}`;
  return url.toString();
}

const globalForPrisma = globalThis as typeof globalThis & {
  mysqlPrisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.mysqlPrisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: createMySqlUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = prisma;
}

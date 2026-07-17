import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client.js";

/**
 * Prisma client for the monorepo.
 *
 * DATABASE_URL is resolved from the consuming app's environment (Next.js .env.local,
 * Vercel env vars, etc.).  We intentionally do NOT call `import "dotenv/config"` here
 * because that would try to load .env relative to the shared package's own directory —
 * which has no .env file — causing `connectionString` to be the literal string
 * "undefined" and breaking every database query.
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error(
        "[database] DATABASE_URL is not set. " +
        "Make sure it is defined in your app's .env.local (development) " +
        "or as an environment variable in production."
    );
}

const adapter = new PrismaPg({ connectionString });

// Singleton pattern — prevents multiple PrismaClient instances in Next.js dev HMR
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
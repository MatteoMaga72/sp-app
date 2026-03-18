// Prisma client singleton for Next.js
// Will be activated when DATABASE_URL is configured and `npx prisma generate` has been run.
// For now, all data comes from seed-data.ts via the repository layer.

let prisma: unknown = null;

try {
  // Dynamic import to avoid build errors when Prisma client isn't generated
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as { prisma: typeof PrismaClient };
  prisma = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
} catch {
  // Prisma client not generated yet — using stubbed repositories
  prisma = null;
}

export { prisma };
export default prisma;

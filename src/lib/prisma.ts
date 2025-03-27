import { PrismaClient } from '@prisma/client';

// ✅ Prevent multiple instances of Prisma in dev (hot reload fix)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;

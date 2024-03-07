import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prismadb: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prismadb = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prismadb = global.cachedPrisma;
}

export const prisma = prismadb;

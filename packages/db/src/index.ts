import { PrismaClient } from "@prisma/client";

const prismaSingleton = () => new PrismaClient();

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const prisma =
  globalThis.prismaGlobal ?? (globalThis.prismaGlobal = prismaSingleton());

export default prisma;

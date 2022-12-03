import { PrismaClient } from '@prisma/client';
import { FastifyServerContext } from '@noteapp/types';

const prisma = new PrismaClient();

export type AppContext = { prisma: PrismaClient };
export type GraphQLContext = FastifyServerContext & AppContext;

export function createContext(): AppContext {
  return { prisma };
}

import { PrismaClient } from '@prisma/client';
import { getTenantStore } from './tenantContext.js';

const TENANTED_MODELS = new Set([
  'User',
  'Role',
  'RolePermission',
  'Session',
  'PasswordReset',
]);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const baseClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

function withTenantScope(model: string, args: Record<string, any> = {}) {
  const store = getTenantStore();
  if (!store || store.bypass || !store.tenantId || !TENANTED_MODELS.has(model)) {
    return args;
  }

  return {
    ...args,
    where: {
      ...(args.where || {}),
      tenantId: store.tenantId,
    },
  };
}

function withTenantCreate(model: string, args: Record<string, any> = {}) {
  const store = getTenantStore();
  if (!store || store.bypass || !store.tenantId || !TENANTED_MODELS.has(model)) {
    return args;
  }

  if (args.data && !Array.isArray(args.data)) {
    return {
      ...args,
      data: {
        tenantId: store.tenantId,
        ...args.data,
      },
    };
  }

  return args;
}

export const prisma = baseClient.$extends({
  query: {
    $allModels: {
      async findMany({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async findFirst({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async count({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async update({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async updateMany({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async delete({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async deleteMany({ model, args, query }) {
        return query(withTenantScope(model, args as Record<string, any>) as never);
      },
      async create({ model, args, query }) {
        return query(withTenantCreate(model, args as Record<string, any>) as never);
      },
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = baseClient;
}

export async function connectDatabase(): Promise<void> {
  await baseClient.$connect();
}

export type AppPrismaClient = typeof prisma;

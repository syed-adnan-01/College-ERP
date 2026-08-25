import { AsyncLocalStorage } from 'node:async_hooks';

export interface TenantStore {
  tenantId: string;
  bypass?: boolean;
}

export const tenantStorage = new AsyncLocalStorage<TenantStore>();

export function getTenantStore(): TenantStore | undefined {
  return tenantStorage.getStore();
}

export function runWithTenant<T>(tenantId: string, fn: () => T): T {
  return tenantStorage.run({ tenantId }, fn);
}

export function runWithoutTenantScope<T>(fn: () => T): T {
  const current = tenantStorage.getStore();
  return tenantStorage.run({ tenantId: current?.tenantId || '', bypass: true }, fn);
}

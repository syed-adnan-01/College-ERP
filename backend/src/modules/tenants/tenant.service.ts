import { Prisma, SubscriptionTier } from '@prisma/client';
import { CreateTenantDTO, Tenant } from '@college-erp/shared';
import { prisma } from '../../shared/prisma.js';
import { runWithTenant } from '../../shared/tenantContext.js';
import { DEFAULT_ENABLED_MODULES, mapTenant } from './tenant.mapper.js';
import { createTenantAdmin, seedTenantRbac } from './tenant.bootstrap.js';

export class TenantService {
  static async getAllTenants(): Promise<Tenant[]> {
    const tenants = await prisma.tenant.findMany({ orderBy: { createdAt: 'asc' } });
    return tenants.map(mapTenant);
  }

  static async getTenantById(id: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({ where: { id } });
    return tenant ? mapTenant(tenant) : null;
  }

  static async getTenantBySlug(slug: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({ where: { slug: slug.toLowerCase() } });
    return tenant ? mapTenant(tenant) : null;
  }

  static async getTenantByDomain(domain: string): Promise<Tenant | null> {
    const cleanDomain = domain.toLowerCase().split(':')[0];
    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [{ domain: cleanDomain }, { slug: cleanDomain.split('.')[0] }],
      },
    });

    if (tenant) {
      return mapTenant(tenant);
    }

    const parts = cleanDomain.split('.');
    if (parts.length >= 2) {
      return this.getTenantBySlug(parts[0]);
    }

    return null;
  }

  static async createTenant(dto: CreateTenantDTO): Promise<Tenant> {
    const slug = dto.slug.toLowerCase();
    const existing = await prisma.tenant.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`Tenant with slug "${slug}" already exists`);
    }

    const subscriptionTier = (dto.subscriptionTier || 'BASIC') as SubscriptionTier;
    const tenant = await prisma.tenant.create({
      data: {
        name: dto.name,
        slug,
        domain: dto.domain || dto.customDomain || `${slug}.eduplatform.com`,
        logo: dto.logo || dto.logoUrl || null,
        themeConfig: (dto.themeConfig || Prisma.JsonNull) as Prisma.InputJsonValue,
        enabledModules: dto.enabledModules?.length ? dto.enabledModules : DEFAULT_ENABLED_MODULES,
        subscriptionTier,
        isActive: true,
      },
    });

    await seedTenantRbac(tenant.id);
    await createTenantAdmin(tenant.id, {
      email: dto.adminEmail || `admin@${slug}.edu`,
      password: dto.adminPassword || 'Admin@123456',
      firstName: dto.adminFirstName || 'College',
      lastName: dto.adminLastName || 'Admin',
    });

    return mapTenant(tenant);
  }

  static scopeTenantQuery<T extends Record<string, any>>(tenantId: string, query: T): T & { where: { tenantId: string } } {
    return {
      ...query,
      where: {
        ...(query.where || {}),
        tenantId,
      },
    };
  }

  static async withTenantIsolation<T>(tenantId: string, fn: () => Promise<T>): Promise<T> {
    return runWithTenant(tenantId, fn);
  }
}

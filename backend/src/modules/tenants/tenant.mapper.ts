import { Tenant as PrismaTenant } from '@prisma/client';
import { Tenant, TenantConfig } from '@college-erp/shared';

export function mapTenant(tenant: PrismaTenant): Tenant {
  const themeConfig = (tenant.themeConfig || null) as TenantConfig | null;
  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    domain: tenant.domain,
    customDomain: tenant.domain,
    logo: tenant.logo,
    logoUrl: tenant.logo,
    themeConfig,
    enabledModules: tenant.enabledModules,
    subscriptionTier: tenant.subscriptionTier,
    subscription: tenant.subscriptionTier,
    isActive: tenant.isActive,
    createdAt: tenant.createdAt.toISOString(),
    updatedAt: tenant.updatedAt.toISOString(),
  };
}

export const DEFAULT_ENABLED_MODULES = [
  'students',
  'faculty',
  'academics',
  'attendance',
  'exams',
  'finance',
  'library',
  'hostel',
  'placement',
  'hr',
];

import { Tenant, CreateTenantDTO } from '@college-erp/shared';

export type { Tenant, CreateTenantDTO };

export interface TenantFilter {
  isActive?: boolean;
  subscriptionTier?: string;
}

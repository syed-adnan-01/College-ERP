import { Tenant, ApiResponse } from '@college-erp/shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

function tenantHeaders(): Record<string, string> {
  const tenantId = localStorage.getItem('tenant_id');
  if (tenantId) {
    return { 'X-Tenant-ID': tenantId };
  }

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  if (hostname === 'localhost' || hostname === '127.0.0.1' || subdomain === 'www') {
    return {};
  }

  return { 'X-Tenant-Slug': subdomain };
}

export class TenantService {
  static async getCurrentTenant(): Promise<Tenant | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/tenants/current`, {
        headers: {
          'Content-Type': 'application/json',
          ...tenantHeaders(),
        },
      });
      const data: ApiResponse<Tenant> = await response.json();
      return data.success && data.data ? data.data : null;
    } catch (err) {
      console.warn('Failed to fetch current tenant context:', err);
      return null;
    }
  }

  static async getTenantBySlug(slug: string): Promise<Tenant | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/tenants/${slug}`);
      const data: ApiResponse<Tenant> = await response.json();
      return data.success && data.data ? data.data : null;
    } catch (err) {
      console.warn(`Failed to fetch tenant by slug ${slug}:`, err);
      return null;
    }
  }
}

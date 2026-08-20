export interface TenantConfig {
  primaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  customDomain?: string | null;
  logoUrl?: string | null;
  themeConfig?: TenantConfig | null;
  enabledModules: string[];
  subscription: 'BASIC' | 'PRO' | 'ENTERPRISE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantDTO {
  name: string;
  slug: string;
  customDomain?: string;
  logoUrl?: string;
  enabledModules?: string[];
  subscription?: 'BASIC' | 'PRO' | 'ENTERPRISE';
}

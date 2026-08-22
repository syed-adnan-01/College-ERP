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
  domain?: string | null;
  customDomain?: string | null;
  logo?: string | null;
  logoUrl?: string | null;
  themeConfig?: TenantConfig | null;
  enabledModules: string[];
  subscriptionTier: 'BASIC' | 'PRO' | 'ENTERPRISE';
  subscription?: 'BASIC' | 'PRO' | 'ENTERPRISE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantDTO {
  name: string;
  slug: string;
  domain?: string;
  customDomain?: string;
  logo?: string;
  logoUrl?: string;
  themeConfig?: TenantConfig;
  enabledModules?: string[];
  subscriptionTier?: 'BASIC' | 'PRO' | 'ENTERPRISE';
  adminEmail?: string;
  adminPassword?: string;
  adminFirstName?: string;
  adminLastName?: string;
}

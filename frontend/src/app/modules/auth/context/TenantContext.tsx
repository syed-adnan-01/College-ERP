import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant } from '@college-erp/shared';
import { TenantService } from '../services/tenantService';

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  setTenant: (tenant: Tenant | null) => void;
  refetchTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  setTenant: () => {},
  refetchTenant: async () => {},
});

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTenant = async () => {
    setLoading(true);
    const resolvedTenant = await TenantService.getCurrentTenant();
    setTenant(resolvedTenant);
    setLoading(false);
  };

  useEffect(() => {
    fetchTenant();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const primary = tenant?.themeConfig?.primaryColor;
    const accent = tenant?.themeConfig?.accentColor;
    if (primary) root.style.setProperty('--tenant-primary', primary);
    if (accent) root.style.setProperty('--tenant-accent', accent);
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, loading, setTenant, refetchTenant: fetchTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
export { TenantContext };

import React, { createContext, useState, useEffect } from 'react';
import { AuthUser, Tenant, UserRole } from '@college-erp/shared';
import { AuthService } from '../services/authService';
import { TenantService } from '../services/tenantService';
import { signInWithGoogle, signInWithMicrosoft } from '../config/firebase';
import { useTenant } from './TenantContext';

export interface AuthContextType {
  user: AuthUser | null;
  tenant: Tenant | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole, tenantSlug?: string) => Promise<void>;
  loginAsDemo: (role?: UserRole) => void;
  loginWithGoogle: (role?: UserRole) => Promise<void>;
  loginWithMicrosoft: (role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, newPassword: string) => Promise<string>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  tenant: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  loginAsDemo: () => {},
  loginWithGoogle: async () => {},
  loginWithMicrosoft: async () => {},
  logout: async () => {},
  forgotPassword: async () => '',
  resetPassword: async () => '',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setTenant: setTenantContext } = useTenant();

  const applyTenant = (nextTenant: Tenant | null) => {
    setTenant(nextTenant);
    if (nextTenant) {
      setTenantContext(nextTenant);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedDemo = localStorage.getItem('demo_user');
      if (savedDemo) {
        try {
          const parsed = JSON.parse(savedDemo);
          setUser(parsed);
          setLoading(false);
          return;
        } catch {}
      }

      const { accessToken } = AuthService.getStoredTokens();
      if (accessToken) {
        const currentUser = await AuthService.getMe();
        setUser(currentUser);
        if (currentUser?.tenantId) {
          localStorage.setItem('tenant_id', currentUser.tenantId);
          const resolvedTenant = await TenantService.getCurrentTenant();
          applyTenant(resolvedTenant);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const loginAsDemo = (role: UserRole = "student") => {
    const demoProfiles: Record<string, AuthUser> = {
      admin: {
        id: "demo-admin-id",
        tenantId: "demo-tenant-id",
        email: "admin@demo.edu",
        firstName: "Super",
        lastName: "Admin",
        role: "admin",
        permissions: ["*"],
      },
      faculty: {
        id: "demo-faculty-id",
        tenantId: "demo-tenant-id",
        email: "faculty@demo.edu",
        firstName: "Robert",
        lastName: "Chen",
        role: "faculty",
        permissions: ["academics:*", "attendance:*", "grades:*"],
      },
      student: {
        id: "demo-student-id",
        tenantId: "demo-tenant-id",
        email: "student@demo.edu",
        firstName: "Alice",
        lastName: "Smith",
        role: "student",
        permissions: ["student:view", "attendance:view"],
      },
    };

    const targetUser = demoProfiles[role] || demoProfiles.student;
    setUser(targetUser);
    localStorage.setItem('demo_user', JSON.stringify(targetUser));
  };

  const login = async (email: string, password?: string, role?: UserRole, tenantSlug?: string) => {
    setLoading(true);
    try {
      const response = await AuthService.login(email, password, role, tenantSlug);
      setUser(response.user);
      const resolvedTenant = await TenantService.getCurrentTenant();
      applyTenant(resolvedTenant);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (role?: UserRole) => {
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const response = await AuthService.firebaseLogin(idToken, role);
      setUser(response.user);
      const resolvedTenant = await TenantService.getCurrentTenant();
      applyTenant(resolvedTenant);
    } finally {
      setLoading(false);
    }
  };

  const loginWithMicrosoft = async (role?: UserRole) => {
    setLoading(true);
    try {
      const idToken = await signInWithMicrosoft();
      const response = await AuthService.firebaseLogin(idToken, role);
      setUser(response.user);
      const resolvedTenant = await TenantService.getCurrentTenant();
      applyTenant(resolvedTenant);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('demo_user');
      await AuthService.logout();
      setUser(null);
      setTenant(null);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    return await AuthService.forgotPassword(email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    return await AuthService.resetPassword(token, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        loading,
        isAuthenticated: Boolean(user),
        login,
        loginAsDemo,
        loginWithGoogle,
        loginWithMicrosoft,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

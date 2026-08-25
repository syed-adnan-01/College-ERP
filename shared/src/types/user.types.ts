import { UserRole } from '../constants/roles.js';

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  uid?: string; // Firebase Auth UID if social login
  tenantId: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
  tenant: {
    id: string;
    name: string;
    slug: string;
    logo?: string | null;
  };
}

import { AuthUser, LoginResponse, ApiResponse, UserRole } from '@college-erp/shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

function tenantHeaders(): Record<string, string> {
  const tenantId = localStorage.getItem('tenant_id');
  return tenantId ? { 'X-Tenant-ID': tenantId } : {};
}

export class AuthService {
  static getStoredTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token'),
    };
  }

  static storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  static clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('tenant_id');
  }

  static async login(email: string, password?: string, role?: UserRole, tenantSlug?: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...tenantHeaders(),
        ...(tenantSlug ? { 'X-Tenant-Slug': tenantSlug } : {}),
      },
      body: JSON.stringify({ email, password, role }),
    });

    const result: ApiResponse<LoginResponse> = await response.json();
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || result.message || 'Login failed');
    }

    this.storeTokens(result.data.tokens.accessToken, result.data.tokens.refreshToken);
    localStorage.setItem('tenant_id', result.data.tenant.id);
    return result.data;
  }

  static async firebaseLogin(idToken: string, role?: UserRole): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/firebase-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...tenantHeaders(),
      },
      body: JSON.stringify({ idToken, role }),
    });

    const result: ApiResponse<LoginResponse> = await response.json();
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || result.message || 'Firebase login failed');
    }

    this.storeTokens(result.data.tokens.accessToken, result.data.tokens.refreshToken);
    localStorage.setItem('tenant_id', result.data.tenant.id);
    return result.data;
  }

  static async refresh(): Promise<string> {
    const { refreshToken } = this.getStoredTokens();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const result: ApiResponse<{ accessToken: string; refreshToken: string }> = await response.json();
    if (!result.success || !result.data) {
      this.clearTokens();
      throw new Error('Token refresh failed');
    }

    this.storeTokens(result.data.accessToken, result.data.refreshToken);
    return result.data.accessToken;
  }

  static async getMe(): Promise<AuthUser | null> {
    const { accessToken } = this.getStoredTokens();
    if (!accessToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          ...tenantHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        // Try refresh
        const newAccess = await this.refresh();
        const retryRes = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { ...tenantHeaders(), Authorization: `Bearer ${newAccess}` },
        });
        const retryData: ApiResponse<AuthUser> = await retryRes.json();
        return retryData.success && retryData.data ? retryData.data : null;
      }

      const result: ApiResponse<AuthUser> = await response.json();
      return result.success && result.data ? result.data : null;
    } catch (err) {
      console.warn('Failed to fetch authenticated user:', err);
      return null;
    }
  }

  static async logout(): Promise<void> {
    const { accessToken, refreshToken } = this.getStoredTokens();
    if (accessToken || refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (e) {
        // Ignore logout errors
      }
    }
    this.clearTokens();
  }

  static async forgotPassword(email: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result: ApiResponse<{ message: string; token?: string }> = await response.json();
    if (!result.success) {
      throw new Error(result.error?.message || 'Failed to process forgot password request');
    }
    const message = result.message || result.data?.message || 'Password reset link sent';
    if (result.data?.token) {
      return `${message} Development reset token: ${result.data.token}`;
    }
    return message;
  }

  static async resetPassword(token: string, newPassword: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    const result: ApiResponse<{ message: string }> = await response.json();
    if (!result.success) {
      throw new Error(result.error?.message || 'Failed to reset password');
    }
    return result.message || result.data?.message || 'Password reset successfully';
  }
}

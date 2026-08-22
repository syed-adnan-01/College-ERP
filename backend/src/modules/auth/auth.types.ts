import { UserRole } from '@college-erp/shared';

export interface LoginDTO {
  email: string;
  password?: string;
  role?: UserRole;
  tenantId?: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface LogoutDTO {
  refreshToken?: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface FirebaseLoginDTO {
  idToken: string;
  role?: UserRole;
}

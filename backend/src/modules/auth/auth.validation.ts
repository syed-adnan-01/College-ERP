import { z } from 'zod';
import { ROLES } from '@college-erp/shared';

const userRoleSchema = z.enum([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.HOD,
  ROLES.FACULTY,
  ROLES.STUDENT,
  ROLES.PARENT,
  ROLES.STAFF,
]);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: userRoleSchema.optional(),
  tenantId: z.string().optional(),
});

export const firebaseLoginSchema = z.object({
  idToken: z.string().min(1),
  role: userRoleSchema.optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(16),
  newPassword: z.string().min(8),
});

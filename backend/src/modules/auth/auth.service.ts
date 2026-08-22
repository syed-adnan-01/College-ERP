import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { User } from '@prisma/client';
import { config } from '../../config/env.js';
import { getFirebaseAdmin } from '../../config/firebase.js';
import { ROLES, UserRole, AuthUser, LoginResponse } from '@college-erp/shared';
import { LoginDTO, RefreshTokenDTO, LogoutDTO, ForgotPasswordDTO, ResetPasswordDTO, FirebaseLoginDTO } from './auth.types.js';
import { PasswordPolicy } from './password.policy.js';
import { TenantService } from '../tenants/tenant.service.js';
import { getPermissionsForRole } from '../tenants/tenant.bootstrap.js';
import { prisma } from '../../shared/prisma.js';
import { runWithoutTenantScope } from '../../shared/tenantContext.js';

const REFRESH_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export class AuthService {
  static async login(dto: LoginDTO, tenantIdContext?: string): Promise<LoginResponse> {
    const emailClean = dto.email.trim().toLowerCase();
    const user = await this.findUserForLogin(emailClean, tenantIdContext);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is disabled. Please contact your institution administrator.');
    }

    if (user.role !== ROLES.SUPER_ADMIN && tenantIdContext && user.tenantId !== tenantIdContext) {
      throw new Error('User does not belong to the requested tenant');
    }

    if (user.role !== ROLES.SUPER_ADMIN && !tenantIdContext) {
      throw new Error('Tenant context is required for this account');
    }

    if (dto.role && user.role !== dto.role && user.role !== ROLES.SUPER_ADMIN) {
      throw new Error(`User does not have role '${dto.role}'`);
    }

    const isMatch = await bcrypt.compare(dto.password || '', user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return this.issueLoginResponse(user, tenantIdContext);
  }

  static async firebaseLogin(dto: FirebaseLoginDTO, tenantIdContext?: string): Promise<LoginResponse> {
    const firebaseAdmin = getFirebaseAdmin();
    if (!firebaseAdmin) {
      throw new Error('Firebase Auth is not configured on the backend server.');
    }

    let decodedToken;
    try {
      decodedToken = await firebaseAdmin.auth().verifyIdToken(dto.idToken);
    } catch (err: any) {
      throw new Error(`Firebase token verification failed: ${err.message}`);
    }

    const email = decodedToken.email?.toLowerCase();
    if (!email) {
      throw new Error('Firebase token does not contain an email address');
    }

    let user = await this.findUserForLogin(email, tenantIdContext);

    if (!user) {
      if (!tenantIdContext) {
        throw new Error('Tenant context is required for social login');
      }

      const nameParts = (decodedToken.name || 'Social User').split(' ');
      user = await runWithoutTenantScope(async () =>
        prisma.user.create({
          data: {
            tenantId: tenantIdContext,
            email,
            passwordHash: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10),
            role: dto.role || ROLES.STUDENT,
            firstName: nameParts[0] || 'Social',
            lastName: nameParts.slice(1).join(' ') || 'User',
            avatar: decodedToken.picture || null,
            firebaseUid: decodedToken.uid,
            isActive: true,
            emailVerified: Boolean(decodedToken.email_verified),
          },
        })
      );
    } else if (!user.firebaseUid) {
      user = await runWithoutTenantScope(() =>
        prisma.user.update({
          where: { id: user!.id },
          data: { firebaseUid: decodedToken.uid, avatar: decodedToken.picture || user!.avatar },
        })
      );
    }

    if (user.role !== ROLES.SUPER_ADMIN && tenantIdContext && user.tenantId !== tenantIdContext) {
      throw new Error('User does not belong to the requested tenant');
    }

    return this.issueLoginResponse(user, tenantIdContext, decodedToken.uid);
  }

  static async refreshToken(dto: RefreshTokenDTO): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = jwt.verify(dto.refreshToken, config.jwt.refreshSecret) as jwt.JwtPayload & {
        id: string;
        tenantId: string;
      };

      if (!decoded.jti) {
        throw new Error('Invalid refresh token');
      }

      const session = await runWithoutTenantScope(() =>
        prisma.session.findUnique({ where: { refreshJti: decoded.jti } })
      );

      if (!session || session.revokedAt || session.expiresAt.getTime() < Date.now() || session.userId !== decoded.id) {
        throw new Error('Refresh session is revoked');
      }

      const user = await runWithoutTenantScope(() => prisma.user.findUnique({ where: { id: decoded.id } }));
      if (!user || !user.isActive) {
        throw new Error('User inactive or invalid token');
      }

      await runWithoutTenantScope(() =>
        prisma.session.update({
          where: { id: session.id },
          data: { revokedAt: new Date() },
        })
      );

      const authUser = await this.toAuthUser(user);
      const accessToken = this.generateAccessToken(authUser);
      const refreshToken = await this.generateRefreshToken(authUser);
      return { accessToken, refreshToken };
    } catch {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static async logout(dto: LogoutDTO): Promise<void> {
    if (!dto.refreshToken) return;
    try {
      const decoded = jwt.verify(dto.refreshToken, config.jwt.refreshSecret) as jwt.JwtPayload;
      if (decoded.jti) {
        await runWithoutTenantScope(() =>
          prisma.session.updateMany({
            where: { refreshJti: decoded.jti },
            data: { revokedAt: new Date() },
          })
        );
      }
    } catch {
      // Logout remains idempotent for expired tokens.
    }
  }

  static async forgotPassword(dto: ForgotPasswordDTO): Promise<{ token: string; message: string }> {
    const emailClean = dto.email.trim().toLowerCase();
    const user = await runWithoutTenantScope(() => prisma.user.findFirst({ where: { email: emailClean } }));
    const genericMessage = 'If an account exists for this email, password reset instructions have been sent.';

    if (!user) {
      return { token: '', message: genericMessage };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(token);

    await runWithoutTenantScope(async () => {
      await prisma.passwordReset.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });
      await prisma.passwordReset.create({
        data: {
          tenantId: user.tenantId,
          userId: user.id,
          tokenHash,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        },
      });
    });

    return {
      token: config.env === 'production' ? '' : token,
      message: genericMessage,
    };
  }

  static async resetPassword(dto: ResetPasswordDTO): Promise<{ message: string }> {
    const policyResult = PasswordPolicy.validate(dto.newPassword);
    if (!policyResult.isValid) {
      throw new Error(`Password policy violation: ${policyResult.errors.join(', ')}`);
    }

    const tokenHash = this.hashToken(dto.token);
    const resetRecord = await runWithoutTenantScope(() =>
      prisma.passwordReset.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
      })
    );

    if (!resetRecord) {
      throw new Error('Invalid or expired password reset token');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await runWithoutTenantScope(async () => {
      await prisma.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash },
      });
      await prisma.passwordReset.update({
        where: { id: resetRecord.id },
        data: { usedAt: new Date() },
      });
      await prisma.session.updateMany({
        where: { userId: resetRecord.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    });

    return { message: 'Password has been reset successfully. You may now log in.' };
  }

  static async getUserById(userId: string): Promise<AuthUser | null> {
    const user = await runWithoutTenantScope(() => prisma.user.findUnique({ where: { id: userId } }));
    if (!user) return null;
    return this.toAuthUser(user);
  }

  private static async issueLoginResponse(
    user: User,
    tenantIdContext?: string,
    firebaseUid?: string
  ): Promise<LoginResponse> {
    const targetTenantId = user.role === ROLES.SUPER_ADMIN ? tenantIdContext || user.tenantId : user.tenantId;
    const tenant = await TenantService.getTenantById(targetTenantId);
    if (!tenant) {
      throw new Error('Associated tenant not found');
    }

    await runWithoutTenantScope(() =>
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })
    );

    const authUser = await this.toAuthUser({ ...user, tenantId: tenant.id }, firebaseUid);
    const accessToken = this.generateAccessToken(authUser);
    const refreshToken = await this.generateRefreshToken(authUser);

    return {
      user: authUser,
      tokens: { accessToken, refreshToken },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        logo: tenant.logo || tenant.logoUrl,
      },
    };
  }

  private static async toAuthUser(
    user: { id: string; tenantId: string; email: string; role: string; firstName: string; lastName: string; avatar?: string | null },
    firebaseUid?: string
  ): Promise<AuthUser> {
    const role = user.role as UserRole;
    return {
      id: user.id,
      uid: firebaseUid,
      tenantId: user.tenantId,
      email: user.email,
      role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      permissions: await getPermissionsForRole(user.tenantId, role),
    };
  }

  private static async findUserForLogin(email: string, tenantIdContext?: string) {
    return runWithoutTenantScope(async () => {
      if (tenantIdContext) {
        const scoped = await prisma.user.findFirst({
          where: { email, tenantId: tenantIdContext },
        });
        if (scoped) return scoped;
        return prisma.user.findFirst({ where: { email, role: ROLES.SUPER_ADMIN } });
      }

      const matches = await prisma.user.findMany({ where: { email } });
      if (matches.length === 1) return matches[0];
      return matches.find((item) => item.role === ROLES.SUPER_ADMIN) || null;
    });
  }

  private static generateAccessToken(user: AuthUser): string {
    return jwt.sign(
      {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.accessExpiry as jwt.SignOptions['expiresIn'] }
    );
  }

  private static async generateRefreshToken(user: AuthUser): Promise<string> {
    const jti = crypto.randomUUID();
    const token = jwt.sign(
      {
        id: user.id,
        tenantId: user.tenantId,
      },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiry as jwt.SignOptions['expiresIn'], jwtid: jti }
    );

    await runWithoutTenantScope(() =>
      prisma.session.create({
        data: {
          tenantId: user.tenantId,
          userId: user.id,
          refreshJti: jti,
          expiresAt: new Date(Date.now() + REFRESH_EXPIRY_MS),
        },
      })
    );

    return token;
  }

  private static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { AuthUser, ROLES, UserRole, hasPermission } from '@college-erp/shared';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid Authorization header' },
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as AuthUser;
    req.user = decoded;

    // Verify tenant scope if non-super-admin
    if (decoded.role !== ROLES.SUPER_ADMIN && !req.tenantId) {
      res.status(403).json({
        success: false,
        error: { code: 'TENANT_CONTEXT_REQUIRED', message: 'A tenant context is required for this account' },
      });
      return;
    }

    if (decoded.role !== ROLES.SUPER_ADMIN && decoded.tenantId !== req.tenantId) {
      res.status(403).json({
        success: false,
        error: { code: 'TENANT_MISMATCH', message: 'User does not belong to the requested tenant' },
      });
      return;
    }

    next();
  } catch (err: any) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Token is invalid or expired' },
    });
  }
}

export function requirePermission(...requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
      return;
    }

    const { role, permissions } = req.user;

    // Super admin bypasses all permission checks across all tenants
    if (role === ROLES.SUPER_ADMIN || (permissions && permissions.includes('*'))) {
      next();
      return;
    }

    const hasAll = requiredPermissions.every((perm) => hasPermission(role, permissions || [], perm));

    if (!hasAll) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Insufficient permissions. Required: ${requiredPermissions.join(', ')}`,
        },
      });
      return;
    }

    next();
  };
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
      return;
    }

    if (req.user.role === ROLES.SUPER_ADMIN || allowedRoles.includes(req.user.role)) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: `Role '${req.user.role}' is not authorized to access this resource`,
      },
    });
  };
}

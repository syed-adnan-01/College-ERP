import React from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '@college-erp/shared';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
}) => {
  const { hasRole, hasPermission } = usePermissions();

  if (allowedRoles && !hasRole(...allowedRoles)) {
    return <>{fallback}</>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

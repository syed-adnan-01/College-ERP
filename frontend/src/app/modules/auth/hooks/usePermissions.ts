import { useAuth } from './useAuth';
import { UserRole, ROLES } from '@college-erp/shared';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === ROLES.SUPER_ADMIN || (user.permissions && user.permissions.includes('*'))) {
      return true;
    }
    return Boolean(user.permissions && user.permissions.includes(permission));
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === ROLES.SUPER_ADMIN) return true;
    return roles.includes(user.role);
  };

  return {
    user,
    userRole: user?.role,
    userPermissions: user?.permissions || [],
    hasPermission,
    hasRole,
    isSuperAdmin: user?.role === ROLES.SUPER_ADMIN,
  };
};

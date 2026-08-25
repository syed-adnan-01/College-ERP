import bcrypt from 'bcryptjs';
import { PERMISSIONS, ROLE_DISPLAY_NAMES, ROLE_PERMISSIONS, ROLES, UserRole } from '@college-erp/shared';
import { prisma } from '../../shared/prisma.js';
import { runWithoutTenantScope } from '../../shared/tenantContext.js';
import { PasswordPolicy } from '../auth/password.policy.js';

export async function seedGlobalPermissions(): Promise<void> {
  const keys = Object.values(PERMISSIONS);
  await Promise.all(
    keys.map((key) =>
      prisma.permission.upsert({
        where: { key },
        update: {},
        create: { key, description: key },
      })
    )
  );
}

export async function seedTenantRbac(tenantId: string): Promise<void> {
  await runWithoutTenantScope(async () => {
    await seedGlobalPermissions();

    const tenantRoles = (Object.values(ROLES) as UserRole[]).filter((role) => role !== ROLES.SUPER_ADMIN);

    for (const role of tenantRoles) {
      await prisma.role.upsert({
        where: { tenantId_key: { tenantId, key: role } },
        update: { name: ROLE_DISPLAY_NAMES[role] },
        create: {
          tenantId,
          key: role,
          name: ROLE_DISPLAY_NAMES[role],
          isSystem: true,
        },
      });

      const permissionKeys = (ROLE_PERMISSIONS[role] || []).filter((key) => key !== '*');
      for (const key of permissionKeys) {
        const permission = await prisma.permission.findUnique({ where: { key } });
        if (!permission) continue;

        await prisma.rolePermission.upsert({
          where: {
            tenantId_role_permissionId: {
              tenantId,
              role,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            tenantId,
            role,
            permissionId: permission.id,
          },
        });
      }
    }
  });
}

export async function createTenantAdmin(
  tenantId: string,
  input: { email: string; password: string; firstName: string; lastName: string }
) {
  const policyResult = PasswordPolicy.validate(input.password);
  if (!policyResult.isValid) {
    throw new Error(`Password policy violation: ${policyResult.errors.join(', ')}`);
  }

  return runWithoutTenantScope(() =>
    prisma.user.create({
      data: {
        tenantId,
        email: input.email.trim().toLowerCase(),
        passwordHash: bcrypt.hashSync(input.password, 10),
        firstName: input.firstName,
        lastName: input.lastName,
        role: ROLES.ADMIN,
        isActive: true,
        emailVerified: true,
      },
    })
  );
}

export async function getPermissionsForRole(tenantId: string, role: UserRole): Promise<string[]> {
  if (role === ROLES.SUPER_ADMIN) {
    return ['*'];
  }

  return runWithoutTenantScope(async () => {
    const assigned = await prisma.rolePermission.findMany({
      where: { tenantId, role },
      include: { permission: true },
    });

    if (assigned.length > 0) {
      return assigned.map((item) => item.permission.key);
    }

    return (ROLE_PERMISSIONS[role] || []) as string[];
  });
}

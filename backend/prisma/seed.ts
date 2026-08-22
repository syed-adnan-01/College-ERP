import { prisma } from '../src/shared/prisma.js';
import { runWithoutTenantScope } from '../src/shared/tenantContext.js';
import { TenantService } from '../src/modules/tenants/tenant.service.js';
import { ROLES } from '@college-erp/shared';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting Database Seeding...');

  try {
    // Check if demo tenant already exists
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: 'demo' } });
    if (existingTenant) {
      console.log('⚠️ Demo tenant already exists. Cleaning up before re-seeding...');
      await prisma.tenant.delete({ where: { id: existingTenant.id } });
    }

    // 1. Create Demo Tenant (Also creates admin@demo.edu and seeds RBAC)
    console.log('🏢 Creating Demo University Tenant...');
    const tenant = await TenantService.createTenant({
      name: 'Demo University',
      slug: 'demo',
      domain: 'demo.eduplatform.com',
      adminEmail: 'admin@demo.edu',
      adminPassword: 'Password@123',
      adminFirstName: 'Super',
      adminLastName: 'Admin',
    });
    console.log(`✅ Tenant created with ID: ${tenant.id}`);

    // 2. Create Faculty User
    console.log('👨‍🏫 Creating Faculty User (faculty@demo.edu)...');
    await runWithoutTenantScope(async () => {
      await prisma.user.create({
        data: {
          tenantId: tenant.id,
          email: 'faculty@demo.edu',
          passwordHash: bcrypt.hashSync('Password@123', 10),
          firstName: 'John',
          lastName: 'Doe',
          role: ROLES.FACULTY,
          isActive: true,
          emailVerified: true,
        },
      });
    });

    // 3. Create Student User
    console.log('🎓 Creating Student User (student@demo.edu)...');
    await runWithoutTenantScope(async () => {
      await prisma.user.create({
        data: {
          tenantId: tenant.id,
          email: 'student@demo.edu',
          passwordHash: bcrypt.hashSync('Password@123', 10),
          firstName: 'Alice',
          lastName: 'Smith',
          role: ROLES.STUDENT,
          isActive: true,
          emailVerified: true,
        },
      });
    });

    console.log('🎉 Seeding completed successfully!');
    console.log('');
    console.log('Login Credentials:');
    console.log('- Admin:   admin@demo.edu   / Password@123');
    console.log('- Faculty: faculty@demo.edu / Password@123');
    console.log('- Student: student@demo.edu / Password@123');
    console.log('');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    // Because Prisma is extended, we disconnect the base client explicitly if needed, but it's fine.
    process.exit(0);
  }
}

main();
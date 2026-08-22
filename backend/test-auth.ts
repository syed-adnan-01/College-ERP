import app from './src/server.js';
import { AuthService } from './src/modules/auth/auth.service.js';
import { TenantService } from './src/modules/tenants/tenant.service.js';

async function runVerificationTests() {
  console.log('🧪 Starting Phase 1 Verification Test Suite...\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  };

  try {
    // 1. Tenant Resolution & Listing Test
    const tenants = await TenantService.getAllTenants();
    assert(tenants.length >= 2, 'TenantService retrieves demo tenants');

    const demoTenant = await TenantService.getTenantBySlug('demo');
    assert(demoTenant !== null && demoTenant.slug === 'demo', 'TenantService resolves by slug "demo"');

    const domainTenant = await TenantService.getTenantByDomain('demo.eduplatform.com');
    assert(domainTenant !== null && domainTenant.id === 'tenant-demo-001', 'TenantService resolves by domain "demo.eduplatform.com"');

    // 2. Tenant Scoping Architecture Helper Test
    const scoped = TenantService.scopeTenantQuery('tenant-demo-001', { where: { active: true } });
    assert(scoped.tenantId === 'tenant-demo-001' && scoped.where.tenantId === 'tenant-demo-001', 'Prisma tenantId scoping helper injects tenantId');

    // 3. User Authentication Test (Admin & Student Roles)
    const adminLogin = await AuthService.login({
      email: 'admin@demo.edu',
      password: 'Admin@123456',
      role: 'admin',
    }, 'tenant-demo-001');
    assert(adminLogin.tokens.accessToken.length > 20, 'Admin login generates valid access token');
    assert(adminLogin.user.role === 'admin', 'Admin user role matches "admin"');
    assert(adminLogin.user.permissions.includes('tenants.view'), 'Admin user granted "tenants.view" permission');

    const studentLogin = await AuthService.login({
      email: 'student@demo.edu',
      password: 'Student@123456',
      role: 'student',
    }, 'tenant-demo-001');
    assert(studentLogin.user.role === 'student', 'Student user role matches "student"');
    assert(!studentLogin.user.permissions.includes('users.delete'), 'Student user strictly lacks admin delete permissions');

    // 4. Token Refresh Test
    const refreshRes = await AuthService.refreshToken({ refreshToken: adminLogin.tokens.refreshToken });
    assert(refreshRes.accessToken.length > 20, 'Refresh token generates new access token');

    // 5. Super Admin Cross-Tenant Permission Test
    const superAdminLogin = await AuthService.login({
      email: 'superadmin@eduplatform.com',
      password: 'Admin@123456',
    });
    assert(superAdminLogin.user.role === 'super_admin', 'Super admin role assigned');
    assert(superAdminLogin.user.permissions.includes('*'), 'Super admin granted cross-tenant wildcard access (*)');

    // 6. Password Reset Flow Test
    const forgotRes = await AuthService.forgotPassword({ email: 'student@demo.edu' });
    assert(forgotRes.token.length > 5, 'Forgot password generates reset token');

    const resetRes = await AuthService.resetPassword({
      token: forgotRes.token,
      newPassword: 'NewPassword@12345',
    });
    assert(resetRes.message.includes('successfully'), 'Password reset succeeds with valid token');

    const newLogin = await AuthService.login({
      email: 'student@demo.edu',
      password: 'NewPassword@12345',
    }, 'tenant-demo-001');
    assert(newLogin.user.id === 'usr-student-004', 'Student login succeeds with updated password');

  } catch (err: any) {
    console.error('Test execution exception:', err);
    failed++;
  }

  console.log(`\n📊 Verification Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runVerificationTests();

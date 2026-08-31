import { useAuth } from "../modules/auth/hooks/useAuth";
import { usePermissions } from "../modules/auth/hooks/usePermissions";
import { useTenant } from "../modules/auth/context/TenantContext";
import { GraduationCap, LogOut, ShieldCheck, Building, User, Key, CheckCircle } from "lucide-react";

export function DashboardDemo() {
  const { user, logout } = useAuth();
  const { userPermissions, isSuperAdmin } = usePermissions();
  const { tenant } = useTenant();

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#12172B] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#E5E0D2] bg-white/90 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-[#E8B93F] text-[#12172B] p-2 rounded-xl shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-serif text-[#12172B]">EduPlatform ERP Portal</h1>
            <p className="text-xs text-[#5C6788] font-medium">
              Tenant: {tenant?.name || user?.tenantId || "Demo University"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-[#EDE9DF]/60 px-3.5 py-1.5 rounded-full border border-[#E5E0D2]">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-white" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#12172B] text-white flex items-center justify-center text-xs font-bold">
                {user?.firstName?.[0] || "U"}
              </div>
            )}
            <span className="text-sm font-semibold text-[#12172B]">{user?.firstName} {user?.lastName}</span>
            <span className="text-xs px-2.5 py-0.5 bg-[#FFF9E6] text-[#12172B] border border-[#E8B93F] rounded-full uppercase tracking-wider font-bold">
              {user?.role}
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 bg-[#FEF2F0] hover:bg-[#FDE2DC] text-[#9C3823] border border-[#E2725B]/40 px-4 py-2 rounded-xl transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Welcome Alert in Ink Paper */}
        <div className="bg-[#12172B] text-white border border-[#232D4B] rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-1">
              Welcome back, {user?.firstName}!
            </h2>
            <p className="text-[#8B96B5] text-sm">
              You are authenticated as <strong className="text-[#E8B93F] capitalize">{user?.role}</strong> in tenant{" "}
              <strong className="text-white">{tenant?.name || user?.tenantId}</strong>.
            </p>
          </div>
          {isSuperAdmin && (
            <div className="bg-[#FFF9E6] text-[#12172B] border border-[#E8B93F] px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#E8B93F]" />
              <span>Cross-Tenant Platform Access Active</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="paper-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#E8B93F]/15 text-[#12172B]">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif">User Identity</h3>
            </div>
            <div className="space-y-2 text-sm text-[#5C6788]">
              <p><strong>User ID:</strong> <code className="text-[#12172B] bg-[#EDE9DF] px-1.5 py-0.5 rounded text-xs">{user?.id}</code></p>
              <p><strong>Email:</strong> <span className="text-[#12172B]">{user?.email}</span></p>
              <p><strong>Role:</strong> <span className="capitalize text-[#12172B] font-semibold">{user?.role}</span></p>
              <p><strong>Tenant ID:</strong> <code className="text-[#12172B] bg-[#EDE9DF] px-1.5 py-0.5 rounded text-xs">{user?.tenantId}</code></p>
            </div>
          </div>

          {/* Tenant Context Card */}
          <div className="paper-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#5C6788]/15 text-[#12172B]">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif">Tenant Context</h3>
            </div>
            <div className="space-y-2 text-sm text-[#5C6788]">
              <p><strong>Tenant Name:</strong> <span className="text-[#12172B] font-semibold">{tenant?.name || "Demo University"}</span></p>
              <p><strong>Slug:</strong> <code className="text-[#12172B] bg-[#EDE9DF] px-1.5 py-0.5 rounded text-xs">{tenant?.slug || "demo"}</code></p>
              <p><strong>Domain:</strong> <span className="text-[#12172B]">{tenant?.domain || "demo.eduplatform.com"}</span></p>
              <p><strong>Subscription:</strong> <span className="text-[#12172B] font-semibold">{tenant?.subscriptionTier || tenant?.subscription || "PRO"}</span></p>
            </div>
          </div>

          {/* Role & Permissions Card */}
          <div className="paper-card p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#2E7D68]/15 text-[#2E7D68]">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif">Granted Permissions</h3>
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1.5">
              {userPermissions.map((perm) => (
                <div key={perm} className="flex items-center space-x-2 text-xs text-[#12172B] bg-[#FDFCF7] px-2.5 py-1.5 rounded border border-[#E5E0D2]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E7D68] flex-shrink-0" />
                  <code>{perm}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

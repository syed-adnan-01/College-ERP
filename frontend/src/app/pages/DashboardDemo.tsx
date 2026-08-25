import { useAuth } from "../modules/auth/hooks/useAuth";
import { usePermissions } from "../modules/auth/hooks/usePermissions";
import { useTenant } from "../modules/auth/context/TenantContext";
import { GraduationCap, LogOut, ShieldCheck, Building, User, Key, CheckCircle } from "lucide-react";

export function DashboardDemo() {
  const { user, logout } = useAuth();
  const { userPermissions, isSuperAdmin } = usePermissions();
  const { tenant } = useTenant();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">EduPlatform ERP Portal</h1>
            <p className="text-xs text-blue-400 font-medium">
              Tenant: {tenant?.name || user?.tenantId || "Demo University"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-gray-300" />
            )}
            <span className="text-sm font-semibold">{user?.firstName} {user?.lastName}</span>
            <span className="text-xs px-2 py-0.5 bg-blue-900/60 text-blue-300 border border-blue-700/50 rounded-full uppercase tracking-wider font-bold">
              {user?.role}
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Welcome Alert */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-indigo-800/50 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.firstName}!
            </h2>
            <p className="text-gray-300 text-sm">
              You are authenticated as <strong className="text-blue-400 capitalize">{user?.role}</strong> in tenant{" "}
              <strong className="text-indigo-300">{tenant?.name || user?.tenantId}</strong>.
            </p>
          </div>
          {isSuperAdmin && (
            <div className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Cross-Tenant Platform Access Active</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-gray-950/60 border border-gray-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold">User Identity</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>User ID:</strong> <code className="text-gray-400 text-xs">{user?.id}</code></p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> <span className="capitalize">{user?.role}</span></p>
              <p><strong>Tenant ID:</strong> <code className="text-gray-400 text-xs">{user?.tenantId}</code></p>
            </div>
          </div>

          {/* Tenant Context Card */}
          <div className="bg-gray-950/60 border border-gray-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-bold">Tenant Context</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Tenant Name:</strong> {tenant?.name || "Demo University"}</p>
              <p><strong>Slug:</strong> <code className="text-gray-400 text-xs">{tenant?.slug || "demo"}</code></p>
              <p><strong>Domain:</strong> {tenant?.domain || "demo.eduplatform.com"}</p>
              <p><strong>Subscription:</strong> {tenant?.subscriptionTier || tenant?.subscription || "PRO"}</p>
            </div>
          </div>

          {/* Role & Permissions Card */}
          <div className="bg-gray-950/60 border border-gray-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <Key className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold">Granted Permissions</h3>
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1.5">
              {userPermissions.map((perm) => (
                <div key={perm} className="flex items-center space-x-2 text-xs text-gray-300 bg-gray-900/90 px-2.5 py-1 rounded border border-gray-800">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
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

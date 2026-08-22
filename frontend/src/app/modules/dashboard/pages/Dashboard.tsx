import { useAuth } from "../../auth/hooks/useAuth";
import { AdminDashboard } from "./AdminDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { LogOut, User, GraduationCap } from "lucide-react";
import { useTenant } from "../../auth/context/TenantContext";

export function Dashboard() {
  const { user, logout } = useAuth();
  const { tenant } = useTenant();

  const renderDashboard = () => {
    switch (user?.role) {
      case "super_admin":
      case "admin":
        return <AdminDashboard />;
      case "faculty":
      case "hod":
        return <FacultyDashboard />;
      case "student":
        return <StudentDashboard />;
      default:
        return <div>Access Denied or Unknown Role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            {tenant?.logo ? (
              <img src={tenant.logo} alt="Logo" className="w-6 h-6 object-contain" />
            ) : (
              <GraduationCap className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{tenant?.name || "EduPlatform"}</h1>
            <p className="text-xs text-blue-600 font-medium">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm font-semibold text-gray-700">{user?.firstName} {user?.lastName}</span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-full uppercase tracking-wider font-bold">
              {user?.role}
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.firstName}!</h2>
          <p className="text-gray-500">Here's what's happening at {tenant?.name || "your college"} today.</p>
        </div>

        {renderDashboard()}
      </main>
    </div>
  );
}

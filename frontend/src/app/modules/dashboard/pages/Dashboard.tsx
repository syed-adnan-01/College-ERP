import { useAuth } from "../../auth/hooks/useAuth";
import { AdminDashboard } from "./AdminDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { LogOut, User, Menu } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

export function Dashboard() {
  const { user, logout } = useAuth();

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-gray-50">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm sticky top-0 z-50 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="w-px h-4 bg-gray-200 mx-2" />
            <h2 className="text-sm font-semibold text-gray-800">Overview</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user?.firstName}!</h2>
            <p className="text-gray-500 mt-1">Here's your summary for today.</p>
          </div>

          {renderDashboard()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

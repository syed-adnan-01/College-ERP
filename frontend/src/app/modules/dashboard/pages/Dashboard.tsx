import { useAuth } from "../../auth/hooks/useAuth";
import { AdminDashboard } from "./AdminDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { LogOut, User, Menu } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";

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
      <SidebarInset className="flex flex-col min-h-screen bg-[#F7F5EF]">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#E5E0D2] bg-white/90 backdrop-blur-sm px-6 sticky top-0 z-50 justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 text-[#12172B] hover:bg-[#EDE9DF]" />
            <div className="w-px h-4 bg-[#E5E0D2]" />
            <h2 className="text-sm font-semibold text-[#5C6788] uppercase tracking-wider font-sans">Student Desk</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2.5 bg-[#EDE9DF]/60 px-3.5 py-1.5 rounded-full border border-[#E5E0D2]">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-white" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#12172B] text-white flex items-center justify-center text-xs font-bold">
                  {user?.firstName?.[0] || "S"}
                </div>
              )}
              <span className="text-sm font-medium text-[#12172B] hidden sm:inline-block">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center space-x-1.5 text-[#5C6788] hover:text-[#E2725B] transition-colors text-sm font-medium px-2.5 py-1.5 rounded-lg hover:bg-[#FEF2F0]"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#12172B] tracking-tight">
                Welcome back,{" "}
                <HighlighterUnderline color="#E8B93F">
                  {user?.firstName || "Scholar"}
                </HighlighterUnderline>
                !
              </h2>
              <p className="text-[#5C6788] mt-1.5 text-base font-normal">
                You're on a 5-day study streak. Here's what's on your desk today.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="margin-note">
                ⚡ 5-day streak active
              </span>
            </div>
          </div>

          {renderDashboard()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

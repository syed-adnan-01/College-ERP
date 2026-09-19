import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { AdminDashboard } from "./AdminDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { LogOut, User, Menu, Sparkles } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";

export function Dashboard() {
  const { user, logout } = useAuth();

  // Allow previewing different role views for developer/admin verification
  const [activeRoleOverride, setActiveRoleOverride] = useState<string | null>(null);

  const effectiveRole = activeRoleOverride || user?.role || "student";

  const getDeskInfo = () => {
    switch (effectiveRole) {
      case "super_admin":
      case "admin":
        return {
          title: "Central Administration Desk",
          greeting: user?.firstName || "Administrator",
          subtitle: "Campus-wide overview, matriculation analytics, and fiscal oversight.",
          badge: "🏛️ Executive Operations Live",
        };
      case "faculty":
      case "hod":
        return {
          title: "Faculty Instruction Desk",
          greeting: user?.firstName ? `Prof. ${user.firstName}` : "Professor",
          subtitle: "Teaching schedule, syllabus coverage, and student assessment queue.",
          badge: "📚 3 Lectures Scheduled Today",
        };
      case "student":
      default:
        return {
          title: "Student Scholar Desk",
          greeting: user?.firstName || "Scholar",
          subtitle: "You're on a 5-day study streak. Here's what's on your desk today.",
          badge: "⚡ 5-day study streak active",
        };
    }
  };

  const deskInfo = getDeskInfo();

  const renderDashboard = () => {
    switch (effectiveRole) {
      case "super_admin":
      case "admin":
        return <AdminDashboard />;
      case "faculty":
      case "hod":
        return <FacultyDashboard />;
      case "student":
      default:
        return <StudentDashboard />;
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
            <h2 className="text-sm font-semibold text-[#5C6788] uppercase tracking-wider font-sans">
              {deskInfo.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Role View Previewer for convenient Phase 3 verification */}
            <div className="hidden lg:flex items-center bg-[#EDE9DF]/60 p-1 rounded-full border border-[#E5E0D2] text-[11px] font-semibold">
              <span className="px-2 text-[#5C6788]">View Mode:</span>
              <button
                type="button"
                onClick={() => setActiveRoleOverride("admin")}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  effectiveRole === "admin" || effectiveRole === "super_admin"
                    ? "bg-[#12172B] text-white shadow-2xs"
                    : "text-[#5C6788] hover:text-[#12172B]"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleOverride("faculty")}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  effectiveRole === "faculty" || effectiveRole === "hod"
                    ? "bg-[#12172B] text-white shadow-2xs"
                    : "text-[#5C6788] hover:text-[#12172B]"
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleOverride("student")}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  effectiveRole === "student"
                    ? "bg-[#12172B] text-white shadow-2xs"
                    : "text-[#5C6788] hover:text-[#12172B]"
                }`}
              >
                Student
              </button>
            </div>

            <div className="flex items-center space-x-2.5 bg-[#EDE9DF]/60 px-3.5 py-1.5 rounded-full border border-[#E5E0D2]">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover border border-white"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#12172B] text-white flex items-center justify-center text-xs font-bold">
                  {user?.firstName?.[0] || "U"}
                </div>
              )}
              <span className="text-sm font-medium text-[#12172B] hidden sm:inline-block">
                {user?.firstName || "Signed User"} {user?.lastName || ""}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center space-x-1.5 text-[#5C6788] hover:text-[#E2725B] transition-colors text-sm font-medium px-2.5 py-1.5 rounded-lg hover:bg-[#FEF2F0] cursor-pointer"
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
                  {deskInfo.greeting}
                </HighlighterUnderline>
                !
              </h2>
              <p className="text-[#5C6788] mt-1.5 text-base font-normal">
                {deskInfo.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="margin-note">
                {deskInfo.badge}
              </span>
            </div>
          </div>

          {renderDashboard()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

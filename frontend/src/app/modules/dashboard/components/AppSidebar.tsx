import { useAuth } from "../../auth/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { useTenant } from "../../auth/context/TenantContext";
import { GraduationCap, LayoutDashboard, Users, BookOpen, Calendar, Settings, CreditCard, Bell, FileText, Briefcase } from "lucide-react";
import { Link } from "react-router";

export function AppSidebar() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  const getLinksForRole = () => {
    const role = user?.role;
    if (role === "admin" || role === "super_admin") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Students", url: "/students", icon: Users },
        { title: "Faculty", url: "/faculty", icon: Briefcase },
        { title: "Academics", url: "/academics", icon: BookOpen },
        { title: "Finance", url: "/finance", icon: CreditCard },
        { title: "Settings", url: "/settings", icon: Settings },
      ];
    }
    if (role === "faculty" || role === "hod") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "My Classes", url: "/classes", icon: Calendar },
        { title: "Attendance", url: "/attendance", icon: Users },
        { title: "Assignments", url: "/assignments", icon: FileText },
        { title: "Notices", url: "/notices", icon: Bell },
      ];
    }
    if (role === "student") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "My Courses", url: "/my-courses", icon: BookOpen },
        { title: "Timetable", url: "/timetable", icon: Calendar },
        { title: "Attendance", url: "/my-attendance", icon: Users },
        { title: "Fees", url: "/fees", icon: CreditCard },
        { title: "Exams & Results", url: "/exams", icon: FileText },
      ];
    }
    return [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }];
  };

  const links = getLinksForRole();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar h-16 flex items-center justify-center px-4">
        <div className="flex items-center space-x-3 w-full">
          <div className="bg-blue-600 p-2 rounded-xl flex-shrink-0">
            {tenant?.logo ? (
              <img src={tenant.logo} alt="Logo" className="w-6 h-6 object-contain" />
            ) : (
              <GraduationCap className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="truncate">
            <h1 className="text-sm font-bold text-sidebar-foreground truncate">{tenant?.name || "EduPlatform"}</h1>
            <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest font-bold">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { Link, useLocation } from "react-router";
import { GraduationCap, Menu, X, ArrowRight, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTenant } from "../../modules/auth/context/TenantContext";
import { useAuth } from "../../modules/auth/hooks/useAuth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Faculty", path: "/faculty" },
  { name: "Admissions", path: "/admissions" },
  { name: "Events", path: "/events" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const { tenant } = useTenant();
  const { user, isAuthenticated } = useAuth();

  const collegeName = tenant?.name || "EduPlatform";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Campus Announcement Bar */}
      <div className="bg-[#12172B] text-[#EDE9DF] text-xs py-2 px-4 border-b border-[#232D4B] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-[#E8B93F] text-[#12172B] px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase flex-shrink-0">
              Admissions 2026
            </span>
            <span className="text-[#8B96B5] truncate text-[11px] sm:text-xs">
              Early Decision & Scholarship Window is now open through Nov 15.
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-[#8B96B5] flex-shrink-0">
            <Link to="/admissions" className="text-[#E8B93F] hover:underline font-medium flex items-center gap-1">
              <span>View Requirements</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-[#232D4B]">|</span>
            <span>Tel: +1 (555) 123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#E5E0D2] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo / College Name */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-[#12172B] text-[#E8B93F] p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-xs border border-[#232D4B]">
                {tenant?.logo ? (
                  <img src={tenant.logo} alt={collegeName} className="w-6 h-6 object-contain" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-[#E8B93F]" />
                )}
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-[#12172B] tracking-tight block">
                  {collegeName}
                </span>
                <span className="text-[10px] text-[#5C6788] font-semibold uppercase tracking-widest block -mt-1">
                  Academic Portal
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <div 
                className="flex items-center space-x-1 p-1 bg-[#EDE9DF]/70 rounded-2xl border border-[#E5E0D2]"
                onMouseLeave={() => setHoveredPath(null)}
              >
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  const isHovered = hoveredPath === link.path;
                  
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => setHoveredPath(link.path)}
                      className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-150 z-10 ${
                        active
                          ? "text-[#F7F5EF] font-semibold"
                          : "text-[#5C6788] hover:text-[#12172B]"
                      }`}
                    >
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="active-nav-bubble"
                          className="absolute inset-0 bg-[#12172B] rounded-xl shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}

                      {/* Hover subtle highlight */}
                      {!active && isHovered && (
                        <motion.div
                          layoutId="hover-nav-bubble"
                          className="absolute inset-0 bg-white/70 rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 480, damping: 35 }}
                        />
                      )}

                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Action Button: Dashboard or Login */}
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="ml-3 px-5 py-2 bg-[#12172B] hover:bg-[#1f2742] text-[#F7F5EF] font-medium rounded-xl transition-all shadow-xs flex items-center space-x-2 text-sm border border-[#12172B]"
                >
                  <User className="w-4 h-4 text-[#E8B93F]" />
                  <span>My Desk</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="ml-3 px-5 py-2 bg-[#12172B] hover:bg-[#1f2742] text-[#F7F5EF] font-medium rounded-xl hover:shadow-sm hover:scale-[1.02] transition-all text-sm flex items-center space-x-1.5 border border-[#12172B]"
                >
                  <span>Portal Login</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8B93F]" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-3.5 py-1.5 bg-[#12172B] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <span>My Desk</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 bg-[#12172B] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <span>Sign In</span>
                </Link>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-[#12172B] hover:bg-[#EDE9DF] transition-colors border border-[#E5E0D2]"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#E5E0D2] bg-[#F7F5EF] px-4 py-4 space-y-1.5 shadow-md overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-[#12172B] text-[#F7F5EF] font-semibold"
                      : "text-[#5C6788] hover:bg-[#EDE9DF] hover:text-[#12172B]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-[#E5E0D2]">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 bg-[#12172B] text-white rounded-xl text-center font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <span>{isAuthenticated ? "Open My Dashboard" : "Sign In to Student / Faculty Portal"}</span>
                  <ArrowRight className="w-4 h-4 text-[#E8B93F]" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}


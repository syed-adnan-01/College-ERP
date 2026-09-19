import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, ShieldCheck, Sparkles, BookOpen, ChevronLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTenant } from "../context/TenantContext";
import { UserRole } from "@college-erp/shared";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";

export function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, loginAsDemo, loginWithGoogle, loginWithMicrosoft, loading } = useAuth();
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const roles = [
    { id: "student" as UserRole, label: "Student", desc: "Coursework & Grades", icon: GraduationCap },
    { id: "faculty" as UserRole, label: "Faculty", desc: "Rosters & Grading", icon: BookOpen },
    { id: "admin" as UserRole, label: "Admin", desc: "Campus Operations", icon: ShieldCheck },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await login(formData.email, formData.password, selectedRole, tenant?.slug);
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to log in. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    try {
      await loginWithGoogle(selectedRole);
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || "Google Social Login failed.");
    }
  };

  const handleMicrosoftLogin = async () => {
    setErrorMessage(null);
    try {
      await loginWithMicrosoft(selectedRole);
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || "Microsoft Social Login failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#12172B] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 campus-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 ambient-glow-amber rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 ambient-glow-navy rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8B96B5] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 text-[#E8B93F]" />
            <span>Campus Gateway</span>
          </Link>

          <span className="academic-stamp text-[10px] py-0.5 px-2 bg-white/10 text-[#E8B93F] border-[#E8B93F]/40">
            Secure SSO Portal
          </span>
        </div>

        {/* Brand Banner */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center space-x-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-[#EDE9DF] text-[#12172B] flex items-center justify-center font-serif font-bold text-lg shadow-md">
              {tenant?.logo ? (
                <img src={tenant.logo} alt={collegeName} className="w-6 h-6 object-contain" />
              ) : (
                collegeName.charAt(0)
              )}
            </div>
            <span className="text-2xl font-bold font-serif tracking-tight">{collegeName}</span>
          </div>
          <p className="text-xs text-[#8B96B5]">
            Sign in to access your digital workspace and campus records
          </p>
        </div>

        {/* Tactile Login Card */}
        <div className="paper-card p-7 sm:p-9 shadow-2xl relative">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-[#FFF0ED] border border-[#E2725B] text-[#9E3622] rounded-xl text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Role Switcher */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6788]">
                Authenticate As
              </label>
              <span className="text-[10px] text-[#5C6788] font-medium">Select portal role</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      isActive
                        ? "bg-[#12172B] border-[#12172B] text-white shadow-md ring-2 ring-[#E8B93F]/40"
                        : "bg-[#EDE9DF]/40 border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF] hover:text-[#12172B]"
                    }`}
                  >
                    <RoleIcon className={`w-5 h-5 ${isActive ? "text-[#E8B93F]" : "text-[#5C6788]"}`} />
                    <span className="text-xs font-bold block">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#12172B] mb-1.5">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none transition-all"
                  placeholder={`${selectedRole}@${tenant?.slug || "eduplatform"}.edu`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-[#12172B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-[#5C6788] hover:text-[#12172B]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-[#E5E0D2] text-[#12172B] focus:ring-[#E8B93F]"
                />
                <span className="text-xs text-[#5C6788]">Remember device</span>
              </label>
              <Link to="/forgot-password" className="text-xs font-semibold text-[#12172B] hover:text-[#E8B93F]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Verifying Credentials..." : `Sign in to ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Portal`}</span>
              <ArrowRight className="w-4 h-4 text-[#E8B93F]" />
            </button>
          </form>

          {/* Social Sign-On Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-[#E5E0D2]"></div>
            <span className="px-3 text-[11px] font-semibold text-[#5C6788] uppercase tracking-wider">
              Single Sign-On
            </span>
            <div className="flex-1 border-t border-[#E5E0D2]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="px-3.5 py-2.5 bg-white border border-[#E5E0D2] hover:bg-[#EDE9DF]/50 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-semibold text-[#12172B]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google SSO</span>
            </button>

            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="px-3.5 py-2.5 bg-white border border-[#E5E0D2] hover:bg-[#EDE9DF]/50 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-semibold text-[#12172B]"
            >
              <svg className="w-4 h-4" fill="#0078D4" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
              </svg>
              <span>Microsoft 365</span>
            </button>
          </div>

          {/* Fast Demo Access */}
          <div className="mt-5 p-3 rounded-xl bg-[#EDE9DF]/60 border border-[#E5E0D2] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#12172B] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E8B93F]" />
                Explore Phase 3 Dashboards
              </span>
              <span className="academic-stamp text-[9px] py-0.5 px-1.5">Instant Access</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemo("admin");
                  navigate("/dashboard");
                }}
                className="py-1.5 px-2 bg-white hover:bg-[#12172B] hover:text-white border border-[#E5E0D2] rounded-lg text-[11px] font-semibold text-[#12172B] transition-all text-center cursor-pointer shadow-2xs"
              >
                Admin Desk
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo("faculty");
                  navigate("/dashboard");
                }}
                className="py-1.5 px-2 bg-white hover:bg-[#12172B] hover:text-white border border-[#E5E0D2] rounded-lg text-[11px] font-semibold text-[#12172B] transition-all text-center cursor-pointer shadow-2xs"
              >
                Faculty Desk
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo("student");
                  navigate("/dashboard");
                }}
                className="py-1.5 px-2 bg-white hover:bg-[#12172B] hover:text-white border border-[#E5E0D2] rounded-lg text-[11px] font-semibold text-[#12172B] transition-all text-center cursor-pointer shadow-2xs"
              >
                Student Desk
              </button>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#E5E0D2] text-center text-xs text-[#5C6788]">
            <span>Prospective applicant? </span>
            <Link to="/admissions" className="font-bold text-[#12172B] hover:text-[#E8B93F] underline decoration-[#E8B93F]">
              Apply for 2026 Admissions
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}


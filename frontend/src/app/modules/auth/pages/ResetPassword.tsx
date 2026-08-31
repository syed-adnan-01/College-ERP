import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { GraduationCap, Lock, Key, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTenant } from "../context/TenantContext";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const { resetPassword } = useAuth();
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    setStatus({ type: "loading", message: "" });
    try {
      const msg = await resetPassword(token, newPassword);
      setStatus({ type: "success", message: msg || "Password reset successfully!" });
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Failed to reset password. Please check your token and password strength.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#12172B] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 campus-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 ambient-glow-amber rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/login"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8B96B5] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 text-[#E8B93F]" />
            <span>Back to Login</span>
          </Link>
        </div>

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
          <h1 className="text-xl font-bold font-serif text-white">Establish New Security Credentials</h1>
          <p className="text-xs text-[#8B96B5]">Enter your reset token and new passphrase</p>
        </div>

        <div className="paper-card p-7 sm:p-8 shadow-2xl">
          {status.type === "success" ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-[#EDE9DF] text-[#2E7D68] rounded-2xl flex items-center justify-center mx-auto border border-[#2E7D68]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-serif text-[#12172B]">Password Successfully Reset</h3>
              <p className="text-xs text-[#5C6788]">{status.message}</p>
              <p className="text-xs text-[#8B96B5]">Redirecting to Sign In portal...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.type === "error" && (
                <div className="p-3.5 bg-[#FFF0ED] border border-[#E2725B] text-[#9E3622] rounded-xl text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{status.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#12172B] mb-1.5">Reset Token</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
                  <input
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none transition-all"
                    placeholder="Paste reset token here"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12172B] mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none transition-all"
                    placeholder="Min 8 characters, uppercase & symbol"
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

              <div>
                <label className="block text-xs font-bold text-[#12172B] mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none transition-all"
                    placeholder="Repeat new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full py-3 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
              >
                <span>{status.type === "loading" ? "Updating Passphrase..." : "Commit New Password"}</span>
                <ArrowRight className="w-4 h-4 text-[#E8B93F]" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center border-t border-[#E5E0D2] pt-4">
            <Link to="/login" className="text-xs font-bold text-[#12172B] hover:text-[#E8B93F]">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


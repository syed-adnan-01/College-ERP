import { useState } from "react";
import { Link } from "react-router";
import { GraduationCap, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });
    try {
      const msg = await forgotPassword(email);
      setStatus({
        type: "success",
        message: msg || "Password reset token generated! In a live environment, an email is sent to your inbox.",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Failed to process request. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -ml-32 -mt-32"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="bg-white p-3 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
              <GraduationCap className="w-8 h-8 text-blue-900" />
            </div>
            <span className="text-2xl font-bold text-white">EduPlatform</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-gray-300">Enter your email to receive a password reset link</p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {status.type === "success" ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Check Your Email</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{status.message}</p>
              <div className="pt-4">
                <Link
                  to="/reset-password"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all shadow-md"
                >
                  Proceed to Reset Password
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.type === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 group disabled:opacity-50"
              >
                <span>{status.type === "loading" ? "Sending Request..." : "Send Reset Instructions"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <Link to="/login" className="text-sm font-semibold text-blue-900 hover:text-indigo-700">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

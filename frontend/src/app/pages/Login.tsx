import { useState } from "react";
import { Link } from "react-router";
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export function Login() {
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const roles = [
    { id: "student", label: "Student", icon: "🎓" },
    { id: "faculty", label: "Faculty", icon: "👨‍🏫" },
    { id: "admin", label: "Admin", icon: "⚙️" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { ...formData, role: selectedRole });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="bg-white p-3 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
              <GraduationCap className="w-8 h-8 text-blue-900" />
            </div>
            <span className="text-2xl font-bold text-white">EduPlatform</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to access your portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role.id
                      ? "border-blue-900 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <div
                    className={`text-sm font-semibold ${
                      selectedRole === role.id ? "text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {role.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-blue-900 hover:text-indigo-700">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* SSO Options */}
          <div className="space-y-3">
            <button className="w-full px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-semibold">Continue with Google</span>
            </button>

            <button className="w-full px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="#0078D4" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
              </svg>
              <span className="text-gray-700 font-semibold">Continue with Microsoft</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/admissions" className="font-semibold text-blue-900 hover:text-indigo-700">
                Apply Now
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition-colors inline-flex items-center space-x-1"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

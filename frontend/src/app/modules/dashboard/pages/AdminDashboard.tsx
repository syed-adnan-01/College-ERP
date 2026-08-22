import { useAuth } from "../../../auth/hooks/useAuth";
import { useTenant } from "../../../auth/context/TenantContext";
import { Users, BookOpen, CreditCard, Calendar } from "lucide-react";

export function AdminDashboard() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-xl"><Users className="w-6 h-6 text-blue-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Students</p><p className="text-2xl font-bold">1,245</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-indigo-50 p-3 rounded-xl"><Users className="w-6 h-6 text-indigo-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Faculty</p><p className="text-2xl font-bold">84</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-xl"><CreditCard className="w-6 h-6 text-green-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Revenue (MTD)</p><p className="text-2xl font-bold">$124K</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-xl"><Calendar className="w-6 h-6 text-purple-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Active Courses</p><p className="text-2xl font-bold">42</p></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
}

import { useAuth } from "../../../auth/hooks/useAuth";
import { BookOpen, Users, Clock, CheckCircle } from "lucide-react";

export function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-xl"><BookOpen className="w-6 h-6 text-blue-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">My Courses</p><p className="text-2xl font-bold">4</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-indigo-50 p-3 rounded-xl"><Users className="w-6 h-6 text-indigo-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Students</p><p className="text-2xl font-bold">215</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-orange-50 p-3 rounded-xl"><Clock className="w-6 h-6 text-orange-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Classes Today</p><p className="text-2xl font-bold">3</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-xl"><CheckCircle className="w-6 h-6 text-green-600" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Pending Tasks</p><p className="text-2xl font-bold">2</p></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
        <p className="text-gray-500">No classes scheduled for today.</p>
      </div>
    </div>
  );
}

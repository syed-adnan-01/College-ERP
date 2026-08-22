import { Users, Briefcase, CreditCard, Calendar, UserPlus, BellRing, FileBarChart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,245" icon={Users} trend="+12% from last month" color="bg-blue-50 text-blue-600" />
        <StatCard title="Total Faculty" value="84" icon={Briefcase} trend="+2 new this month" color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Revenue (MTD)" value="$124K" icon={CreditCard} trend="+5% from last month" color="bg-green-50 text-green-600" />
        <StatCard title="Average Attendance" value="89%" icon={Calendar} trend="-2% from last week" color="bg-orange-50 text-orange-600" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <ActionButton title="Add Student" icon={UserPlus} url="/students/new" />
          <ActionButton title="Create Notice" icon={BellRing} url="/notices/new" />
          <ActionButton title="Generate Report" icon={FileBarChart} url="/reports" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Enrollment Trends</h3>
          <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
            <p className="text-gray-400 font-medium">[Chart Component Placeholder]</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem title="New student enrolled" time="10 mins ago" desc="John Doe enrolled in B.Tech CS" />
            <ActivityItem title="Fee Collected" time="1 hour ago" desc="$1,200 collected for Sem 3" />
            <ActivityItem title="Notice Published" time="3 hours ago" desc="Exam dates announced for Fall" />
            <ActivityItem title="Faculty Added" time="1 day ago" desc="Dr. Smith joined Mathematics" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-gray-800">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 font-medium">{trend}</p>
    </div>
  );
}

function ActionButton({ title, icon: Icon, url }: any) {
  return (
    <Link to={url} className="flex items-center space-x-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm">
      <Icon className="w-4 h-4" />
      <span>{title}</span>
    </Link>
  );
}

function ActivityItem({ title, desc, time }: any) {
  return (
    <div className="flex gap-3">
      <div className="mt-1">
        <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        <p className="text-[10px] text-gray-400 mt-1 font-medium">{time}</p>
      </div>
    </div>
  );
}

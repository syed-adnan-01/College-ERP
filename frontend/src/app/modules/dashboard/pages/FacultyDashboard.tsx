import { Calendar, Users, FileText, CheckCircle, AlertTriangle } from "lucide-react";

export function FacultyDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Classes Today" value="3" icon={Calendar} color="bg-blue-50 text-blue-600" />
        <StatCard title="Total Students" value="120" icon={Users} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Assignments to Grade" value="14" icon={FileText} color="bg-orange-50 text-orange-600" />
        <StatCard title="Leave Balance" value="8 days" icon={CheckCircle} color="bg-green-50 text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timetable */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Today's Schedule</h3>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Thursday, Oct 24</span>
          </div>
          
          <div className="space-y-3">
            <ScheduleItem course="Data Structures (CS-201)" time="09:00 AM - 10:30 AM" room="Room 304, Block A" type="Lecture" />
            <ScheduleItem course="Database Systems (CS-305)" time="11:00 AM - 12:30 PM" room="Lab 2, Block B" type="Lab" />
            <ScheduleItem course="Operating Systems (CS-401)" time="02:00 PM - 03:30 PM" room="Room 102, Block A" type="Lecture" />
          </div>
        </div>

        {/* Student Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Student Alerts
          </h3>
          <p className="text-sm text-gray-500 mb-4">Students requiring attention for low attendance or grades.</p>
          <div className="space-y-4">
            <AlertItem name="Alice Smith" issue="Low Attendance (65%)" course="Data Structures" />
            <AlertItem name="Bob Johnson" issue="Failed Midterm" course="Database Systems" />
            <AlertItem name="Charlie Brown" issue="Missed 3 Assignments" course="Operating Systems" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
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
    </div>
  );
}

function ScheduleItem({ course, time, room, type }: any) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
      <div>
        <h4 className="font-bold text-gray-800">{course}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase">{type}</span>
          <span className="text-sm text-gray-500">{room}</span>
        </div>
      </div>
      <div className="mt-3 sm:mt-0 text-left sm:text-right">
        <p className="text-sm font-semibold text-gray-700">{time}</p>
      </div>
    </div>
  );
}

function AlertItem({ name, issue, course }: any) {
  return (
    <div className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-red-600 font-bold text-xs">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{name}</p>
        <p className="text-xs font-semibold text-red-600 mt-0.5">{issue}</p>
        <p className="text-xs text-gray-500 mt-1">{course}</p>
      </div>
    </div>
  );
}

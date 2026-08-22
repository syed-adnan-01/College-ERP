import { BookOpen, GraduationCap, Calendar, CreditCard, Clock, CheckCircle } from "lucide-react";

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Current CGPA" value="8.4" icon={GraduationCap} color="bg-blue-50 text-blue-600" />
        <StatCard title="Overall Attendance" value="89%" icon={CheckCircle} color="bg-green-50 text-green-600" />
        <StatCard title="Pending Fees" value="$0" icon={CreditCard} color="bg-orange-50 text-orange-600" />
        <StatCard title="Enrolled Courses" value="5" icon={BookOpen} color="bg-indigo-50 text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">My Courses (Semester 5)</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CourseCard name="Data Structures" code="CS-201" attendance={85} credits={4} />
            <CourseCard name="Database Systems" code="CS-305" attendance={92} credits={3} />
            <CourseCard name="Operating Systems" code="CS-401" attendance={78} credits={4} />
            <CourseCard name="Computer Networks" code="CS-405" attendance={100} credits={3} />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Upcoming Events
          </h3>
          <div className="space-y-4">
            <EventItem title="Midterm Exam: Data Structures" date="Oct 28, 2024" type="Exam" color="bg-red-100 text-red-700" />
            <EventItem title="Project Submission: OS" date="Nov 2, 2024" type="Assignment" color="bg-orange-100 text-orange-700" />
            <EventItem title="Tech Fest 2024" date="Nov 15, 2024" type="Event" color="bg-purple-100 text-purple-700" />
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

function CourseCard({ name, code, attendance, credits }: any) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800 leading-tight">{name}</h4>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{credits} Cr</span>
      </div>
      <p className="text-xs font-semibold text-blue-600 mb-4">{code}</p>
      
      <div>
        <div className="flex justify-between text-xs mb-1 font-medium">
          <span className="text-gray-500">Attendance</span>
          <span className={attendance < 75 ? "text-red-600" : "text-green-600"}>{attendance}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${attendance < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
            style={{ width: `${attendance}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function EventItem({ title, date, type, color }: any) {
  return (
    <div className="flex gap-4 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
      <div className="mt-0.5">
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${color}`}>{type}</span>
          <span className="text-xs font-medium text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );
}

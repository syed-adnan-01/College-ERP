import { Calendar, Users, FileText, CheckCircle, AlertTriangle, Clock, MapPin, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function FacultyDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Faculty Instruction Desk</span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-0.5">
            Academic Roster & Grading Center
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="academic-stamp text-xs py-1 px-3">
            Prof. Teaching Portal
          </span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Lectures Today"
          value="3"
          icon={Calendar}
          subtitle="Next at 09:00 AM"
          accent="#12172B"
          badge="Scheduled"
        />
        <StatCard
          title="Enrolled Scholars"
          value="120"
          icon={Users}
          subtitle="Across 3 Sections"
          accent="#E8B93F"
          badge="Cohort"
        />
        <StatCard
          title="Submissions to Grade"
          value="14"
          icon={FileText}
          subtitle="Midterm Lab Reports"
          accent="#E2725B"
          badge="Pending Review"
        />
        <StatCard
          title="Leave & Sabbatical"
          value="8 Days"
          icon={CheckCircle}
          subtitle="Annual Balance"
          accent="#2E7D68"
          badge="Available"
        />
      </div>

      {/* Main Grid: Today's Schedule & Academic Attention Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lecture Timetable (2 cols) */}
        <div className="lg:col-span-2 paper-card p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#12172B]">Today's Teaching Schedule</h3>
              <p className="text-xs text-[#5C6788]">Lecture halls, laboratory sessions, and seminar rooms</p>
            </div>
            <span className="margin-note text-xs">
              Thursday Session
            </span>
          </div>
          
          <div className="space-y-3.5">
            <ScheduleItem
              course="Data Structures & Algorithms (CS-201)"
              time="09:00 AM – 10:30 AM EST"
              room="Room 304, Academic Hall A"
              type="Lecture"
              attendees="48 Registered"
              accent="#12172B"
            />
            <ScheduleItem
              course="Relational Database Systems Lab (CS-305)"
              time="11:00 AM – 12:30 PM EST"
              room="Computing Lab 2, Tech Block B"
              type="Wet Lab"
              attendees="36 Registered"
              accent="#E8B93F"
            />
            <ScheduleItem
              course="Distributed Operating Systems (CS-401)"
              time="02:00 PM – 03:30 PM EST"
              room="Amphitheater 102, Hall A"
              type="Seminar"
              attendees="36 Registered"
              accent="#2E7D68"
            />
          </div>
        </div>

        {/* Scholar Attention & Alerts (1 col) */}
        <div className="paper-card p-6 space-y-5 border-l-4 border-l-[#E2725B]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E2725B]" />
              <h3 className="text-lg font-bold font-serif text-[#12172B]">
                Scholar Watchlist
              </h3>
            </div>
            <span className="margin-note-coral text-[10px]">3 Actionable</span>
          </div>

          <p className="text-xs text-[#5C6788] leading-relaxed">
            Scholars requiring academic mentorship or intervention due to attendance thresholds or midterm grading.
          </p>

          <div className="space-y-3">
            <AlertItem
              name="Alice Smith"
              issue="Low Attendance (65%)"
              course="Data Structures (CS-201)"
            />
            <AlertItem
              name="Bob Johnson"
              issue="Missed Midterm Assessment"
              course="Database Systems (CS-305)"
            />
            <AlertItem
              name="Charlie Brown"
              issue="3 Pending Assignments"
              course="Operating Systems (CS-401)"
            />
          </div>

          <div className="pt-2 border-t border-[#E5E0D2]">
            <button className="w-full py-2 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-xl transition-all shadow-xs">
              Send Mass Academic Advisory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, subtitle, accent, badge }: any) {
  return (
    <div className="paper-card p-5 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-[#5C6788] block mb-1">{title}</span>
          <h4 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B]">{value}</h4>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#E5E0D2]"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="pt-2 border-t border-[#E5E0D2]/70 flex items-center justify-between text-xs">
        <span className="text-[#5C6788] font-medium text-[11px]">{subtitle}</span>
        <span className="text-[10px] font-bold bg-[#EDE9DF] px-2 py-0.5 rounded text-[#12172B]">
          {badge}
        </span>
      </div>
    </div>
  );
}

function ScheduleItem({ course, time, room, type, attendees, accent }: any) {
  return (
    <div className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#EDE9DF]/70 transition-all">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            {type}
          </span>
          <span className="text-xs text-[#5C6788] font-medium">• {attendees}</span>
        </div>
        <h4 className="text-sm font-bold font-serif text-[#12172B]">{course}</h4>
        <div className="flex items-center gap-1.5 text-xs text-[#5C6788]">
          <MapPin className="w-3.5 h-3.5 text-[#E8B93F]" />
          <span>{room}</span>
        </div>
      </div>

      <div className="sm:text-right">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#12172B] bg-white border border-[#E5E0D2] px-3 py-1.5 rounded-lg shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-[#E8B93F]" />
          <span>{time}</span>
        </span>
      </div>
    </div>
  );
}

function AlertItem({ name, issue, course }: any) {
  return (
    <div className="p-3 rounded-xl bg-[#FFF0ED]/60 border border-[#E2725B]/30 flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-[#E2725B] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-bold text-[#12172B]">{name}</p>
        <p className="text-[11px] font-semibold text-[#E2725B]">{issue}</p>
        <p className="text-[10px] text-[#5C6788]">{course}</p>
      </div>
    </div>
  );
}


import { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Sparkles,
  BookOpen,
  ChevronRight,
  PlusCircle,
  CheckSquare,
} from "lucide-react";
import {
  FacultyGradeAnalytics,
  FacultyAttendanceSummary,
} from "../components/FacultyAnalytics";
import { WeeklyTimetable } from "../components/WeeklyTimetable";
import {
  ApplyLeaveModal,
  TakeAttendanceModal,
} from "../components/QuickActionModals";

export function FacultyDashboard() {
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [attendanceModalCourse, setAttendanceModalCourse] = useState<string | null>(null);

  // Review queue: Pending assignments to grade
  const [pendingAssignments, setPendingAssignments] = useState([
    {
      id: "as-1",
      course: "Data Structures (CS-201)",
      title: "Binary Search Trees & Red-Black Tree Implementation",
      submitted: 42,
      total: 48,
      dueDate: "Oct 24, 2026",
      urgent: false,
    },
    {
      id: "as-2",
      course: "Database Systems Lab (CS-305)",
      title: "Query Optimization & B-Tree Index Benchmarks",
      submitted: 34,
      total: 36,
      dueDate: "Oct 22, 2026",
      urgent: true,
    },
    {
      id: "as-3",
      course: "Operating Systems (CS-401)",
      title: "Kernel Thread Scheduler Simulation in C++",
      submitted: 28,
      total: 36,
      dueDate: "Oct 20, 2026",
      urgent: true,
    },
  ]);

  const handleGradeAction = (title: string) => {
    alert(`Opening grading rubric for: "${title}". Grades will be automatically sync'd to student records.`);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">
            Faculty Instruction Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-0.5">
            Academic Roster, Instruction & Grading Center
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLeaveModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDE9DF]/70 hover:bg-[#EDE9DF] border border-[#E5E0D2] rounded-xl text-xs font-semibold text-[#12172B] transition-all cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E8B93F]" />
            <span>Apply for Leave</span>
          </button>
          <span className="academic-stamp text-xs py-1 px-3">
            Prof. Portal
          </span>
        </div>
      </div>

      {/* Overview Stat Cards */}
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
          subtitle="Across 3 Course Sections"
          accent="#E8B93F"
          badge="Cohort"
        />
        <StatCard
          title="Submissions to Grade"
          value="14"
          icon={FileText}
          subtitle="Midterm Lab Reports"
          accent="#E2725B"
          badge="Action Required"
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

      {/* Main Grid: Today's Classes with Live Attendance Action & Scholar Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Today's Lectures (2 cols) */}
        <div className="lg:col-span-2 paper-card p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#12172B]">
                Today's Teaching Schedule
              </h3>
              <p className="text-xs text-[#5C6788]">
                Lecture halls, laboratory practicals, and tutorial sessions
              </p>
            </div>
            <span className="margin-note text-xs">Thursday Session</span>
          </div>

          <div className="space-y-3.5">
            <ScheduleCard
              course="Data Structures & Algorithms (CS-201)"
              time="09:00 AM – 10:30 AM"
              room="Room 304, Academic Hall A"
              type="Lecture"
              attendees="48 Registered"
              accent="#12172B"
              onTakeAttendance={() =>
                setAttendanceModalCourse("Data Structures & Algorithms (CS-201)")
              }
            />
            <ScheduleCard
              course="Relational Database Systems Lab (CS-305)"
              time="11:00 AM – 12:30 PM"
              room="Computing Lab 2, Tech Block B"
              type="Wet Lab"
              attendees="36 Registered"
              accent="#E8B93F"
              onTakeAttendance={() =>
                setAttendanceModalCourse("Relational Database Systems Lab (CS-305)")
              }
            />
            <ScheduleCard
              course="Distributed Operating Systems (CS-401)"
              time="02:00 PM – 03:30 PM"
              room="Amphitheater 102, Hall A"
              type="Seminar"
              attendees="36 Registered"
              accent="#2E7D68"
              onTakeAttendance={() =>
                setAttendanceModalCourse("Distributed Operating Systems (CS-401)")
              }
            />
          </div>
        </div>

        {/* Scholar Watchlist (1 col) */}
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
            Scholars requiring academic intervention due to attendance thresholds or missing midterms.
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
            <button
              type="button"
              onClick={() => alert("Notification dispatched to Department Mentors & Guardians.")}
              className="w-full py-2 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Send Mass Academic Advisory
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Summary & Grade Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <FacultyAttendanceSummary />
        <FacultyGradeAnalytics />
      </div>

      {/* Timetable View */}
      <WeeklyTimetable isFaculty={true} />

      {/* Pending Assignments to Grade */}
      <div className="paper-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
          <div>
            <h3 className="text-lg font-bold font-serif text-[#12172B]">
              Pending Assignments & Submissions Review Queue
            </h3>
            <p className="text-xs text-[#5C6788]">
              Laboratory problem sets and midterm assignments awaiting faculty evaluation
            </p>
          </div>
          <span className="margin-note text-xs">
            {pendingAssignments.length} Course Queues
          </span>
        </div>

        <div className="space-y-3">
          {pendingAssignments.map((as) => (
            <div
              key={as.id}
              className="p-4 rounded-xl bg-white/90 border border-[#E5E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#D7D0C0] transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDE9DF] text-[#12172B]">
                    {as.course}
                  </span>
                  {as.urgent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF2F0] text-[#9C3823] border border-[#E2725B]">
                      Urgent Review
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold font-serif text-[#12172B]">{as.title}</h4>
                <div className="flex items-center gap-3 text-xs text-[#5C6788]">
                  <span>
                    Submissions: <strong className="text-[#12172B]">{as.submitted}</strong> / {as.total}
                  </span>
                  <span>• Due: {as.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGradeAction(as.title)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#E8B93F]" />
                  <span>Review & Grade</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ApplyLeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />
      {attendanceModalCourse && (
        <TakeAttendanceModal
          isOpen={true}
          onClose={() => setAttendanceModalCourse(null)}
          courseTitle={attendanceModalCourse}
        />
      )}
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

function ScheduleCard({
  course,
  time,
  room,
  type,
  attendees,
  accent,
  onTakeAttendance,
}: any) {
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

      <div className="flex items-center gap-2 sm:self-center">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#12172B] bg-white border border-[#E5E0D2] px-2.5 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-[#E8B93F]" />
          <span>{time}</span>
        </span>
        <button
          type="button"
          onClick={onTakeAttendance}
          className="px-3 py-1.5 rounded-lg bg-[#2E7D68] hover:bg-[#256655] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Attendance</span>
        </button>
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

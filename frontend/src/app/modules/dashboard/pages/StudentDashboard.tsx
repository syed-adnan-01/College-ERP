import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Bookmark,
  Bell,
} from "lucide-react";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import {
  StudentGpaProgressionChart,
  StudentAttendanceDeepDive,
  StudentFeeOverview,
} from "../components/StudentAnalytics";
import { WeeklyTimetable } from "../components/WeeklyTimetable";
import { NotificationCenter } from "../components/NotificationCenter";
import { PayFeeModal } from "../components/QuickActionModals";

export function StudentDashboard() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Current Standing"
          value="8.46 CGPA"
          note="Top 8% of Semester 5 cohort"
          badge="Dean's List Track"
          icon={GraduationCap}
          accentColor="#E8B93F"
        />
        <StatCard
          title="Lecture Attendance"
          value="89%"
          note="34 of 38 sessions attended"
          badge="Safe buffer"
          icon={CheckCircle2}
          accentColor="#2E7D68"
        />
        <StatCard
          title="Tuition Balance"
          value="$0.00"
          note="Next cycle opens Nov 15"
          badge="All clear"
          icon={CreditCard}
          accentColor="#5C6788"
        />
        <StatCard
          title="Active Workload"
          value="5 Courses"
          note="18 credit units this term"
          badge="Full-time"
          icon={BookOpen}
          accentColor="#12172B"
        />
      </div>

      {/* Main Grid: Course Notebooks & Desk Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Course Notebooks Column (2 cols) */}
        <div className="lg:col-span-2 paper-card p-6 md:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E0D2] pb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#12172B] tracking-tight">
                <HighlighterUnderline color="#E8B93F">
                  My Course Notebooks
                </HighlighterUnderline>
              </h3>
              <p className="text-sm text-[#5C6788] mt-0.5">
                Semester 5 • Computer Science & Engineering
              </p>
            </div>
            <span className="margin-note self-start sm:self-auto">
              ✏️ 4 of 5 courses above target
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <CourseCard
              name="Data Structures & Algorithms"
              code="CS-201"
              credits={4}
              attendance={88}
              statusText="3 modules left • Lab 4 pending review"
              statusType="normal"
              progress={75}
            />
            <CourseCard
              name="Relational Database Systems"
              code="CS-305"
              credits={3}
              attendance={92}
              statusText="Full marks on Quiz 2 • Next class Thursday"
              statusType="success"
              progress={84}
            />
            <CourseCard
              name="Operating Systems Architecture"
              code="CS-401"
              credits={4}
              attendance={72}
              statusText="⚠️ 2 missed lectures • Attendance near limit"
              statusType="warning"
              progress={60}
            />
            <CourseCard
              name="Computer Networks & Protocols"
              code="CS-405"
              credits={3}
              attendance={96}
              statusText="All 6 problem sets submitted • Exam in 14 days"
              statusType="success"
              progress={90}
            />
          </div>

          {/* Quick Study Note Banner */}
          <div className="bg-[#FFF9E6] border border-[#E8B93F]/40 rounded-xl p-4 flex items-start gap-3 text-sm text-[#12172B]">
            <span className="text-lg">💡</span>
            <div className="flex-1">
              <p className="font-semibold text-xs uppercase tracking-wider text-[#9C7515]">
                Study Group Reminder
              </p>
              <p className="text-xs text-[#5C6788] mt-0.5 leading-relaxed">
                Peer review for <strong className="text-[#12172B]">OS Kernel Assignment</strong> meets tomorrow at 4:00 PM in Library Room 3B.
              </p>
            </div>
          </div>
        </div>

        {/* Desk Agenda / Upcoming Deadlines Column (1 col) */}
        <div className="space-y-6">
          <div className="paper-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E0D2] pb-3.5">
              <h3 className="text-lg font-bold font-serif text-[#12172B] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E8B93F]" />
                Desk Agenda
              </h3>
              <span className="text-xs font-semibold text-[#5C6788]">
                Oct — Nov
              </span>
            </div>

            <div className="space-y-4">
              <AgendaItem
                title="Midterm: Data Structures"
                time="Thursday, Oct 28 • 10:00 AM"
                location="Hall 4-B"
                tag="Urgent Exam"
                isAlert={true}
                note="Chapters 1–6 covered"
              />
              <AgendaItem
                title="OS File Systems Code Drop"
                time="Friday, Nov 2 • 11:59 PM"
                location="GitHub Classroom"
                tag="Assignment"
                isAlert={false}
                note="2 unit tests remaining"
              />
              <AgendaItem
                title="Annual Tech Innovation Fair"
                time="Saturday, Nov 15 • 9:00 AM"
                location="Main Quadrangle"
                tag="Campus Event"
                isAlert={false}
                note="Project booth confirmed"
              />
            </div>

            <button
              type="button"
              onClick={() => alert("Navigating to full university academic schedule.")}
              className="w-full py-2.5 px-4 bg-[#EDE9DF] hover:bg-[#E5E0D2] text-[#12172B] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#D7D0C0] cursor-pointer"
            >
              <span>View Full Academic Calendar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Academic Advisor Note */}
          <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-dashed border-[#E8B93F] shadow-sm transform rotate-[-0.75deg]">
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="w-4 h-4 text-[#E8B93F]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#12172B] font-sans">
                Academic Advisor Note
              </h4>
            </div>
            <p className="text-xs text-[#5C6788] leading-relaxed italic">
              "Great recovery on the Algorithms quiz! Keep your Operating Systems attendance above 75% to stay eligible for honors."
            </p>
            <p className="text-[11px] font-semibold text-[#12172B] mt-2">
              — Prof. Harrison (HOD CS)
            </p>
          </div>
        </div>
      </div>

      {/* Grades & CGPA Tracker Chart + Fee Statement Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <StudentGpaProgressionChart />
        <StudentFeeOverview onPayClick={() => setIsPayModalOpen(true)} />
      </div>

      {/* Timetable View */}
      <WeeklyTimetable isFaculty={false} />

      {/* Attendance Deep Dive & Attendance Percentage Warnings */}
      <StudentAttendanceDeepDive />

      {/* Real-time Notifications & Alerts Feed */}
      <NotificationCenter />

      {/* Pay Fee Modal */}
      <PayFeeModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
      />
    </div>
  );
}

function StatCard({ title, value, note, badge, icon: Icon, accentColor }: any) {
  return (
    <div className="paper-card p-5 flex flex-col justify-between space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-[#5C6788] uppercase tracking-wider">
          {title}
        </span>
        <div
          className="p-2 rounded-xl border border-[#E5E0D2]"
          style={{ backgroundColor: `${accentColor}14`, color: accentColor }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <h4 className="text-3xl font-bold text-[#12172B] tracking-tight font-serif">
          {value}
        </h4>
        <p className="text-xs text-[#5C6788] mt-1">
          {note}
        </p>
      </div>

      <div className="pt-2 border-t border-[#E5E0D2]/70 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-[#12172B]">Status</span>
        <span className="font-medium text-[#5C6788] bg-[#EDE9DF]/70 px-2 py-0.5 rounded">
          {badge}
        </span>
      </div>
    </div>
  );
}

function CourseCard({ name, code, credits, attendance, statusText, statusType, progress }: any) {
  const isWarning = statusType === "warning" || attendance < 75;

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        isWarning
          ? "bg-[#FEF9F8] border-[#E2725B]/40 hover:border-[#E2725B]"
          : "bg-[#FDFCF7] border-[#E5E0D2] hover:border-[#D0C8B5]"
      }`}
    >
      <div className="flex justify-between items-start gap-2 mb-1.5">
        <h4 className="font-bold text-sm text-[#12172B] font-serif leading-snug">
          {name}
        </h4>
        <span className="text-[11px] font-bold text-[#12172B] bg-[#EDE9DF] border border-[#D7D0C0] px-2 py-0.5 rounded flex-shrink-0">
          {credits} Cr
        </span>
      </div>

      <p className="text-xs font-semibold text-[#5C6788] mb-3">
        {code}
      </p>

      <p className={`text-xs mb-3 leading-relaxed ${isWarning ? "text-[#9C3823] font-medium" : "text-[#5C6788]"}`}>
        {statusText}
      </p>

      <div className="space-y-1.5 pt-2 border-t border-[#E5E0D2]/60">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-[#5C6788]">Syllabus Covered</span>
          <span className="text-[#12172B] font-semibold">{progress}%</span>
        </div>

        <div className="w-full bg-[#E5E0D2] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full progress-fill"
            style={{
              width: `${progress}%`,
              backgroundColor: isWarning ? "#E2725B" : "#E8B93F",
            }}
          />
        </div>

        <div className="flex justify-between text-[11px] pt-1">
          <span className="text-[#5C6788]">Attendance</span>
          <span className={`font-semibold ${isWarning ? "text-[#9C3823]" : "text-[#2E7D68]"}`}>
            {attendance}% {isWarning ? "(Warning)" : "(Good)"}
          </span>
        </div>
      </div>
    </div>
  );
}

function AgendaItem({ title, time, location, tag, isAlert, note }: any) {
  return (
    <div
      className={`p-3.5 rounded-xl border transition-colors ${
        isAlert
          ? "bg-[#FEF2F0] border-[#E2725B]/40"
          : "bg-[#FDFCF7] border-[#E5E0D2] hover:border-[#D0C8B5]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h5 className={`text-sm font-bold font-serif ${isAlert ? "text-[#9C3823]" : "text-[#12172B]"}`}>
            {title}
          </h5>
          <p className="text-xs text-[#5C6788] mt-0.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{time}</span>
          </p>
          <p className="text-[11px] text-[#5C6788] mt-0.5">
            📍 {location}
          </p>
        </div>

        <span className={isAlert ? "margin-note-coral" : "margin-note"}>
          {tag}
        </span>
      </div>

      {note && (
        <div className="mt-2.5 pt-2 border-t border-[#E5E0D2]/50 text-[11px] text-[#5C6788] italic">
          Note: {note}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  Users,
  Briefcase,
  CreditCard,
  Calendar,
  UserPlus,
  BellRing,
  FileBarChart,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  EnrollmentTrendChart,
  FeeCollectionChart,
  DepartmentStatsChart,
} from "../components/AdminCharts";
import { AcademicCalendarWidget } from "../components/AcademicCalendarWidget";
import {
  AddStudentModal,
  CreateNoticeModal,
  GenerateReportModal,
} from "../components/QuickActionModals";

export function AdminDashboard() {
  const [activeModal, setActiveModal] = useState<"student" | "notice" | "report" | null>(null);
  const [activityFilter, setActivityFilter] = useState<string>("all");

  const activities = [
    {
      id: 1,
      title: "Scholar Dossier Approved",
      desc: "Admitted to B.Tech Computer Science (CS-201)",
      time: "10 mins ago",
      category: "admissions",
      dotColor: "#2E7D68",
    },
    {
      id: 2,
      title: "Semester Tuition Verified",
      desc: "$1,450 deposited for Term 4 Tuition via Bank Wire",
      time: "45 mins ago",
      category: "finance",
      dotColor: "#12172B",
    },
    {
      id: 3,
      title: "Official Notice Dispatched",
      desc: "Fall midterm evaluation timetable posted to scholars",
      time: "2 hours ago",
      category: "notices",
      dotColor: "#E8B93F",
    },
    {
      id: 4,
      title: "Faculty Tenure Appointment",
      desc: "Dr. Robert Chen appointed AI Lab Director",
      time: "1 day ago",
      category: "faculty",
      dotColor: "#5C6788",
    },
    {
      id: 5,
      title: "Bursar Audit Reconciled",
      desc: "Q3 tuition intake reached 96.1% clearance",
      time: "2 days ago",
      category: "finance",
      dotColor: "#2E7D68",
    },
  ];

  const filteredActivities = activities.filter((act) => {
    if (activityFilter === "all") return true;
    return act.category === activityFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">
            Central Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-0.5">
            Campus Operations & Executive Oversight
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="academic-stamp text-xs py-1 px-3">
            Academic Term 2026–27
          </span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Enrolled Scholars"
          value="1,245"
          icon={Users}
          trend="+12% YoY Cohort"
          trendPositive={true}
          accent="#12172B"
          badge="Active"
        />
        <StatCard
          title="Appointed Faculty"
          value="84"
          icon={Briefcase}
          trend="8 Departments"
          trendPositive={true}
          accent="#E8B93F"
          badge="Tenured"
        />
        <StatCard
          title="Tuition Inflow (MTD)"
          value="$124.8K"
          icon={CreditCard}
          trend="96.1% Cleared"
          trendPositive={true}
          accent="#2E7D68"
          badge="Fiscal"
        />
        <StatCard
          title="Avg Attendance"
          value="89.4%"
          icon={Calendar}
          trend="Above 75% Cut"
          trendPositive={true}
          accent="#5C6788"
          badge="Roster"
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="paper-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#12172B]">
            Administrative Operations
          </h3>
          <span className="text-xs text-[#5C6788]">Click to launch command workflow</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveModal("student")}
            className="flex items-center space-x-2 bg-white hover:bg-[#EDE9DF]/60 border border-[#E5E0D2] text-[#12172B] px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#E8B93F]" />
            <span>Enroll New Scholar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("notice")}
            className="flex items-center space-x-2 bg-white hover:bg-[#EDE9DF]/60 border border-[#E5E0D2] text-[#12172B] px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <BellRing className="w-4 h-4 text-[#E8B93F]" />
            <span>Broadcast Campus Notice</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("report")}
            className="flex items-center space-x-2 bg-white hover:bg-[#EDE9DF]/60 border border-[#E5E0D2] text-[#12172B] px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <FileBarChart className="w-4 h-4 text-[#E8B93F]" />
            <span>Compile Registrar Report</span>
          </button>
        </div>
      </div>

      {/* Phase 3 Charts Section: Enrollment Trends & Fee Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentTrendChart />
        <FeeCollectionChart />
      </div>

      {/* Department Breakdown & Academic Calendar Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Department Stats */}
        <div className="lg:col-span-1">
          <DepartmentStatsChart />
        </div>

        {/* Academic Calendar Widget */}
        <div className="lg:col-span-2">
          <AcademicCalendarWidget />
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="paper-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E0D2]">
          <div>
            <h3 className="text-lg font-bold font-serif text-[#12172B]">
              Campus Operational Audit Trail
            </h3>
            <p className="text-xs text-[#5C6788]">
              Verified system transactions across all college departments
            </p>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {["all", "admissions", "finance", "notices", "faculty"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivityFilter(cat)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase tracking-wider text-[10px] transition-all ${
                  activityFilter === cat
                    ? "bg-[#12172B] text-white"
                    : "bg-[#EDE9DF]/60 text-[#5C6788] hover:text-[#12172B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredActivities.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white/90 border border-[#E5E0D2] flex gap-3 text-xs shadow-2xs hover:border-[#D7D0C0] transition-all"
            >
              <div className="mt-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.dotColor }}
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-bold text-[#12172B] font-serif">{item.title}</p>
                  <span className="text-[10px] text-[#5C6788]/80 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-[#5C6788] text-[11px] leading-relaxed">{item.desc}</p>
                <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EDE9DF]/60 text-[#12172B]">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddStudentModal
        isOpen={activeModal === "student"}
        onClose={() => setActiveModal(null)}
      />
      <CreateNoticeModal
        isOpen={activeModal === "notice"}
        onClose={() => setActiveModal(null)}
      />
      <GenerateReportModal
        isOpen={activeModal === "report"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, accent, badge }: any) {
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
        <span className="text-[#5C6788] font-medium">{trend}</span>
        <span className="text-[10px] font-bold bg-[#EDE9DF] px-2 py-0.5 rounded text-[#12172B]">
          {badge}
        </span>
      </div>
    </div>
  );
}

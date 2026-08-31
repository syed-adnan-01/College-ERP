import { Users, Briefcase, CreditCard, Calendar, UserPlus, BellRing, FileBarChart, CheckCircle2, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Central Administration</span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-0.5">
            Campus Operations & Analytics Desk
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="academic-stamp text-xs py-1 px-3">
            Academic Term 2026–27
          </span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Enrolled Scholars"
          value="1,245"
          icon={Users}
          trend="+12% YoY"
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
          trend="94% Cleared"
          trendPositive={true}
          accent="#2E7D68"
          badge="Fiscal"
        />
        <StatCard
          title="Avg Attendance"
          value="89.4%"
          icon={Calendar}
          trend="Above Threshold"
          trendPositive={true}
          accent="#5C6788"
          badge="Lecture Roster"
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="paper-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#12172B]">
            Administrative Actions
          </h3>
          <span className="text-xs text-[#5C6788]">Fast-track campus commands</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton title="Enroll New Scholar" icon={UserPlus} url="/students/new" />
          <ActionButton title="Publish Campus Notice" icon={BellRing} url="/notices/new" />
          <ActionButton title="Compile Registrar Report" icon={FileBarChart} url="/reports" />
        </div>
      </div>

      {/* Analytics & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrollment Distribution (2 cols) */}
        <div className="lg:col-span-2 paper-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#12172B]">Cohort Enrollment Distribution</h3>
              <p className="text-xs text-[#5C6788]">Undergraduate and postgraduate matriculation by discipline</p>
            </div>
            <span className="margin-note text-xs">Fall 2026 Roster</span>
          </div>

          <div className="space-y-4">
            <CohortProgress label="Computer Science & Engineering" count="340 Scholars" percent={88} color="#12172B" />
            <CohortProgress label="Business Administration & Finance" count="290 Scholars" percent={75} color="#E8B93F" />
            <CohortProgress label="Biotechnology & Quantum Sciences" count="180 Scholars" percent={60} color="#2E7D68" />
            <CohortProgress label="Comparative Literature & Behavioral Arts" count="150 Scholars" percent={50} color="#5C6788" />
            <CohortProgress label="Medical & Health Preclinical" count="120 Scholars" percent={40} color="#E2725B" />
          </div>

          <div className="pt-3 border-t border-[#E5E0D2] flex items-center justify-between text-xs text-[#5C6788]">
            <span>Total Capacity Utilization: 84.5%</span>
            <Link to="/reports" className="font-bold text-[#12172B] hover:text-[#E8B93F] flex items-center gap-1">
              <span>View Full Registry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Real-time Activity Feed (1 col) */}
        <div className="paper-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
            <h3 className="text-lg font-bold font-serif text-[#12172B]">Audit & Activity Log</h3>
            <span className="margin-note-emerald text-[10px]">Realtime</span>
          </div>

          <div className="space-y-4">
            <ActivityItem
              title="Scholar Dossier Approved"
              time="10 mins ago"
              desc="Admitted to B.Tech Computer Science (CS-201)"
              dotColor="#2E7D68"
            />
            <ActivityItem
              title="Semester Tuition Verified"
              time="45 mins ago"
              desc="$1,450 deposited for Term 4 Tuition"
              dotColor="#12172B"
            />
            <ActivityItem
              title="Official Notice Dispatched"
              time="2 hours ago"
              desc="Fall midterm evaluation timetable posted"
              dotColor="#E8B93F"
            />
            <ActivityItem
              title="Faculty Tenure Appointment"
              time="1 day ago"
              desc="Dr. Robert Chen appointed AI Lab Director"
              dotColor="#5C6788"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendPositive, accent, badge }: any) {
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

function ActionButton({ title, icon: Icon, url }: any) {
  return (
    <Link
      to={url}
      className="flex items-center space-x-2 bg-white hover:bg-[#EDE9DF]/60 border border-[#E5E0D2] text-[#12172B] px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs"
    >
      <Icon className="w-3.5 h-3.5 text-[#E8B93F]" />
      <span>{title}</span>
    </Link>
  );
}

function CohortProgress({ label, count, percent, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-[#12172B]">
        <span>{label}</span>
        <span className="text-[#5C6788] font-medium">{count} ({percent}%)</span>
      </div>
      <div className="w-full h-2 bg-[#EDE9DF] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, dotColor }: any) {
  return (
    <div className="flex gap-3 text-xs">
      <div className="mt-1">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </div>
      <div className="space-y-0.5">
        <p className="font-bold text-[#12172B]">{title}</p>
        <p className="text-[#5C6788] text-[11px] leading-tight">{desc}</p>
        <p className="text-[10px] text-[#5C6788]/80 pt-0.5">{time}</p>
      </div>
    </div>
  );
}


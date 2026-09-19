import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Enrollment Trend Over Time (Academic Years / Cohorts)
const ENROLLMENT_DATA = [
  { term: "Fall 2023", engineering: 280, business: 220, sciences: 140, arts: 110 },
  { term: "Spring 2024", engineering: 300, business: 240, sciences: 155, arts: 120 },
  { term: "Fall 2024", engineering: 320, business: 260, sciences: 165, arts: 130 },
  { term: "Spring 2025", engineering: 335, business: 275, sciences: 170, arts: 140 },
  { term: "Fall 2025", engineering: 355, business: 285, sciences: 175, arts: 145 },
  { term: "Fall 2026", engineering: 380, business: 300, sciences: 190, arts: 155 },
];

// Fee Collection: Target vs Actual ($ in Thousands)
const FEE_COLLECTION_DATA = [
  { month: "Jun", target: 95, collected: 90 },
  { month: "Jul", target: 120, collected: 115 },
  { month: "Aug", target: 160, collected: 158 },
  { month: "Sep", target: 140, collected: 132 },
  { month: "Oct", target: 130, collected: 125 },
  { month: "Nov", target: 110, collected: 104 },
];

// Department Distribution
const DEPARTMENT_DISTRIBUTION = [
  { name: "Computer Sci & Eng", value: 380, color: "#12172B" },
  { name: "Business & Finance", value: 300, color: "#E8B93F" },
  { name: "Biotech & Quantum", value: 190, color: "#2E7D68" },
  { name: "Comparative Arts", value: 155, color: "#5C6788" },
  { name: "Medical Sciences", value: 120, color: "#E2725B" },
];

export function EnrollmentTrendChart() {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Cohort Matriculation Trends</h3>
          <p className="text-xs text-[#5C6788]">Historical enrollment expansion across primary faculties</p>
        </div>
        <span className="margin-note text-xs">+14.2% Growth YoY</span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ENROLLMENT_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#12172B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#12172B" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="bizGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8B93F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E8B93F" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="sciGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D68" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2E7D68" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D2" />
            <XAxis dataKey="term" tick={{ fontSize: 11, fill: "#5C6788" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5C6788" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E0D2",
                borderRadius: "0.75rem",
                fontSize: "12px",
                boxShadow: "0 4px 20px rgba(18, 23, 43, 0.08)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="engineering" name="Engineering" stroke="#12172B" fill="url(#engGrad)" />
            <Area type="monotone" dataKey="business" name="Business" stroke="#E8B93F" fill="url(#bizGrad)" />
            <Area type="monotone" dataKey="sciences" name="Sciences" stroke="#2E7D68" fill="url(#sciGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FeeCollectionChart() {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Tuition & Fee Collection Inflow</h3>
          <p className="text-xs text-[#5C6788]">Target vs actual fee reconciliation ($ in thousands)</p>
        </div>
        <span className="margin-note-emerald text-xs">96.1% Clearance</span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FEE_COLLECTION_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D2" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5C6788" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5C6788" }} unit="k" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E0D2",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`$${val}K`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="target" name="Fiscal Target" fill="#EDE9DF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collected" name="Realized Receipts" fill="#2E7D68" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DepartmentStatsChart() {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Department Capacity Allocation</h3>
          <p className="text-xs text-[#5C6788]">Enrollment load distribution by academic division</p>
        </div>
        <span className="academic-stamp text-xs py-0.5 px-2">5 Faculties</span>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DEPARTMENT_DISTRIBUTION}
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {DEPARTMENT_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E0D2",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val} Scholars`, "Enrolled"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E5E0D2]">
        {DEPARTMENT_DISTRIBUTION.map((dept) => (
          <div key={dept.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
            <span className="text-[#5C6788] truncate">{dept.name}:</span>
            <span className="font-bold text-[#12172B]">{dept.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { Award, TrendingUp, CheckCircle, AlertTriangle, Download, CreditCard } from "lucide-react";

const CGPA_HISTORY = [
  { semester: "Sem 1", sgpa: 8.1, cgpa: 8.1 },
  { semester: "Sem 2", sgpa: 8.3, cgpa: 8.2 },
  { semester: "Sem 3", sgpa: 8.6, cgpa: 8.33 },
  { semester: "Sem 4", sgpa: 8.5, cgpa: 8.38 },
  { semester: "Sem 5 (Est.)", sgpa: 8.8, cgpa: 8.46 },
];

export function StudentGpaProgressionChart() {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Academic Standing & GPA Trajectory</h3>
          <p className="text-xs text-[#5C6788]">Semester Grade Point Average (SGPA) vs Cumulative (CGPA)</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="margin-note text-xs">
            <Award className="w-3.5 h-3.5 text-[#E8B93F]" />
            Dean's Honors Track (8.5+)
          </span>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={CGPA_HISTORY} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D2" />
            <XAxis dataKey="semester" tick={{ fontSize: 11, fill: "#5C6788" }} />
            <YAxis domain={[7.0, 10.0]} tick={{ fontSize: 11, fill: "#5C6788" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E0D2",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val} GPA`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <ReferenceLine y={8.5} label={{ value: "Dean's Target", fill: "#E8B93F", fontSize: 10 }} stroke="#E8B93F" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="sgpa" name="Semester SGPA" stroke="#E8B93F" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="cgpa" name="Cumulative CGPA" stroke="#12172B" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E0D2] text-xs">
        <div className="p-2.5 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">Current CGPA</span>
          <span className="font-bold text-lg font-serif text-[#12172B]">8.46 / 10.0</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">Total Earned Credits</span>
          <span className="font-bold text-lg font-serif text-[#12172B]">98 / 160 Cr</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">Cohort Percentile</span>
          <span className="font-bold text-lg font-serif text-[#2E7D68]">Top 8.2%</span>
        </div>
      </div>
    </div>
  );
}

export function StudentAttendanceDeepDive() {
  const records = [
    { code: "CS-201", name: "Data Structures & Algorithms", attended: 22, total: 25, percent: 88, status: "safe", bufferText: "Safe buffer: Can skip 2 lectures safely" },
    { code: "CS-305", name: "Relational Database Systems", attended: 23, total: 25, percent: 92, status: "safe", bufferText: "Safe buffer: Can skip 3 lectures safely" },
    { code: "CS-401", name: "Distributed Operating Systems", attended: 18, total: 25, percent: 72, status: "warning", bufferText: "⚠️ Threshold alert: Must attend next 2 classes" },
    { code: "CS-405", name: "Computer Networks & Protocols", attended: 24, total: 25, percent: 96, status: "safe", bufferText: "Safe buffer: Can skip 4 lectures safely" },
  ];

  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Lecture Attendance & Examination Eligibility</h3>
          <p className="text-xs text-[#5C6788]">Mandatory minimum 75% attendance required for semester final hall tickets</p>
        </div>
        <span className="academic-stamp text-xs py-0.5 px-2">Threshold 75%</span>
      </div>

      <div className="space-y-4">
        {records.map((item) => {
          const isWarning = item.percent < 75;
          return (
            <div key={item.code} className="p-3.5 rounded-xl bg-[#EDE9DF]/30 border border-[#E5E0D2] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <span className="font-bold text-[#12172B]">{item.name}</span>
                  <span className="text-[#5C6788] ml-2 font-mono">({item.code})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#5C6788] font-medium">{item.attended}/{item.total} lectures</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      isWarning
                        ? "bg-[#FEF2F0] text-[#9C3823] border border-[#E2725B]"
                        : "bg-[#F0FDF4] text-[#166534] border border-[#22C55E]"
                    }`}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#EDE9DF] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: isWarning ? "#E2725B" : "#2E7D68",
                  }}
                />
              </div>

              <p className={`text-[11px] ${isWarning ? "text-[#9C3823] font-semibold" : "text-[#5C6788]"}`}>
                {item.bufferText}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentFeeOverview({ onPayClick }: { onPayClick: () => void }) {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Tuition & Ledger Statement</h3>
          <p className="text-xs text-[#5C6788]">Semester 5 Academic Installments and Receipts</p>
        </div>
        <span className="margin-note-emerald text-xs">Term Cleared</span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center py-2 border-b border-[#E5E0D2]/60">
          <span className="text-[#5C6788]">Semester 5 Tuition & Laboratory Dues</span>
          <span className="font-bold text-[#12172B]">$1,250.00 (Paid)</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#E5E0D2]/60">
          <span className="text-[#5C6788]">Digital Library & Computing Fee</span>
          <span className="font-bold text-[#12172B]">$150.00 (Paid)</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#E5E0D2]/60">
          <span className="text-[#5C6788]">Campus Examination & Hall Ticket Fee</span>
          <span className="font-bold text-[#12172B]">$75.00 (Paid)</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-[#12172B]">Outstanding Balance Due:</span>
          <span className="text-lg font-bold font-serif text-[#2E7D68]">$0.00</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-3 border-t border-[#E5E0D2]">
        <button
          type="button"
          onClick={() => alert("Downloading official PDF receipt for Semester 5...")}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#E5E0D2] bg-white hover:bg-[#EDE9DF]/60 text-xs font-semibold text-[#12172B] transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#E8B93F]" />
          <span>Receipt PDF</span>
        </button>

        <button
          type="button"
          onClick={onPayClick}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-xs font-semibold text-white transition-all shadow-xs"
        >
          <CreditCard className="w-3.5 h-3.5 text-[#E8B93F]" />
          <span>Advance Pay Next Term</span>
        </button>
      </div>
    </div>
  );
}

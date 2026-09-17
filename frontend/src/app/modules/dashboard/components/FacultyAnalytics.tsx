import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GRADE_DISTRIBUTION_DATA = [
  { grade: "Grade A", cs201: 18, cs305: 14, cs401: 9 },
  { grade: "Grade B", cs201: 20, cs305: 15, cs401: 16 },
  { grade: "Grade C", cs201: 8, cs305: 6, cs401: 8 },
  { grade: "Grade D", cs201: 2, cs305: 1, cs401: 3 },
  { grade: "Grade F", cs201: 0, cs305: 0, cs401: 1 },
];

export function FacultyGradeAnalytics() {
  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Student Grade & Assessment Analytics</h3>
          <p className="text-xs text-[#5C6788]">Comparative grade distribution across active courses</p>
        </div>
        <span className="margin-note text-xs">Midterm Curve</span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GRADE_DISTRIBUTION_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D2" />
            <XAxis dataKey="grade" tick={{ fontSize: 11, fill: "#5C6788" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5C6788" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E0D2",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="cs201" name="Data Structures (CS-201)" fill="#12172B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cs305" name="Databases (CS-305)" fill="#E8B93F" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cs401" name="OS Systems (CS-401)" fill="#2E7D68" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E0D2] text-xs">
        <div className="p-2.5 rounded-lg bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">CS-201 Mean Score</span>
          <span className="font-bold text-[#12172B] text-sm">84.2% (B+)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">CS-305 Mean Score</span>
          <span className="font-bold text-[#12172B] text-sm">88.6% (A-)</span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#EDE9DF]/40 border border-[#E5E0D2]">
          <span className="text-[#5C6788] block text-[10px] uppercase font-bold">CS-401 Mean Score</span>
          <span className="font-bold text-[#12172B] text-sm">76.8% (B)</span>
        </div>
      </div>
    </div>
  );
}

export function FacultyAttendanceSummary() {
  const courses = [
    { code: "CS-201", name: "Data Structures & Algorithms", enrolled: 48, attendance: 91, status: "Good" },
    { code: "CS-305", name: "Relational Database Systems", enrolled: 36, attendance: 88, status: "Good" },
    { code: "CS-401", name: "Distributed Operating Systems", enrolled: 36, attendance: 71, status: "Warning" },
  ];

  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
        <div>
          <h3 className="text-base font-bold font-serif text-[#12172B]">Attendance Roster Summary</h3>
          <p className="text-xs text-[#5C6788]">Current aggregate lecture attendance by section</p>
        </div>
        <span className="academic-stamp text-xs py-0.5 px-2.5">75% Threshold</span>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const isWarning = course.attendance < 75;
          return (
            <div key={course.code} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#12172B]">{course.name}</span>
                  <span className="text-[#5C6788] ml-2">({course.code} • {course.enrolled} Scholars)</span>
                </div>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    isWarning
                      ? "bg-[#FEF2F0] text-[#9C3823] border border-[#E2725B]"
                      : "bg-[#F0FDF4] text-[#166534] border border-[#22C55E]"
                  }`}
                >
                  {course.attendance}% {isWarning ? "Threshold Alert" : "Adequate"}
                </span>
              </div>
              <div className="w-full bg-[#EDE9DF] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.attendance}%`,
                    backgroundColor: isWarning ? "#E2725B" : "#2E7D68",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

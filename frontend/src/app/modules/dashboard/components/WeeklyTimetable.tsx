import { useState } from "react";
import { Calendar, Clock, MapPin, Sparkles, BookOpen } from "lucide-react";

interface Slot {
  time: string;
  course: string;
  code: string;
  room: string;
  type: "Lecture" | "Lab" | "Seminar" | "Tutorial";
  instructor?: string;
}

const TIMETABLE_DATA: Record<string, Slot[]> = {
  Monday: [
    { time: "09:00 AM – 10:30 AM", course: "Data Structures & Algorithms", code: "CS-201", room: "Hall 304", type: "Lecture", instructor: "Dr. Chen" },
    { time: "11:00 AM – 12:30 PM", course: "Relational Database Systems", code: "CS-305", room: "Hall 102", type: "Lecture", instructor: "Prof. Harrison" },
    { time: "02:00 PM – 04:00 PM", course: "Computing Systems Wet Lab", code: "CS-305L", room: "Lab B-2", type: "Lab", instructor: "Teaching Fellows" },
  ],
  Tuesday: [
    { time: "10:00 AM – 11:30 AM", course: "Distributed Operating Systems", code: "CS-401", room: "Amphitheater A", type: "Lecture", instructor: "Prof. Vance" },
    { time: "01:00 PM – 02:30 PM", course: "Computer Networks & Protocols", code: "CS-405", room: "Room 208", type: "Lecture", instructor: "Dr. Morales" },
    { time: "03:00 PM – 04:30 PM", course: "Algorithms Problem Solving", code: "CS-201T", room: "Room 105", type: "Tutorial", instructor: "Dr. Chen" },
  ],
  Wednesday: [
    { time: "09:00 AM – 10:30 AM", course: "Data Structures & Algorithms", code: "CS-201", room: "Hall 304", type: "Lecture", instructor: "Dr. Chen" },
    { time: "11:00 AM – 12:30 PM", course: "Relational Database Systems", code: "CS-305", room: "Hall 102", type: "Lecture", instructor: "Prof. Harrison" },
    { time: "02:00 PM – 03:30 PM", course: "Faculty Consultation & Office Hours", code: "OFF-HRS", room: "Office 412", type: "Seminar", instructor: "Open to Cohort" },
  ],
  Thursday: [
    { time: "09:00 AM – 10:30 AM", course: "Data Structures & Algorithms", code: "CS-201", room: "Room 304", type: "Lecture", instructor: "Dr. Chen" },
    { time: "11:00 AM – 12:30 PM", course: "Relational Database Systems Lab", code: "CS-305", room: "Computing Lab 2", type: "Lab", instructor: "Dr. Chen" },
    { time: "02:00 PM – 03:30 PM", course: "Distributed Operating Systems", code: "CS-401", room: "Amphitheater 102", type: "Seminar", instructor: "Dr. Chen" },
  ],
  Friday: [
    { time: "10:00 AM – 11:30 AM", course: "Computer Networks & Protocols", code: "CS-405", room: "Room 208", type: "Lecture", instructor: "Dr. Morales" },
    { time: "01:30 PM – 03:30 PM", course: "Kernel OS Coding Practical", code: "CS-401L", room: "Systems Lab 1", type: "Lab", instructor: "Prof. Vance" },
    { time: "04:00 PM – 05:00 PM", course: "Weekly Departmental Colloquium", code: "COL-901", room: "Auditorium C", type: "Seminar", instructor: "Guest Speakers" },
  ],
};

const TYPE_STYLES = {
  Lecture: { bg: "#EDE9DF", text: "#12172B", border: "#D7D0C0" },
  Lab: { bg: "#FFF9E6", text: "#8A6610", border: "#E8B93F" },
  Seminar: { bg: "#F0FDF4", text: "#166534", border: "#22C55E" },
  Tutorial: { bg: "#FEF2F0", text: "#9C3823", border: "#E2725B" },
};

export function WeeklyTimetable({ isFaculty = false }: { isFaculty?: boolean }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [activeDay, setActiveDay] = useState("Thursday");
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const activeSlots = TIMETABLE_DATA[activeDay] || [];

  return (
    <div className="paper-card p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E0D2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#12172B] text-white flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4 text-[#E8B93F]" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif text-[#12172B]">
              {isFaculty ? "Teaching Timetable Roster" : "Weekly Lecture & Lab Timetable"}
            </h3>
            <p className="text-xs text-[#5C6788]">
              {isFaculty ? "Allocated lecture slots, laboratory hours, and consultation" : "Curricular class slots and room schedules"}
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-[#EDE9DF]/60 p-1 rounded-xl border border-[#E5E0D2] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("day")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              viewMode === "day"
                ? "bg-white text-[#12172B] shadow-2xs"
                : "text-[#5C6788] hover:text-[#12172B]"
            }`}
          >
            Day Focus
          </button>
          <button
            type="button"
            onClick={() => setViewMode("week")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              viewMode === "week"
                ? "bg-white text-[#12172B] shadow-2xs"
                : "text-[#5C6788] hover:text-[#12172B]"
            }`}
          >
            Full Week Grid
          </button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-[#12172B] text-white border-[#12172B] shadow-xs"
                  : "bg-white/80 hover:bg-[#EDE9DF]/60 text-[#5C6788] border-[#E5E0D2]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Content based on viewMode */}
      {viewMode === "day" ? (
        <div className="space-y-3 pt-1">
          {activeSlots.map((slot, index) => {
            const badgeStyle = TYPE_STYLES[slot.type] || TYPE_STYLES.Lecture;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/90 border border-[#E5E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#D7D0C0] transition-all shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text,
                        borderColor: badgeStyle.border,
                      }}
                    >
                      {slot.type}
                    </span>
                    <span className="text-xs font-bold text-[#12172B]">{slot.code}</span>
                  </div>
                  <h4 className="text-sm font-bold font-serif text-[#12172B]">{slot.course}</h4>
                  <div className="flex items-center gap-3 text-xs text-[#5C6788]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E8B93F]" />
                      {slot.room}
                    </span>
                    {slot.instructor && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#5C6788]" />
                        {slot.instructor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12172B] bg-[#EDE9DF]/60 border border-[#E5E0D2] px-3 py-1.5 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#E8B93F]" />
                    {slot.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Full Week Grid View */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          {days.map((day) => (
            <div key={day} className="bg-[#EDE9DF]/30 rounded-xl p-3 border border-[#E5E0D2] space-y-2.5">
              <h5 className="font-bold font-serif text-xs text-[#12172B] pb-1 border-b border-[#E5E0D2]">
                {day}
              </h5>
              <div className="space-y-2">
                {(TIMETABLE_DATA[day] || []).map((s, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-[#E5E0D2] text-[11px] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#12172B]">{s.code}</span>
                      <span className="text-[9px] text-[#5C6788]">{s.type}</span>
                    </div>
                    <p className="text-[10px] text-[#5C6788] truncate">{s.course}</p>
                    <p className="text-[9px] font-semibold text-[#12172B]">{s.room}</p>
                    <p className="text-[9px] text-[#8B96B5]">{s.time.split("–")[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Tag } from "lucide-react";

interface CalendarEvent {
  id: string;
  date: number; // day of month
  title: string;
  type: "exam" | "holiday" | "meeting" | "deadline" | "event";
  time: string;
  location?: string;
  description: string;
}

const SAMPLE_EVENTS: Record<number, CalendarEvent[]> = {
  3: [
    {
      id: "ev-1",
      date: 3,
      title: "Faculty Academic Senate",
      type: "meeting",
      time: "02:00 PM – 04:00 PM",
      location: "Senate Boardroom, Hall A",
      description: "Curriculum review & Fall 2026 examination schedule ratification.",
    },
  ],
  8: [
    {
      id: "ev-2",
      date: 8,
      title: "Mid-Term Tuition Clearance Deadline",
      type: "deadline",
      time: "11:59 PM EST",
      location: "Finance Portal",
      description: "Late fee penalty applicable for unpaid semester installments.",
    },
  ],
  14: [
    {
      id: "ev-3",
      date: 14,
      title: "Autumn Convocation & Research Expo",
      type: "event",
      time: "10:00 AM – 05:00 PM",
      location: "Main University Auditorium",
      description: "Keynote presentation by Visiting Scholar Dr. Marcus Vance.",
    },
  ],
  21: [
    {
      id: "ev-4",
      date: 21,
      title: "Midterm Assessment Week Commences",
      type: "exam",
      time: "09:00 AM Daily",
      location: "Academic Examination Center",
      description: "All undergraduate cohorts Semesters 1–7.",
    },
  ],
  28: [
    {
      id: "ev-5",
      date: 28,
      title: "Institutional Founders' Day Holiday",
      type: "holiday",
      time: "All Day",
      location: "Campus-wide",
      description: "No lectures or laboratory sessions scheduled.",
    },
  ],
};

const TYPE_CONFIG = {
  exam: { bg: "#FEF2F0", border: "#E2725B", text: "#9C3823", dot: "#E2725B", label: "Exam" },
  holiday: { bg: "#F0FDF4", border: "#22C55E", text: "#166534", dot: "#22C55E", label: "Holiday" },
  meeting: { bg: "#FFF9E6", border: "#E8B93F", text: "#8A6610", dot: "#E8B93F", label: "Senate" },
  deadline: { bg: "#FFF1F2", border: "#F43F5E", text: "#BE123C", dot: "#F43F5E", label: "Deadline" },
  event: { bg: "#F5F3FF", border: "#8B5CF6", text: "#6D28D9", dot: "#8B5CF6", label: "Campus Event" },
};

export function AcademicCalendarWidget() {
  const [currentMonth] = useState("October 2026");
  const [selectedDay, setSelectedDay] = useState<number>(21);

  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday Oct 1, 2026

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const selectedEvents = SAMPLE_EVENTS[selectedDay] || [];

  return (
    <div className="paper-card p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8B93F]/20 text-[#12172B] flex items-center justify-center font-bold">
            <CalendarIcon className="w-4 h-4 text-[#E8B93F]" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif text-[#12172B]">Academic Calendar & Milestones</h3>
            <p className="text-xs text-[#5C6788]">Key institutional deadlines, examinations, and events</p>
          </div>
        </div>
        <span className="academic-stamp text-xs py-0.5 px-2.5">Term 2026–27</span>
      </div>

      {/* Month Navigator Header */}
      <div className="flex items-center justify-between bg-[#EDE9DF]/40 p-2.5 rounded-xl border border-[#E5E0D2]">
        <span className="text-xs font-bold text-[#12172B] font-serif tracking-wide pl-2">
          {currentMonth}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1 rounded-md hover:bg-white text-[#5C6788] hover:text-[#12172B] transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-white text-[#5C6788] hover:text-[#12172B] transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#5C6788] uppercase tracking-wider mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Empty offset days */}
          {Array.from({ length: startDayOffset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="h-9" />
          ))}

          {days.map((day) => {
            const hasEvents = !!SAMPLE_EVENTS[day];
            const isSelected = selectedDay === day;
            const eventTypes = SAMPLE_EVENTS[day]?.map((e) => e.type) || [];

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`h-9 rounded-lg flex flex-col items-center justify-center relative font-medium transition-all ${
                  isSelected
                    ? "bg-[#12172B] text-white shadow-sm font-bold scale-105 z-10"
                    : hasEvents
                    ? "bg-[#EDE9DF]/60 text-[#12172B] hover:bg-[#EDE9DF] font-semibold"
                    : "text-[#5C6788] hover:bg-[#EDE9DF]/30"
                }`}
              >
                <span>{day}</span>
                {hasEvents && (
                  <div className="flex gap-0.5 mt-0.5">
                    {eventTypes.map((type, i) => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: isSelected ? "#E8B93F" : TYPE_CONFIG[type].dot,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda */}
      <div className="pt-3 border-t border-[#E5E0D2] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#12172B] font-serif">
            Events for Oct {selectedDay}, 2026
          </span>
          <span className="text-[11px] text-[#5C6788]">
            {selectedEvents.length} scheduled
          </span>
        </div>

        {selectedEvents.length > 0 ? (
          <div className="space-y-2.5">
            {selectedEvents.map((event) => {
              const style = TYPE_CONFIG[event.type];
              return (
                <div
                  key={event.id}
                  className="p-3 rounded-xl border transition-all text-xs"
                  style={{ backgroundColor: style.bg, borderColor: style.border }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-[#12172B]">{event.title}</h5>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "white", color: style.text }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C6788] mt-1 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 pt-1.5 border-t border-black/5 text-[10px] text-[#5C6788]">
                    <span className="flex items-center gap-1 font-semibold text-[#12172B]">
                      <Clock className="w-3 h-3 text-[#E8B93F]" />
                      {event.time}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#5C6788]" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4 bg-[#EDE9DF]/20 rounded-xl border border-dashed border-[#E5E0D2]">
            <p className="text-xs text-[#5C6788]">No special events or deadlines on this date.</p>
            <p className="text-[11px] text-[#8B96B5] mt-0.5">Regular lecture and seminar schedule applies.</p>
          </div>
        )}
      </div>
    </div>
  );
}

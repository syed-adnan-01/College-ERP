import { useState } from "react";
import { Bell, CheckCheck, Clock, FileText, AlertCircle, Info, Sparkles } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  category: "academic" | "exam" | "finance" | "campus";
  timestamp: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Midterm Hall Tickets Generated",
    body: "Fall 2026 Examination Hall Tickets for undergraduate cohorts are available for download.",
    category: "exam",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "OS Architecture Lab 4 Submission Due",
    body: "Prof. Vance announced the deadline for Kernel memory management assignment is Friday at 11:59 PM.",
    category: "academic",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Semester 5 Fee Receipt Reconciled",
    body: "Your tuition payment transaction #TXN-98421 of $1,475.00 has been cleared by the Registrar's Bursar.",
    category: "finance",
    timestamp: "1 day ago",
    unread: false,
  },
  {
    id: "notif-4",
    title: "Campus Library Extended Hours",
    body: "The Central Library will remain open 24/7 during midterm revision week starting Monday.",
    category: "campus",
    timestamp: "2 days ago",
    unread: false,
  },
];

const CATEGORY_STYLES = {
  exam: { bg: "#FEF2F0", text: "#9C3823", border: "#E2725B", icon: AlertCircle },
  academic: { bg: "#FFF9E6", text: "#8A6610", border: "#E8B93F", icon: FileText },
  finance: { bg: "#F0FDF4", text: "#166534", border: "#22C55E", icon: Sparkles },
  campus: { bg: "#EDE9DF", text: "#12172B", border: "#D7D0C0", icon: Info },
};

export function NotificationCenter() {
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const markItemRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="paper-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8B93F]/20 text-[#12172B] flex items-center justify-center font-bold relative">
            <Bell className="w-4 h-4 text-[#E8B93F]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E2725B] text-white text-[9px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold font-serif text-[#12172B]">Campus Broadcasts & Alerts</h3>
            <p className="text-xs text-[#5C6788]">Real-time notices and administrative dispatches</p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6788] hover:text-[#12172B] transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-[#2E7D68]" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {["all", "academic", "exam", "finance", "campus"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider text-[10px] transition-all ${
              filter === cat
                ? "bg-[#12172B] text-white"
                : "bg-[#EDE9DF]/60 text-[#5C6788] hover:text-[#12172B]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.campus;
            const Icon = style.icon;

            return (
              <div
                key={item.id}
                onClick={() => markItemRead(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  item.unread
                    ? "bg-white border-[#E8B93F] shadow-xs"
                    : "bg-[#EDE9DF]/30 border-[#E5E0D2] opacity-80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: style.bg, color: style.text }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-bold text-xs text-[#12172B] font-serif">
                        {item.title}
                      </h5>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#E8B93F] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#5C6788] leading-relaxed">{item.body}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#8B96B5] pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 bg-[#EDE9DF]/20 rounded-xl border border-dashed border-[#E5E0D2]">
            <p className="text-xs text-[#5C6788]">No dispatches in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

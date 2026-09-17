import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { CheckCircle2, UserPlus, BellRing, FileBarChart, Calendar, Check, X, CreditCard, Sparkles } from "lucide-react";

/* 1. Add Student Modal */
export function AddStudentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [semester, setSemester] = useState("Semester 1");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#12172B] text-white flex items-center justify-center mb-2">
            <UserPlus className="w-5 h-5 text-[#E8B93F]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Enroll New Scholar</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            Create a student dossier and provision ERP credentials for the incoming cohort.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-[#12172B]">Scholar Enrolled Successfully!</h4>
            <p className="text-xs text-[#5C6788]">Welcome letter and portal PIN dispatched to {email || "student email"}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g., Jonathan Edwards"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Institutional Email</label>
              <input
                required
                type="email"
                placeholder="j.edwards@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#12172B]">Faculty / Dept</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
                >
                  <option>Computer Science & Engineering</option>
                  <option>Business Administration</option>
                  <option>Biotechnology & Quantum</option>
                  <option>Comparative Arts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#12172B]">Matriculation Term</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
                >
                  <option>Semester 1 (Freshman)</option>
                  <option>Semester 3 (Lateral)</option>
                  <option>Postgraduate Year 1</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold shadow-xs"
              >
                Confirm Enrollment
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* 2. Create Notice Modal */
export function CreateNoticeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("all");
  const [body, setBody] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#E8B93F]/20 text-[#12172B] flex items-center justify-center mb-2">
            <BellRing className="w-5 h-5 text-[#8A6610]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Publish Campus Notice</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            Transmit an official bulletin to scholars, faculty, and administrative staff.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-[#12172B]">Notice Broadcasted!</h4>
            <p className="text-xs text-[#5C6788]">FCM push notifications and digital board updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Notice Headline</label>
              <input
                required
                type="text"
                placeholder="e.g., Autumn Term Midterm Examination Schedule"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Target Audience</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              >
                <option value="all">Entire University Campus (All Roles)</option>
                <option value="students">Enrolled Scholars Only</option>
                <option value="faculty">Appointed Faculty & Instructors</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Dispatch Content</label>
              <textarea
                required
                rows={4}
                placeholder="Enter detailed announcements, guidelines, and venue instructions..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold shadow-xs"
              >
                Broadcast Notice
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* 3. Generate Report Modal */
export function GenerateReportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reportType, setReportType] = useState("enrollment");
  const [format, setFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report compiled successfully as ${format.toUpperCase()}! Downloading...`);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#2E7D68]/20 text-[#2E7D68] flex items-center justify-center mb-2">
            <FileBarChart className="w-5 h-5 text-[#2E7D68]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Compile Registrar Report</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            Export accredited statistical audit and performance registries.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-xs py-2">
          <div className="space-y-1">
            <label className="font-semibold text-[#12172B]">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
            >
              <option value="enrollment">Cohort Matriculation & Enrollment Audit</option>
              <option value="finance">Bursar Fee Collection & Ledger Reconciliation</option>
              <option value="attendance">Institutional Lecture Attendance Matrix</option>
              <option value="grades">Term Grade Point Average Distribution Curve</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#12172B]">Export Format</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat("pdf")}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  format === "pdf"
                    ? "bg-[#12172B] text-white border-[#12172B]"
                    : "bg-white text-[#5C6788] border-[#E5E0D2]"
                }`}
              >
                Official PDF Document
              </button>
              <button
                type="button"
                onClick={() => setFormat("csv")}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  format === "csv"
                    ? "bg-[#12172B] text-white border-[#12172B]"
                    : "bg-white text-[#5C6788] border-[#E5E0D2]"
                }`}
              >
                CSV Data Spreadsheet
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold text-xs shadow-xs"
          >
            {isGenerating ? "Compiling..." : "Generate & Download"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* 4. Faculty Apply Leave Modal */
export function ApplyLeaveModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [type, setType] = useState("Casual");
  const [days, setDays] = useState(2);
  const [reason, setReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#E8B93F]/20 text-[#12172B] flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-[#8A6610]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Faculty Leave Request</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            Submit sabbatical, academic duty, or casual leave for Head of Department approval.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-[#12172B]">Leave Request Submitted</h4>
            <p className="text-xs text-[#5C6788]">Forwarded to HOD Dr. Robert Chen for electronic endorsement.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#12172B]">Leave Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
                >
                  <option>Casual Leave (Balance: 4)</option>
                  <option>Sick / Medical Leave (Balance: 7)</option>
                  <option>Academic Duty / Conference (Balance: 12)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#12172B]">Duration (Days)</label>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Statement of Absence & Lecture Substitute</label>
              <textarea
                required
                rows={3}
                placeholder="Mention guest lecturer or lab makeup slot details..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold shadow-xs"
              >
                Transmit Application
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* 5. Take Attendance Modal */
export function TakeAttendanceModal({
  isOpen,
  onClose,
  courseTitle = "Data Structures & Algorithms (CS-201)",
}: {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}) {
  const [students, setStudents] = useState([
    { id: "s1", name: "Alice Smith", roll: "CS-2024-001", status: "present" },
    { id: "s2", name: "Bob Johnson", roll: "CS-2024-002", status: "present" },
    { id: "s3", name: "Charlie Brown", roll: "CS-2024-003", status: "absent" },
    { id: "s4", name: "Diana Prince", roll: "CS-2024-004", status: "present" },
    { id: "s5", name: "Ethan Hunt", roll: "CS-2024-005", status: "present" },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const toggleStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "present" ? "absent" : "present" } : s
      )
    );
  };

  const markAll = (status: "present" | "absent") => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Lecture Attendance Register</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            {courseTitle} • Room 304, Academic Hall A
          </DialogDescription>
        </DialogHeader>

        {isSaved ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-[#12172B]">Roster Recorded & Sync'd</h4>
            <p className="text-xs text-[#5C6788]">Attendance saved to PostgreSQL with tenant scoping.</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-[#EDE9DF]/40 p-2.5 rounded-xl border border-[#E5E0D2]">
              <span className="font-semibold text-[#12172B]">Quick Action:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => markAll("present")}
                  className="px-2.5 py-1 bg-white hover:bg-[#F0FDF4] border border-[#E5E0D2] text-[#166534] font-bold rounded-lg"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => markAll("absent")}
                  className="px-2.5 py-1 bg-white hover:bg-[#FEF2F0] border border-[#E5E0D2] text-[#9C3823] font-bold rounded-lg"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {students.map((s) => (
                <div
                  key={s.id}
                  onClick={() => toggleStatus(s.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    s.status === "present"
                      ? "bg-[#F0FDF4]/70 border-[#22C55E]/40"
                      : "bg-[#FEF2F0]/70 border-[#E2725B]/40"
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-[#12172B]">{s.name}</h5>
                    <p className="text-[10px] text-[#5C6788] font-mono">{s.roll}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 ${
                      s.status === "present"
                        ? "bg-[#22C55E] text-white"
                        : "bg-[#E2725B] text-white"
                    }`}
                  >
                    {s.status === "present" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {s.status}
                  </span>
                </div>
              ))}
            </div>

            <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold shadow-xs"
              >
                Submit Register
              </button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* 6. Pay Fee Modal */
export function PayFeeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [method, setMethod] = useState("bank");
  const [amount] = useState("1475.00");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FFFDF8] border-[#E5E0D2]">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#2E7D68]/20 text-[#2E7D68] flex items-center justify-center mb-2">
            <CreditCard className="w-5 h-5 text-[#2E7D68]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#12172B]">Tuition & Fee Payment Portal</DialogTitle>
          <DialogDescription className="text-xs text-[#5C6788]">
            Advance settlement for Semester 6 Academic Term & Laboratory Dues.
          </DialogDescription>
        </DialogHeader>

        {isDone ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-[#12172B]">Payment Reconciled!</h4>
            <p className="text-xs text-[#5C6788]">Transaction ID #TXN-2026-9812 has been recorded in student ledger.</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2] flex justify-between items-center">
              <div>
                <span className="text-[10px] text-[#5C6788] uppercase font-bold">Total Payable</span>
                <h4 className="text-xl font-bold font-serif text-[#12172B]">${amount}</h4>
              </div>
              <span className="academic-stamp text-xs py-0.5 px-2">Bursar Ledger</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Select Payment Channel</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("bank")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    method === "bank"
                      ? "bg-[#12172B] text-white border-[#12172B]"
                      : "bg-white text-[#5C6788] border-[#E5E0D2]"
                  }`}
                >
                  Bank Wire / Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    method === "card"
                      ? "bg-[#12172B] text-white border-[#12172B]"
                      : "bg-white text-[#5C6788] border-[#E5E0D2]"
                  }`}
                >
                  Credit / Debit Card
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#12172B]">Reference / Voucher Number</label>
              <input
                required
                type="text"
                placeholder="e.g., BNK-REF-8492019"
                className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:border-[#12172B]"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-[#E5E0D2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E5E0D2] text-[#5C6788] hover:bg-[#EDE9DF]/60 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-[#2E7D68] hover:bg-[#256655] text-white font-semibold shadow-xs"
              >
                {isProcessing ? "Processing..." : "Confirm & Authorize"}
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

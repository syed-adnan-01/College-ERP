import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, ShieldCheck, CheckCircle2, Building } from "lucide-react";
import { useState } from "react";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { useTenant } from "../../auth/context/TenantContext";

export function Contact() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Campus Location",
      details: ["Central University Quadrangle", "100 Academic Way, Cambridge", "MA 02138, United States"],
      badge: "Main Campus",
    },
    {
      icon: Phone,
      title: "Direct Inquiries",
      details: ["+1 (555) 123-4567 (Central Desk)", "+1 (555) 123-4568 (Admissions)"],
      badge: "Toll Free",
    },
    {
      icon: Mail,
      title: "Official Correspondence",
      details: ["admissions@eduplatform.edu", "registrar@eduplatform.edu"],
      badge: "24h Response",
    },
    {
      icon: Clock,
      title: "Desk Operating Hours",
      details: ["Monday–Friday: 8:00 AM – 6:00 PM", "Saturday: 9:00 AM – 2:00 PM EST"],
      badge: "Open Today",
    },
  ];

  const departments = [
    { name: "Admissions & Records", email: "admissions@eduplatform.edu", phone: "+1 (555) 101-2001", room: "Hall A, Suite 102" },
    { name: "Financial Aid & Endowments", email: "finaid@eduplatform.edu", phone: "+1 (555) 101-2002", room: "Bursar Quad, Room 204" },
    { name: "International Scholar Services", email: "international@eduplatform.edu", phone: "+1 (555) 101-2003", room: "Global Center, Fl 3" },
    { name: "Academic Affairs & Registrar", email: "academics@eduplatform.edu", phone: "+1 (555) 101-2004", room: "Tower Hall, Suite 401" },
    { name: "Student Life & Residential Housing", email: "students@eduplatform.edu", phone: "+1 (555) 101-2005", room: "Student Commons, 2nd Fl" },
    { name: "IT Helpdesk & ERP Support", email: "support@eduplatform.edu", phone: "+1 (555) 101-2006", room: "Library Annex, B1" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <Building className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Campus Directory & Advisory Desk</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              Get in Touch with Our{" "}
              <HighlighterUnderline color="#E8B93F">
                Campus Desk
              </HighlighterUnderline>
            </h1>

            <p className="text-base text-[#5C6788] leading-relaxed">
              Have questions regarding admissions, degree programs, or university facilities? Our advisory team is available to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="paper-card p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#12172B] text-[#E8B93F] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="margin-note text-[10px]">
                      {info.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#12172B] mb-2">
                    {info.title}
                  </h3>

                  <div className="space-y-1 text-xs text-[#5C6788] leading-relaxed">
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E0D2]/70 text-[10px] text-[#5C6788] font-medium">
                  Verified Campus Channel
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form & Campus Desk Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 paper-card p-7 sm:p-10 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Inquiry Form</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-1">
                Send an Official Dispatch
              </h2>
              <p className="text-xs text-[#5C6788] mt-1">
                Fill out the fields below and the appropriate department registrar will reply within 1 business day.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#EDE9DF] border border-[#2E7D68] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D68] mx-auto" />
                <h4 className="text-lg font-bold font-serif text-[#12172B]">Inquiry Successfully Dispatched</h4>
                <p className="text-xs text-[#5C6788] max-w-sm mx-auto">
                  Your message has been assigned Ticket #ERP-{Math.floor(1000 + Math.random() * 9000)}. A representative will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-[#12172B] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none"
                      placeholder="Eleanor Vance"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#12172B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none"
                      placeholder="e.vance@example.edu"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-[#12172B] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none"
                      placeholder="+1 (555) 019-2834"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-[#12172B] mb-1.5">
                      Target Department *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none appearance-none"
                    >
                      <option value="">Select a Department</option>
                      <option value="admissions">Admissions & Records</option>
                      <option value="financial">Financial Aid & Scholarships</option>
                      <option value="academic">Academic Advising</option>
                      <option value="international">International Scholar Affairs</option>
                      <option value="it">Campus IT & ERP Access</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#12172B] mb-1.5">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#12172B] focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none resize-none"
                    placeholder="Provide relevant student ID, desired program code, or specific questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#E8B93F]" />
                  <span>Transmit Inquiry to Registrar</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Help & Campus Desk Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#12172B] text-white p-7 rounded-3xl border border-[#232D4B] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <MapPin className="w-6 h-6 text-[#E8B93F]" />
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">Campus Information Desk</h3>
                  <p className="text-xs text-[#8B96B5]">Main Quadrangle Welcome Pavilion</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#EDE9DF]">
                <p className="leading-relaxed">
                  Campus walking tours depart daily at 10:00 AM and 2:00 PM from the Welcome Pavilion. Advance booking is recommended for prospective scholar groups.
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="font-bold text-[#E8B93F]">Emergency Campus Safety Desk</p>
                  <p className="text-[11px] text-[#8B96B5]">24/7 Security Patrol: +1 (555) 911-CAMP</p>
                </div>
              </div>
            </div>

            <div className="paper-card p-6 space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#12172B]">Direct Digital Services</h4>
              <div className="space-y-2.5 text-xs">
                <a href="#" className="flex items-center justify-between p-2.5 rounded-xl bg-[#EDE9DF]/40 hover:bg-[#EDE9DF] text-[#12172B] transition-colors">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#E8B93F]" />
                    <span>Live Advising Chat (M–F 9–5)</span>
                  </div>
                  <span className="text-[10px] text-[#5C6788]">Online</span>
                </a>
                <a href="#" className="flex items-center justify-between p-2.5 rounded-xl bg-[#EDE9DF]/40 hover:bg-[#EDE9DF] text-[#12172B] transition-colors">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#E8B93F]" />
                    <span>Student Knowledge Base & FAQ</span>
                  </div>
                  <span className="text-[10px] text-[#5C6788]">50+ Guides</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Department Directory Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Registry</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-1">
              Department Direct Lines
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-[#EDE9DF]/40 border border-[#E5E0D2] space-y-3 hover:bg-[#EDE9DF]/70 transition-all"
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold font-serif text-[#12172B]">{dept.name}</h4>
                  <p className="text-[11px] text-[#E8B93F] font-semibold">{dept.room}</p>
                </div>

                <div className="space-y-1 text-xs text-[#5C6788] pt-2 border-t border-[#E5E0D2]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#12172B] flex-shrink-0" />
                    <a href={`mailto:${dept.email}`} className="hover:text-[#12172B] truncate font-medium">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#12172B] flex-shrink-0" />
                    <span>{dept.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


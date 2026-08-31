import { Link } from "react-router";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  Bookmark, 
  GraduationCap, 
  Compass, 
  FileText, 
  ShieldCheck, 
  MapPin, 
  ChevronRight,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { useTenant } from "../../auth/context/TenantContext";

function TypewriterHeading() {
  const phrases = [
    "Future Leadership",
    "Scientific Discovery",
    "Academic Excellence",
    "Global Careers",
    "Technological Innovation",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[currentPhraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <span className="inline-block text-[#12172B] relative">
      <HighlighterUnderline color="#E8B93F">
        {currentText}
      </HighlighterUnderline>
      <span className="inline-block w-0.5 h-7 md:h-10 lg:h-12 ml-1 align-middle bg-[#12172B] animate-pulse rounded-full" />
    </span>
  );
}

export function Home() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";

  const stats = [
    { icon: Users, label: "Enrolled Scholars", value: "15,000+", note: "98% retention rate", accent: "#E8B93F" },
    { icon: BookOpen, label: "Accredited Programs", value: "150+", note: "Undergrad & Graduate", accent: "#12172B" },
    { icon: Award, label: "Distinguished Faculty", value: "800+", note: "95% doctoral chairs", accent: "#2E7D68" },
    { icon: TrendingUp, label: "Career Placement", value: "95%", note: "Fortune 500 partners", accent: "#5C6788" },
  ];

  const featuredPrograms = [
    {
      code: "CS-201",
      title: "Computer Science & Engineering",
      duration: "4 Years • 120 Credits",
      department: "Engineering & Technology",
      description: "Rigorous curriculum covering systems architecture, distributed computing, algorithms, and artificial intelligence.",
      badge: "Highest Enrollment",
      accent: "#E8B93F",
      seats: "120 Seats",
    },
    {
      code: "MGMT-301",
      title: "Business Administration & Strategy",
      duration: "3 Years • 90 Credits",
      department: "School of Management",
      description: "Leadership, global finance, corporate strategy, and venture creation taught with real-world case simulations.",
      badge: "AACSB Track",
      accent: "#12172B",
      seats: "150 Seats",
    },
    {
      code: "DS-405",
      title: "Data Science & Applied Analytics",
      duration: "2 Years • 60 Credits",
      department: "Computational Sciences",
      description: "Statistical inference, deep learning pipelines, big data infrastructure, and quantitative decision modeling.",
      badge: "Industry Certified",
      accent: "#2E7D68",
      seats: "80 Seats",
    },
  ];

  const upcomingEvents = [
    {
      date: "APR 15",
      year: "2026",
      title: "Annual Tech Innovation & Research Symposium",
      time: "9:00 AM — 5:30 PM",
      location: "Main Quadrangle & Auditorium",
      tag: "Flagship Event",
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NDc3NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      date: "APR 22",
      year: "2026",
      title: "Spring Global Career & Recruitment Fair",
      time: "10:00 AM — 4:00 PM",
      location: "East Wing Exhibition Complex",
      tag: "Career Focus",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      date: "MAY 01",
      year: "2026",
      title: "Inter-University AI Hackathon & Exhibition",
      time: "8:00 AM — 8:00 PM",
      location: "Science & Engineering Labs",
      tag: "Competition",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "B.Tech Computer Science '24 • Software Engineer at Google",
      quote: "The academic rigor and faculty mentorship transformed the way I solve problems. The research lab opportunities gave me a 2-year headstart in industry.",
      avatarText: "SJ",
      streak: "Dean's Honor List",
    },
    {
      name: "Michael Chen",
      role: "MBA '23 • Product Manager at Stripe",
      quote: "Beyond world-class case studies, the alumni network and direct company partnerships opened leadership doors that are virtually unmatched elsewhere.",
      avatarText: "MC",
      streak: "Top 3% Cohort",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Ph.D. Data Science Scholar • Postdoctoral Fellow",
      quote: "The computational infrastructure, grant support, and collaborative peer community make this the ideal campus for groundbreaking scientific research.",
      avatarText: "PS",
      streak: "12 Published Papers",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION: Layered & Out-of-Bounds Composition
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-6 space-y-6 z-20">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EDE9DF] border border-[#E5E0D2] text-[#12172B] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E8B93F] animate-ping" />
                <span>Chartered University of Technology & Arts</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#12172B] tracking-tight leading-[1.18]">
                Educating Minds, Shaping Tomorrow's
                <span className="block mt-2">
                  <TypewriterHeading />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C6788] max-w-xl font-normal leading-relaxed">
                Join a community of <strong className="text-[#12172B] font-semibold">15,000+ ambitious scholars</strong> with distinguished faculty, accredited curriculum, and a modern student digital desk designed for purposeful learning.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/admissions"
                  className="px-7 py-3.5 bg-[#12172B] hover:bg-[#1f2742] text-[#F7F5EF] font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group text-base border border-[#12172B]"
                >
                  <span>Apply for Fall 2026</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E8B93F]" />
                </Link>

                <Link
                  to="/courses"
                  className="px-7 py-3.5 bg-white hover:bg-[#EDE9DF] text-[#12172B] font-semibold rounded-xl border border-[#E5E0D2] hover:border-[#D7D0C0] transition-all text-base text-center shadow-xs"
                >
                  Explore 150+ Programs
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E5E0D2]/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5C6788] font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D68]" />
                  <span>Grade A++ Accreditation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D68]" />
                  <span>95% Career Placement</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D68]" />
                  <span>100% Merit Scholarships</span>
                </span>
              </div>
            </div>

            {/* Right Column: Layered Depth & Pop-Out UI Composition */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              
              {/* Organic ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] ambient-glow-amber rounded-full pointer-events-none -z-10 blur-3xl opacity-70" />

              {/* Background blueprint grid canvas container */}
              <div className="relative w-full max-w-lg mx-auto min-h-[460px] p-4 sm:p-6 rounded-3xl bg-[#EDE9DF]/40 border border-[#E5E0D2] campus-grid-pattern shadow-inner">
                
                {/* Floating Seal Badge: Top-Right (z-40) */}
                <div className="absolute -top-4 -right-3 sm:-right-4 z-40">
                  <div className="academic-stamp shadow-md">
                    ★ Top 50 Global Univ
                  </div>
                </div>

                {/* Layer 1: Back Midground Card (Course Notebook, tilted -2deg) */}
                <div className="absolute top-6 left-4 sm:left-6 right-8 sm:right-10 z-10 paper-card p-5 transform -rotate-2 transition-transform hover:rotate-0 duration-300">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6788]">
                        Active Course Notebook
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#12172B] leading-tight">
                        Data Structures & Algorithms
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-[#12172B] bg-[#EDE9DF] border border-[#D7D0C0] px-2 py-0.5 rounded">
                      CS-201 • 4 Cr
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-[#5C6788]">
                      <span>Syllabus Covered</span>
                      <span className="font-semibold text-[#12172B]">75%</span>
                    </div>
                    <div className="w-full bg-[#E5E0D2] rounded-full h-1.5 overflow-hidden">
                      <div className="h-1.5 rounded-full bg-[#E8B93F] progress-fill" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E5E0D2]/70 flex items-center justify-between text-xs text-[#5C6788]">
                    <span>Prof. Robert Chen</span>
                    <span className="text-[#2E7D68] font-semibold">● 88% Attendance</span>
                  </div>
                </div>

                {/* Layer 2: Overlapping Forefront Card (Desk Agenda & Exam Note, tilted +1.5deg) */}
                <div className="absolute top-44 left-10 sm:left-14 right-2 sm:right-4 z-20 paper-card p-5 transform rotate-1.5 shadow-xl transition-transform hover:rotate-0 duration-300">
                  <div className="flex items-center justify-between border-b border-[#E5E0D2] pb-2.5 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#E8B93F]" />
                      <span className="font-serif font-bold text-sm text-[#12172B]">Desk Agenda</span>
                    </div>
                    <span className="margin-note-coral text-[10px]">
                      ⚠️ Urgent Midterm
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold font-serif text-[#12172B]">
                      CS-201 Midterm Examination
                    </p>
                    <p className="text-xs text-[#5C6788] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E8B93F]" />
                      <span>Thursday, 10:00 AM • Hall 4-B</span>
                    </p>
                  </div>

                  <div className="mt-3 p-2 bg-[#FFF9E6] border border-[#E8B93F]/40 rounded-lg text-[11px] text-[#12172B] flex items-center justify-between">
                    <span>Chapters 1–6 Review</span>
                    <span className="font-bold text-[#9C7515]">Completed ✓</span>
                  </div>
                </div>

                {/* Layer 3: Pop-out Bottom Badge breaking OUTSIDE container bounds (z-30) */}
                <div className="absolute -bottom-6 -left-3 sm:-left-6 z-30 tactile-card p-4 shadow-2xl bg-white border border-[#D7D0C0] max-w-[260px] transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#12172B] text-[#E8B93F] flex items-center justify-center font-bold text-sm font-serif shadow-xs flex-shrink-0">
                      8.4
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#12172B] font-serif">Dean's List Track</p>
                      <p className="text-[11px] text-[#5C6788]">Top 8% Cohort Standing</p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E5E0D2] flex items-center justify-between">
                    <span className="margin-note text-[10px]">
                      ⚡ 5-Day Study Streak
                    </span>
                    <span className="text-[10px] text-[#2E7D68] font-bold">Active</span>
                  </div>
                </div>

                {/* Floating Bottom-Right Metric Pill (z-30) */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 z-30 bg-[#12172B] text-[#F7F5EF] px-3.5 py-2 rounded-xl shadow-xl border border-[#232D4B] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8B93F]" />
                  <span className="text-xs font-semibold">15k+ Scholars Online</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATS HIGHLIGHTS: Tactile Paper Cards
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="paper-card p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">
                      {stat.label}
                    </span>
                    <div 
                      className="p-2.5 rounded-xl border border-[#E5E0D2]"
                      style={{ backgroundColor: `${stat.accent}12`, color: stat.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-[#5C6788] mt-1 font-medium">
                      {stat.note}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5E0D2]/70 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#12172B]">Verified Metric</span>
                    <span className="text-[#2E7D68] font-semibold">● Live 2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FEATURED ACADEMIC PROGRAMS: Notebook Card Design
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E0D2]">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#E8B93F]" />
                <span>Degrees & Qualifications</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] tracking-tight">
                Featured Academic Programs
              </h2>
              <p className="text-[#5C6788] text-base mt-1">
                Accredited curricula designed in collaboration with leading industry & research institutes.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#12172B] hover:text-[#E8B93F] transition-colors self-start md:self-auto"
            >
              <span>View All 150+ Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredPrograms.map((program, index) => (
              <div
                key={index}
                className="paper-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="margin-note text-[11px]">
                      {program.badge}
                    </span>
                    <span className="text-xs font-bold text-[#5C6788]">
                      {program.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#12172B] leading-snug mb-2 group-hover:text-[#E8B93F] transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#5C6788] mb-3">
                    {program.department} • {program.duration}
                  </p>

                  <p className="text-sm text-[#5C6788] leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E0D2] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#12172B] bg-[#EDE9DF] px-2.5 py-1 rounded-md">
                    {program.seats}
                  </span>
                  
                  <Link
                    to="/courses"
                    className="text-xs font-bold text-[#12172B] hover:text-[#E8B93F] flex items-center gap-1 transition-colors"
                  >
                    <span>Syllabus & Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CAMPUS HIGHLIGHTS & EVENTS: Layered Date Cards
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E0D2]">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#E8B93F]" />
                <span>Campus Calendar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] tracking-tight">
                Upcoming Events & Symposia
              </h2>
              <p className="text-[#5C6788] text-base mt-1">
                Participate in student exhibitions, tech hackathons, and research conventions.
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#12172B] hover:text-[#E8B93F] transition-colors self-start md:self-auto"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="paper-card overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Layered Pop-out Date Pill */}
                    <div className="absolute top-3 left-3 bg-[#12172B] text-white px-3 py-1.5 rounded-xl shadow-lg border border-[#232D4B] text-center">
                      <span className="block text-xs font-bold font-serif text-[#E8B93F] leading-none">{event.date}</span>
                      <span className="block text-[9px] text-[#8B96B5] font-semibold">{event.year}</span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="margin-note text-[10px]">
                        {event.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold font-serif text-[#12172B] leading-snug">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1.5 text-xs text-[#5C6788]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E8B93F]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E8B93F]" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to="/events"
                    className="w-full py-2.5 px-4 bg-[#EDE9DF] hover:bg-[#12172B] hover:text-white text-[#12172B] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#D7D0C0]"
                  >
                    <span>Event Details & RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VOICES OF OUR SCHOLARS: Testimonials with Academic Stamps
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Alumni & Scholar Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] tracking-tight">
              Hear From Our Community
            </h2>
            <p className="text-[#5C6788] text-base mt-2">
              Transformative journeys from our lecture halls to leading institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="paper-card p-7 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <span className="margin-note text-[11px]">
                    ★ {item.streak}
                  </span>
                  
                  <p className="text-sm text-[#12172B] leading-relaxed italic font-serif">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E0D2] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#12172B] text-[#E8B93F] font-serif font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                    {item.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#12172B] font-serif">{item.name}</h4>
                    <p className="text-[11px] text-[#5C6788] leading-tight">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HIGH-IMPACT CALL TO ACTION: Layered Parchment Banner
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl bg-[#12172B] text-[#F7F5EF] p-8 sm:p-14 border border-[#232D4B] shadow-2xl overflow-hidden">
            {/* Ambient amber glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B93F]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#E8B93F] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fall 2026 Intake Now Open</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                Begin Your Journey of Academic Excellence
              </h2>

              <p className="text-sm sm:text-base text-[#8B96B5] leading-relaxed">
                Connect with our admissions counselors, review eligibility requirements, or explore scholarship grants tailored to your potential.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/admissions"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#E8B93F] hover:bg-[#f0c75c] text-[#12172B] font-bold rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>Start Online Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-all text-base text-center"
                >
                  Schedule Campus Visit
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}


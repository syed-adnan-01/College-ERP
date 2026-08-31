import { Target, Eye, Award, Globe, Users, BookOpen, Clock, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { Link } from "react-router";
import { useTenant } from "../../auth/context/TenantContext";

export function About() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";

  const leadership = [
    {
      name: "Dr. Robert Anderson",
      role: "President & Chancellor",
      credentials: "Ph.D., Oxford University • Fellow of Royal Society",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Sarah Mitchell",
      role: "Vice President, Academic Affairs",
      credentials: "Ph.D., Stanford University • Former Dean of Engineering",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Prof. James Cooper",
      role: "Dean of Research & Innovation",
      credentials: "Ph.D., MIT • 60+ Peer-reviewed Publications",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Emily Parker",
      role: "Dean of Student Affairs",
      credentials: "Ed.D., Harvard University • Scholar Development Lead",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Academic Rigor",
      description: "We cultivate deep analytical discipline, intellectual curiosity, and uncompromising standards of research inquiry.",
      accent: "#E8B93F",
    },
    {
      icon: Globe,
      title: "Global Citizenship",
      description: "Preparing leaders who think across international boundaries, diverse perspectives, and cultural contexts.",
      accent: "#12172B",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description: "A vibrant, collaborative campus where scholars from every background find mentorship, belonging, and opportunity.",
      accent: "#2E7D68",
    },
    {
      icon: BookOpen,
      title: "Ethical Integrity",
      description: "Upholding truth, intellectual honesty, and public accountability in all scientific and professional pursuits.",
      accent: "#5C6788",
    },
  ];

  const milestones = [
    { year: "1950", title: "Founding of the College", desc: "Chartered with 200 foundational scholars in classical sciences." },
    { year: "1978", title: "Research University Charter", desc: "Inaugurated dedicated doctoral laboratories and advanced engineering halls." },
    { year: "2005", title: "Global Accreditation", desc: "Awarded top-tier international accreditation and multi-national research grants." },
    { year: "2026", title: "Next-Gen Campus & ERP", desc: "Over 15,000 active students and 150+ globally recognized academic degree programs." },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 ambient-glow-amber rounded-full pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Chartered Academic Institution • Est. 1950</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              A Legacy of Knowledge, An Engine for{" "}
              <HighlighterUnderline color="#E8B93F">
                Discovery
              </HighlighterUnderline>
            </h1>

            <p className="text-base sm:text-lg text-[#5C6788] leading-relaxed font-normal">
              For over seven decades, {collegeName} has stood as a beacon of academic excellence, preparing visionary scholars, pioneering scientists, and transformative industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Story & History Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-[#E5E0D2] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Our Heritage</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mt-1">
                From Humble Roots to Global Recognition
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5C6788] leading-relaxed">
              Founded in 1950, {collegeName} began with a simple yet bold ambition: to deliver world-class higher education accessible to dedicated minds. What started in a single brick quadrangle with 200 scholars has evolved into a powerhouse university of over 15,000 students across 150+ degree programs.
            </p>

            <p className="text-sm sm:text-base text-[#5C6788] leading-relaxed">
              Our classrooms are led by over 800 distinguished faculty members, fostering rigorous critical thinking, state-of-the-art research laboratories, and lifelong leadership competencies.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="academic-stamp">
                76 Years of Excellence
              </span>
              <span className="margin-note">
                Top 50 Global Ranking
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5E0D2] shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1769699369445-263a7a365df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzQ3MDM4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="University Quadrangle"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#12172B]/90 backdrop-blur-md text-white border border-white/20">
                <p className="text-xs font-bold font-serif text-[#E8B93F]">Central Academic Quadrangle</p>
                <p className="text-[11px] text-[#8B96B5]">Historic Bell Tower & Humanities Library</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-10">
          <h3 className="text-2xl font-bold font-serif text-[#12172B] mb-8 pb-3 border-b border-[#E5E0D2]">
            Key Historical Milestones
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2] space-y-2">
                <span className="text-xl font-bold font-serif text-[#E8B93F] block">
                  {item.year}
                </span>
                <h4 className="text-sm font-bold font-serif text-[#12172B]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5C6788] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="paper-card p-8 space-y-4 hover:shadow-xl transition-all border-l-4 border-l-[#12172B]">
            <div className="w-12 h-12 rounded-xl bg-[#12172B] text-[#E8B93F] flex items-center justify-center shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#12172B]">Our Mission</h3>
            <p className="text-sm text-[#5C6788] leading-relaxed">
              To provide transformative education that empowers students with rigorous knowledge, ethical grounding, and innovative capabilities to excel in their careers and serve humanity with purpose.
            </p>
          </div>

          {/* Vision Card */}
          <div className="paper-card p-8 space-y-4 hover:shadow-xl transition-all border-l-4 border-l-[#E8B93F]">
            <div className="w-12 h-12 rounded-xl bg-[#FFF9E6] text-[#9C7515] border border-[#E8B93F]/40 flex items-center justify-center shadow-xs">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#12172B]">Our Vision</h3>
            <p className="text-sm text-[#5C6788] leading-relaxed">
              To stand as an internationally recognized institution of higher learning, pioneering breakthrough scientific research and shaping ethical leaders capable of navigating complex global challenges.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Guiding Principles</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mt-1">
            Our Core Institutional Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="paper-card p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#E5E0D2]"
                  style={{ backgroundColor: `${v.accent}14`, color: v.accent }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-serif text-[#12172B] mb-2">{v.title}</h4>
                  <p className="text-xs text-[#5C6788] leading-relaxed">{v.description}</p>
                </div>
                <div className="pt-2 border-t border-[#E5E0D2]/70 text-[11px] text-[#5C6788] font-medium">
                  Guiding Pillar
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E0D2]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Governance</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mt-1">
              University Leadership & Deans
            </h2>
          </div>
          <Link to="/faculty" className="text-sm font-bold text-[#12172B] hover:text-[#E8B93F] flex items-center gap-1 transition-colors">
            <span>Meet All Faculty Members</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, index) => (
            <div key={index} className="paper-card overflow-hidden group hover:shadow-xl transition-all">
              <div className="h-60 overflow-hidden bg-gray-100 relative">
                <ImageWithFallback
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-base font-bold font-serif text-[#12172B]">{leader.name}</h4>
                <p className="text-xs font-semibold text-[#E8B93F]">{leader.role}</p>
                <p className="text-[11px] text-[#5C6788] leading-tight pt-1">{leader.credentials}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}


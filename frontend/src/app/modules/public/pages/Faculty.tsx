import { useState } from "react";
import { Search, Filter, Mail, Phone, Award, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";

export function Faculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "Business", "Science", "Arts", "Medicine", "Law"];

  const facultyMembers = [
    {
      name: "Dr. Robert Chen",
      designation: "Professor & Chair",
      department: "Engineering",
      specialization: "Artificial Intelligence & Distributed Systems",
      email: "r.chen@eduplatform.edu",
      phone: "+1 (555) 101-2001",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 45,
      hIndex: 28,
    },
    {
      name: "Dr. Sarah Mitchell",
      designation: "Associate Professor",
      department: "Business",
      specialization: "Strategic Management & Global Entrepreneurship",
      email: "s.mitchell@eduplatform.edu",
      phone: "+1 (555) 101-2002",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 32,
      hIndex: 19,
    },
    {
      name: "Prof. James Wilson",
      designation: "Distinguished Chair",
      department: "Science",
      specialization: "Quantum Physics & Theoretical Mechanics",
      email: "j.wilson@eduplatform.edu",
      phone: "+1 (555) 101-2003",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 58,
      hIndex: 34,
    },
    {
      name: "Dr. Emily Parker",
      designation: "Assistant Professor",
      department: "Arts",
      specialization: "Cognitive Neuroscience & Developmental Psychology",
      email: "e.parker@eduplatform.edu",
      phone: "+1 (555) 101-2004",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 24,
      hIndex: 14,
    },
    {
      name: "Dr. Michael Anderson",
      designation: "Professor",
      department: "Engineering",
      specialization: "Autonomous Robotics & Sustainable Energy Systems",
      email: "m.anderson@eduplatform.edu",
      phone: "+1 (555) 101-2005",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 41,
      hIndex: 26,
    },
    {
      name: "Prof. Linda Rodriguez",
      designation: "Professor",
      department: "Business",
      specialization: "Quantitative Finance, FinTech & Capital Markets",
      email: "l.rodriguez@eduplatform.edu",
      phone: "+1 (555) 101-2006",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 37,
      hIndex: 22,
    },
    {
      name: "Dr. David Kumar",
      designation: "Associate Professor",
      department: "Science",
      specialization: "Genomic Engineering & Computational Bioinformatics",
      email: "d.kumar@eduplatform.edu",
      phone: "+1 (555) 101-2007",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 29,
      hIndex: 18,
    },
    {
      name: "Dr. Jessica Thompson",
      designation: "Assistant Professor",
      department: "Arts",
      specialization: "Comparative Literature & Critical Narrative Rhetoric",
      email: "j.thompson@eduplatform.edu",
      phone: "+1 (555) 101-2008",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 18,
      hIndex: 11,
    },
    {
      name: "Dr. Richard Brown",
      designation: "Clinical Professor",
      department: "Medicine",
      specialization: "Surgical Innovations & Clinical Oncology",
      email: "r.brown@eduplatform.edu",
      phone: "+1 (555) 101-2009",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 63,
      hIndex: 39,
    },
    {
      name: "Prof. Margaret Lee",
      designation: "Senior Professor",
      department: "Law",
      specialization: "Constitutional Law & Corporate Governance",
      email: "m.lee@eduplatform.edu",
      phone: "+1 (555) 101-2010",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 51,
      hIndex: 30,
    },
  ];

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesDepartment = selectedDepartment === "All" || faculty.department === selectedDepartment;
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Academic Chairs & Researchers</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              Distinguished{" "}
              <HighlighterUnderline color="#E8B93F">
                Faculty & Scholars
              </HighlighterUnderline>
            </h1>

            <p className="text-base text-[#5C6788] leading-relaxed">
              Meet our 800+ educators, principal investigators, and scholars committed to delivering rigorous mentorship and pioneering international research.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
              <input
                type="text"
                placeholder="Search by faculty name, specialization, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none text-sm text-[#12172B]"
              />
            </div>

            <div className="md:w-64 relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none text-sm text-[#12172B] appearance-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#E5E0D2]/70 text-xs">
            <span className="text-[#5C6788] font-bold text-[11px] uppercase tracking-wider mr-1">
              Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedDepartment === dept
                    ? "bg-[#12172B] text-white shadow-xs"
                    : "bg-[#EDE9DF]/60 text-[#5C6788] hover:bg-[#EDE9DF] hover:text-[#12172B]"
                }`}
              >
                {dept === "All" ? "All Departments" : dept}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[#5C6788] px-1 font-medium">
          <span>Showing {filteredFaculty.length} of {facultyMembers.length} faculty profiles</span>
          <span>95% holding Ph.D. or terminal doctorate</span>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFaculty.map((faculty, index) => (
            <div
              key={index}
              className="paper-card overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="margin-note text-[10px]">
                      {faculty.department}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-serif text-[#12172B] leading-snug">
                    {faculty.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#E8B93F]">{faculty.designation}</p>
                  <p className="text-xs text-[#5C6788] leading-relaxed line-clamp-2">{faculty.specialization}</p>

                  <div className="pt-2 flex items-center gap-3 text-xs text-[#5C6788]">
                    <span className="flex items-center gap-1 font-medium">
                      <Award className="w-3.5 h-3.5 text-[#E8B93F]" />
                      <span>{faculty.publications} Papers</span>
                    </span>
                    <span className="text-[#12172B] font-bold text-[11px] bg-[#EDE9DF] px-2 py-0.5 rounded">
                      h-index {faculty.hIndex}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2 border-t border-[#E5E0D2]/70 text-xs">
                <div className="flex items-center space-x-2 text-[#5C6788] pt-2">
                  <Mail className="w-3.5 h-3.5 text-[#E8B93F] flex-shrink-0" />
                  <a href={`mailto:${faculty.email}`} className="hover:text-[#12172B] truncate font-medium">
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-[#5C6788]">
                  <Phone className="w-3.5 h-3.5 text-[#E8B93F] flex-shrink-0" />
                  <span>{faculty.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="paper-card p-12 text-center max-w-md mx-auto space-y-3">
            <Search className="w-12 h-12 text-[#5C6788] mx-auto opacity-50" />
            <h3 className="text-lg font-bold font-serif text-[#12172B]">No Faculty Members Found</h3>
            <p className="text-xs text-[#5C6788]">
              Try searching by different keywords or reset your department filter.
            </p>
          </div>
        )}
      </section>

      {/* Research & Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mb-1">800+</div>
              <div className="text-xs font-semibold text-[#5C6788] uppercase tracking-wider">Faculty Scholars</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-[#E8B93F] mb-1">95%</div>
              <div className="text-xs font-semibold text-[#5C6788] uppercase tracking-wider">With Ph.D. Degrees</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-[#2E7D68] mb-1">2,500+</div>
              <div className="text-xs font-semibold text-[#5C6788] uppercase tracking-wider">Research Papers</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2]">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mb-1">50+</div>
              <div className="text-xs font-semibold text-[#5C6788] uppercase tracking-wider">Global Partner Univs</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


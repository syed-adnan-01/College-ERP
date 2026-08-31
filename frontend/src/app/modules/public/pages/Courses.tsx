import { useState } from "react";
import { BookOpen, Clock, Users, Search, Filter, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { Link } from "react-router";

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "Business", "Science", "Arts", "Medicine", "Law"];

  const courses = [
    {
      code: "CS-201",
      title: "Computer Science & Engineering",
      duration: "4 Years",
      credits: "120 Cr",
      department: "Engineering",
      seats: 120,
      description: "Comprehensive program covering systems architecture, distributed computing, algorithms, and applied machine learning.",
      highlights: ["AI & Machine Learning", "Cloud Infrastructure", "Cybersecurity"],
      badge: "Highest Demand",
    },
    {
      code: "ME-102",
      title: "Mechanical & Robotics Engineering",
      duration: "4 Years",
      credits: "128 Cr",
      department: "Engineering",
      seats: 100,
      description: "Fundamental design, precision manufacturing, autonomous robotics, thermodynamics, and sustainable energy systems.",
      highlights: ["Robotics Labs", "CAD / CAM", "Fluid Dynamics"],
      badge: "Accredited ABET",
    },
    {
      code: "EE-304",
      title: "Electrical & Computer Engineering",
      duration: "4 Years",
      credits: "124 Cr",
      department: "Engineering",
      seats: 90,
      description: "VLSI chip design, microelectronics, power grids, signal processing, and embedded IoT architectures.",
      highlights: ["VLSI Design", "Power Systems", "Signal Processing"],
      badge: "Core Engineering",
    },
    {
      code: "MBA-501",
      title: "Business Administration (MBA)",
      duration: "2 Years",
      credits: "60 Cr",
      department: "Business",
      seats: 150,
      description: "Advanced executive education with emphasis on corporate strategy, quantitative finance, venture creation, and leadership.",
      highlights: ["Strategic Management", "FinTech", "Global Marketing"],
      badge: "Dean's Select",
    },
    {
      code: "BCOM-101",
      title: "Bachelor of Commerce & Finance",
      duration: "3 Years",
      credits: "90 Cr",
      department: "Business",
      seats: 200,
      description: "Comprehensive commerce education covering international accounting, corporate taxation, economics, and business law.",
      highlights: ["Forensic Accounting", "Macroeconomics", "Corporate Law"],
      badge: "CFA Aligned",
    },
    {
      code: "DS-405",
      title: "Data Science & Applied Analytics",
      duration: "2 Years",
      credits: "64 Cr",
      department: "Science",
      seats: 80,
      description: "Master computational statistics, machine learning pipelines, big data infrastructure, and ethical AI governance.",
      highlights: ["Deep Learning", "Statistical Inference", "Python / R"],
      badge: "Industry Focus",
    },
    {
      code: "BIO-202",
      title: "Biotechnology & Genetic Engineering",
      duration: "4 Years",
      credits: "120 Cr",
      department: "Science",
      seats: 60,
      description: "Explore bioinformatics, CRISPR genomic technologies, cellular bioprocessing, and clinical pharmaceutical development.",
      highlights: ["Genomic Editing", "Bioinformatics", "Wet Lab Research"],
      badge: "Research Intensive",
    },
    {
      code: "PHY-301",
      title: "Applied Physics & Quantum Systems",
      duration: "3 Years",
      credits: "96 Cr",
      department: "Science",
      seats: 70,
      description: "In-depth study of quantum mechanics, solid state physics, optics, photonics, and computational materials science.",
      highlights: ["Quantum Mechanics", "Photonics", "Nanotechnology"],
      badge: "Pure Science",
    },
    {
      code: "LIT-105",
      title: "Comparative English Literature",
      duration: "3 Years",
      credits: "90 Cr",
      department: "Arts",
      seats: 80,
      description: "In-depth critical analysis of world literary traditions, modern rhetoric, cultural criticism, and creative writing.",
      highlights: ["Critical Theory", "Narrative Design", "Global Classics"],
      badge: "Humanities Core",
    },
    {
      code: "PSY-201",
      title: "Psychology & Behavioral Neuroscience",
      duration: "3 Years",
      credits: "90 Cr",
      department: "Arts",
      seats: 100,
      description: "Scientific investigation of human cognition, developmental psychology, clinical mental health, and neurological behaviors.",
      highlights: ["Cognitive Neuroscience", "Clinical Practice", "Empirical Methods"],
      badge: "APA Aligned",
    },
    {
      code: "MBBS-01",
      title: "Bachelor of Medicine & Surgery (MBBS)",
      duration: "5.5 Years",
      credits: "240 Cr",
      department: "Medicine",
      seats: 150,
      description: "Comprehensive preclinical and clinical medical training conducted within state-of-the-art affiliated hospital centers.",
      highlights: ["Clinical Rotations", "Surgical Skills", "Public Health"],
      badge: "Hospital Residency",
    },
    {
      code: "LLB-101",
      title: "Bachelor of Laws (LLB)",
      duration: "3 Years",
      credits: "90 Cr",
      department: "Law",
      seats: 120,
      description: "Rigorous legal scholarship covering constitutional jurisprudence, international corporate law, and trial moot courts.",
      highlights: ["Constitutional Law", "Corporate M&A", "Moot Court"],
      badge: "Bar Council",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesDepartment = selectedDepartment === "All" || course.department === selectedDepartment;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Academic Curriculum Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              Degree Programs &{" "}
              <HighlighterUnderline color="#E8B93F">
                Qualifications
              </HighlighterUnderline>
            </h1>

            <p className="text-base text-[#5C6788] leading-relaxed">
              Explore 150+ accredited undergraduate, postgraduate, and doctoral degree programs designed in alignment with global accreditation standards.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
              <input
                type="text"
                placeholder="Search by course title, code (e.g., CS-201), or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none text-sm text-[#12172B]"
              />
            </div>

            {/* Department Dropdown / Mobile Filter */}
            <div className="md:w-64 relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C6788]" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-white focus:ring-2 focus:ring-[#E8B93F] focus:border-transparent outline-none text-sm text-[#12172B] appearance-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Disciplines" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#E5E0D2]/70 text-xs">
            <span className="text-[#5C6788] font-bold text-[11px] uppercase tracking-wider mr-1">
              Filter:
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
                {dept === "All" ? "All Programs" : dept}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#5C6788] px-1 font-medium">
          <span>Showing {filteredCourses.length} of {courses.length} courses</span>
          <span>Updated for 2026–2027 Academic Year</span>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="paper-card p-6 flex flex-col justify-between space-y-5 hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="margin-note text-[11px]">
                    {course.badge}
                  </span>
                  <span className="text-xs font-bold text-[#12172B] bg-[#EDE9DF] border border-[#D7D0C0] px-2 py-0.5 rounded">
                    {course.code} • {course.credits}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#12172B] leading-snug mb-2">
                  {course.title}
                </h3>

                <p className="text-xs font-semibold text-[#5C6788] mb-3">
                  {course.department} • {course.duration}
                </p>

                <p className="text-xs text-[#5C6788] leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-medium bg-[#EDE9DF]/60 text-[#12172B] border border-[#E5E0D2] px-2 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D2] flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[#5C6788]">
                  <Users className="w-3.5 h-3.5 text-[#E8B93F]" />
                  <span>{course.seats} Seats</span>
                </div>

                <Link
                  to="/admissions"
                  className="px-3.5 py-1.5 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3 text-[#E8B93F]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="paper-card p-12 text-center max-w-md mx-auto space-y-3">
            <BookOpen className="w-12 h-12 text-[#5C6788] mx-auto opacity-50" />
            <h3 className="text-lg font-bold font-serif text-[#12172B]">No Programs Found</h3>
            <p className="text-xs text-[#5C6788]">
              Try adjusting your search criteria or clear the department filter.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedDepartment("All"); }}
              className="mt-2 px-4 py-2 bg-[#12172B] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Advisory Note Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-[#E8B93F]">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#12172B]">
              Looking for Specialized Interdisciplinary Programs?
            </h3>
            <p className="text-sm text-[#5C6788] leading-relaxed">
              Our academic advising office provides customized dual-degree paths, credit transfer evaluations, and fellowship guidance.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex-shrink-0 flex items-center gap-2"
          >
            <span>Consult Academic Advisor</span>
            <ChevronRight className="w-4 h-4 text-[#E8B93F]" />
          </Link>
        </div>
      </section>

    </div>
  );
}


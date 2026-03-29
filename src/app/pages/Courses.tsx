import { useState } from "react";
import { BookOpen, Clock, Users, Search, Filter } from "lucide-react";

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "Business", "Science", "Arts", "Medicine", "Law"];

  const courses = [
    {
      title: "Computer Science & Engineering",
      duration: "4 years",
      department: "Engineering",
      seats: 120,
      description: "Comprehensive program covering software development, algorithms, AI, and systems design.",
      highlights: ["AI & Machine Learning", "Cloud Computing", "Cybersecurity"],
    },
    {
      title: "Mechanical Engineering",
      duration: "4 years",
      department: "Engineering",
      seats: 100,
      description: "Study of design, manufacturing, and maintenance of mechanical systems.",
      highlights: ["Robotics", "CAD/CAM", "Thermodynamics"],
    },
    {
      title: "Electrical Engineering",
      duration: "4 years",
      department: "Engineering",
      seats: 90,
      description: "Focus on electrical systems, electronics, and power generation.",
      highlights: ["Power Systems", "Electronics", "Signal Processing"],
    },
    {
      title: "Business Administration (MBA)",
      duration: "2 years",
      department: "Business",
      seats: 150,
      description: "Advanced business education with focus on leadership and management.",
      highlights: ["Strategic Management", "Finance", "Marketing"],
    },
    {
      title: "Bachelor of Commerce",
      duration: "3 years",
      department: "Business",
      seats: 200,
      description: "Comprehensive commerce education covering accounting, economics, and business.",
      highlights: ["Accounting", "Economics", "Business Law"],
    },
    {
      title: "Data Science & Analytics",
      duration: "2 years",
      department: "Science",
      seats: 80,
      description: "Master data analysis, statistical modeling, and machine learning.",
      highlights: ["Big Data", "Statistical Analysis", "Python/R"],
    },
    {
      title: "Biotechnology",
      duration: "4 years",
      department: "Science",
      seats: 60,
      description: "Explore the intersection of biology and technology.",
      highlights: ["Genetic Engineering", "Bioinformatics", "Lab Research"],
    },
    {
      title: "Physics",
      duration: "3 years",
      department: "Science",
      seats: 70,
      description: "Study fundamental laws of nature and physical phenomena.",
      highlights: ["Quantum Physics", "Astrophysics", "Applied Physics"],
    },
    {
      title: "English Literature",
      duration: "3 years",
      department: "Arts",
      seats: 80,
      description: "In-depth study of literary works, criticism, and creative writing.",
      highlights: ["British Literature", "Creative Writing", "Literary Theory"],
    },
    {
      title: "Psychology",
      duration: "3 years",
      department: "Arts",
      seats: 100,
      description: "Understanding human behavior, cognition, and mental processes.",
      highlights: ["Clinical Psychology", "Cognitive Science", "Research Methods"],
    },
    {
      title: "Bachelor of Medicine (MBBS)",
      duration: "5.5 years",
      department: "Medicine",
      seats: 150,
      description: "Comprehensive medical education with clinical training.",
      highlights: ["Clinical Practice", "Surgery", "Medical Research"],
    },
    {
      title: "Bachelor of Laws (LLB)",
      duration: "3 years",
      department: "Law",
      seats: 120,
      description: "Legal education covering constitutional, criminal, and civil law.",
      highlights: ["Constitutional Law", "Corporate Law", "Criminal Law"],
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesDepartment = selectedDepartment === "All" || course.department === selectedDepartment;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover world-class programs designed to prepare you for a successful career
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full lg:w-64 pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none appearance-none bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Header with Gradient */}
                <div className="h-32 bg-gradient-to-br from-blue-900 via-indigo-700 to-purple-700 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                  </div>
                  <div className="relative h-full flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Department Badge */}
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">
                      {course.department}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.seats} seats</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-indigo-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our admissions team for personalized guidance
          </p>
          <button className="px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-indigo-800 transition-all hover:shadow-lg">
            Contact Admissions
          </button>
        </div>
      </section>
    </div>
  );
}

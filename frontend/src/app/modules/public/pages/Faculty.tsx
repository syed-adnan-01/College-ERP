import { useState } from "react";
import { Search, Filter, Mail, Phone, Award } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

export function Faculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", "Engineering", "Business", "Science", "Arts", "Medicine", "Law"];

  const facultyMembers = [
    {
      name: "Dr. Robert Chen",
      designation: "Professor",
      department: "Engineering",
      specialization: "Artificial Intelligence & Machine Learning",
      email: "r.chen@eduplatform.edu",
      phone: "+1 (555) 101-2001",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 45,
    },
    {
      name: "Dr. Sarah Mitchell",
      designation: "Associate Professor",
      department: "Business",
      specialization: "Strategic Management & Entrepreneurship",
      email: "s.mitchell@eduplatform.edu",
      phone: "+1 (555) 101-2002",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 32,
    },
    {
      name: "Prof. James Wilson",
      designation: "Professor",
      department: "Science",
      specialization: "Quantum Physics & Research",
      email: "j.wilson@eduplatform.edu",
      phone: "+1 (555) 101-2003",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 58,
    },
    {
      name: "Dr. Emily Parker",
      designation: "Assistant Professor",
      department: "Arts",
      specialization: "Psychology & Cognitive Science",
      email: "e.parker@eduplatform.edu",
      phone: "+1 (555) 101-2004",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 24,
    },
    {
      name: "Dr. Michael Anderson",
      designation: "Professor",
      department: "Engineering",
      specialization: "Mechanical Systems & Robotics",
      email: "m.anderson@eduplatform.edu",
      phone: "+1 (555) 101-2005",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 41,
    },
    {
      name: "Prof. Linda Rodriguez",
      designation: "Professor",
      department: "Business",
      specialization: "Finance & Investment Banking",
      email: "l.rodriguez@eduplatform.edu",
      phone: "+1 (555) 101-2006",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 37,
    },
    {
      name: "Dr. David Kumar",
      designation: "Associate Professor",
      department: "Science",
      specialization: "Biotechnology & Genetics",
      email: "d.kumar@eduplatform.edu",
      phone: "+1 (555) 101-2007",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 29,
    },
    {
      name: "Dr. Jessica Thompson",
      designation: "Assistant Professor",
      department: "Arts",
      specialization: "Literature & Creative Writing",
      email: "j.thompson@eduplatform.edu",
      phone: "+1 (555) 101-2008",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 18,
    },
    {
      name: "Dr. Richard Brown",
      designation: "Professor",
      department: "Medicine",
      specialization: "Surgery & Clinical Practice",
      email: "r.brown@eduplatform.edu",
      phone: "+1 (555) 101-2009",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 63,
    },
    {
      name: "Prof. Margaret Lee",
      designation: "Professor",
      department: "Law",
      specialization: "Constitutional & Corporate Law",
      email: "m.lee@eduplatform.edu",
      phone: "+1 (555) 101-2010",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 51,
    },
    {
      name: "Dr. Thomas White",
      designation: "Associate Professor",
      department: "Engineering",
      specialization: "Electrical Systems & Power",
      email: "t.white@eduplatform.edu",
      phone: "+1 (555) 101-2011",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 34,
    },
    {
      name: "Dr. Rachel Green",
      designation: "Assistant Professor",
      department: "Science",
      specialization: "Data Science & Analytics",
      email: "r.green@eduplatform.edu",
      phone: "+1 (555) 101-2012",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      publications: 22,
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Faculty</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Meet our world-class educators and researchers dedicated to your success
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
                placeholder="Search by name, specialization, or designation..."
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
            Showing {filteredFaculty.length} of {facultyMembers.length} faculty members
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculty.map((faculty, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Department Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-900 rounded-full text-xs font-semibold">
                      {faculty.department}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                  <p className="text-sm text-cyan-600 font-semibold mb-3">{faculty.designation}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{faculty.specialization}</p>

                  {/* Publications */}
                  <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
                    <Award className="w-4 h-4" />
                    <span>{faculty.publications} Publications</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm border-t pt-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a 
                        href={`mailto:${faculty.email}`}
                        className="hover:text-blue-900 truncate"
                      >
                        {faculty.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{faculty.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFaculty.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No faculty members found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">800+</div>
              <div className="text-gray-600">Total Faculty</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">95%</div>
              <div className="text-gray-600">With PhD</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">2,500+</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

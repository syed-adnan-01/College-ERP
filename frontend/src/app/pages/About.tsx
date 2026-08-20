import { Target, Eye, Award, Globe, Users, BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const leadership = [
    {
      name: "Dr. Robert Anderson",
      role: "President",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Sarah Mitchell",
      role: "Vice President, Academic Affairs",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Prof. James Cooper",
      role: "Dean of Research",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NjcwNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Emily Parker",
      role: "Dean of Student Affairs",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in teaching, research, and service.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We embrace change and foster creativity in all aspects of learning.",
    },
    {
      icon: Users,
      title: "Diversity",
      description: "We celebrate differences and create an inclusive community for all.",
    },
    {
      icon: BookOpen,
      title: "Integrity",
      description: "We uphold honesty, transparency, and ethical conduct in everything we do.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769699369445-263a7a365df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzQ3MDM4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Campus aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About EduPlatform</h1>
          <p className="text-xl text-gray-200">Pioneering excellence in education since 1950</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 1950, EduPlatform has been at the forefront of higher education for over seven decades. 
                  What started as a small institution with 200 students has grown into a premier university serving 
                  over 15,000 students from around the globe.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, expansion of academic programs, and a 
                  steadfast commitment to providing quality education. We've evolved from a local college to an 
                  internationally recognized institution, while maintaining our core values of academic excellence 
                  and student-centered learning.
                </p>
                <p>
                  Today, we stand as a beacon of knowledge, fostering critical thinking, research excellence, and 
                  preparing students for the challenges of tomorrow. Our state-of-the-art facilities, world-class 
                  faculty, and vibrant campus life create an environment where students thrive.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwbGlicmFyeSUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzc0Nzc1NDA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Library"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-900 to-indigo-700 rounded-xl mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To provide transformative education that empowers students with knowledge, skills, and values 
                necessary to excel in their chosen fields and contribute meaningfully to society. We are committed 
                to fostering innovation, critical thinking, and lifelong learning in an inclusive and supportive 
                environment.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be a globally recognized institution of higher learning that shapes future leaders, pioneers 
                groundbreaking research, and serves as a catalyst for positive change. We aspire to create a 
                vibrant academic community where innovation thrives, diversity is celebrated, and excellence 
                is the standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-indigo-700 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the visionaries guiding our institution</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-sm text-gray-600">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Images Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Campus</h2>
            <p className="text-xl text-gray-600">Experience world-class facilities and vibrant student life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzc0NjY2MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Lecture hall"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4">Modern Classrooms</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Science lab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4">Research Labs</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Student life"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4">Student Commons</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

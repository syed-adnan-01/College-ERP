import { Calendar, User, Tag, TrendingUp, Award, Megaphone } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

export function News() {
  const featuredNews = {
    title: "EduPlatform Ranks Among Top 50 Universities Globally",
    date: "March 25, 2026",
    author: "Communications Office",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1769699369445-263a7a365df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzQ3MDM4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "In the latest international university rankings, EduPlatform has secured a position in the top 50, marking a significant milestone in our journey of academic excellence. This recognition reflects our commitment to research, teaching quality, and student outcomes.",
  };

  const newsArticles = [
    {
      title: "New Research Center Opens for AI and Machine Learning",
      date: "March 20, 2026",
      author: "Dr. Robert Chen",
      category: "Research",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "The state-of-the-art AI Research Center will serve as a hub for cutting-edge research in artificial intelligence and machine learning.",
    },
    {
      title: "Record Number of Students Secure Internships at Top Companies",
      date: "March 18, 2026",
      author: "Career Services",
      category: "Students",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "This year, over 800 students have secured internships at Fortune 500 companies, marking a 25% increase from last year.",
    },
    {
      title: "Faculty Member Wins Prestigious National Teaching Award",
      date: "March 15, 2026",
      author: "Academic Affairs",
      category: "Faculty",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Professor Sarah Mitchell has been honored with the Excellence in Teaching Award for her innovative pedagogical approaches.",
    },
    {
      title: "Campus Sustainability Initiative Reduces Carbon Footprint by 40%",
      date: "March 12, 2026",
      author: "Sustainability Office",
      category: "Campus",
      image: "https://images.unsplash.com/photo-1760131556605-7f2e63d00385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc0NjkwNjk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Through comprehensive sustainability measures, the campus has achieved a 40% reduction in carbon emissions over the past three years.",
    },
    {
      title: "International Partnership Expands Study Abroad Opportunities",
      date: "March 8, 2026",
      author: "International Office",
      category: "Global",
      image: "https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzc0NjY2MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "New partnerships with 20 universities across Europe and Asia offer students more diverse study abroad options.",
    },
    {
      title: "Student Team Wins National Robotics Competition",
      date: "March 5, 2026",
      author: "Engineering Department",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Our robotics team has brought home the first prize in the National Robotics Challenge, competing against 50 universities.",
    },
  ];

  const announcements = [
    {
      title: "Spring Break Schedule 2026",
      date: "March 28, 2026",
      type: "Important",
    },
    {
      title: "Library Extended Hours During Exams",
      date: "March 27, 2026",
      type: "Notice",
    },
    {
      title: "Scholarship Applications Now Open",
      date: "March 26, 2026",
      type: "Opportunity",
    },
    {
      title: "Campus Wi-Fi Maintenance - April 1",
      date: "March 25, 2026",
      type: "Maintenance",
    },
    {
      title: "Guest Lecture Series Announcement",
      date: "March 24, 2026",
      type: "Event",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Achievement: "bg-yellow-100 text-yellow-700",
      Research: "bg-blue-100 text-blue-700",
      Students: "bg-green-100 text-green-700",
      Faculty: "bg-purple-100 text-purple-700",
      Campus: "bg-teal-100 text-teal-700",
      Global: "bg-indigo-100 text-indigo-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getAnnouncementType = (type: string) => {
    const colors: { [key: string]: string } = {
      Important: "bg-red-100 text-red-700 border-red-200",
      Notice: "bg-blue-100 text-blue-700 border-blue-200",
      Opportunity: "bg-green-100 text-green-700 border-green-200",
      Maintenance: "bg-orange-100 text-orange-700 border-orange-200",
      Event: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">News & Announcements</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Stay updated with the latest news, achievements, and announcements from EduPlatform
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured News */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-4 py-2 ${getCategoryColor(featuredNews.category)} rounded-full text-sm font-semibold backdrop-blur-sm`}>
                      {featuredNews.category}
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      Featured Story
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">{featuredNews.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-200">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredNews.author}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg mb-6">{featuredNews.excerpt}</p>
                <button className="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-indigo-800 transition-colors">
                  Read Full Article
                </button>
              </div>
            </div>

            {/* News Articles */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h2>
              <div className="space-y-6">
                {newsArticles.map((article, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="relative h-48 sm:h-auto overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="sm:col-span-2 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-3 py-1 ${getCategoryColor(article.category)} rounded-full text-xs font-semibold`}>
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Announcements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Megaphone className="w-6 h-6 text-blue-900" />
                <h3 className="text-2xl font-bold text-gray-900">Announcements</h3>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${getAnnouncementType(announcement.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold uppercase">{announcement.type}</span>
                      <span className="text-xs opacity-75">{announcement.date}</span>
                    </div>
                    <h4 className="font-semibold">{announcement.title}</h4>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 px-4 py-3 bg-blue-900 text-white rounded-xl hover:bg-indigo-800 transition-colors">
                View All Announcements
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <Tag className="w-6 h-6 text-blue-900" />
                <h3 className="text-xl font-bold text-gray-900">Categories</h3>
              </div>
              <div className="space-y-2">
                {["All News", "Achievement", "Research", "Students", "Faculty", "Campus", "Global"].map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-900 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Calendar, User, Tag, TrendingUp, Award, Megaphone, ArrowRight, ShieldCheck, Clock, Bookmark, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { useTenant } from "../../auth/context/TenantContext";

export function News() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Achievement", "Research", "Students", "Faculty", "Campus", "Global"];

  const featuredNews = {
    title: `${collegeName} Ranks in the Global Top 50 in Annual Higher Education Review`,
    date: "March 25, 2026",
    author: "Office of Communications & University Press",
    category: "Achievement",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1769699369445-263a7a365df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzQ3MDM4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "In the latest international university ranking report, the university has secured an elite position among the top 50 institutions globally. This benchmark milestone reflects seven decades of groundbreaking scientific research, high faculty citation ratios, and remarkable graduate employment outcomes.",
    badge: "Cover Story",
  };

  const newsArticles = [
    {
      title: "New Autonomous Systems & Quantum Computing Facility Commissioned",
      date: "March 20, 2026",
      author: "Dr. Robert Chen",
      category: "Research",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "The $15M multi-disciplinary AI research laboratory will serve as a central computing facility for advanced distributed machine learning pipelines.",
    },
    {
      title: "Record 800+ Graduating Scholars Secure Global Fortune 500 Fellowships",
      date: "March 18, 2026",
      author: "Career Services",
      category: "Students",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "This academic season saw unprecedented recruitment from top tier technology, finance, and engineering leaders, marking a 25% year-over-year surge.",
    },
    {
      title: "Prof. Sarah Mitchell Honored with National Fellowship in Applied Strategy",
      date: "March 15, 2026",
      author: "Academic Affairs",
      category: "Faculty",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Nzc1NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Recognized for her innovative econometric modeling and pedagogical mentorship of upcoming business entrepreneurs.",
    },
    {
      title: "Campus-Wide Clean Energy Grid Achieves 40% Net Carbon Reduction",
      date: "March 12, 2026",
      author: "Sustainability Board",
      category: "Campus",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1760131556605-7f2e63d00385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc0NjkwNjk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Through expansive rooftop photovoltaic installations and smart thermal management systems, the university reaches its 2030 green target 4 years early.",
    },
    {
      title: "International Dual-Degree Consortium Inks Exchange with 20 European Univs",
      date: "March 08, 2026",
      author: "Global Office",
      category: "Global",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzc0NjY2MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Expanding bilateral study abroad programs across the UK, Switzerland, Germany, and Japan with integrated credit transfer equivalency.",
    },
    {
      title: "Undergraduate Autonomous Robotics Team Takes First Place at National Finals",
      date: "March 05, 2026",
      author: "Engineering Dept",
      category: "Achievement",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      excerpt: "Competing against 50 premier collegiate teams, our student-engineered search-and-rescue rover dominated the speed and obstacle challenge.",
    },
  ];

  const announcements = [
    {
      title: "Spring Recess & Reading Week Schedule 2026",
      date: "March 28, 2026",
      type: "Academic Notice",
      highlight: "#12172B",
    },
    {
      title: "Humanities & Science Libraries 24/7 Extended Hours for Midterms",
      date: "March 27, 2026",
      type: "Facility Hours",
      highlight: "#E8B93F",
    },
    {
      title: "Merit Fellowship & Research Grant Applications Now Open",
      date: "March 26, 2026",
      type: "Fellowship Grant",
      highlight: "#2E7D68",
    },
    {
      title: "Core ERP & Campus Wi-Fi Scheduled Maintenance (2 Hours)",
      date: "March 25, 2026",
      type: "IT Bulletin",
      highlight: "#E2725B",
    },
  ];

  const filteredArticles = newsArticles.filter(
    (art) => selectedCategory === "All" || art.category === selectedCategory
  );

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <Megaphone className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Campus Gazette & University Press</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              News, Research &{" "}
              <HighlighterUnderline color="#E8B93F">
                Announcements
              </HighlighterUnderline>
            </h1>

            <p className="text-base text-[#5C6788] leading-relaxed">
              Read the latest breakthroughs, faculty honors, campus developments, and official notices from {collegeName}.
            </p>
          </div>
        </div>
      </section>

      {/* Main News Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Articles (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Article Card */}
            <div className="paper-card overflow-hidden group hover:shadow-2xl transition-all">
              <div className="relative h-80 sm:h-96 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12172B]/90 via-[#12172B]/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="margin-note text-xs">
                    {featuredNews.badge}
                  </span>
                  <span className="academic-stamp text-[10px] py-0.5 px-2.5 bg-white/90 text-[#12172B]">
                    {featuredNews.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-2">
                  <div className="flex items-center gap-3 text-xs text-[#E8B93F] font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredNews.date}
                    </span>
                    <span>•</span>
                    <span>{featuredNews.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-snug">
                    {featuredNews.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-sm sm:text-base text-[#5C6788] leading-relaxed">
                  {featuredNews.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#E5E0D2]">
                  <div className="flex items-center gap-2 text-xs text-[#5C6788]">
                    <User className="w-3.5 h-3.5 text-[#E8B93F]" />
                    <span>{featuredNews.author}</span>
                  </div>

                  <button className="px-4 py-2 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3 h-3 text-[#E8B93F]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="paper-card p-4 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[#5C6788] font-bold text-[11px] uppercase tracking-wider mr-2">
                Topic:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#12172B] text-white shadow-xs"
                      : "bg-[#EDE9DF]/60 text-[#5C6788] hover:bg-[#EDE9DF] hover:text-[#12172B]"
                  }`}
                >
                  {cat === "All" ? "All News" : cat}
                </button>
              ))}
            </div>

            {/* News Articles Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className="paper-card overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#12172B]/80 backdrop-blur-md text-white text-[10px] font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#5C6788]">
                        <Calendar className="w-3 h-3 text-[#E8B93F]" />
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold font-serif text-[#12172B] leading-snug group-hover:text-[#E8B93F] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#5C6788] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E5E0D2]/70 text-xs">
                    <span className="text-[11px] text-[#5C6788] font-medium truncate max-w-[160px]">
                      By {article.author}
                    </span>
                    <button className="font-semibold text-[#12172B] hover:text-[#E8B93F] flex items-center gap-1 transition-colors">
                      <span>Read</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Bulletins & Subscriptions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Campus Notices Sticky Widget */}
            <div className="paper-card p-6 space-y-5 border-l-4 border-l-[#12172B]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D2]">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#E8B93F]" />
                  <h3 className="text-base font-bold font-serif text-[#12172B]">
                    Campus Notices
                  </h3>
                </div>
                <span className="margin-note-coral text-[10px]">
                  Live
                </span>
              </div>

              <div className="space-y-3.5">
                {announcements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2] space-y-1.5 hover:bg-[#EDE9DF]/70 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#12172B] uppercase tracking-wider text-[10px]">
                        {item.type}
                      </span>
                      <span className="text-[#5C6788] text-[10px]">{item.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#12172B] leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-[#12172B] text-white rounded-3xl p-6 sm:p-7 border border-[#232D4B] shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#E8B93F] flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold font-serif text-white">University Weekly Digest</h4>
                <p className="text-xs text-[#8B96B5] leading-relaxed">
                  Subscribe to receive curated research highlights, academic seminars, and campus events every Monday morning.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <input
                  type="email"
                  placeholder="scholar@eduplatform.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:ring-2 focus:ring-[#E8B93F] outline-none"
                />
                <button className="w-full py-2.5 bg-[#E8B93F] hover:bg-[#d9a832] text-[#12172B] text-xs font-bold rounded-xl transition-all">
                  Subscribe to Gazette
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

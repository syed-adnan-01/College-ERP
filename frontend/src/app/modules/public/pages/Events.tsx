import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles, Filter, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { Link } from "react-router";

export function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Career", "Academic", "Cultural", "Business"];

  const upcomingEvents = [
    {
      title: "Annual Tech Innovation Fest 2026",
      month: "APR",
      day: "15",
      date: "April 15–17, 2026",
      time: "9:00 AM – 6:00 PM EST",
      location: "Main University Auditorium & Hall A",
      category: "Technology",
      attendees: "2,000+ Registered",
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NDc3NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Three immersive days of cutting-edge tech demonstrations, hackathons, robotics showcases, and keynote addresses by silicon leaders.",
      badge: "Flagship Event",
    },
    {
      title: "Spring Career & Internship Expo 2026",
      month: "APR",
      day: "22",
      date: "April 22, 2026",
      time: "10:00 AM – 5:00 PM EST",
      location: "Grand Athletic Center Arena",
      category: "Career",
      attendees: "150+ Companies",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Connect directly with talent recruiters from Fortune 500 enterprises, tech startups, and research institutions.",
      badge: "Placement Drive",
    },
    {
      title: "Annual Doctoral Research Symposium",
      month: "MAY",
      day: "01",
      date: "May 1–2, 2026",
      time: "8:30 AM – 5:00 PM EST",
      location: "Graduate Science Quadrangle",
      category: "Academic",
      attendees: "500+ Scholars",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Showcasing peer-reviewed papers, poster sessions, and grant-winning inventions across biomedical sciences, computing, and humanities.",
      badge: "Peer-Reviewed",
    },
    {
      title: "Spring Symphony & Gala Night",
      month: "MAY",
      day: "10",
      date: "May 10, 2026",
      time: "6:00 PM – 10:30 PM EST",
      location: "Historic Quadrangle Amphitheater",
      category: "Cultural",
      attendees: "3,000+ Expected",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ3NzA0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "An unforgettable evening of live orchestral ensembles, contemporary acoustics, visual arts galleries, and food festivals.",
      badge: "Campus Heritage",
    },
    {
      title: "Global Entrepreneurship Venture Summit",
      month: "MAY",
      day: "20",
      date: "May 20, 2026",
      time: "9:00 AM – 6:00 PM EST",
      location: "Executive Business Hall",
      category: "Business",
      attendees: "800+ Delegates",
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NDc3NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Student founders pitch innovative ventures to angel syndicates and venture capitalists for seed grant funding.",
      badge: "Seed Grants",
    },
    {
      title: "International Scholars Cultural Night",
      month: "JUN",
      day: "05",
      date: "June 05, 2026",
      time: "7:00 PM – 10:00 PM EST",
      location: "Student Commons Plaza",
      category: "Cultural",
      attendees: "1,500+ Community",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A celebration of global diversity featuring culinary cuisine, traditional performances, and exhibitions from 50+ countries.",
      badge: "Open to Public",
    },
  ];

  const pastEvents = [
    {
      title: "Winter Doctoral Commencement 2025",
      date: "December 15, 2025",
      attendees: "5,000+ Attendees",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ3NzA0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stamp: "Alumni Milestone",
    },
    {
      title: "All-Campus AI Hackathon 2025",
      date: "November 20–21, 2025",
      attendees: "400+ Coders",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      stamp: "24-Hr Hack",
    },
    {
      title: "Global Alumni Leadership Gathering",
      date: "October 10, 2025",
      attendees: "2,000+ Alumni",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      stamp: "Homecoming",
    },
  ];

  const filteredEvents = upcomingEvents.filter(
    (ev) => selectedCategory === "All" || ev.category === selectedCategory
  );

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Campus Calendar & Conferences</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              Campus Events &{" "}
              <HighlighterUnderline color="#E8B93F">
                Symposiums
              </HighlighterUnderline>
            </h1>

            <p className="text-base text-[#5C6788] leading-relaxed">
              Explore upcoming academic conferences, career fairs, technical hackathons, and cultural festivities across our campus quads.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#5C6788] font-bold text-[11px] uppercase tracking-wider mr-2">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#12172B] text-white shadow-xs"
                    : "bg-[#EDE9DF]/60 text-[#5C6788] hover:bg-[#EDE9DF] hover:text-[#12172B]"
                }`}
              >
                {cat === "All" ? "All Events" : cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#5C6788] font-medium">
            Showing {filteredEvents.length} events
          </span>
        </div>
      </section>

      {/* Upcoming Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="paper-card overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                
                {/* Event Image (4 cols) */}
                <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Pop-out Calendar Date Stamp */}
                  <div className="absolute top-4 left-4 bg-[#12172B]/95 backdrop-blur-md text-white rounded-xl p-2.5 text-center min-w-[56px] shadow-lg border border-white/20">
                    <span className="text-[10px] font-bold tracking-wider text-[#E8B93F] block">
                      {event.month}
                    </span>
                    <span className="text-xl font-bold font-serif leading-none block mt-0.5">
                      {event.day}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="margin-note text-[11px]">
                      {event.badge}
                    </span>
                  </div>
                </div>

                {/* Event Details (8 cols) */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
                        {event.category}
                      </span>
                      <span className="text-xs text-[#5C6788]">• {event.attendees}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] leading-tight">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5C6788] leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C6788]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#E8B93F] flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#E8B93F] flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <button className="px-5 py-2.5 bg-[#12172B] hover:bg-[#1f2742] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex-shrink-0 flex items-center justify-center gap-2">
                      <span>Reserve Free Pass</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E8B93F]" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E5E0D2]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Archive</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#12172B] mt-1">
              Recent Event Highlights & Memories
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pastEvents.map((ev, idx) => (
            <div key={idx} className="paper-card overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="academic-stamp text-[10px] py-0.5 px-2.5">
                    {ev.stamp}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-base font-bold font-serif text-[#12172B] leading-snug">{ev.title}</h4>
                <p className="text-xs text-[#5C6788]">{ev.date} • {ev.attendees}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

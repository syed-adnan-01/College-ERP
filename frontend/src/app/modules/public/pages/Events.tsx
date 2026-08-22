import { Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

export function Events() {
  const upcomingEvents = [
    {
      title: "Annual Tech Fest 2026",
      date: "April 15-17, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Main Campus Auditorium",
      category: "Technology",
      attendees: "2000+",
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NDc3NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Join us for three days of innovation, workshops, competitions, and networking with industry leaders.",
    },
    {
      title: "Career Fair 2026",
      date: "April 22, 2026",
      time: "10:00 AM - 5:00 PM",
      location: "Sports Complex",
      category: "Career",
      attendees: "150+ Companies",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Meet recruiters from top companies, explore internship opportunities, and kickstart your career.",
    },
    {
      title: "Research Symposium",
      date: "May 1-2, 2026",
      time: "8:30 AM - 5:00 PM",
      location: "Conference Hall",
      category: "Academic",
      attendees: "500+",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Showcase of cutting-edge research by students and faculty across all disciplines.",
    },
    {
      title: "Spring Music Festival",
      date: "May 10, 2026",
      time: "6:00 PM - 11:00 PM",
      location: "Outdoor Amphitheater",
      category: "Cultural",
      attendees: "3000+",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ3NzA0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "An evening of live music performances featuring local and international artists.",
    },
    {
      title: "Entrepreneurship Summit",
      date: "May 20, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Business School Building",
      category: "Business",
      attendees: "800+",
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc3NDc3NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Learn from successful entrepreneurs, pitch your ideas, and network with investors.",
    },
    {
      title: "International Cultural Night",
      date: "June 5, 2026",
      time: "7:00 PM - 10:00 PM",
      location: "Student Center",
      category: "Cultural",
      attendees: "1500+",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Celebrate diversity with performances, food, and traditions from around the world.",
    },
  ];

  const pastEvents = [
    {
      title: "Winter Graduation Ceremony 2025",
      date: "December 15, 2025",
      attendees: "5000+",
      image: "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ3NzA0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Hackathon 2025",
      date: "November 20-21, 2025",
      attendees: "400+",
      image: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDY1NTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Alumni Homecoming 2025",
      date: "October 10, 2025",
      attendees: "2000+",
      image: "https://images.unsplash.com/photo-1758270705657-f28eec1a5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NDc3NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Technology: "bg-blue-100 text-blue-700",
      Career: "bg-green-100 text-green-700",
      Academic: "bg-purple-100 text-purple-700",
      Cultural: "bg-pink-100 text-pink-700",
      Business: "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Campus Events</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover exciting events, workshops, and activities happening at EduPlatform
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Don't miss out on these exciting opportunities</p>
          </div>

          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 ${getCategoryColor(event.category)} rounded-full text-sm font-semibold backdrop-blur-sm`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{event.description}</p>
                    </div>

                    <div>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-3 text-gray-700">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-900" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Date</div>
                            <div className="font-semibold">{event.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-900" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Time</div>
                            <div className="font-semibold">{event.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-900" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-semibold">{event.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-blue-900" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Expected</div>
                            <div className="font-semibold">{event.attendees}</div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white rounded-xl hover:bg-indigo-800 transition-colors">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
            <p className="text-xl text-gray-600">Highlights from our recent events</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span>{event.date}</span>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <button className="text-blue-900 font-semibold hover:text-indigo-700 transition-colors">
                    View Gallery →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-12 text-white">
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">View Full Calendar</h2>
            <p className="text-xl text-gray-200 mb-8">
              Access the complete calendar of events, workshops, and activities
            </p>
            <button className="px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-gray-100 transition-all">
              Open Event Calendar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

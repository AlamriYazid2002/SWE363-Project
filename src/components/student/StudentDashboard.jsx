import { Header } from "../Header";
import { Search, Calendar, MapPin, Users, Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useNavigation } from "../../contexts/NavigationContext";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    organizer: "IEEE Student Chapter",
    category: "Technology",
    date: "May 15, 2025",
    time: "2:00 PM – 5:00 PM",
    venue: "Building 5, Room 301",
    capacity: 100,
    registered: 45,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Cybersecurity Seminar",
    organizer: "Computer Society",
    category: "Technology",
    date: "May 22, 2025",
    time: "6:00 PM – 8:00 PM",
    venue: "Main Auditorium",
    capacity: 80,
    registered: 30,
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Cultural Night",
    organizer: "Student Council",
    category: "Cultural",
    date: "May 24, 2025",
    time: "7:00 PM – 10:00 PM",
    venue: "Central Courtyard",
    capacity: 200,
    registered: 150,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Tech Career Fair 2025",
    organizer: "Career Services",
    category: "Career",
    date: "Jun 02, 2025",
    time: "10:00 AM – 4:00 PM",
    venue: "Exhibition Hall",
    capacity: 300,
    registered: 178,
    image:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop",
    isFavorite: true,
  },
  {
    id: 5,
    title: "Intercollegiate Football Tryouts",
    organizer: "Athletics Department",
    category: "Sports",
    date: "Jun 05, 2025",
    time: "6:00 PM – 8:00 PM",
    venue: "Main Stadium",
    capacity: 120,
    registered: 64,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Sustainability Drive",
    organizer: "Green Club",
    category: "Environmental",
    date: "Jun 10, 2025",
    time: "9:00 AM – 12:00 PM",
    venue: "Building 3, Lobby",
    capacity: 90,
    registered: 40,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    isFavorite: false,
  },
];

export function StudentDashboard() {
  const { navigateTo, showSuccessPopup } = useNavigation();

  const handleRegister = (eventTitle) => {
    showSuccessPopup(
      "Registration Successful!",
      `You have successfully registered for "${eventTitle}". Check your email for confirmation.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Discover Events</h2>
          <p className="text-gray-600">
            Browse and register for upcoming events at KFUPM
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search events by title, organizer, or keyword..."
                className="pl-10 bg-gray-50"
              />
            </div>
            <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <option>All Categories</option>
              <option>Academic</option>
              <option>Sports</option>
              <option>Cultural</option>
              <option>Technology</option>
              <option>Career</option>
              <option>Environmental</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <option>All Dates</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Next Month</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                  aria-label={event.isFavorite ? "Unfavorite" : "Favorite"}
                >
                  <Heart
                    size={18}
                    className={event.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                  <button className="text-gray-400 hover:text-gray-600" aria-label="Share">
                    <Share2 size={16} />
                  </button>
                </div>

                <h3 className="mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-4">by {event.organizer}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-kfupm-green" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-kfupm-green" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-kfupm-green" />
                    <span>
                      {event.registered}/{event.capacity} registered
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRegister(event.title)}
                    className="flex-1 bg-kfupm-green hover:bg-kfupm-green-dark text-white"
                  >
                    Register
                  </Button>
                  <Button
                    onClick={() => navigateTo("student-event-details")}
                    variant="outline"
                    className="flex-1"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">Load More Events</Button>
        </div>
      </div>
    </div>
  );
}

import { Header } from "../Header";
import { Calendar, MapPin, QrCode, Star, Heart, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useNavigation } from "../../contexts/NavigationContext";

const registeredEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    organizer: "IEEE Student Chapter",
    date: "May 15, 2025",
    time: "2:00 PM – 5:00 PM",
    venue: "Building 5, Room 301",
    status: "Registered",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cybersecurity Seminar",
    organizer: "Computer Society",
    date: "May 22, 2025",
    time: "6:00 PM – 8:00 PM",
    venue: "Main Auditorium",
    status: "Registered",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
];

const pastEvents = [
  {
    id: 3,
    title: "Intro to Data Science",
    organizer: "Math Club",
    date: "Apr 20, 2025",
    time: "4:00 PM – 6:00 PM",
    venue: "Building 22, Lab 2",
    attended: true,
    feedbackGiven: false,
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cloud Basics Bootcamp",
    organizer: "IT Department",
    date: "Apr 10, 2025",
    time: "3:00 PM – 7:00 PM",
    venue: "Building 11, Room 104",
    attended: false,
    feedbackGiven: false,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
  },
];

const favoriteEvents = [
  {
    id: 5,
    title: "Tech Career Fair 2025",
    organizer: "Career Services",
    date: "Jun 02, 2025",
    time: "10:00 AM – 4:00 PM",
    venue: "Exhibition Hall",
    registered: false,
    image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop",
  },
];

export function MyEvents() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">My Events</h2>
          <p className="text-gray-600">Manage your registered and favorite events</p>
        </div>

        <Tabs defaultValue="registered" className="w-full">
          <TabsList className="mb-6 bg-white border border-gray-200">
            <TabsTrigger value="registered">Registered ({registeredEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({favoriteEvents.length})</TabsTrigger>
          </TabsList>

          {/* Registered Events */}
          <TabsContent value="registered">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-500">by {event.organizer}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle size={14} className="mr-1 inline" />
                        {event.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-kfupm-green" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-kfupm-green" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigateTo("student-checkin")}
                        className="flex-1 bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2"
                      >
                        <QrCode size={16} />
                        Check-in QR
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigateTo("student-event-details")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-500">by {event.organizer}</p>
                      </div>
                      <Badge
                        className={
                          event.attended
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }
                      >
                        {event.attended ? "Attended" : "Not Attended"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {event.attended && !event.feedbackGiven && (
                      <Button
                        onClick={() => navigateTo("student-feedback")}
                        className="w-full bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2"
                      >
                        <Star size={16} />
                        Submit Feedback
                      </Button>
                    )}
                    {event.feedbackGiven && (
                      <Button variant="outline" className="w-full" disabled>
                        Feedback Submitted
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Favorite Events */}
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {favoriteEvents.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-48 bg-gray-200">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                      aria-label="Favorited"
                    >
                      <Heart size={18} className="fill-red-500 text-red-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500">by {event.organizer}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-kfupm-green" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-kfupm-green" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-kfupm-green hover:bg-kfupm-green-dark text-white">
                        {event.registered ? "View Registration" : "Register Now"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigateTo(`/events/${event.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

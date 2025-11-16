import { Header } from "../Header";
import { Search, Filter, Calendar, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useNavigation } from "../../contexts/NavigationContext";

// Replace with real data or fetch from API later
const pendingEvents = [
  {
    id: 1,
    title: "AI & Data Science Workshop",
    organizer: "IEEE Student Chapter",
    category: "Academic",
    date: "Dec 10, 2025",
    time: "3:00 PM – 5:00 PM",
    venue: "Building 59, Room 301",
    capacity: 120,
    description:
      "A hands-on workshop covering modern data pipelines, model evaluation, and deployment tips for beginners.",
    submittedDate: "Dec 02, 2025",
  },
  {
    id: 2,
    title: "Intercollegiate Football Tryouts",
    organizer: "Athletics Department",
    category: "Sports",
    date: "Dec 12, 2025",
    time: "6:00 PM – 8:00 PM",
    venue: "Main Stadium",
    capacity: 80,
    description:
      "Open tryouts for the spring football team. Bring appropriate gear and arrive 15 minutes early for registration.",
    submittedDate: "Dec 03, 2025",
  },
  {
    id: 3,
    title: "Hack the Future: Mini-Hackathon",
    organizer: "Computer Society",
    category: "Tech",
    date: "Dec 14, 2025",
    time: "9:00 AM – 9:00 PM",
    venue: "Innovation Lab",
    capacity: 60,
    description:
      "A one-day hackathon focusing on campus-life solutions. Teams of up to 4 students, prizes for top 3 projects.",
    submittedDate: "Dec 05, 2025",
  },
];

export function PendingEvents() {
  const { showSuccessPopup, showErrorPopup } = useNavigation();

  const handleApprove = (eventTitle) => {
    showSuccessPopup(
      "Event Approved",
      `"${eventTitle}" has been approved and is now visible to students.`
    );
  };

  const handleReject = (eventTitle) => {
    showErrorPopup(
      "Event Rejected",
      `"${eventTitle}" has been rejected. The organizer will be notified.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Pending Events</h2>
          <p className="text-gray-600">Review and approve event submissions</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Search pending events..." className="pl-10 bg-gray-50" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              Filter
            </Button>
          </div>
        </div>

        {/* Pending Events List */}
        <div className="space-y-4">
          {pendingEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>By {event.organizer}</span>
                    <Badge variant="outline">{event.category}</Badge>
                    <span className="text-gray-400">Submitted {event.submittedDate}</span>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>
              </div>

              <p className="text-gray-700 mb-4">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-kfupm-green" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p>{event.date}</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-kfupm-green" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p>{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} className="text-kfupm-green" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p>{event.capacity} attendees</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2"
                  onClick={() => handleApprove(event.title)}
                >
                  <CheckCircle size={18} />
                  Approve Event
                </Button>
                <Button variant="destructive" className="gap-2" onClick={() => handleReject(event.title)}>
                  <XCircle size={18} />
                  Deny Event
                </Button>
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

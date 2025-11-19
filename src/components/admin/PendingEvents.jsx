import { useMemo, useState } from "react";
import { Header } from "../Header";
import { Search, Calendar, MapPin, Users, CheckCircle, XCircle, Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useNavigation } from "../../contexts/NavigationContext";

const initialPendingEvents = [
  {
    id: 1,
    title: "AI & Data Science Workshop",
    organizer: "IEEE Student Chapter",
    category: "Academic",
    date: "Dec 10, 2025",
    time: "3:00 PM - 5:00 PM",
    venue: "Building 59, Room 301",
    capacity: 120,
    description:
      "A hands-on workshop covering modern data pipelines, model evaluation, and deployment tips for beginners.",
    submittedDate: "Dec 02, 2025",
    status: "pending",
  },
  {
    id: 2,
    title: "Intercollegiate Football Tryouts",
    organizer: "Athletics Department",
    category: "Sports",
    date: "Dec 12, 2025",
    time: "6:00 PM - 8:00 PM",
    venue: "Main Stadium",
    capacity: 80,
    description:
      "Open tryouts for the spring football team. Bring appropriate gear and arrive 15 minutes early for registration.",
    submittedDate: "Dec 03, 2025",
    status: "pending",
  },
  {
    id: 3,
    title: "Hack the Future: Mini-Hackathon",
    organizer: "Computer Society",
    category: "Tech",
    date: "Dec 14, 2025",
    time: "9:00 AM - 9:00 PM",
    venue: "Innovation Lab",
    capacity: 60,
    description:
      "A one-day hackathon focusing on campus-life solutions. Teams of up to 4 students, prizes for top 3 projects.",
    submittedDate: "Dec 05, 2025",
    status: "pending",
  },
];

const categoryOptions = ["all", "Academic", "Sports", "Tech"];

export function PendingEvents() {
  const { showSuccessPopup, showErrorPopup } = useNavigation();
  const [events, setEvents] = useState(initialPendingEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || event.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, categoryFilter, statusFilter]);

  const updateEventStatus = (id, status) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status } : event))
    );
  };

  const handleApprove = (eventObj) => {
    updateEventStatus(eventObj.id, "approved");
    setLastAction({ type: "approved", title: eventObj.title });
    showSuccessPopup("Event Approved", `"${eventObj.title}" is now visible to students.`);
  };

  const handleReject = (eventObj) => {
    updateEventStatus(eventObj.id, "rejected");
    setLastAction({ type: "rejected", title: eventObj.title });
    showErrorPopup("Event Rejected", `"${eventObj.title}" has been rejected.`);
  };

  const renderStatusBadge = (status) => {
    if (status === "approved") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
    }
    if (status === "rejected") {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>;
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
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pending events..."
                className="pl-10 bg-gray-50"
              />
            </div>
            <div className="flex gap-2">
              {categoryOptions.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  className={categoryFilter === category ? "bg-kfupm-green text-white" : ""}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock3 size={16} className="text-kfupm-green" />
              {lastAction ? (
                <span>
                  Last action: {lastAction.type === "approved" ? "Approved" : "Rejected"} "
                  {lastAction.title}"
                </span>
              ) : (
                <span>No decision taken yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Pending Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span>By {event.organizer}</span>
                    <Badge variant="outline">{event.category}</Badge>
                    <span className="text-gray-400">Submitted {event.submittedDate}</span>
                  </div>
                </div>
                {renderStatusBadge(event.status)}
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

              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2"
                  onClick={() => handleApprove(event)}
                  disabled={event.status === "approved"}
                >
                  <CheckCircle size={18} />
                  {event.status === "approved" ? "Approved" : "Approve Event"}
                </Button>
                <Button
                  variant="destructive"
                  className="gap-2"
                  onClick={() => handleReject(event)}
                  disabled={event.status === "rejected"}
                >
                  <XCircle size={18} />
                  {event.status === "rejected" ? "Rejected" : "Deny Event"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                  View Details
                </Button>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600 text-center">
              No events match your filters. Try adjusting the status or category.
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <span className="font-semibold">{selectedEvent?.organizer}</span> •{" "}
              {selectedEvent?.category}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-2">
                <Calendar size={16} className="text-kfupm-green mt-0.5" />
                <div>
                  <p>{selectedEvent.date}</p>
                  <p className="text-gray-500">{selectedEvent.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin size={16} className="text-kfupm-green mt-0.5" />
                <div>
                  <p>{selectedEvent.venue}</p>
                  <p className="text-gray-500">{selectedEvent.capacity} attendees</p>
                </div>
              </div>
              <p>{selectedEvent.description}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
            {selectedEvent?.status !== "rejected" && (
              <Button variant="destructive" onClick={() => selectedEvent && handleReject(selectedEvent)}>
                Reject
              </Button>
            )}
            {selectedEvent?.status !== "approved" && (
              <Button
                className="bg-kfupm-green text-white"
                onClick={() => selectedEvent && handleApprove(selectedEvent)}
              >
                Approve
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Header } from "../Header";
import { StatCard } from "../StatCard";
import { Calendar, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigation } from "../../contexts/NavigationContext";
import api from "../../lib/apiClient";

export function OrganizerDashboard() {
  const { navigateTo, setActiveEvent, eventOverrides, createdEvents, removeCreatedEvent, showSuccessPopup, showErrorPopup, user } = useNavigation();
  const [events, setEvents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const { data } = await api.get("/api/events");
        const list = data.data || data || [];
        const mine = user?.role === "organizer"
          ? list.filter((ev) => ev.organizerId === user.id || ev.organizerId === user._id)
          : list;
        const normalized = mine.map((ev) => {
          const start = ev.startAt ? new Date(ev.startAt) : null;
          const end = ev.endAt ? new Date(ev.endAt) : null;
          const dateStr = start ? start.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) : "Date TBD";
          const timeStr = start && end
            ? `${start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
            : "Time TBD";
          return {
            ...ev,
            id: ev._id,
            date: dateStr,
            time: timeStr,
            status: ev.status ? ev.status[0].toUpperCase() + ev.status.slice(1) : "Pending",
            registrations: ev.registrations || 0,
            capacity: ev.capacity || 0,
            category: ev.category || "General",
          };
        });
        setEvents(normalized);
      } catch (err) {
        const msg = err?.response?.data?.error || "Failed to load events";
        showErrorPopup("Load error", msg);
      }
    };
    fetchMyEvents();
  }, [user, showErrorPopup]);

  const formatDisplayDate = (value) => {
    if (!value) return "Date TBD";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
  };

  const mergeWithOverrides = (evt) =>
    evt.isCustom || !eventOverrides[evt.title] ? evt : { ...evt, ...eventOverrides[evt.title] };

  const combinedEvents = useMemo(() => {
    const formattedCustom = createdEvents.map((evt) => ({
      ...evt,
      date: formatDisplayDate(evt.startDate || evt.date),
    }));
    const merged = events.map((evt) => mergeWithOverrides(evt));
    return [...formattedCustom, ...merged];
  }, [events, createdEvents, eventOverrides]);

  const totalEvents = combinedEvents.length;
  const pendingCount = combinedEvents.filter((e) => e.status === "Pending").length;
  const totalAttendance = combinedEvents.reduce((sum, e) => sum + (e.registrations || 0), 0);
  const upcomingCount = combinedEvents.filter((e) => e.status === "Approved" || e.status === "Pending").length;

  const filteredEvents = useMemo(() => {
    return combinedEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Statuses" || event.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" || event.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [combinedEvents, searchTerm, statusFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="organizer" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl mb-2">Organizer Dashboard</h2>
            <p className="text-gray-600">Manage your events and track attendance</p>
          </div>
          <Button
            className="bg-kfupm-green hover:bg-kfupm-green-dark text-white"
            onClick={() => navigateTo("organizer-create")}
          >
            Create Event
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Events" value={totalEvents.toString()} subtitle="Across all sources" />
          <StatCard title="Pending" value={pendingCount.toString()} subtitle="Awaiting approval" />
          <StatCard title="Total Attendance" value={totalAttendance.toString()} subtitle="Across all events" icon={Users} />
          <StatCard title="Upcoming" value={upcomingCount.toString()} subtitle="Approved or pending" />
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h3 className="mb-4">Search & Filter</h3>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <Input
                placeholder="Search your events..."
                className="pl-10 bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Completed</option>
            </select>
            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Academic</option>
              <option>Sports</option>
              <option>Cultural</option>
              <option>Technology</option>
              <option>Career</option>
            </select>
          </div>
        </div>

        {/* My Events List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3>My Events</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredEvents.length === 0 && (
              <div className="p-6 text-gray-500">No events match your filters.</div>
            )}
            {filteredEvents.map((event, idx) => (
              <div key={event.id || idx} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      {event.date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Registrations: </span>
                    <span>
                      {event.registrations}/{event.capacity || 0}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-kfupm-green h-2 rounded-full"
                      style={{
                        width: `${
                          event.capacity && event.capacity > 0
                            ? Math.min(100, Math.round((event.registrations / event.capacity) * 100))
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const merged = mergeWithOverrides(event);
                      setActiveEvent(merged);
                      navigateTo("organizer-event-details");
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const merged = mergeWithOverrides(event);
                      setActiveEvent(merged);
                      navigateTo("organizer-create");
                    }}
                  >
                    Edit Event
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const merged = mergeWithOverrides(event);
                      setActiveEvent(merged);
                      navigateTo("organizer-event-details");
                    }}
                  >
                    Registrations
                  </Button>
                  {event.status === "Pending" && event.isCustom && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        removeCreatedEvent(event.id);
                        showSuccessPopup("Event deleted", `"${event.title}" was removed.`);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

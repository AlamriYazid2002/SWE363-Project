import { useMemo, useState } from "react";
import { Header } from "../Header";
import { Search, Calendar, MapPin, Users, Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useNavigation } from "../../contexts/NavigationContext";
import { getStudentEvents } from "../../data/studentEvents";

const studentEvents = getStudentEvents();

export function StudentDashboard() {
  const {
    navigateTo,
    showSuccessPopup,
    showErrorPopup,
    setActiveEvent,
    favoriteEventIds,
    toggleFavoriteEvent,
    requestShareHighlight,
  } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const favoriteSet = useMemo(() => new Set(favoriteEventIds), [favoriteEventIds]);

  const handleRegister = (event) => {
    if (event.status && event.status !== "Approved") {
      showErrorPopup(
        "Registration unavailable",
        "This event is pending approval. Registration will open once it's approved."
      );
      return;
    }
    showSuccessPopup(
      "Registration Successful!",
      `You have successfully registered for "${event.title}". Check your email for confirmation.`
    );
  };

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59);

    const matchesDateFilter = (eventDate) => {
      if (dateFilter === "all") return true;
      if (dateFilter === "week") {
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      }
      if (dateFilter === "month") {
        return eventDate >= startOfMonth && eventDate <= endOfMonth;
      }
      if (dateFilter === "next-month") {
        return eventDate >= startOfNextMonth && eventDate <= endOfNextMonth;
      }
      return true;
    };

    return studentEvents.filter((event) => {
      const eventDate = new Date(event.dateValue);
      const matchesSearch =
        !normalizedQuery ||
        [event.title, event.organizer, event.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );
      const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
      const matchesDate = matchesDateFilter(eventDate);
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [searchQuery, categoryFilter, dateFilter]);

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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search events by title, organizer, or keyword..."
                className="pl-10 bg-gray-50"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
            >
              <option value="all">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Technology">Technology</option>
              <option value="Career">Career</option>
              <option value="Environmental">Environmental</option>
            </select>
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
            >
              <option value="all">All Dates</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="next-month">Next Month</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12 border border-dashed border-gray-200 rounded-lg bg-white">
              No events match your filters. Try adjusting your search or filter options.
            </div>
          )}
          {filteredEvents.map((event) => {
            const isFavorite = favoriteSet.has(event.id);
            return (
            <div
              key={event.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveEvent(event);
                navigateTo("student-event-details");
              }}
              onKeyDown={(keyboardEvent) => {
                if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
                  keyboardEvent.preventDefault();
                  setActiveEvent(event);
                  navigateTo("student-event-details");
                }
              }}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-3 hover:shadow-2xl hover:border-kfupm-green/30 hover:bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-kfupm-green/60"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <button
                  type="button"
                  onClick={(mouseEvent) => {
                    mouseEvent.stopPropagation();
                    toggleFavoriteEvent(event.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                  aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                  aria-pressed={isFavorite}
                >
                  <Heart
                    size={18}
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </button>
              </div>

              <div className="p-5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-gray-400">
                    <button
                      type="button"
                      className="hover:text-gray-600 transition-colors"
                      aria-label="Share"
                      onClick={(mouseEvent) => {
                        mouseEvent.stopPropagation();
                        setActiveEvent(event);
                        requestShareHighlight();
                        navigateTo("student-event-details");
                      }}
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
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
                    onClick={(mouseEvent) => {
                      mouseEvent.stopPropagation();
                      handleRegister(event);
                    }}
                    disabled={event.status && event.status !== "Approved"}
                    className="flex-1 bg-kfupm-green hover:bg-kfupm-green-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {event.status && event.status !== "Approved" ? "Pending Approval" : "Register"}
                  </Button>
                  <Button
                    onClick={(mouseEvent) => {
                      mouseEvent.stopPropagation();
                      setActiveEvent(event);
                      navigateTo("student-event-details");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">Load More Events</Button>
        </div>
      </div>
    </div>
  );
}
// this for me
// also this

import { Header } from "../Header";
import { StatCard } from "../StatCard";
import { Calendar, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function OrganizerDashboard() {
  const myEvents = [
    {
      title: "AI & Machine Learning Workshop",
      status: "Approved",
      date: "May 15, 2025",
      registrations: 45,
      capacity: 100,
    },
    {
      title: "Cybersecurity Seminar",
      status: "Pending",
      date: "May 22, 2025",
      registrations: 30,
      capacity: 80,
    },
    {
      title: "Tech Career Fair 2025",
      status: "Approved",
      date: "Jun 02, 2025",
      registrations: 178,
      capacity: 300,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="organizer" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl mb-2">Organizer Dashboard</h2>
            <p className="text-gray-600">Manage your events and track attendance</p>
          </div>
          <Button className="bg-kfupm-green hover:bg-kfupm-green-dark text-white">
            Create Event
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Events" value={myEvents.length.toString()} subtitle="2 approved" />
          <StatCard title="Pending" value="1" subtitle="Awaiting approval" />
          <StatCard title="Total Attendance" value="253" subtitle="Across all events" icon={Users} />
          <StatCard title="Upcoming" value="3" subtitle="3 approved" />
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h3 className="mb-4">Search & Filter</h3>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              {/* Decorative icon; no handler wired yet */}
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
              <Input placeholder="Search your events..." className="pl-10 bg-gray-50" />
            </div>
            <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Completed</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <option>All Categories</option>
              <option>Academic</option>
              <option>Sports</option>
              <option>Cultural</option>
              <option>Technology</option>
            </select>
          </div>
        </div>

        {/* My Events List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3>My Events</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {myEvents.map((event, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50">
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
                      {event.registrations}/{event.capacity}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-kfupm-green h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((event.registrations / event.capacity) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Event
                  </Button>
                  <Button variant="outline" size="sm">
                    Registrations
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

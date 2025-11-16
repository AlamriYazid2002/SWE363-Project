import { Header } from "../Header";
import { StatCard } from "../StatCard";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";
import { Button } from "../ui/button";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useNavigation } from "../../contexts/NavigationContext";

// ---- Sample data (replace with real data / API later) ----
const eventData = [
  { month: "Jan", events: 24, attendance: 82 },
  { month: "Feb", events: 19, attendance: 78 },
  { month: "Mar", events: 31, attendance: 88 },
  { month: "Apr", events: 27, attendance: 84 },
  { month: "May", events: 35, attendance: 91 },
];

const categoryData = [
  { name: "Academic", value: 32, color: "#0D7B3F" },
  { name: "Sports", value: 22, color: "#10B981" },
  { name: "Cultural", value: 18, color: "#34D399" },
  { name: "Tech", value: 20, color: "#059669" },
  { name: "Other", value: 8, color: "#6EE7B7" },
];

const recentActivity = [
  { action: "New event submitted", user: "Ahmed A.", time: "10m ago", status: "pending" },
  { action: "Event approved", user: "Admin", time: "1h ago", status: "approved" },
  { action: "User registered", user: "Sara K.", time: "2h ago", status: "info" },
  { action: "Event completed", user: "IEEE Chapter", time: "Yesterday", status: "completed" },
];

export function AdminDashboard() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Monitor and manage all events and users</p>
          </div>
          <Button
            onClick={() => navigateTo("organizer-create")}
            className="bg-kfupm-green hover:bg-kfupm-green-dark text-white"
          >
            Create Official Event
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div onClick={() => navigateTo("admin-dashboard")} className="cursor-pointer">
            <StatCard title="Total Events" value="156" subtitle="42 this month" icon={Calendar} />
          </div>
          <div onClick={() => navigateTo("admin-pending")} className="cursor-pointer">
            <StatCard title="Pending Approval" value="8" subtitle="Awaiting review" icon={Clock} />
          </div>
          <div onClick={() => navigateTo("admin-users")} className="cursor-pointer">
            <StatCard title="Total Users" value="2,847" subtitle="452 organizers" icon={Users} />
          </div>
          <StatCard title="Avg Attendance" value="87%" subtitle="+5% from last month" icon={TrendingUp} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="mb-6">Events & Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="events" stroke="#0D7B3F" strokeWidth={2} />
                <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="mb-6">Events by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(d) => `${d.name}: ${d.value}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3>Recent Activity</h3>
            <Button variant="outline" size="sm" onClick={() => navigateTo("admin-pending")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "pending"
                        ? "bg-yellow-500"
                        : activity.status === "approved"
                        ? "bg-green-500"
                        : activity.status === "completed"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <div>
                    <p>{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}